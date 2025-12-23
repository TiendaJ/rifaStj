'use client';

import { useCart } from '@/app/context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function CartDrawer() {
    const { isCartOpen, toggleCart, items, removeFromCart, cartTotal } = useCart();
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (isCartOpen && e.key === 'Escape') {
                toggleCart();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isCartOpen, toggleCart]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
            >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                    <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                        <ShoppingBag size={20} />
                        Tu Carrito
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p>Tu carrito está vacío</p>
                            <button
                                onClick={toggleCart}
                                className="text-black font-bold underline"
                            >
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        items.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{item.nombre}</h3>
                                        <p className="text-xs text-gray-500">Cantidad: {item.cantidad}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm font-bold">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-gray-600">Subtotal</span>
                            <span className="text-xl font-bold text-gray-900">S/ {cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/cart"
                                onClick={toggleCart}
                                className="flex-1 py-3 px-4 border border-black text-black text-center font-bold uppercase tracking-wider text-sm hover:bg-gray-100 transition-colors"
                            >
                                Ver Carrito
                            </Link>
                            <Link
                                href="/checkout"
                                onClick={toggleCart}
                                className="flex-1 py-3 px-4 bg-black text-white text-center font-bold uppercase tracking-wider text-sm hover:bg-gray-900 transition-colors shadow-lg"
                            >
                                Pagar Ahora
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
