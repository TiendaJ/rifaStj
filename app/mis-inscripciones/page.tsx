import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import Link from 'next/link';

import UserProfileForm from '@/components/client/UserProfileForm';

export default async function ClientDashboardPage() {
    const session = await getSession();
    if (!session) return null; // Middleware handles redirect

    const user = await prisma.participante.findUnique({
        where: { id: session.id }
    });

    const inscripciones = await prisma.rifaParticipante.findMany({
        where: { participante_id: session.id },
        include: { rifa: true },
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 gap-4 md:gap-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Mis Inscripciones</h1>
                        <p className="text-gray-500 mt-1 text-sm md:text-base">Hola, {session.nombre || session.dni}</p>
                    </div>
                    <div className="flex gap-4 items-center w-full md:w-auto justify-between md:justify-end">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Inscriptions */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">Mis Rifas</h2>
                        <div className="grid gap-4">
                            {inscripciones.map((ins) => (
                                <div key={ins.id} className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-300 transition-colors">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        {ins.rifa.imagen ? (
                                            <img src={ins.rifa.imagen} alt={ins.rifa.nombre} className="w-16 h-16 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                                        ) : (
                                            <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400 font-mono flex-shrink-0">
                                                NO_IMG
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <h3 className="text-base md:text-lg font-bold text-black truncate">{ins.rifa.nombre}</h3>
                                            <p className="text-gray-500 text-xs md:text-sm">Inscrito el {new Date(ins.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
                                        <div className="text-left md:text-right">
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
                                            <a href={ins.comprobante_imagen} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black text-sm underline font-medium whitespace-nowrap">
                                                Ver Comprobante
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {inscripciones.length === 0 && (
                                <div className="text-center py-12 md:py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300 px-4">
                                    <p className="text-gray-500 mb-6">No te has inscrito a ninguna rifa aún.</p>
                                    <Link href="/" className="btn-primary w-full md:w-auto inline-block">
                                        Explorar Rifas Disponibles
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Profile */}
                    <div className="lg:col-span-1">
                        <UserProfileForm user={user!} />
                    </div>
                </div>
            </div>
        </div>
    );
}
