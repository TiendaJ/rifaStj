"use client";

import Link from "next/link";
import { LogIn, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "@/app/actions/auth";

interface NavbarProps {
    session: any; // You might want to type this properly based on your session shape
}

export function Navbar({ session }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                        <span className="text-sm">J</span>
                    </div>
                    <span>Jshop</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {!session ? (
                        <Link href="/login" className="text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                            <LogIn className="w-4 h-4" />
                            <span>Iniciar Sesión</span>
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={session.role === 'admin' ? "/admin/rifas" : "/mis-inscripciones"}
                                className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                            >
                                <User className="w-4 h-4" />
                                <span>{session.role === 'admin' ? 'Admin' : 'Mis Rifas'}</span>
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Cerrar Sesión</span>
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
                    <nav className="flex flex-col gap-4 text-sm font-medium">
                        {!session ? (
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-black transition-colors flex items-center gap-2 py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <LogIn className="w-4 h-4" />
                                <span>Iniciar Sesión</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={session.role === 'admin' ? "/admin/rifas" : "/mis-inscripciones"}
                                    className="text-gray-600 hover:text-black transition-colors flex items-center gap-2 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <User className="w-4 h-4" />
                                    <span>{session.role === 'admin' ? 'Admin' : 'Mis Rifas'}</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="text-gray-600 hover:text-black transition-colors flex items-center gap-2 py-2 w-full text-left"
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
    );
}
