'use client';

import { MessageCircle, Heart } from 'lucide-react';

interface ProductActionsProps {
    whatsappLink: string;
    cantidad: number;
}

export default function ProductActions({ whatsappLink, cantidad }: ProductActionsProps) {
    return (
        <div className="flex flex-col gap-3 fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:static md:bg-transparent md:border-0 md:p-0 md:z-auto">
            <div className="flex gap-2">
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full md:rounded-sm font-bold uppercase tracking-wider text-sm md:text-base transition-all transform active:scale-[0.98] ${cantidad > 0
                            ? 'bg-black text-white hover:bg-gray-900 shadow-xl shadow-black/10'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    onClick={(e) => {
                        if (cantidad <= 0) e.preventDefault();
                    }}
                >
                    <MessageCircle size={20} />
                    <span>{cantidad > 0 ? 'Comprar por WhatsApp' : 'Agotado'}</span>
                </a>

                <button className="hidden md:flex items-center justify-center w-14 aspect-square bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors">
                    <Heart size={24} className="text-gray-900" />
                </button>
            </div>

            {/* Mobile-only stock indicator if needed, or keep it clean */}
            {cantidad <= 0 && (
                <p className="md:hidden text-center text-xs text-red-600 font-bold uppercase tracking-wider">
                    Producto Agotado
                </p>
            )}
        </div>
    );
}
