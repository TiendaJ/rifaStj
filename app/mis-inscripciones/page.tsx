import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import Link from 'next/link';

export default async function ClientDashboardPage() {
    const session = await getSession();
    if (!session) return null; // Middleware handles redirect

    const inscripciones = await prisma.rifaParticipante.findMany({
        where: { participante_id: session.id },
        include: { rifa: true },
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="min-h-screen bg-white text-gray-900 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex justify-between items-center border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-black tracking-tight">Mis Inscripciones</h1>
                        <p className="text-gray-500 mt-1">Hola, {session.nombre || session.dni}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Link href="/" className="btn-secondary text-sm">
                            Ver Rifas
                        </Link>
                        <form action={logout}>
                            <button className="text-red-600 hover:text-red-800 px-4 py-2 text-sm font-medium transition-colors">
                                Cerrar Sesión
                            </button>
                        </form>
                    </div>
                </header>

                <div className="grid gap-4">
                    {inscripciones.map((ins) => (
                        <div key={ins.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:border-gray-300 transition-colors">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                {ins.rifa.imagen ? (
                                    <img src={ins.rifa.imagen} alt={ins.rifa.nombre} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                                ) : (
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400 font-mono">
                                        NO_IMG
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-black">{ins.rifa.nombre}</h3>
                                    <p className="text-gray-500 text-sm">Inscrito el {new Date(ins.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-medium">Estado</div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${ins.estado === 'confirmado' ? 'bg-green-50 text-green-700 border-green-200' :
                                        ins.estado === 'pendiente' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                            ins.estado === 'rechazado' ? 'bg-red-50 text-red-700 border-red-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                        }`}>
                                        {ins.estado.toUpperCase()}
                                    </span>
                                </div>
                                {ins.comprobante_imagen && (
                                    <a href={ins.comprobante_imagen} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black text-sm underline font-medium">
                                        Ver Comprobante
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}

                    {inscripciones.length === 0 && (
                        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-6">No te has inscrito a ninguna rifa aún.</p>
                            <Link href="/" className="btn-primary">
                                Explorar Rifas Disponibles
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
