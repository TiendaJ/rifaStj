'use client';

import { useState, useRef, MouseEvent } from 'react';
import { Play, ShoppingBag } from 'lucide-react';

interface ProductMediaGalleryProps {
    nombre: string;
    fotos: string[];
    videos?: string[];
    isSoldOut: boolean;
}

export default function ProductMediaGallery({ nombre, fotos, videos = [], isSoldOut }: ProductMediaGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const allMedia = [
        ...videos.map(src => ({ type: 'video' as const, src })),
        ...fotos.map(src => ({ type: 'image' as const, src }))
    ];

    if (allMedia.length === 0) {
        return (
            <div className="bg-[#F5F5F5] aspect-[4/5] relative flex items-center justify-center text-gray-300">
                <ShoppingBag size={64} opacity={0.2} />
                {isSoldOut && (
                    <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-wider">Agotado</div>
                )}
            </div>
        );
    }

    const activeMedia = allMedia[activeIndex];

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (activeMedia.type !== 'image') return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: 'scale(2.5)' // Increased zoom level
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({
            transformOrigin: 'center center',
            transform: 'scale(1)'
        });
    };

    return (
        <div className="flex flex-col h-full gap-4 sticky top-24">
            {/* Main Viewer */}
            <div
                className="bg-[#F5F5F5] aspect-[4/5] relative overflow-hidden cursor-crosshair group"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                ref={imageContainerRef}
            >
                {activeMedia.type === 'image' ? (
                    <img
                        src={activeMedia.src}
                        alt={nombre}
                        className="w-full h-full object-cover transition-transform duration-100 ease-out mix-blend-multiply"
                        style={zoomStyle}
                    />
                ) : (
                    <video
                        src={activeMedia.src}
                        controls
                        className="w-full h-full object-contain bg-black"
                    />
                )}

                {isSoldOut && (
                    <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-wider z-20">Agotado</div>
                )}
            </div>

            {/* Thumbnails Grid */}
            {allMedia.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                    {allMedia.map((media, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setActiveIndex(idx);
                                handleMouseLeave(); // Reset zoom on switch
                            }}
                            className={`aspect-square bg-[#F5F5F5] overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                        >
                            {media.type === 'image' ? (
                                <img src={media.src} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                            ) : (
                                <div className="w-full h-full bg-black flex items-center justify-center text-white relative">
                                    <Play size={16} className="relative z-10" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
