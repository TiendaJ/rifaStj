import prisma from '@/lib/prisma';
import Link from 'next/link';

// Revalidate every minute to keep the list fresh
export const revalidate = 60;

export default async function HomePage() {
  // Fetch only active rifas (estado === 'activa')
  const rifas = await prisma.rifa.findMany({
    where: { estado: 'activa' },
    orderBy: { created_at: 'desc' },
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
            <Link
              key={rifa.id}
              href={`/rifas/${rifa.id}`}
              className="card-tech group block h-full"
            >
              {rifa.imagen ? (
                <div className="aspect-video w-full overflow-hidden rounded-md mb-4 bg-gray-100 border border-gray-100 relative">
                  <img
                    src={rifa.imagen}
                    alt={rifa.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-sm font-mono">
                    ${rifa.monto}
                  </div>
                </div>
              ) : (
                <div className="aspect-video w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 border border-gray-200">
                  <span className="font-mono text-xs">NO_IMAGE</span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-black group-hover:text-gray-700 transition-colors mb-2">
                  {rifa.nombre}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                  {rifa.descripcion}
                </p>
                <div className="flex justify-between items-center text-xs font-mono text-gray-400 pt-4 border-t border-gray-100">
                  <span>ID: {rifa.id.slice(0, 8)}...</span>
                  <span>CUPOS: {rifa.capacidad_maxima}</span>
                </div>
                <div className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2.5 rounded-md font-bold text-sm uppercase tracking-wide hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform group-hover:-translate-y-0.5">
                  Participar Ahora
                </div>
              </div>
            </Link>
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
