import prisma from '@/lib/prisma';
import InscripcionesTable from '@/components/admin/InscripcionesTable';

export const revalidate = 0; // Ensure fresh data on every request

export default async function AdminInscripcionesPage() {
    const inscripciones = await prisma.rifaParticipante.findMany({
        include: {
            rifa: true,
            participante: true,
        },
        orderBy: { created_at: 'desc' },
    });

    const rifas = await prisma.rifa.findMany({
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Inscripciones</h2>
                <div className="text-sm text-gray-500">
                    Total: {inscripciones.length}
                </div>
            </div>

            <InscripcionesTable inscripciones={inscripciones} rifas={rifas} />
        </div>
    );
}
