'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getCategorias() {
    try {
        const categorias = await prisma.categoria.findMany({
            orderBy: { created_at: 'desc' },
        });
        return categorias;
    } catch (error) {
        console.error('Error fetching categorias:', error);
        return [];
    }
}

export async function createCategoria(formData: FormData) {
    const descripcion = formData.get('descripcion') as string;

    if (!descripcion) {
        return { error: 'La descripción es requerida' };
    }

    try {
        await prisma.categoria.create({
            data: {
                descripcion,
            },
        });
    } catch (error) {
        console.error('Error creating categoria:', error);
        return { error: 'Error al crear la categoría' };
    }

    revalidatePath('/admin/categorias');
    redirect('/admin/categorias');
}

export async function updateCategoria(id: string, formData: FormData) {
    const descripcion = formData.get('descripcion') as string;

    if (!descripcion) {
        return { error: 'La descripción es requerida' };
    }

    try {
        await prisma.categoria.update({
            where: { id },
            data: {
                descripcion,
            },
        });
    } catch (error) {
        console.error('Error updating categoria:', error);
        return { error: 'Error al actualizar la categoría' };
    }

    revalidatePath('/admin/categorias');
    redirect('/admin/categorias');
}

export async function deleteCategoria(id: string) {
    try {
        await prisma.categoria.delete({
            where: { id },
        });
    } catch (error) {
        console.error('Error deleting categoria:', error);
        return { error: 'Error al eliminar la categoría' };
    }

    revalidatePath('/admin/categorias');
}
