'use client';

import { inscribirse } from '@/app/actions/inscripcion';
import { useActionState } from 'react';

export default function InscripcionForm({ rifaId }: { rifaId: string }) {
    const [state, action, pending] = useActionState(inscribirse, undefined);

    return (
        <form action={action} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Inscribirse</h3>

            <input type="hidden" name="rifa_id" value={rifaId} />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comprobante de Pago
                </label>
                <input
                    name="comprobante"
                    type="file"
                    accept="image/*"
                    required
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Sube una foto clara del comprobante.</p>
            </div>

            {state?.error && 'root' in state.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                    {state.error.root?.[0]}
                </div>
            )}

            <button
                type="submit"
                disabled={pending}
                className="btn-primary w-full py-3"
            >
                {pending ? 'Enviando...' : 'Confirmar Inscripción'}
            </button>
        </form>
    );
}
