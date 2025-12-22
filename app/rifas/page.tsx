import prisma from '@/lib/prisma';
import Link from 'next/link';
import RifaCard from '@/components/RifaCard';
import { Ticket } from 'lucide-react';

export const dynamic = 'force-dynamic';

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
        <div className="min-h-screen bg-white pb-20">
            {/* Header Section */}
            <div className="bg-black text-white py-16 md:py-24 px-6 text-center mb-8 md:mb-12">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                    Participa y Gana
                </h1>
                <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto font-medium uppercase tracking-widest">
                    Premios exclusivos. Cupos limitados.
                </p>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                {/* Filter/Header Bar (Optional, simpler for now) */}
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-black">
                        {rifas.length} {rifas.length === 1 ? 'Rifa Activa' : 'Rifas Activas'}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {rifas.map((rifa) => (
                        <RifaCard key={rifa.id} rifa={rifa} />
                    ))}

                    {rifas.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-32 bg-gray-50 text-gray-400">
                            <Ticket size={48} className="mb-4 opacity-20" />
                            <p className="font-bold uppercase tracking-widest">No hay eventos activos</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
