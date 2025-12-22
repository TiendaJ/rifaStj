'use client';

import { ShoppingBag, Play } from 'lucide-react';

interface ProductMediaGalleryProps {
    nombre: string;
    fotos: string[];
    videos?: string[];
    isSoldOut: boolean;
}

export default function ProductMediaGallery({ nombre, fotos, videos = [], isSoldOut }: ProductMediaGalleryProps) {
    const allMedia = [
        ...videos.map(src => ({ type: 'video' as const, src })),
        ...fotos.map(src => ({ type: 'image' as const, src }))
    ];

    if (allMedia.length === 0) {
        return (
            <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center text-gray-300">
                <ShoppingBag size={64} opacity={0.2} />
                {isSoldOut && (
                    <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">Agotado</div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            {/* Mobile Carousel (Horizontal Scroll) */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 gap-2 pb-4">
                {allMedia.map((media, idx) => (
                    <div key={idx} className="flex-none w-[85vw] aspect-[3/4] snap-center relative rounded-lg overflow-hidden bg-gray-100">
                        {media.type === 'image' ? (
                            <img
                                src={media.src}
                                alt={`${nombre} - ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full relative">
                                <video
                                    src={media.src}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-black/50 text-white p-1 rounded-full">
                                    <Play size={16} />
                                </div>
                            </div>
                        )}
                        {isSoldOut && idx === 0 && (
                            <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">Agotado</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Desktop Grid (2 columns or Full Width Stack) */}
            <div className="hidden md:grid grid-cols-2 gap-2">
                {allMedia.map((media, idx) => (
                    <div
                        key={idx}
                        className="relative bg-gray-50 overflow-hidden col-span-1 aspect-[3/4]"
                    >
                        {media.type === 'image' ? (
                            <img
                                src={media.src}
                                alt={`${nombre} - ${idx}`}
                                className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-in-out"
                                loading={idx < 2 ? "eager" : "lazy"}
                            />
                        ) : (
                            <video
                                src={media.src}
                                controls
                                className="w-full h-full object-cover"
                            />
                        )}
                        {idx === 0 && isSoldOut && (
                            <div className="absolute top-4 left-4 bg-white text-black px-4 py-2 text-sm font-bold uppercase tracking-wider shadow-sm z-10">
                                Agotado
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
