"use client";

import Link from "next/link";
import { LogIn, LogOut, User, Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { logout } from "@/app/actions/auth";
import { useCart } from "@/app/context/CartContext";
import CartDrawer from "./CartDrawer";

interface NavbarProps {
    session: any;
}

export function Navbar({ session }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();

    return (
        <>
            <CartDrawer />
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
                        <img src="/logoBlack.png" alt="Jshop Logo" className="w-12 h-12 object-contain" />
                        <span style={{ marginLeft: "-15px" }}>shop</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
                        <Link href="/" className="hover:text-black transition-colors">
                            Inicio
                        </Link>
                        <Link href="/productos" className="hover:text-black transition-colors">
                            Tienda
                        </Link>
                        <Link href="/productos?q=celular" className="hover:text-black transition-colors">
                            Celulares
                        </Link>
                        <Link href="/productos?q=accesorios" className="hover:text-black transition-colors">
                            Accesorios
                        </Link>
                        <Link href="/rifas" className="hover:text-black transition-colors">
                            Rifas
                        </Link>
                        <Link href="/productos?q=oferta" className="text-red-600 hover:text-red-700 transition-colors">
                            Ofertas
                        </Link>

                        <button
                            onClick={toggleCart}
                            className="relative group text-black hover:text-gray-600 transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {!session ? (
                            <Link href="/login" className="hover:text-black transition-colors flex items-center gap-2 ml-4">
                                <LogIn className="w-4 h-4" />
                                <span>Entrar</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={session.role === 'admin' ? "/admin/rifas" : "/mi-dashboard"}
                                    className="hover:text-black transition-colors flex items-center gap-2 ml-4"
                                >
                                    <User className="w-4 h-4" />
                                    <span>{session.role === 'admin' ? 'Admin' : 'Mi Cuenta'}</span>
                                </Link>
                                <button
                                    onClick={() => logout()}
                                    className="hover:text-black transition-colors flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-black"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
                        <nav className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider text-gray-800">
                            <Link
                                href="/"
                                className="hover:text-black transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/productos?q=celular"
                                className="hover:text-black transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Celulares
                            </Link>
                            <Link
                                href="/productos?q=accesorios"
                                className="hover:text-black transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Accesorios
                            </Link>
                            <Link
                                href="/productos?q=oferta"
                                className="text-red-600 hover:text-red-700 transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Ofertas
                            </Link>
                            <Link
                                href="/productos"
                                className="hover:text-black transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Ver Tienda
                            </Link>
                            <button
                                onClick={() => { setIsOpen(false); toggleCart(); }}
                                className="hover:text-black transition-colors py-2 flex items-center gap-2 text-left"
                            >
                                <span>Carrito</span>
                                {cartCount > 0 && (
                                    <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <Link
                                href="/rifas"
                                className="text-black font-black hover:text-gray-700 transition-colors py-2 border-l-4 border-black pl-2 bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Rifas
                            </Link>
                            {!session ? (
                                <Link
                                    href="/login"
                                    className="hover:text-black transition-colors flex items-center gap-2 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Entrar</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={session.role === 'admin' ? "/admin/rifas" : "/mi-dashboard"}
                                        className="hover:text-black transition-colors flex items-center gap-2 py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>{session.role === 'admin' ? 'Admin' : 'Mi Cuenta'}</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                        }}
                                        className="hover:text-black transition-colors flex items-center gap-2 py-2 w-full text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Cerrar Sesión</span>
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
