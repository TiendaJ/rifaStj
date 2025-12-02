import prisma from '@/lib/prisma';
import { updateEstadoInscripcion } from '@/app/actions/inscripcion';

export default async function AdminInscripcionesPage() {
    const inscripciones = await prisma.rifaParticipante.findMany({
        include: {
            rifa: true,
            participante: true,
        },
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Inscripciones</h2>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Participante</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Rifa</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Comprobante</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Estado</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {inscripciones.map((ins) => (
                            <tr key={ins.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <div className="text-gray-900 font-medium">{ins.participante.nombre || 'Sin nombre'}</div>
                                    <div className="text-xs text-gray-500 font-mono">{ins.participante.dni} - {ins.participante.telefono}</div>
                                </td>
                                <td className="p-4 text-gray-600">{ins.rifa.nombre}</td>
                                <td className="p-4">
                                    {ins.comprobante_imagen ? (
                                        <a href={ins.comprobante_imagen} target="_blank" rel="noopener noreferrer" className="text-black hover:underline text-sm font-medium">
                                            Ver Comprobante
                                        </a>
                                    ) : (
                                        <span className="text-red-500 text-xs">No subido</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${ins.estado === 'confirmado' ? 'bg-green-50 text-green-700 border-green-200' :
                                        ins.estado === 'pendiente' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                            ins.estado === 'rechazado' ? 'bg-red-50 text-red-700 border-red-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                        }`}>
                                        {ins.estado.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    {ins.estado === 'pendiente' && (
                                        <>
                                            <form action={updateEstadoInscripcion.bind(null, ins.id)}>
                                                <input type="hidden" name="estado" value="confirmado" />
                                                <button className="text-green-600 hover:text-green-800 bg-green-50 px-3 py-1 rounded border border-green-200 hover:bg-green-100 transition-colors text-xs font-medium">
                                                    Aprobar
                                                </button>
                                            </form>
                                            <form action={updateEstadoInscripcion.bind(null, ins.id)}>
                                                <input type="hidden" name="estado" value="rechazado" />
                                                <button className="text-red-600 hover:text-red-800 bg-red-50 px-3 py-1 rounded border border-red-200 hover:bg-red-100 transition-colors text-xs font-medium">
                                                    Rechazar
                                                </button>
                                            </form>
                                        </>
                                    )}
                                    {ins.estado !== 'pendiente' && (
                                        <span className="text-gray-400 text-xs italic">Procesado</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {inscripciones.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500">
                                    No hay inscripciones registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
