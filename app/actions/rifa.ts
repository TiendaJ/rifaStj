'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const rifaSchema = z.object({
    nombre: z.string().min(3, "Nombre muy corto"),
    descripcion: z.string().min(10, "Descripción muy corta"),
    monto: z.coerce.number().min(0, "Monto inválido"),
    capacidad_maxima: z.coerce.number().min(1, "Capacidad inválida"),
    estado: z.enum(['activa', 'pausada', 'finalizada', 'desactivada']),
    fecha_sorteo: z.string().optional().transform((str) => str ? new Date(str) : null),
});

export async function createRifa(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = rifaSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const imageFile = formData.get('imagen') as File;
    let imagePath = null;

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        await writeFile(join(uploadDir, filename), buffer);
        imagePath = `/uploads/${filename}`;
    }

    // Destructure fecha_sorteo to avoid "Unknown argument" error in outdated Prisma Client
    // NOW REVERTED: We can use standard API after client regeneration

    await prisma.rifa.create({
        data: {
            ...validated.data,
            imagen: imagePath,
        }
    });

    revalidatePath('/admin/rifas');
    redirect('/admin/rifas');
}

export async function updateRifa(id: string, prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = rifaSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const imageFile = formData.get('imagen') as File;
    let imagePath = undefined;

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        await writeFile(join(uploadDir, filename), buffer);
        imagePath = `/uploads/${filename}`;
    }

    await prisma.rifa.update({
        where: { id },
        data: {
            ...validated.data,
            ...(imagePath && { imagen: imagePath }),
        }
    });

    revalidatePath('/admin/rifas');
    revalidatePath(`/admin/rifas/${id}`);
    redirect('/admin/rifas');
}

export async function deleteRifa(id: string, formData: FormData) {
    await prisma.rifa.update({
        where: { id },
        data: { estado: 'desactivada' }
    });
    revalidatePath('/admin/rifas');
}
