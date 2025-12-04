'use client';

import { login } from '@/app/actions/auth';
import { useActionState } from 'react';
import Link from 'next/link';

import GoogleAuthButton from '@/components/GoogleAuthButton';

export default function LoginPage() {
    const [state, action, pending] = useActionState(login, undefined);

    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Bienvenido</h2>
                <p className="text-gray-500 mt-2 text-sm">Ingresa a tu cuenta para continuar</p>
            </div>

            <div className="mb-6">
                <GoogleAuthButton text="Iniciar sesión con Google" />

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">O ingresa con credenciales</span>
                    </div>
                </div>
            </div>

            <form action={action} className="space-y-6">
                <div>
                    <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                        DNI o Teléfono
                    </label>
                    <input
                        id="identifier"
                        name="identifier"
                        type="text"
                        disabled={pending}
                        className="input-tech"
                        placeholder="Ingresa tu DNI o celular"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        disabled={pending}
                        className="input-tech"
                        placeholder="••••••••"
                    />
                </div>
                {state?.error && "root" in state.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                        {state.error.root?.[0]}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={pending}
                    className="btn-primary w-full"
                >
                    {pending ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
            </form>


        </div>
    );
}
