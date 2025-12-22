'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Play, X, Check } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { checkAuth } from '@/app/actions/auth';

interface RifaCardProps {
    rifa: {
        id: string;
        nombre: string;
        descripcion: string;
        monto: number;
        precio_producto?: number | null;
        imagen: string | null;
        capacidad_maxima: number;
        fecha_sorteo: string | Date | null;
        _count: {
            participantes: number;
        };
    };
}

export default function RifaCard({ rifa }: RifaCardProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const url = `${window.location.origin}/rifas/${rifa.id}`;

        if (navigator.share) {
            navigator.share({
                title: rifa.nombre,
                text: `¡Participa en la rifa ${rifa.nombre}!`,
                url: url,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const handleOpenVideo = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVideoOpen(true);
    };

    const handleCloseVideo = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVideoOpen(false);
    };

    const handleParticipate = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoadingAuth) return;

        setIsLoadingAuth(true);

        try {
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                throw new Error("Falta configuración de Supabase (URL)");
            }

            let isLoggedIn = false;
            try {
                isLoggedIn = await checkAuth();
            } catch (err) {
                isLoggedIn = false;
            }

            if (isLoggedIn) {
                window.location.href = `/rifas/${rifa.id}`;
            } else {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('auth_next', `/rifas/${rifa.id}`);
                }

                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: `${window.location.origin}/auth/callback`,
                        queryParams: {
                            access_type: 'offline',
                            prompt: 'consent',
                        },
                    },
                });
                if (error) throw error;
            }
        } catch (error: any) {
            alert(`Error al iniciar sesión: ${error.message || error}`);
            setIsLoadingAuth(false);
        }
    };

    const percent = Math.round((rifa._count.participantes / rifa.capacidad_maxima) * 100);

    return (
        <>
            <div className="group flex flex-col h-full">
                {/* Image Container */}
                <Link href={`/rifas/${rifa.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
                    {rifa.imagen ? (
                        <img
                            src={rifa.imagen}
                            alt={rifa.nombre}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold tracking-widest uppercase">
                            Sin Imagen
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                        <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 uppercase tracking-wider">
                            S/ {rifa.monto}
                        </span>
                    </div>

                    {/* Actions Overlay (Video/Share) */}
                    <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={handleOpenVideo} className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Play size={16} fill="currentColor" />
                        </button>
                        <button onClick={handleShare} className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
                            {copied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
                        </button>
                    </div>
                </Link>

                {/* Info */}
                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-black uppercase tracking-tight leading-tight group-hover:text-gray-600 transition-colors line-clamp-2">
                            {rifa.nombre}
                        </h3>
                    </div>

                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        {rifa.fecha_sorteo ? `Sorteo: ${new Date(rifa.fecha_sorteo).toLocaleDateString()}` : 'Fecha pendiente'}
                    </div>

                    {/* Progress Bar Minimalist */}
                    <div className="w-full bg-gray-100 h-1 mb-2 overflow-hidden">
                        <div className="bg-black h-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                        <span>{rifa._count.participantes} Vendidos</span>
                        <span>{rifa.capacidad_maxima} Total</span>
                    </div>

                    <button
                        onClick={handleParticipate}
                        disabled={isLoadingAuth}
                        className="mt-auto w-full bg-black text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoadingAuth ? '...' : 'Participar'}
                    </button>
                </div>
            </div>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4" onClick={handleCloseVideo}>
                    <div className="relative w-full max-w-5xl bg-black overflow-hidden shadow-2xl aspect-video" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleCloseVideo}
                            className="absolute top-4 right-4 text-white z-50 bg-black/20 hover:bg-black/50 rounded-full p-2 transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <div className="w-full h-full flex items-center justify-center">
                            {/* Placeholder Video */}
                            <div className="text-center text-white">
                                <Play size={80} className="mx-auto mb-6 opacity-80" />
                                <h3 className="text-2xl font-bold uppercase tracking-widest">Video Promocional</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
