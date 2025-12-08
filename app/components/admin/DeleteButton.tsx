'use client';

import { useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteButtonProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (id: string, ...args: any[]) => Promise<any>;
    id: string;
    className?: string;
    withText?: boolean;
    label?: string;
}

export default function DeleteButton({ action, id, className = "", withText = true, label = "Eliminar" }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de eliminar este elemento?')) return;

        startTransition(async () => {
            try {
                await action(id);
            } catch (error) {
                console.error("Error deleting:", error);
                alert("Error al eliminar");
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className={`flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 ${className}`}
            title="Eliminar"
        >
            {isPending ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Trash2 size={16} />
            )}
            {withText && <span className="text-sm font-medium">Eliminar</span>}
        </button>
    );
}
