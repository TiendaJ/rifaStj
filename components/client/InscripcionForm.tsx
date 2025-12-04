'use client';

import { inscribirse } from '@/app/actions/inscripcion';
import { useActionState, useState } from 'react';

import CompleteProfileModal from './CompleteProfileModal';
import { useRouter } from 'next/navigation';

export default function InscripcionForm({ rifaId, isProfileComplete }: { rifaId: string, isProfileComplete: boolean }) {
    const [state, action, pending] = useActionState(inscribirse, undefined);
    const [copied, setCopied] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleCopy = () => {
        navigator.clipboard.writeText('951 381 439');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (!isProfileComplete) {
            e.preventDefault();
            setShowModal(true);
        }
    };

    return (
        <>
            <CompleteProfileModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={() => {
                    setShowModal(false);
                    router.refresh();
                }}
            />
            <form action={action} onSubmit={handleSubmit} className="space-y-6">
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
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm font-mono font-bold text-gray-700">951 381 439</p>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded border border-gray-300 transition-colors flex items-center gap-1"
                                >
                                    {copied ? (
                                        <span className="text-green-600 font-bold">¡Copiado!</span>
                                    ) : (
                                        <>
                                            <span>Copiar</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
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
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-[1.02] text-lg active:scale-95"
                >
                    {pending ? 'Enviando...' : 'Confirmar Inscripción'}
                </button>
            </form>
        </>
    );
}
// Force Vercel deployment update
