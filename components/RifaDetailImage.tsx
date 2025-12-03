'use client';

import { useState } from 'react';
import { Share2, Play, X, Check } from 'lucide-react';

interface RifaDetailImageProps {
    imagen: string | null;
    nombre: string;
    id: string;
}

export default function RifaDetailImage({ imagen, nombre, id }: RifaDetailImageProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const url = `${window.location.origin}/rifas/${id}`;

        if (navigator.share) {
            navigator.share({
                title: nombre,
                text: `¡Participa en la rifa ${nombre}!`,
                url: url,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const handleOpenVideo = () => {
        setIsVideoOpen(true);
    };

    const handleCloseVideo = () => {
        setIsVideoOpen(false);
    };

    return (
        <>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video relative group">
                {imagen ? (
                    <img src={imagen} alt={nombre} className="w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-sm">
                        NO_IMAGE_AVAILABLE
                    </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute bottom-4 right-4 flex gap-3 z-10">
                    <button
                        onClick={handleOpenVideo}
                        className="bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                        title="Ver Video"
                    >
                        <Play size={20} fill="currentColor" />
                    </button>
                    <button
                        onClick={handleShare}
                        className="bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                        title="Compartir"
                    >
                        {copied ? <Check size={20} className="text-green-600" /> : <Share2 size={20} />}
                    </button>
                </div>
            </div>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={handleCloseVideo}>
                    <div className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl aspect-video" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleCloseVideo}
                            className="absolute top-4 right-4 text-white/70 hover:text-white z-50 bg-black/50 rounded-full p-2"
                        >
                            <X size={24} />
                        </button>
                        <div className="w-full h-full flex items-center justify-center text-white">
                            {/* Placeholder for video */}
                            <div className="text-center">
                                <Play size={80} className="mx-auto mb-6 opacity-50" />
                                <p className="text-2xl font-bold">Video Promocional</p>
                                <p className="text-gray-400 mt-2">Aquí se reproduciría el video de la rifa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
