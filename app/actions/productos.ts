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

export async function getProductos(
    query?: string,
    categoriaId?: string,
    minPrice?: number,
    maxPrice?: number,
    marca?: string,
    page: number = 1,
    limit: number = 10
) {
    try {
        const where: any = {};
        if (query) {
            where.nombre = { contains: query, mode: 'insensitive' };
        }
        if (categoriaId && categoriaId !== 'all') {
            where.categoria_id = categoriaId;
        }

        // Price Filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.precio = {};
            if (minPrice !== undefined) where.precio.gte = minPrice;
            if (maxPrice !== undefined) where.precio.lte = maxPrice;
        }

        // Brand Filter
        if (marca && marca !== 'all') {
            where.marca = { equals: marca, mode: 'insensitive' };
        }

        const skip = (page - 1) * limit;

        const [productos, totalCount] = await Promise.all([
            prisma.producto.findMany({
                where,
                include: { categoria: true },
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            prisma.producto.count({ where })
        ]);

        return {
            productos,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        };
    } catch (error) {
        console.error('Error fetching productos:', error);
        return { productos: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
}

export async function getMarcas() {
    try {
        // Use queryRaw to bypass client validation as the client might be outdated 
        // This resolves the runtime error when the Prisma Client hasn't been reloaded
        const result = await prisma.$queryRaw`SELECT DISTINCT marca FROM "Producto" WHERE marca IS NOT NULL` as any[];
        return result.map((r: any) => r.marca).filter(Boolean) as string[];
    } catch (error) {
        console.warn('Error fetching marcas (raw):', error);
        return [];
    }
}

export async function getRelatedProducts(categoriaId: string, currentProductId: string, limit: number = 4) {
    try {
        const productos = await prisma.producto.findMany({
            where: {
                categoria_id: categoriaId,
                id: { not: currentProductId }
            },
            include: { categoria: true },
            take: limit,
            orderBy: { created_at: 'desc' }
        });
        return productos;
    } catch (error) {
        console.error('Error fetching related products:', error);
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

// ... existing functions ...

// New function for Excel Import
import * as XLSX from 'xlsx';

export async function importProductosExcel(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) return { error: 'No se subió ningún archivo' };

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data: any[] = XLSX.utils.sheet_to_json(sheet);

        let successCount = 0;
        let errorCount = 0;

        for (const row of data) {
            // Expected columns: Nombre, Descripcion, Precio, Cantidad, Categoria
            const { Nombre, Descripcion, Precio, Cantidad, Categoria } = row;

            if (!Nombre || !Precio || !Cantidad) {
                console.warn('Skipping invalid row:', row);
                errorCount++;
                continue;
            }

            // Find or create category (simple logic: find by name, or use default/first found if missing logic)
            // For now, let's assume Categoria is the exact name of an existing category.
            let categoria_id = null;
            if (Categoria) {
                const cat = await prisma.categoria.findFirst({
                    where: { descripcion: { equals: Categoria, mode: 'insensitive' } }
                });
                if (cat) categoria_id = cat.id;
            }

            // If category not found, maybe assign to a default or skip?
            // Let's create it if it doesn't exist? Or just fail? 
            // Better to fail row or put in "General" if exists. 
            // For simplicity, if not found, try to find a "General" category or fail.
            if (!categoria_id) {
                // Try to find any category to fallback
                const anyCat = await prisma.categoria.findFirst();
                if (anyCat) categoria_id = anyCat.id;
                else {
                    errorCount++;
                    continue; // No category at all in DB
                }
            }

            await prisma.producto.create({
                data: {
                    nombre: String(Nombre),
                    descripcion: Descripcion ? String(Descripcion) : '',
                    precio: Number(Precio),
                    cantidad: Number(Cantidad),
                    categoria_id: categoria_id,
                    fotos: [], // No photos from Excel typical
                    // @ts-ignore
                    videos: []
                }
            });
            successCount++;
        }

        revalidatePath('/admin/productos');
        return { success: true, message: `Importados: ${successCount}. Fallidos: ${errorCount}` };
    } catch (error) {
        console.error('Error processing Excel:', error);
        return { error: 'Error al procesar el archivo Excel' };
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
