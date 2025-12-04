import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import InscripcionForm from '@/components/client/InscripcionForm';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import RifaDetailImage from '@/components/RifaDetailImage';
import RifaLoginPrompt from '@/components/RifaLoginPrompt';

export const dynamic = 'force-dynamic';

export default async function RifaDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const rifa = await prisma.rifa.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    participantes: {
                        where: { NOT: { estado: 'rechazado' } }
                    }
                }
            }
        }
    });

    if (!rifa) notFound();

    const session = await getSession();
    const isClient = session?.role !== 'admin';

    // Check if already subscribed and profile completion
    let isSubscribed = false;
    let isProfileComplete = false;

    if (session && isClient) {
        const user = await prisma.participante.findUnique({
            where: { id: session.id }
        });

        if (user) {
            isProfileComplete = !!(user.email && user.direccion && user.distrito && user.provincia && user.departamento && user.dni && user.telefono);
        }

        const existing = await prisma.rifaParticipante.findUnique({
            where: {
                rifa_id_participante_id: {
                    rifa_id: id,
                    participante_id: session.id
                }
            }
        });
        if (existing) isSubscribed = true;
    }

    const progress = (rifa._count.participantes / rifa.capacidad_maxima) * 100;

    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-gray-500 hover:text-black mb-6 md:mb-8 inline-flex items-center text-sm font-medium transition-colors">
                    <span className="mr-2">←</span> Volver a Rifas
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-6 md:space-y-8 order-2 md:order-1">
                        <RifaDetailImage imagen={rifa.imagen} nombre={rifa.nombre} id={rifa.id} />

                        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Estado del Sorteo</h3>
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                                <div
                                    className="bg-black h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min(100, progress)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm font-mono text-gray-600">
                                <span>{rifa._count.participantes} INSCRITOS</span>
                                <span>{rifa.capacidad_maxima} CUPOS TOTALES</span>
                            </div>

                        </div>
                    </div>

                    <div className="space-y-6 md:space-y-8 order-1 md:order-2">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-2 py-1 rounded-md text-xs font-bold border uppercase tracking-wide ${rifa.estado === 'activa' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    {rifa.estado}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">ID: {rifa.id.slice(0, 8)}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4 tracking-tight leading-tight">{rifa.nombre}</h1>
                            <div className="text-2xl md:text-3xl font-bold text-black mb-2">
                                S/{rifa.monto} <span className="text-lg font-normal text-gray-500">/ ticket</span>
                            </div>
                            {rifa.fecha_sorteo && (
                                <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                    <span className="uppercase tracking-wider text-xs">Juega el:</span>
                                    <span className="text-black">{new Date(rifa.fecha_sorteo).toLocaleDateString()} {new Date(rifa.fecha_sorteo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            )}
                        </div>

                        <p className="text-gray-600 text-base md:text-lg leading-relaxed border-t border-gray-100 pt-6">
                            {rifa.descripcion}
                        </p>

                        <div className="pt-2">
                            {!session ? (
                                <>
                                    <RifaLoginPrompt rifaId={rifa.id} />
                                    <p className="text-xs text-gray-400 mt-4 font-mono">Debug: No active session found on server.</p>
                                </>
                            ) : !isClient ? (
                                <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 border border-yellow-200 text-center text-sm font-medium">
                                    Modo Administrador: Inscripción deshabilitada.
                                </div>
                            ) : isSubscribed ? (
                                <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                        ✓
                                    </div>
                                    <h3 className="text-lg font-bold text-green-800 mb-2">¡Inscripción Confirmada!</h3>
                                    <p className="text-green-700 mb-4 text-sm">Tu participación ha sido registrada exitosamente.</p>
                                    <Link href="/mis-inscripciones" className="text-green-700 hover:text-green-900 font-medium underline text-sm">
                                        Ver mis inscripciones
                                    </Link>
                                </div>
                            ) : rifa.estado !== 'activa' ? (
                                <div className="bg-gray-100 p-4 rounded-lg text-gray-500 text-center border border-gray-200 font-mono text-sm">
                                    SORTEO_NO_ACTIVO
                                </div>
                            ) : rifa._count.participantes >= rifa.capacidad_maxima ? (
                                <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center border border-red-200 font-mono text-sm">
                                    SOLD_OUT
                                </div>
                            ) : (
                                <InscripcionForm rifaId={rifa.id} isProfileComplete={isProfileComplete} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
