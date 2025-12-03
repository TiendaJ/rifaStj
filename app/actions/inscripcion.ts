'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getSession } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const inscripcionSchema = z.object({
    rifa_id: z.string(),
});

export async function inscribirse(prevState: any, formData: FormData) {
    const session = await getSession();
    if (!session || session.role !== 'client') {
        return { error: { root: ["Debes iniciar sesión como cliente"] } };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validated = inscripcionSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { rifa_id } = validated.data;

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
    if (rifa._count.participantes >= rifa.capacidad_maxima) {
        return { error: { root: ["Cupos agotados"] } };
    }

    // Check existing inscription
    const existing = await prisma.rifaParticipante.findUnique({
        where: {
            rifa_id_participante_id: {
                rifa_id,
                participante_id: session.id
            }
        }
    });

    if (existing) {
        return { error: { root: ["Ya estás inscrito en esta rifa"] } };
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

    await prisma.rifaParticipante.create({
        data: {
            rifa_id,
            participante_id: session.id,
            comprobante_imagen: comprobantePath,
            estado: 'pendiente',
        }
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
