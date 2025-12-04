'use server';

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const profileSchema = z.object({
    dni: z.string().length(8, "DNI debe tener 8 dígitos"),
    telefono: z.string().min(9, "Teléfono inválido"),
    email: z.string().email("Email inválido"),
    direccion: z.string().min(5, "Dirección muy corta"),
    departamento: z.string().min(1, "Departamento requerido"),
    provincia: z.string().min(1, "Provincia requerida"),
    distrito: z.string().min(1, "Distrito requerido"),
});

export async function updateProfile(prevState: any, formData: FormData) {
    const session = await getSession();
    if (!session) {
        return { error: { root: ["No has iniciado sesión"] } };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validated = profileSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { dni, telefono, email, direccion, departamento, provincia, distrito } = validated.data;

    try {
        await prisma.participante.update({
            where: { id: session.id },
            data: {
                dni,
                telefono,
                email,
                direccion,
                departamento,
                provincia,
                distrito,
            }
        });
    } catch (error) {
        return { error: { root: ["Error al actualizar perfil"] } };
    }

    revalidatePath(`/rifas`);
    return { success: true };
}
