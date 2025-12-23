'use client';

import { login } from '@/app/actions/auth';
import { useActionState } from 'react';
import Link from 'next/link';

import GoogleAuthButton from '@/components/GoogleAuthButton';

export default function LoginPage() {
    const [state, action, pending] = useActionState(login, undefined);

    return (
        <div className="max-w-md mx-auto pt-20 pb-20 px-6">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">Bienvenido</h2>
                <p className="text-gray-500 font-medium text-sm md:text-base">Accede a tu cuenta en Jshop</p>
            </div>

            <div className="mb-8">
                <GoogleAuthButton text="Continuar con Google" />

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                        <span className="px-4 bg-white text-gray-400">O usa tu DNI</span>
                    </div>
                </div>
            </div>

            <form action={action} className="space-y-6">
                <input type="hidden" name="next" value={new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('next') || ''} />
                <div>
                    <label htmlFor="identifier" className="block text-xs font-bold text-black uppercase tracking-wide mb-2">
                        DNI o Celular
                    </label>
                    <input
                        id="identifier"
                        name="identifier"
                        type="text"
                        disabled={pending}
                        className="w-full bg-[#f5f5f5] text-black border-none px-4 py-4 font-bold outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400 placeholder:font-medium uppercase tracking-wide"
                        placeholder="INGRESA TUS DATOS"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-xs font-bold text-black uppercase tracking-wide mb-2">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        disabled={pending}
                        className="w-full bg-[#f5f5f5] text-black border-none px-4 py-4 font-bold outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400 placeholder:font-medium"
                        placeholder="••••••••"
                    />
                </div>
                {state?.error && "root" in state.error && (
                    <div className="p-4 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wide text-center">
                        {state.error.root?.[0]}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-black text-white font-black uppercase tracking-widest py-4 hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                    {pending ? 'CARGANDO...' : 'INICIAR SESIÓN'}
                </button>
            </form>
        </div>
    );
}
