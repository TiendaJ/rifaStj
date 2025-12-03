import ParticipanteForm from '@/components/admin/ParticipanteForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditParticipantePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const participante = await prisma.participante.findUnique({
        where: { id }
    });

    if (!participante) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Editar Participante</h2>
            <ParticipanteForm participante={participante as any} />
        </div>
    );
}
