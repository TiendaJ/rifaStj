import prisma from '@/lib/prisma';
import Link from 'next/link';
import RifaCard from '@/components/RifaCard';

// Revalidate every minute to keep the list fresh
export const revalidate = 60;

export default async function HomePage() {
  // Fetch only active rifas (estado === 'activa')
  const rifas = await prisma.rifa.findMany({
    where: { estado: 'activa' },
    orderBy: { created_at: 'desc' },
    include: {
      _count: {
        select: { participantes: true },
      },
    },
  });

  return (
    <div className="space-y-12 md:space-y-16 px-4 md:px-0">
      {/* Hero section - Centered, high contrast, minimal */}
      <section className="max-w-4xl mx-auto text-center pt-4 md:pt-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 md:mb-4 tracking-tighter text-black">
          Jshop
        </h1>
        <p className="text-base md:text-lg text-gray-500 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
          Las rifas tienen cupos limitados según el valor del premio. Participas realizando el pago. Recibirás por WhatsApp el enlace de la transmisión.
        </p>

      </section>

      {/* Grid of active rifas */}
      <section id="rifas" className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 border-b border-gray-200 pb-4 gap-2 md:gap-0">
          <h2 className="text-2xl font-bold tracking-tight">Rifas Activas</h2>
          <span className="text-xs md:text-sm text-gray-500 font-mono">LIVE_STATUS: ACTIVE</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rifas.map((rifa) => (
            <RifaCard key={rifa.id} rifa={rifa} />
          ))}
          {rifas.length === 0 && (
            <div className="col-span-full text-center py-12 md:py-20 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 font-mono">NO_ACTIVE_RAFFLES_FOUND</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
