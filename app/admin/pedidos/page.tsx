'use client';

import { useState, useEffect } from 'react';
import {
    getPedidos,
    updateEstadoPedido,
    createDummyPedido,
} from '@/app/actions/pedidos';
import {
    ESTADOS_PEDIDO,
    PedidoType
} from '@/lib/constants';
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    Search,
    Eye,
    MoreHorizontal,
    MapPin
} from 'lucide-react';

export default function PedidosPage() {
    const [pedidos, setPedidos] = useState<PedidoType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPedido, setSelectedPedido] = useState<PedidoType | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    // Status Update Form
    const [newStatus, setNewStatus] = useState('');
    const [trackingCode, setTrackingCode] = useState('');
    const [shippingCompany, setShippingCompany] = useState('');

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        setLoading(true);
        const result = await getPedidos();
        if (result.success && result.data) {
            setPedidos(result.data as any); // Cast due to type mismatch in prisma dates usually
        }
        setLoading(false);
    };

    const handleCreateDummy = async () => {
        await createDummyPedido();
        fetchPedidos();
    };

    const openStatusUpdate = (pedido: PedidoType) => {
        setSelectedPedido(pedido);
        setNewStatus(pedido.estado);
        setTrackingCode(pedido.codigo_rastreo || '');
        setShippingCompany(pedido.empresa_envio || '');
        setIsDetailsOpen(false);
        setIsStatusModalOpen(true);
    };

    const openDetails = (pedido: PedidoType) => {
        setSelectedPedido(pedido);
        setIsDetailsOpen(true);
    };

    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPedido) return;

        await updateEstadoPedido(selectedPedido.id, newStatus, {
            codigo_rastreo: trackingCode,
            empresa_envio: shippingCompany
        });

        setIsStatusModalOpen(false);
        fetchPedidos();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case ESTADOS_PEDIDO.ORDEN_RECIBIDA: return 'bg-blue-100 text-blue-800';
            case ESTADOS_PEDIDO.PROCESANDO: return 'bg-yellow-100 text-yellow-800';
            case ESTADOS_PEDIDO.LISTO_PARA_ENVIAR: return 'bg-purple-100 text-purple-800';
            case ESTADOS_PEDIDO.ENVIADO: return 'bg-indigo-100 text-indigo-800';
            case ESTADOS_PEDIDO.EN_RUTA: return 'bg-orange-100 text-orange-800';
            case ESTADOS_PEDIDO.ENTREGADO: return 'bg-green-100 text-green-800';
            case ESTADOS_PEDIDO.CANCELADO: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Gestión de Pedidos</h1>
                <button
                    onClick={handleCreateDummy}
                    className="text-xs text-gray-500 hover:text-black underline"
                >
                    Crear Pedido de Prueba
                </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-500">ID / Fecha</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Cliente</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Estado</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Total</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Cargando pedidos...</td></tr>
                            ) : pedidos.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay pedidos registrados.</td></tr>
                            ) : (
                                pedidos.map((pedido) => (
                                    <tr key={pedido.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">#{pedido.id.slice(0, 8)}</div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(pedido.fecha_creacion).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {pedido.nombre_contacto || pedido.participante?.nombre || 'Invitado'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {pedido.ciudad}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border border-transparent ${getStatusColor(pedido.estado)}`}>
                                                {pedido.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            S/ {pedido.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => openDetails(pedido)}
                                                className="text-gray-400 hover:text-black transition-colors"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {isDetailsOpen && selectedPedido && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={() => setIsDetailsOpen(false)}></div>

                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 animate-in fade-in zoom-in duration-200">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Pedido #{selectedPedido.id.slice(0, 8)}</h2>
                                    <p className="text-sm text-gray-500">
                                        Realizado el {new Date(selectedPedido.fecha_creacion).toLocaleString()}
                                    </p>
                                </div>
                                <button onClick={() => setIsDetailsOpen(false)} className="text-gray-400 hover:text-black">
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Cliente</h3>
                                    <p className="font-medium">{selectedPedido.nombre_contacto}</p>
                                    <p className="text-gray-600">{selectedPedido.telefono}</p>
                                    <p className="text-gray-600">{selectedPedido.participante?.email}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Envío</h3>
                                    <p className="text-gray-800">{selectedPedido.direccion}</p>
                                    <p className="text-gray-800">{selectedPedido.ciudad}</p>
                                    {selectedPedido.codigo_rastreo && (
                                        <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                                            <p className="font-medium">Tracking:</p>
                                            <p className="text-blue-600">{selectedPedido.empresa_envio} - {selectedPedido.codigo_rastreo}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Productos</h3>
                                <div className="border rounded-md divide-y">
                                    {selectedPedido.detalles.map((detalle) => (
                                        <div key={detalle.id} className="p-3 flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{detalle.producto.nombre}</p>
                                                <p className="text-xs text-gray-500">Cant: {detalle.cantidad} x S/ {detalle.precio_unitario}</p>
                                            </div>
                                            <p className="font-medium">S/ {(detalle.cantidad * detalle.precio_unitario).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <div className="text-right">
                                        <span className="text-gray-500 mr-4">Total</span>
                                        <span className="text-xl font-bold">S/ {selectedPedido.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    onClick={() => openStatusUpdate(selectedPedido)}
                                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Actualizar Estado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Update Modal */}
            {isStatusModalOpen && selectedPedido && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold mb-4">Actualizar Estado</h3>
                        <form onSubmit={handleUpdateStatus} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                                >
                                    {Object.values(ESTADOS_PEDIDO).map((estado) => (
                                        <option key={estado} value={estado}>{estado}</option>
                                    ))}
                                </select>
                            </div>

                            {(newStatus === ESTADOS_PEDIDO.ENVIADO || newStatus === ESTADOS_PEDIDO.EN_RUTA) && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Empresa de Envío</label>
                                        <input
                                            type="text"
                                            value={shippingCompany}
                                            onChange={(e) => setShippingCompany(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                                            placeholder="Ej: Olva Courier"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Código de Rastreo</label>
                                        <input
                                            type="text"
                                            value={trackingCode}
                                            onChange={(e) => setTrackingCode(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                                            placeholder="Ej: 123456789"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsStatusModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
