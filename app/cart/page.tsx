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
        <div className="min-h-screen bg-white text-gray-900 pb-24 font-sans">
            {/* Minimal Header for Cart */}
            <div className="bg-gray-50 border-b border-gray-200 py-12 md:py-20 mb-8 md:mb-12">
                <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Tu Bolsa</h1>
                    <p className="text-gray-500 font-medium uppercase tracking-widest text-xs md:text-sm">
                        {cartCount} {cartCount === 1 ? 'Producto' : 'Productos'} seleccionados
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Items List */}
                    <div className="flex-1 space-y-8">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0 group transition-opacity hover:opacity-90">
                                <Link href={`/productos/${item.id}`} className="w-32 h-40 bg-gray-100 flex-shrink-0 overflow-hidden relative block">
                                    {item.imagen ? (
                                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <ShoppingBag size={24} />
                                        </div>
                                    )}
                                </Link>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <Link href={`/productos/${item.id}`} className="block">
                                            <h3 className="font-bold text-lg md:text-xl uppercase tracking-visible leading-tight text-black hover:text-gray-600 transition-colors">
                                                {item.nombre}
                                            </h3>
                                        </Link>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-black transition-colors p-1"
                                            aria-label="Eliminar producto"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-auto">
                                        Precio Unitario: S/ {item.precio.toFixed(2)}
                                    </p>

                                    <div className="flex items-end justify-between mt-4">
                                        <div className="bg-gray-50 border border-gray-200 px-3 py-1 flex items-center gap-4 rounded-sm">
                                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Cant</span>
                                            <span className="font-bold text-black">{item.cantidad}</span>
                                        </div>
                                        <p className="font-bold text-xl text-black">
                                            S/ {(item.precio * item.cantidad).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:w-[400px] flex-shrink-0">
                        <div className="bg-white border text-black border-gray-200 p-8 sticky top-24 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h2 className="text-xl font-bold uppercase tracking-wider mb-8 flex items-center gap-2">
                                Resumen del Pedido
                            </h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-black">S/ {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                                    <span>Envío</span>
                                    <span className="text-xs uppercase font-bold text-gray-400">Calculado al pagar</span>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-300 pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-base font-bold uppercase tracking-wider text-black">Total Estimado</span>
                                    <span className="text-3xl font-black tracking-tighter text-black">S/ {cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wider">
                                    Precios incluyen IGV.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href="/checkout"
                                    className="w-full bg-black text-white px-6 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-3 group"
                                >
                                    <span>Checkout Seguro</span>
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </Link>

                                <div className="grid grid-cols-3 gap-2">
                                    <div className="h-8 bg-gray-100 rounded-sm flex items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all">
                                        {/* Visa Placeholder */}
                                        <div className="w-8 h-4 bg-gray-300 rounded-[2px]"></div>
                                    </div>
                                    <div className="h-8 bg-gray-100 rounded-sm flex items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all">
                                        {/* MC Placeholder */}
                                        <div className="w-8 h-4 bg-gray-300 rounded-[2px] relative"><div className="absolute left-0 w-4 h-4 rounded-full bg-gray-400"></div><div className="absolute right-0 w-4 h-4 rounded-full bg-gray-400/80"></div></div>
                                    </div>
                                    <div className="h-8 bg-gray-100 rounded-sm flex items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all">
                                        {/* Amex Placeholder */}
                                        <div className="w-8 h-4 bg-gray-300 rounded-[2px] border-2 border-gray-400"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                <Link href="/productos" className="inline-block text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">
                                    Continuar comprando
                                </Link>
                            </div>
                        </div>

                        {/* Trust Factors */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="text-center p-4">
                                <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Envío Seguro</h4>
                                <p className="text-[10px] text-gray-500 leading-tight">Garantizado a todo el Perú</p>
                            </div>
                            <div className="text-center p-4">
                                <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Soporte 24/7</h4>
                                <p className="text-[10px] text-gray-500 leading-tight">Atención personalizada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
