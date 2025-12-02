import ParticipanteForm from '@/components/admin/ParticipanteForm';

export default function NewParticipantePage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Nuevo Participante</h2>
            <ParticipanteForm />
        </div>
    );
}
