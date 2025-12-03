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
    <div className="space-y-16">
      {/* Hero section - Centered, high contrast, minimal */}
      <section className="max-w-4xl mx-auto text-center pt-12">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tighter text-black">
          RifaManía
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          La plataforma de rifas más avanzada. Participa en sorteos exclusivos con una experiencia de usuario inigualable.
        </p>

      </section>

      {/* Grid of active rifas */}
      <section id="rifas" className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight">Rifas Activas</h2>
          <span className="text-sm text-gray-500 font-mono">LIVE_STATUS: ACTIVE</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rifas.map((rifa) => (
            <RifaCard key={rifa.id} rifa={rifa} />
          ))}
          {rifas.length === 0 && (
            <div className="col-span-full text-center py-20 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 font-mono">NO_ACTIVE_RAFFLES_FOUND</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
