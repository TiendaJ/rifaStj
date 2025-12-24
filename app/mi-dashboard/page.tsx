import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import Link from 'next/link';

import DashboardTabs from '@/components/client/DashboardTabs';

import { getPedidosByParticipante } from '@/app/actions/pedidos';

export default async function ClientDashboardPage() {
    const session = await getSession();
    if (!session) return null; // Middleware handles redirect

    const user = await prisma.participante.findUnique({
        where: { id: session.id }
    });

    const [inscripciones, pedidosResult] = await Promise.all([
        prisma.rifaParticipante.findMany({
            where: { participante_id: session.id },
            include: { rifa: true },
            orderBy: { created_at: 'desc' },
        }),
        getPedidosByParticipante(session.id)
    ]);

    const pedidos = pedidosResult.success ? pedidosResult.data : [];

    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 gap-4 md:gap-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Mi Dashboard</h1>
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

                <DashboardTabs inscripciones={inscripciones} user={user} pedidos={pedidos} />
            </div>
        </div>
    );
}
