'use client';

import { startTransition, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Package, Users, Ticket, Grid, LogOut, LayoutDashboard, Share2, ShoppingBag, CreditCard } from 'lucide-react';
import { logout } from '@/app/actions/auth';

export default function AdminLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { href: '/admin/rifas', label: 'Gestionar Rifas', icon: Ticket },
        { href: '/admin/participantes', label: 'Participantes', icon: Users },
        { href: '/admin/inscripciones', label: 'Inscripciones', icon: Grid },
        { href: '/admin/categorias', label: 'Categorías', icon: LayoutDashboard },
        { href: '/admin/productos', label: 'Productos', icon: Package },
        { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag },
        { href: '/admin/redes-sociales', label: 'Redes Sociales', icon: Share2 },
        { href: '/admin/configuracion/mercadopago', label: 'Mercado Pago', icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm transition-transform duration-300 lg:translate-x-0 lg:static
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-black"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-md font-medium transition-colors
                                    ${isActive
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                    }
                                `}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors text-sm font-medium"
                    >
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center gap-4 sticky top-0 z-10">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 hover:text-black"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-lg font-bold">Admin Panel</h1>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
