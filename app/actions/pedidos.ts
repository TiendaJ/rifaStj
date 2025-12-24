'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ESTADOS_PEDIDO } from '@/lib/constants';
import type { PedidoType, DetallePedidoType } from '@/lib/constants';

// Export types for compatibility if needed elsewhere (or rely on lib/constants)
export type { PedidoType, DetallePedidoType };


export async function getPedidos() {
    try {
        const pedidos = await prisma.pedido.findMany({
            orderBy: { fecha_creacion: 'desc' },
            include: {
                participante: {
                    select: {
                        nombre: true,
                        email: true,
                    },
                },
                detalles: {
                    include: {
                        producto: {
                            select: {
                                nombre: true,
                                fotos: true, // Assuming fotos matches internal schema for images
                            },
                        },
                    },
                },
            },
        });

        // Transform for easier consumption if needed, or return directly
        // Mapping keys to match the requested UI flow if necessary
        return { success: true, data: pedidos };
    } catch (error) {
        console.error('Error fetching orders:', error);
        return { success: false, error: 'Error al obtener los pedidos' };
    }
}

export async function updateEstadoPedido(id: string, estado: string, trackingInfo?: { codigo_rastreo?: string, empresa_envio?: string }) {
    try {
        const data: any = { estado };
        if (trackingInfo) {
            if (trackingInfo.codigo_rastreo !== undefined) data.codigo_rastreo = trackingInfo.codigo_rastreo;
            if (trackingInfo.empresa_envio !== undefined) data.empresa_envio = trackingInfo.empresa_envio;
        }

        const updatedPedido = await prisma.pedido.update({
            where: { id },
            data,
        });
        revalidatePath('/admin/pedidos');
        return { success: true, data: updatedPedido };
    } catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, error: 'Error al actualizar el estado del pedido' };
    }
}

// For testing purposes
export async function createDummyPedido() {
    try {
        // Find a product
        const producto = await prisma.producto.findFirst();
        if (!producto) return { success: false, error: 'No hay productos para crear pedido' };

        const pedido = await prisma.pedido.create({
            data: {
                total: producto.precio,
                estado: ESTADOS_PEDIDO.ORDEN_RECIBIDA,
                nombre_contacto: 'Test User',
                telefono: '555-0123',
                direccion: 'Av. Test 123',
                ciudad: 'Lima',
                detalles: {
                    create: {
                        producto_id: producto.id,
                        cantidad: 1,
                        precio_unitario: producto.precio,
                    }
                }
            }
        });
        revalidatePath('/admin/pedidos');
        return { success: true, data: pedido };
    } catch (error) {
        console.error('Error creating dummy order:', error);
        return { success: false, error: 'Error creating dummy order' };
    }
}

export async function createPedido(data: {
    nombre: string;
    telefono: string;
    email: string;
    direccion: string;
    ciudad: string;
    total: number;
    items: { id: string; cantidad: number; precio: number }[];
    participante_id?: string;
}) {
    try {
        const pedido = await prisma.pedido.create({
            data: {
                total: data.total,
                estado: ESTADOS_PEDIDO.ORDEN_RECIBIDA,
                nombre_contacto: data.nombre,
                telefono: data.telefono,
                direccion: data.direccion,
                ciudad: data.ciudad,
                participante_id: data.participante_id,
                detalles: {
                    create: data.items.map((item) => ({
                        producto_id: item.id,
                        cantidad: item.cantidad,
                        precio_unitario: item.precio,
                    })),
                },
            },
        });

        // Optional: Revalidate paths if necessary, though this is mostly admin side
        revalidatePath('/admin/pedidos');

        return { success: true, data: pedido };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Error al crear el pedido' };
    }
}

export async function getPedidosByParticipante(participante_id: string) {
    try {
        const pedidos = await prisma.pedido.findMany({
            where: { participante_id },
            orderBy: { fecha_creacion: 'desc' },
            include: {
                detalles: {
                    include: {
                        producto: {
                            select: {
                                nombre: true,
                                fotos: true,
                            },
                        },
                    },
                },
            },
        });
        return { success: true, data: pedidos };
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return { success: false, error: 'Error al obtener los pedidos del usuario' };
    }
}
