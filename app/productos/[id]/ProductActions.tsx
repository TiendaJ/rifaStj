'use client';

import { MessageCircle, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';

interface ProductActionsProps {
    whatsappLink: string;
    product: any; // Using any for simplicity as per existing pattern
}

export default function ProductActions({ whatsappLink, product }: ProductActionsProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);
        // Simulate loading state for feedback
        setTimeout(() => setIsAdding(false), 500);
    };

    if (product.cantidad <= 0) {
        return (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:static md:bg-transparent md:border-0 md:p-0 md:z-auto">
                <button disabled className="w-full py-4 px-6 rounded-full md:rounded-sm font-bold uppercase tracking-wider text-sm md:text-base bg-gray-200 text-gray-500 cursor-not-allowed flex items-center justify-center gap-2">
                    <span>Agotado</span>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:static md:bg-transparent md:border-0 md:p-0 md:z-auto">
            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full md:rounded-sm font-bold uppercase tracking-wider text-sm md:text-base bg-black text-white hover:bg-gray-800 transition-all transform active:scale-[0.98] shadow-xl shadow-black/10"
                    >
                        <ShoppingBag size={18} />
                        <span>{isAdding ? 'Agregando...' : 'Agregar al Carrito'}</span>
                    </button>

                    {/* Direct Buy (Optional, or keep as secondary) */}
                    {/* For now, just Add to Cart is enough to fix the flow, but let's keep a Buy Now link as secondary */}
                </div>

                {/* Secondary Actions Row */}
                <div className="flex gap-2">
                    <Link
                        href={`/checkout?productId=${product.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full md:rounded-sm font-bold uppercase tracking-wider text-xs md:text-sm border-2 border-black text-black hover:bg-gray-50 transition-colors"
                    >
                        <span>Comprar Ahora</span>
                    </Link>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full md:rounded-sm font-bold uppercase tracking-wider text-xs md:text-sm border-2 border-gray-200 hover:border-black text-black transition-colors"
                    >
                        <MessageCircle size={18} />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
