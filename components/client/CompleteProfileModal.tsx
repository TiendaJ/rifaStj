'use client';

import { updateProfile } from '@/app/actions/user';
import { useActionState, useEffect } from 'react';
import LocationSearcher from '@/components/LocationSearcher';

export default function CompleteProfileModal({
    isOpen,
    onClose,
    onSuccess
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [state, action, pending] = useActionState(updateProfile, undefined);

    useEffect(() => {
        if (state?.success) {
            onSuccess();
        }
    }, [state, onSuccess]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">Completa tu Perfil</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Necesitamos algunos datos adicionales para procesar tu inscripción.
                    </p>
                </div>

                <form action={action} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="input-tech w-full"
                            placeholder="tu@email.com"
                        />
                        {state?.error && 'email' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.email?.[0]}</p>}
                    </div>

                    <div className="space-y-4">
                        <LocationSearcher />
                        {state?.error && 'distrito' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.distrito?.[0]}</p>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Exacta</label>
                            <input
                                name="direccion"
                                required
                                className="input-tech w-full"
                                placeholder="Av. Principal 123..."
                            />
                            {state?.error && 'direccion' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.direccion?.[0]}</p>}
                        </div>
                    </div>

                    {state?.error && 'root' in state.error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                            {state.error.root?.[0]}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={pending}
                            className="flex-1 btn-primary py-2"
                        >
                            {pending ? 'Guardando...' : 'Guardar y Continuar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
