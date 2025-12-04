'use client';

import { updateProfile } from '@/app/actions/user';
import { useActionState } from 'react';
import LocationSearcher from '@/components/LocationSearcher';

type UserProfileProps = {
    user: {
        nombre?: string | null;
        dni?: string | null;
        telefono?: string | null;
        email?: string | null;
        direccion?: string | null;
        departamento?: string | null;
        provincia?: string | null;
        distrito?: string | null;
    }
};

export default function UserProfileForm({ user }: UserProfileProps) {
    const [state, action, pending] = useActionState(updateProfile, undefined);

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Mi Perfil</h2>

            <form action={action} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                            type="text"
                            value={user.nombre || ''}
                            disabled
                            className="input-tech w-full bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">El nombre no se puede cambiar.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                        <input
                            name="dni"
                            defaultValue={user.dni || ''}
                            maxLength={8}
                            required
                            className="input-tech w-full"
                            placeholder="12345678"
                        />
                        {state?.error && 'dni' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.dni?.[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                            name="telefono"
                            type="tel"
                            defaultValue={user.telefono || ''}
                            required
                            className="input-tech w-full"
                            placeholder="999999999"
                        />
                        {state?.error && 'telefono' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.telefono?.[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue={user.email || ''}
                            className="input-tech w-full"
                            placeholder="tu@email.com"
                        />
                        {state?.error && 'email' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.email?.[0]}</p>}
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Dirección de Envío</h3>
                    <div className="space-y-6">
                        <LocationSearcher
                            defaultDep={user.departamento}
                            defaultProv={user.provincia}
                            defaultDist={user.distrito}
                        />
                        {state?.error && 'distrito' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.distrito?.[0]}</p>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Exacta</label>
                            <input
                                name="direccion"
                                defaultValue={user.direccion || ''}
                                required
                                className="input-tech w-full"
                                placeholder="Av. Principal 123..."
                            />
                            {state?.error && 'direccion' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.direccion?.[0]}</p>}
                        </div>
                    </div>
                </div>

                {state?.error && 'root' in state.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                        {state.error.root?.[0]}
                    </div>
                )}

                {state?.success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm text-center">
                        Perfil actualizado correctamente.
                    </div>
                )}

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={pending}
                        className="btn-primary"
                    >
                        {pending ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}
