'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getMercadoPagoConfig() {
    try {
        // Find the first active one, or just the first one if we assume singleton
        // For security or simplicity, we might just have one record.
        const config = await prisma.configuracionMercadoPago.findFirst();
        return { success: true, data: config };
    } catch (error) {
        console.error('Error fetching Mercado Pago config:', error);
        return { success: false, error: 'Error al obtener configuración' };
    }
}

export async function saveMercadoPagoConfig(data: {
    id?: string;
    public_key: string;
    access_token: string;
    environment: string;
    activo: boolean;
}) {
    try {
        let config;

        // If ID matches existing, update. Else check if any exists to update, else create.
        const existing = await prisma.configuracionMercadoPago.findFirst();

        if (existing) {
            config = await prisma.configuracionMercadoPago.update({
                where: { id: existing.id },
                data: {
                    public_key: data.public_key,
                    access_token: data.access_token,
                    environment: data.environment,
                    activo: data.activo,
                }
            });
        } else {
            config = await prisma.configuracionMercadoPago.create({
                data: {
                    public_key: data.public_key,
                    access_token: data.access_token,
                    environment: data.environment,
                    activo: data.activo,
                }
            });
        }

        revalidatePath('/admin/configuracion/mercadopago');
        return { success: true, data: config };
    } catch (error) {
        console.error('Error saving Mercado Pago config:', error);
        return { success: false, error: 'Error al guardar configuración' };
    }
}
