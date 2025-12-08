import prisma from '@/lib/prisma';
import Link from 'next/link';
import { deleteParticipante } from '@/app/actions/participante';
import DeleteButton from '@/app/components/admin/DeleteButton';

export default async function ParticipantesListPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;

    const where = q ? {
        OR: [
            { dni: { contains: q } },
            { telefono: { contains: q } },
            { nombre: { contains: q } },
            { email: { contains: q } },
        ]
    } : {};

    const participantes = await prisma.participante.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take: 50, // Limit for performance
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Participantes</h2>
                <Link href="/admin/participantes/new" className="btn-primary">
                    Nuevo Participante
                </Link>
            </div>

            {/* Search Bar */}
            <form className="flex gap-2">
                <input
                    name="q"
                    defaultValue={q}
                    placeholder="Buscar por DNI, Teléfono o Nombre..."
                    className="flex-1 input-tech"
                />
                <button type="submit" className="btn-secondary">
                    Buscar
                </button>
            </form>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">DNI</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Nombre</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Teléfono</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Email</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Ubicación</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Estado</th>
                            <th className="p-4 font-medium text-xs uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {participantes.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-mono text-sm text-gray-600">{p.dni}</td>
                                <td className="p-4 text-gray-900 font-medium">{p.nombre || '-'}</td>
                                <td className="p-4 text-gray-500 text-sm">{p.telefono}</td>
                                <td className="p-4 text-gray-500 text-sm">{p.email || '-'}</td>
                                <td className="p-4 text-gray-500 text-sm">
                                    {p.distrito ? `${p.distrito}, ${p.provincia}` : '-'}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${p.estado_cuenta === 'activo' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                        {p.estado_cuenta.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <Link href={`/admin/participantes/${p.id}`} className="text-black hover:text-gray-600 text-sm font-medium">
                                        Editar
                                    </Link>
                                    <DeleteButton action={deleteParticipante} id={p.id} label="Bloquear" />
                                </td>
                            </tr>
                        ))}
                        {participantes.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500">
                                    No se encontraron participantes.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
