'use client';

import { useState } from 'react';
import { ShoppingBag, Play, Image as ImageIcon } from 'lucide-react';

interface ProductMediaGalleryProps {
    nombre: string;
    fotos: string[];
    videos?: string[]; // Make it optional in case it’s missing initially
    isSoldOut: boolean;
}

export default function ProductMediaGallery({ nombre, fotos, videos = [], isSoldOut }: ProductMediaGalleryProps) {
    const allMedia = [
        ...videos.map(src => ({ type: 'video' as const, src })),
        ...fotos.map(src => ({ type: 'image' as const, src }))
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    if (allMedia.length === 0) {
        return (
            <div className="bg-gray-100 aspect-square relative flex items-center justify-center text-gray-400">
                <ShoppingBag size={64} opacity={0.2} />
                {isSoldOut && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">Agotado</span>
                    </div>
                )}
            </div>
        );
    }

    const activeMedia = allMedia[activeIndex];

    return (
        <div className="flex flex-col h-full">
            {/* Main Media Viewer */}
            <div className="bg-gray-100 aspect-square relative overflow-hidden group">
                {activeMedia.type === 'image' ? (
                    <img
                        src={activeMedia.src}
                        alt={nombre}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <video
                        src={activeMedia.src}
                        controls
                        className="w-full h-full object-contain bg-black"
                    />
                )}

                {isSoldOut && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">Agotado</span>
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {allMedia.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                    {allMedia.map((media, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-black ring-1 ring-black' : 'border-transparent hover:border-gray-300'
                                }`}
                        >
                            {media.type === 'image' ? (
                                <img src={media.src} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
                                    <video src={media.src} className="w-full h-full object-cover opacity-50 absolute inset-0" />
                                    <Play size={24} className="relative z-10" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
