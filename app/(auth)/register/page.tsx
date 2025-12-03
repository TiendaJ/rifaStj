'use client';

import { register } from '@/app/actions/auth';
import { useActionState } from 'react';
import Link from 'next/link';

import GoogleAuthButton from '@/components/GoogleAuthButton';

export default function RegisterPage() {
    const [state, action, pending] = useActionState(register, undefined);

    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Crear Cuenta</h2>
                <p className="text-gray-500 mt-2 text-sm">Únete para participar en las rifas</p>
            </div>

            <div className="mb-6">
                <GoogleAuthButton text="Registrarse con Google" />

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">O regístrate con</span>
                    </div>
                </div>
            </div>

            <form action={action} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        DNI
                    </label>
                    <input
                        name="dni"
                        type="text"
                        maxLength={8}
                        required
                        className="input-tech"
                        placeholder="8 dígitos"
                    />
                    {state?.error && 'dni' in state.error && (
                        <p className="text-red-500 text-xs mt-1">{state.error.dni?.[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                    </label>
                    <input
                        name="telefono"
                        type="tel"
                        required
                        className="input-tech"
                        placeholder="9 dígitos"
                    />
                    {state?.error && 'telefono' in state.error && (
                        <p className="text-red-500 text-xs mt-1">{state.error.telefono?.[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre (Opcional)
                    </label>
                    <input
                        name="nombre"
                        type="text"
                        className="input-tech"
                        placeholder="Tu nombre completo"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        name="password"
                        type="password"
                        required
                        className="input-tech"
                        placeholder="Mínimo 6 caracteres"
                    />
                    {state?.error && 'password' in state.error && (
                        <p className="text-red-500 text-xs mt-1">{state.error.password?.[0]}</p>
                    )}
                </div>

                {state?.error && 'root' in state.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                        {state.error.root?.[0]}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={pending}
                    className="btn-primary w-full mt-4"
                >
                    {pending ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-black font-medium hover:underline">
                    Inicia sesión
                </Link>
            </div>
        </div>
    );
}
