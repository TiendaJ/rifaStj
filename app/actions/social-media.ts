'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type SocialMediaLink = {
    id: string;
    nombre: string;
    url: string;
    icono: string | null;
    color: string | null;
    activo: boolean;
    created_at: Date;
    updated_at: Date;
};

export async function getSocialMediaLinks() {
    try {
        const links = await prisma.configuracionRedSocial.findMany({
            orderBy: { created_at: 'asc' },
        });
        return { success: true, data: links };
    } catch (error) {
        console.error('Error fetching social media links:', error);
        return { success: false, error: 'Error al obtener las redes sociales' };
    }
}

export async function createSocialMediaLink(data: {
    nombre: string;
    url: string;
    icono?: string;
    color?: string;
}) {
    try {
        const newLink = await prisma.configuracionRedSocial.create({
            data: {
                nombre: data.nombre,
                url: data.url,
                icono: data.icono || null,
                color: data.color || null,
                activo: true,
            },
        });
        revalidatePath('/admin/redes-sociales');
        return { success: true, data: newLink };
    } catch (error) {
        console.error('Error creating social media link:', error);
        return { success: false, error: 'Error al crear la red social' };
    }
}

export async function updateSocialMediaLink(
    id: string,
    data: {
        nombre?: string;
        url?: string;
        icono?: string;
        color?: string;
        activo?: boolean;
    }
) {
    try {
        const updatedLink = await prisma.configuracionRedSocial.update({
            where: { id },
            data,
        });
        revalidatePath('/admin/redes-sociales');
        return { success: true, data: updatedLink };
    } catch (error) {
        console.error('Error updating social media link:', error);
        return { success: false, error: 'Error al actualizar la red social' };
    }
}

export async function deleteSocialMediaLink(id: string) {
    try {
        await prisma.configuracionRedSocial.delete({
            where: { id },
        });
        revalidatePath('/admin/redes-sociales');
        return { success: true };
    } catch (error) {
        console.error('Error deleting social media link:', error);
        return { success: false, error: 'Error al eliminar la red social' };
    }
}

export async function toggleSocialMediaStatus(id: string, isActive: boolean) {
    return updateSocialMediaLink(id, { activo: isActive });
}
