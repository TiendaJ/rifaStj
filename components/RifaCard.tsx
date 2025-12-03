'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Play, X, Copy, Check } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface RifaCardProps {
    rifa: {
        id: string;
        nombre: string;
        monto: number;
        imagen: string | null;
        capacidad_maxima: number;
        _count: {
            participantes: number;
        };
    };
}

export default function RifaCard({ rifa }: RifaCardProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const router = useRouter();
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
        setIsLoadingAuth(true);

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            router.push(`/rifas/${rifa.id}`);
        } else {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=/rifas/${rifa.id}`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
            if (error) {
                console.error("Auth error:", error);
                setIsLoadingAuth(false);
            }
        }
    };

    return (
        <>
            <div className="card-tech group block h-full relative">
                <Link href={`/rifas/${rifa.id}`} className="block">
                    {rifa.imagen ? (
                        <div className="aspect-video w-full overflow-hidden rounded-md mb-4 bg-gray-100 border border-gray-100 relative">
                            <img
                                src={rifa.imagen}
                                alt={rifa.nombre}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-black text-white text-lg font-bold px-3 py-1 rounded-sm font-mono z-10">
                                S/ {rifa.monto}
                            </div>
                        </div>
                    ) : (
                        <div className="aspect-video w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 border border-gray-200 relative">
                            <span className="font-mono text-xs">NO_IMAGE</span>
                        </div>
                    )}
                </Link>

                {/* Action Buttons Overlay - Moved outside Link to avoid nesting */}
                <div className="absolute top-[calc(56.25%-40px)] right-2 flex gap-2 z-10">
                    <button
                        onClick={handleOpenVideo}
                        className="bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                        title="Ver Video"
                    >
                        <Play size={16} fill="currentColor" />
                    </button>
                    <button
                        onClick={handleShare}
                        className="bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                        title="Compartir"
                    >
                        {copied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
                    </button>
                </div>

                <div>
                    <Link href={`/rifas/${rifa.id}`}>
                        <h3 className="text-lg font-bold text-black group-hover:text-gray-700 transition-colors mb-2">
                            {rifa.nombre}
                        </h3>
                    </Link>

                    <div className="flex justify-between items-center text-md font-mono text-gray-400 pt-4 border-t border-gray-100">
                        <span>ID: {rifa.id.slice(0, 8)}...</span>
                        <span>CUPOS: {rifa._count.participantes}/{rifa.capacidad_maxima}</span>
                    </div>
                    <button
                        onClick={handleParticipate}
                        disabled={isLoadingAuth}
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2.5 rounded-md font-bold text-sm uppercase tracking-wide hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform group-hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoadingAuth ? 'Redirigiendo...' : 'Participar Ahora'}
                    </button>
                </div>
            </div>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={handleCloseVideo}>
                    <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl aspect-video" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleCloseVideo}
                            className="absolute top-4 right-4 text-white/70 hover:text-white z-50 bg-black/50 rounded-full p-1"
                        >
                            <X size={24} />
                        </button>
                        <div className="w-full h-full flex items-center justify-center text-white">
                            {/* Placeholder for video - in real app would be an iframe or video tag */}
                            <div className="text-center">
                                <Play size={64} className="mx-auto mb-4 opacity-50" />
                                <p className="text-xl font-bold">Video Promocional</p>
                                <p className="text-sm text-gray-400 mt-2">Aquí se reproduciría el video de la rifa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
