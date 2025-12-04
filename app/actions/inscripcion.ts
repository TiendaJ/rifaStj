'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getSession } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const inscripcionSchema = z.object({
    rifa_id: z.string(),
    cantidad: z.coerce.number().min(1).default(1),
});

export async function inscribirse(prevState: any, formData: FormData) {
    const session = await getSession();
    if (!session) {
        return { error: { root: ["Debes iniciar sesión"] } };
    }
    if (session.role === 'admin') {
        return { error: { root: ["Los administradores no pueden inscribirse"] } };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validated = inscripcionSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { rifa_id, cantidad } = validated.data;

    // Check capacity
    const rifa = await prisma.rifa.findUnique({
        where: { id: rifa_id },
        include: {
            _count: {
                select: {
                    participantes: {
                        where: { NOT: { estado: 'rechazado' } }
                    }
                }
            }
        }
    });

    if (!rifa) return { error: { root: ["Rifa no encontrada"] } };
    if (rifa.estado !== 'activa') return { error: { root: ["Rifa no activa"] } };

    // Check if there are enough spots
    if (rifa._count.participantes + cantidad > rifa.capacidad_maxima) {
        const disponibles = rifa.capacidad_maxima - rifa._count.participantes;
        return { error: { root: [`Solo quedan ${disponibles} cupos disponibles`] } };
    }

    // Handle Comprobante
    const comprobanteFile = formData.get('comprobante') as File;
    let comprobantePath = null;

    if (comprobanteFile && comprobanteFile.size > 0) {
        const bytes = await comprobanteFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `comprobante-${Date.now()}-${comprobanteFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

        const { error: uploadError } = await supabase
            .storage
            .from('comprobantes')
            .upload(filename, buffer, {
                contentType: comprobanteFile.type,
                upsert: false
            });

        if (uploadError) {
            console.error('Supabase upload error:', uploadError);
            return { error: { root: ["Error al subir el comprobante"] } };
        }

        const { data: { publicUrl } } = supabase
            .storage
            .from('comprobantes')
            .getPublicUrl(filename);

        comprobantePath = publicUrl;
    } else {
        return { error: { root: ["Debes subir el comprobante de pago"] } };
    }

    // Create multiple inscriptions
    // We can use createMany if we didn't need to return IDs, but here we just need to create them.
    // However, createMany is not supported for all databases in the same way with relations, 
    // but for simple join table it should work.
    // Actually, RifaParticipante has an ID @default(uuid()), so createMany is fine.

    const inscriptions = Array.from({ length: cantidad }).map(() => ({
        rifa_id,
        participante_id: session.id,
        comprobante_imagen: comprobantePath,
        estado: 'pendiente',
    }));

    await prisma.rifaParticipante.createMany({
        data: inscriptions
    });

    revalidatePath('/mis-inscripciones');
    redirect('/mis-inscripciones');
}

export async function updateEstadoInscripcion(id: string, formData: FormData) {
    const estado = formData.get('estado') as string;

    if (!['pendiente', 'aprobado', 'rechazado', 'confirmado'].includes(estado)) {
        // Invalid state, just return
        return;
    }

    // If rejected, we might want to delete it to free up space? 
    // Requirement: "Si se rechaza → liberar cupo."
    // If we keep it as 'rechazado', we need to ensure the count logic excludes rejected ones.
    // Prisma _count includes all related records.
    // So we should probably delete it or change the count logic.
    // For now, I'll keep it simple: if rejected, delete it? 
    // Or better, keep it but update the capacity check to filter out rejected.
    // But Prisma's relation count is simple.
    // Let's stick to: Rejected = Keep record but don't count? 
    // No, easiest is to delete or move to a 'historial' table.
    // Requirement says "Si se rechaza → liberar cupo."
    // I'll implement: If rejected, delete the record? Or just keep it and fix the count query.
    // I'll fix the count query in `inscribirse` to `where: { NOT: { estado: 'rechazado' } }`.

    await prisma.rifaParticipante.update({
        where: { id },
        data: { estado }
    });

    revalidatePath('/admin/inscripciones');
}
