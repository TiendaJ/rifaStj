import RifaForm from '@/components/admin/RifaForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditRifaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const rifa = await prisma.rifa.findUnique({
        where: { id },
    });

    if (!rifa) {
        notFound();
        return null;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Editar Rifa</h2>
            <RifaForm rifa={rifa} />
        </div>
    );
}

