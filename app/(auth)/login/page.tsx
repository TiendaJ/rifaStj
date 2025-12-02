'use client';

import { login } from '@/app/actions/auth';
import { useActionState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [state, action, pending] = useActionState(login, undefined);

    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Bienvenido</h2>
                <p className="text-gray-500 mt-2 text-sm">Ingresa a tu cuenta para continuar</p>
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

            <div className="mt-6 text-center text-sm text-gray-500">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="text-black font-medium hover:underline">
                    Regístrate aquí
                </Link>
            </div>
        </div>
    );
}
