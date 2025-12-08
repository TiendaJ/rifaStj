import prisma from '@/lib/prisma';
import Link from 'next/link';
import { deleteRifa } from '@/app/actions/rifa';

import RifaReportButton from './RifaReportButton';
import DeleteButton from '@/app/components/admin/DeleteButton';

export default async function RifasListPage() {
    const rifas = await prisma.rifa.findMany({
        where: { NOT: { estado: 'desactivada' } },
        include: { _count: { select: { participantes: true } } },
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Rifas</h2>
                <div className="flex gap-3">
                    <RifaReportButton rifas={rifas} />
                    <Link href="/admin/rifas/new" className="btn-primary">
                        Nueva Rifa
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Nombre</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Estado</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Fecha Sorteo</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Precio</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Progreso</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rifas.map((rifa) => (
                            <tr key={rifa.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">{rifa.nombre}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${rifa.estado === 'activa' ? 'bg-green-50 text-green-700 border-green-200' :
                                        rifa.estado === 'pausada' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                            'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                        {rifa.estado.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600 text-sm">
                                    {rifa.fecha_sorteo ? new Date(rifa.fecha_sorteo).toLocaleDateString() : '-'}
                                </td>
                                <td className="p-4 text-gray-600 font-mono">
                                    <div className="flex flex-col">
                                        <span>Ticket: ${rifa.monto}</span>
                                        {rifa.precio_producto && (
                                            <span className="text-xs text-gray-400">Prod: ${rifa.precio_producto}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1 border border-gray-200">
                                        <div
                                            className="bg-black h-2.5 rounded-full"
                                            style={{ width: `${Math.min(100, (rifa._count.participantes / rifa.capacidad_maxima) * 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">
                                        {rifa._count.participantes} / {rifa.capacidad_maxima}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <Link href={`/admin/rifas/${rifa.id}`} className="text-black hover:text-gray-600 text-sm font-medium">
                                        Editar
                                    </Link>
                                    <DeleteButton action={deleteRifa} id={rifa.id} />
                                </td>
                            </tr>
                        ))}
                        {rifas.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500">
                                    No hay rifas registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
