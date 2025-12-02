'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const participanteSchema = z.object({
    dni: z.string().length(8, "DNI debe tener 8 dígitos"),
    telefono: z.string().min(9, "Teléfono inválido"),
    nombre: z.string().optional(),
    password: z.string().optional(), // Optional on update
    estado_cuenta: z.enum(['activo', 'bloqueado']),
});

export async function createParticipante(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    // Custom validation for password requirement on create
    if (!rawData.password) {
        return { error: { password: ["Contraseña es requerida"] } };
    }

    const validated = participanteSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { dni, telefono, nombre, password, estado_cuenta } = validated.data;

    // Check duplicates
    const existing = await prisma.participante.findFirst({
        where: { OR: [{ dni }, { telefono }] }
    });

    if (existing) {
        return { error: { root: ["El DNI o Teléfono ya está registrado"] } };
    }

    const hashedPassword = await bcrypt.hash(password!, 10);

    await prisma.participante.create({
        data: {
            dni,
            telefono,
            nombre,
            password: hashedPassword,
            estado_cuenta,
        }
    });

    revalidatePath('/admin/participantes');
    redirect('/admin/participantes');
}

export async function updateParticipante(id: string, prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = participanteSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { dni, telefono, nombre, password, estado_cuenta } = validated.data;

    const dataToUpdate: any = {
        dni,
        telefono,
        nombre,
        estado_cuenta,
    };

    if (password) {
        dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    try {
        await prisma.participante.update({
            where: { id },
            data: dataToUpdate,
        });
    } catch (error) {
        return { error: { root: ["Error al actualizar. Posible duplicado de DNI/Teléfono."] } };
    }

    revalidatePath('/admin/participantes');
    revalidatePath(`/admin/participantes/${id}`);
    redirect('/admin/participantes');
}

export async function deleteParticipante(id: string, formData: FormData) {
    // Soft delete by blocking? Or actually delete if no inscriptions?
    // Requirement says: "Desactivación lógica sin eliminar historial."
    // So we set estado_cuenta = 'bloqueado'
    await prisma.participante.update({
        where: { id },
        data: { estado_cuenta: 'bloqueado' }
    });
    revalidatePath('/admin/participantes');
}
