'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

async function uploadImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    const filename = `productos/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Reusing 'rifas' bucket as it's likely the only configured one
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

export async function getProductos() {
    try {
        const productos = await prisma.producto.findMany({
            include: { categoria: true },
            orderBy: { created_at: 'desc' },
        });
        return productos;
    } catch (error) {
        console.error('Error fetching productos:', error);
        return [];
    }
}

export async function getProductoById(id: string) {
    try {
        const producto = await prisma.producto.findUnique({
            where: { id },
            include: { categoria: true },
        });
        return producto;
    } catch (error) {
        console.error('Error fetching producto:', error);
        return null;
    }
}

export async function createProducto(formData: FormData) {
    const nombre = formData.get('nombre') as string;
    const descripcion = formData.get('descripcion') as string;
    const precio = parseFloat(formData.get('precio') as string);
    const cantidad = parseInt(formData.get('cantidad') as string);
    const categoria_id = formData.get('categoria_id') as string;
    const files = formData.getAll('fotos') as File[];

    if (!nombre || !descripcion || isNaN(precio) || isNaN(cantidad) || !categoria_id) {
        return { error: 'Faltan campos requeridos' };
    }

    const uploadedUrls: string[] = [];
    for (const file of files) {
        if (file.size > 0) {
            try {
                const url = await uploadImage(file);
                if (url) uploadedUrls.push(url);
            } catch (e) {
                console.error("Failed to upload image", e);
            }
        }
    }

    try {
        await prisma.producto.create({
            data: {
                nombre,
                descripcion,
                precio,
                cantidad,
                categoria_id,
                fotos: uploadedUrls,
            },
        });
        revalidatePath('/admin/productos');
        return { success: true };
    } catch (error) {
        console.error('Error creating producto:', error);
        return { error: 'Error al crear el producto' };
    }
}

export async function updateProducto(id: string, formData: FormData) {
    const nombre = formData.get('nombre') as string;
    const descripcion = formData.get('descripcion') as string;
    const precio = parseFloat(formData.get('precio') as string);
    const cantidad = parseInt(formData.get('cantidad') as string);
    const categoria_id = formData.get('categoria_id') as string;
    const files = formData.getAll('fotos') as File[];
    const existingFotos = formData.getAll('existing_fotos') as string[];

    if (!nombre || !descripcion || isNaN(precio) || isNaN(cantidad) || !categoria_id) {
        return { error: 'Faltan campos requeridos' };
    }

    const uploadedUrls: string[] = [];
    for (const file of files) {
        if (file.size > 0) {
            try {
                const url = await uploadImage(file);
                if (url) uploadedUrls.push(url);
            } catch (e) {
                console.error("Failed to upload image", e);
            }
        }
    }

    const finalFotos = [...existingFotos, ...uploadedUrls];

    try {
        await prisma.producto.update({
            where: { id },
            data: {
                nombre,
                descripcion,
                precio,
                cantidad,
                categoria_id,
                fotos: finalFotos,
            },
        });
        revalidatePath('/admin/productos');
        return { success: true };
    } catch (error) {
        console.error('Error updating producto:', error);
        return { error: 'Error al actualizar el producto' };
    }
}

export async function deleteProducto(id: string) {
    try {
        await prisma.producto.delete({
            where: { id },
        });
    } catch (error) {
        console.error('Error deleting producto:', error);
        return { error: 'Error al eliminar el producto' };
    }

    revalidatePath('/admin/productos');
}
