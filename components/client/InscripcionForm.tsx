'use client';

import { inscribirse } from '@/app/actions/inscripcion';
import { useActionState } from 'react';

export default function InscripcionForm({ rifaId }: { rifaId: string }) {
    const [state, action, pending] = useActionState(inscribirse, undefined);

    return (
        <form action={action} className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">METODO DE PAGO</h3>

            <div className="mb-4">
                <div className="flex flex-row items-center gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src="/qr-placeholder.svg"
                            alt="QR Yape/Plin"
                            className="w-24 h-24 object-contain border-2 border-white shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="flex-grow text-left">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Pagos vía Yape / Plin</p>
                        <div className="flex gap-2 mb-1">
                            <div className="bg-purple-600 text-white px-2 py-0.5 rounded font-bold text-[10px]">Yape</div>
                            <div className="bg-cyan-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">Plin</div>
                        </div>
                        <p className="font-bold text-sm text-gray-800">Jshop S.A.C.</p>
                        <p className="text-xs text-gray-500 font-mono">999-999-999</p>
                    </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-2 mt-2">
                    <p className="font-semibold text-gray-700">Pasos:</p>
                    <ol className="list-decimal list-inside space-y-0.5 ml-1">
                        <li>Escanea QR o usa número.</li>
                        <li>Paga monto exacto.</li>
                        <li>Sube captura.</li>
                    </ol>
                </div>
            </div>

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
