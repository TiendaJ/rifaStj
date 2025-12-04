'use server';
// Force Vercel redeploy to pick up Supabase Storage changes

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const rifaSchema = z.object({
    nombre: z.string().min(3, "Nombre muy corto"),
    descripcion: z.string().min(10, "Descripción muy corta"),
    monto: z.coerce.number().min(0, "Monto inválido"),
    precio_producto: z.coerce.number().min(0, "Precio inválido").optional(),
    capacidad_maxima: z.coerce.number().min(1, "Capacidad inválida"),
    estado: z.enum(['activa', 'pausada', 'finalizada', 'desactivada']),
    fecha_sorteo: z.string().optional().transform((str) => str ? new Date(str) : null),
});

async function uploadImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error } = await supabase.storage
        .from('rifas')
        .upload(filename, buffer, {
            contentType: file.type,
            upsert: false
        });

    if (error) {
        console.error('Supabase upload error:', error);
        throw new Error('Error al subir la imagen');
    }

    const { data: { publicUrl } } = supabase.storage
        .from('rifas')
        .getPublicUrl(filename);

    return publicUrl;
}

export async function createRifa(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = rifaSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const imageFile = formData.get('imagen') as File;
    let imagePath = null;

    try {
        imagePath = await uploadImage(imageFile);
    } catch (error) {
        return { error: { imagen: ['Error al subir la imagen. Verifica la configuración de Supabase.'] } };
    }

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
        try {
            const uploadedUrl = await uploadImage(imageFile);
            if (uploadedUrl) imagePath = uploadedUrl;
        } catch (error) {
            return { error: { imagen: ['Error al subir la imagen.'] } };
        }
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



