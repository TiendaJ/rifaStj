'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ShoppingBag, ChevronLeft } from 'lucide-react';

interface Product {
    id: string;
    nombre: string;
    precio: number;
    fotos: string[];
    cantidad: number;
}


import { useCart } from '@/app/context/CartContext';

export default function CheckoutClient({ product }: { product: any }) {
    const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
    const { items: cartItems, cartTotal } = useCart();

    // Determine if we are in "Direct Buy" mode or "Cart Checkout" mode
    const isDirectBuy = !!product;

    // Normalize items
    const items = isDirectBuy
        ? [{
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.fotos?.[0] || '',
            cantidad: 1,
            categoria: product.categoria?.descripcion
        }]
        : cartItems.map(item => ({
            ...item,
            // Map context item properties if names differ (they seem to match mostly)
            categoria: 'General' // Context might not have category, defaulting
        }));

    // Calculate totals
    const subtotal = isDirectBuy ? product.precio : cartTotal;
    const shipping = 0;
    const total = subtotal + shipping;

    // Form States
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    const handleWhatsAppCheckout = () => {
        if (items.length === 0) return;

        let itemsList = '';
        items.forEach(item => {
            itemsList += `• ${item.nombre} (x${item.cantidad}) - S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
        });

        const message = `*NUEVO PEDIDO WEB*\n\n` +
            `*Cliente:* ${firstName} ${lastName}\n` +
            `*Email:* ${email}\n` +
            `*Teléfono:* ${phone}\n` +
            `*Dirección:* ${address}, ${city}\n\n` +
            `*Productos:*\n${itemsList}\n` +
            `*Total a Pagar:* S/ ${total.toFixed(2)}`;

        const whatsappUrl = `https://wa.me/51951381439?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
                    <Link href="/productos" className="bg-black text-white px-6 py-3 rounded font-bold uppercase tracking-wider">
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* LEFT COLUMN: Main Content (Form) */}
                <div className="bg-white flex-1 flex flex-col order-2 lg:order-1 border-r border-gray-200">
                    <header className="px-4 py-4 lg:hidden border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                                <span className="text-sm">J</span>
                            </div>
                            <span>Jshop</span>
                        </Link>
                        <Link href="/cart" className="text-blue-600">
                            <ShoppingBag className="w-5 h-5 text-black" />
                        </Link>
                    </header>

                    {/* Mobile Order Summary Toggle */}
                    <div className="lg:hidden bg-gray-50 border-b border-gray-200 px-4 py-4">
                        <button
                            onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                            className="flex items-center justify-between w-full text-sm font-medium text-black"
                        >
                            <span className="flex items-center gap-2 text-blue-600">
                                {isOrderSummaryOpen ? 'Ocultar resumen del pedido' : 'Mostrar resumen del pedido'}
                                {isOrderSummaryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </span>
                            <span className="font-bold text-lg">S/ {total.toFixed(2)}</span>
                        </button>

                        {isOrderSummaryOpen && (
                            <div className="pt-4 mt-4 border-t border-gray-200 space-y-4 animate-in slide-in-from-top-2">
                                {items.map((item, idx) => (
                                    <div key={`${item.id}-${idx}`} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                            <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{item.cantidad}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-gray-900">{item.nombre}</h3>
                                            <p className="text-xs text-gray-500">{item.categoria}</p>
                                        </div>
                                        <div className="text-sm font-bold text-gray-900">S/ {(item.precio * item.cantidad).toFixed(2)}</div>
                                    </div>
                                ))}

                                <div className="border-t border-gray-200 my-4"></div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">S/ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Envíos</span>
                                        <span className="text-xs font-bold text-gray-500 uppercase">Calculado en el siguiente paso</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                    <span className="text-base font-bold text-gray-900">Total</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xs text-gray-500">PEN</span>
                                        <span className="text-xl font-bold text-gray-900">S/ {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 px-4 md:px-8 lg:px-14 py-8 lg:py-12 max-w-2xl mx-auto w-full">
                        {/* Desktop Logo */}
                        <div className="hidden lg:block mb-8">
                            <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                                    <span className="text-sm">J</span>
                                </div>
                                <span>Jshop</span>
                            </Link>
                        </div>

                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-8">
                            <Link href="/cart" className="text-blue-600 hover:text-blue-800">Carrito</Link>
                            <ChevronLeft size={12} className="rotate-180" />
                            <span className="text-black">Información</span>
                            <ChevronLeft size={12} className="rotate-180" />
                            <span>Envíos</span>
                            <ChevronLeft size={12} className="rotate-180" />
                            <span>Pago</span>
                        </nav>

                        {/* Contact Form */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900">Contacto</h2>
                                <Link href="/login" className="text-xs text-blue-600 underline font-medium">Inicia sesión</Link>
                            </div>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                            />

                            <div className="mt-8">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Dirección de envío</h2>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Apellido"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Dirección y número de casa"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Referencia (Opcional)"
                                        className="w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                                    />
                                    <div className="grid grid-cols-3 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Ciudad"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="col-span-1 w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Provincia"
                                            className="col-span-1 w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Código Postal"
                                            className="col-span-1 w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                                        />
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Teléfono"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                                <Link
                                    href={isDirectBuy ? `/productos/${items[0].id}` : '/cart'}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    <ChevronLeft size={16} /> Volver {isDirectBuy ? 'al producto' : 'al carrito'}
                                </Link>
                                <button
                                    onClick={handleWhatsAppCheckout}
                                    className="w-full md:w-auto bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-md uppercase tracking-wider text-sm transition-all shadow-lg active:scale-[0.98]"
                                >
                                    Continuar con envíos
                                </button>
                            </div>
                        </div>

                        <div className="mt-12 pt-6 border-t border-gray-100 text-xs text-gray-400 flex flex-wrap gap-4">
                            <Link href="/politicas" className="underline hover:text-gray-600">Política de reembolso</Link>
                            <Link href="/politicas" className="underline hover:text-gray-600">Política de envío</Link>
                            <Link href="/politicas" className="underline hover:text-gray-600">Política de privacidad</Link>
                            <Link href="/politicas" className="underline hover:text-gray-600">Términos del servicio</Link>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar (Summary) Desktop */}
                <div className="hidden lg:block bg-gray-50 w-[450px] xl:w-[500px] border-l border-gray-200 order-2 flex-shrink-0">
                    <div className="sticky top-0 p-8 xl:p-12 max-w-[450px]">
                        <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item, idx) => (
                                <div key={`${item.id}-${idx}-desk`} className="flex gap-4">
                                    <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white z-10">{item.cantidad}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{item.nombre}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{item.categoria}</p>
                                    </div>
                                    <div className="text-sm font-bold text-gray-900">S/ {(item.precio * item.cantidad).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 my-6"></div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Tarjeta de regalo o código de descuento"
                                className="flex-1 px-3 py-3 rounded-[4px] border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-500 text-sm bg-white"
                            />
                            <button className="bg-gray-200 text-gray-400 font-bold px-4 rounded-[4px] cursor-not-allowed">
                                Usar
                            </button>
                        </div>

                        <div className="border-t border-gray-200 my-6"></div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">S/ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Envíos</span>
                                <span className="text-xs font-bold text-gray-500 uppercase">Calculado en el siguiente paso</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xs text-gray-500">PEN</span>
                                <span className="text-2xl font-bold text-gray-900">S/ {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
