import prisma from '@/lib/prisma';
import Link from 'next/link';
import RifaCard from '@/components/RifaCard';

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

                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rifas.map((rifa) => (
                        <RifaCard key={rifa.id} rifa={rifa} />
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
