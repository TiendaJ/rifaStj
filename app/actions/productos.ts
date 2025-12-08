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

// Helper function to extract array of strings from FormData
// Often FormData.getAll returns string | File, we expect strings here for URLs
function getUrlsFromFormData(formData: FormData, key: string): string[] {
    const entries = formData.getAll(key);
    return entries.map(entry => entry.toString()).filter(url => url.length > 0 && !url.startsWith('[object '));
}

async function uploadFiles(formData: FormData, key: string): Promise<string[]> {
    const files = formData.getAll(key).filter((f): f is File => f instanceof File && f.size > 0);
    const urls: string[] = [];

    for (const file of files) {
        const url = await uploadImage(file);
        if (url) urls.push(url);
    }
    return urls;
}

export async function createProducto(formData: FormData) {
    const nombre = formData.get('nombre') as string;
    const descripcion = formData.get('descripcion') as string;
    const precio = parseFloat(formData.get('precio') as string);
    const cantidad = parseInt(formData.get('cantidad') as string);
    const categoria_id = formData.get('categoria_id') as string;

    const uploadedFotos = await uploadFiles(formData, 'fotos');
    // Also support string URLs if any (hybrid approach)
    const stringFotos = getUrlsFromFormData(formData, 'fotos');
    const fotos = [...uploadedFotos, ...stringFotos];

    const uploadedVideos = await uploadFiles(formData, 'videos');
    const stringVideos = getUrlsFromFormData(formData, 'videos');
    const videos = [...uploadedVideos, ...stringVideos];

    if (!nombre || !descripcion || isNaN(precio) || isNaN(cantidad) || !categoria_id) {
        return { error: 'Faltan campos requeridos' };
    }

    try {
        await prisma.producto.create({
            data: {
                nombre,
                descripcion,
                precio,
                cantidad,
                categoria_id,
                fotos: fotos,
                // @ts-ignore
                videos: videos,
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

    const uploadedFotos = await uploadFiles(formData, 'fotos');
    const existingFotos = getUrlsFromFormData(formData, 'existing_fotos');
    // Also include any 'fotos' that were passed as strings (unlikely but possible)
    const stringFotos = getUrlsFromFormData(formData, 'fotos');
    const finalFotos = [...existingFotos, ...uploadedFotos, ...stringFotos];

    const uploadedVideos = await uploadFiles(formData, 'videos');
    const existingVideos = getUrlsFromFormData(formData, 'existing_videos');
    const stringVideos = getUrlsFromFormData(formData, 'videos');
    const finalVideos = [...existingVideos, ...uploadedVideos, ...stringVideos];


    if (!nombre || !descripcion || isNaN(precio) || isNaN(cantidad) || !categoria_id) {
        return { error: 'Faltan campos requeridos' };
    }

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
                // @ts-ignore
                videos: finalVideos,
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
