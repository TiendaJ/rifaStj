export const ESTADOS_PEDIDO = {
    ORDEN_RECIBIDA: 'Orden Recibida',
    PROCESANDO: 'Procesando',
    LISTO_PARA_ENVIAR: 'Listo para Enviar',
    ENVIADO: 'Enviado',
    EN_RUTA: 'En Ruta',
    ENTREGADO: 'Entregado',
    CANCELADO: 'Cancelado',
};

export type DetallePedidoType = {
    id: string;
    producto: {
        nombre: string;
        imagenes: string[];
    };
    cantidad: number;
    precio_unitario: number;
};

export type PedidoType = {
    id: string;
    participante?: {
        nombre: string | null;
        email: string | null;
    } | null;
    estado: string;
    total: number;
    fecha_creacion: Date;
    codigo_rastreo: string | null;
    empresa_envio: string | null;
    nombre_contacto: string | null;
    telefono: string | null;
    direccion: string | null;
    ciudad: string | null;
    detalles: DetallePedidoType[];
};
