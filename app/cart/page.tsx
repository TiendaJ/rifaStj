'use client';

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
    const { items, removeFromCart, cartTotal, cartCount } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-white"></div>; // Prevent hydration mismatch

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-gray-400" />
                </div>
                <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Tu carrito está vacío</h1>
                <p className="text-gray-500 mb-8 max-w-sm">
                    Parece que aún no has agregado nada. Explora nuestros productos y encuentra algo increíble.
                </p>
                <Link
                    href="/productos"
                    className="bg-black text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-all"
                >
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8 md:mb-12">
                    Tu Carrito <span className="text-gray-400">({cartCount})</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 group">
                                <div className="w-24 h-24 bg-gray-50 flex-shrink-0 overflow-hidden relative">
                                    {item.imagen ? (
                                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <ShoppingBag size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg uppercase tracking-tight leading-tight pr-4">
                                                {item.nombre}
                                            </h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 mt-1">S/ {item.precio.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                                        <span>Cant: {item.cantidad}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 md:p-8 sticky top-24">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-6">Resumen</h2>

                            <div className="space-y-3 text-sm mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">S/ {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Envío</span>
                                    <span className="text-xs uppercase font-bold text-gray-400">Calculado al pagar</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-base font-bold uppercase tracking-wider">Total</span>
                                    <span className="text-2xl font-black tracking-tight">S/ {cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Impuestos incluidos si aplica.</p>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full block text-center bg-black text-white px-6 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                            >
                                <span>Proceder al Pago</span>
                                <ArrowRight size={18} />
                            </Link>

                            <div className="mt-6 text-center">
                                <Link href="/productos" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black underline decoration-gray-300">
                                    Continuar comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
