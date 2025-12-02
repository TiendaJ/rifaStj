import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function PublicRifasPage() {
    const rifas = await prisma.rifa.findMany({
        where: { estado: 'activa' },
        include: {
            _count: {
                select: {
                    participantes: {
                        where: { NOT: { estado: 'rechazado' } }
                    }
                }
            }
        },
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="min-h-screen bg-white text-gray-900 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <header className="flex justify-between items-center border-b border-gray-100 pb-8">
                    <h1 className="text-4xl font-extrabold text-black tracking-tight">Rifas Activas</h1>
                    <div className="space-x-4 flex items-center">
                        <Link href="/login" className="text-gray-500 hover:text-black transition-colors font-medium text-sm">
                            Iniciar Sesión
                        </Link>
                        <Link href="/register" className="btn-primary">
                            Registrarse
                        </Link>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rifas.map((rifa) => (
                        <div key={rifa.id} className="card-tech group">
                            <div className="h-48 bg-gray-100 relative overflow-hidden border-b border-gray-100">
                                {rifa.imagen ? (
                                    <img src={rifa.imagen} alt={rifa.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-xs">
                                        NO_IMAGE
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    ${rifa.monto}
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-black mb-2 leading-tight group-hover:text-gray-700 transition-colors">{rifa.nombre}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{rifa.descripcion}</p>
                                    {rifa.fecha_sorteo && (
                                        <p className="text-xs text-gray-400 mt-2 font-mono">
                                            Sorteo: {new Date(rifa.fecha_sorteo).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-gray-500 uppercase tracking-wider">
                                        <span>Progreso</span>
                                        <span>{rifa._count.participantes} / {rifa.capacidad_maxima}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className="bg-black h-1.5 rounded-full transition-all duration-1000"
                                            style={{ width: `${Math.min(100, (rifa._count.participantes / rifa.capacidad_maxima) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <Link
                                    href={`/rifas/${rifa.id}`}
                                    className="btn-secondary w-full justify-center"
                                >
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    ))}

                    {rifas.length === 0 && (
                        <div className="col-span-full text-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 font-medium">No hay rifas activas en este momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
