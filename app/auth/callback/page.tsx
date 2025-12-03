'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import { googleLogin } from '@/app/actions/auth';

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get('next');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleAuth = async () => {
            // Supabase client automatically handles the hash fragment
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Auth error:', error);
                setError(error.message);
                return;
            }

            if (session?.user) {
                const { user } = session;
                const email = user.email;
                const id = user.id;
                const nombre = user.user_metadata.full_name || user.user_metadata.name || '';

                if (email) {
                    // Call server action to sync user and set cookie
                    const result = await googleLogin({ email, id, nombre });

                    if (result.success) {
                        const storedNext = localStorage.getItem('auth_next');
                        if (storedNext) localStorage.removeItem('auth_next');
                        router.push(next || storedNext || '/mis-inscripciones');
                    } else {
                        setError('Error al iniciar sesión en el servidor.');
                    }
                } else {
                    setError('No se pudo obtener el email de Google.');
                }
            } else {
                // If no session found, maybe redirect to login
                // But wait a bit as sometimes it takes a moment for the client to process the hash
                const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
                    if (event === 'SIGNED_IN' && session?.user) {
                        const { user } = session;
                        const email = user.email;
                        const id = user.id;
                        const nombre = user.user_metadata.full_name || user.user_metadata.name || '';

                        if (email) {
                            const result = await googleLogin({ email, id, nombre });
                            if (result.success) {
                                const storedNext = localStorage.getItem('auth_next');
                                if (storedNext) localStorage.removeItem('auth_next');
                                router.push(next || storedNext || '/mis-inscripciones');
                            }
                        }
                    }
                });

                return () => subscription.unsubscribe();
            }
        };

        handleAuth();
    }, [router, next]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-red-600 text-xl font-bold mb-4">Error de Autenticación</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="btn-primary"
                    >
                        Volver al Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Verificando sesión...</h2>
                <p className="text-gray-500 mt-2">Por favor espera un momento</p>
            </div>
        </div>
    );
}
