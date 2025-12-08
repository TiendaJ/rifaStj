'use client';

import { MessageCircle } from 'lucide-react';

interface ProductActionsProps {
    whatsappLink: string;
    cantidad: number;
}

export default function ProductActions({ whatsappLink, cantidad }: ProductActionsProps) {
    return (
        <div className="flex flex-col gap-4 fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:static md:bg-transparent md:border-0 md:shadow-none md:p-0 z-20">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2 md:mb-2">
                <span>Disponibilidad:</span>
                <span className={cantidad > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {cantidad > 0 ? 'Disponible' : 'Agotado'}
                </span>
            </div>

            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-3 md:py-4 px-6 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${cantidad > 0
                    ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
                onClick={(e) => {
                    if (cantidad <= 0) e.preventDefault();
                }}
            >
                <MessageCircle size={24} />
                <span className="md:inline">{cantidad > 0 ? 'Comprar por WhatsApp' : 'No disponible'}</span>
            </a>
            <p className="text-center text-xs text-gray-400 mt-0 md:mt-2 hidden md:block">
                Serás redirigido a WhatsApp para coordinar la compra.
            </p>
        </div>
    );
}
