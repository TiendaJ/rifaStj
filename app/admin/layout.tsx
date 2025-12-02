import { logout } from '@/app/actions/auth';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin/rifas" className="block px-4 py-2.5 rounded-md hover:bg-gray-50 text-gray-600 hover:text-black font-medium transition-colors">
                        Gestionar Rifas
                    </Link>
                    <Link href="/admin/participantes" className="block px-4 py-2.5 rounded-md hover:bg-gray-50 text-gray-600 hover:text-black font-medium transition-colors">
                        Participantes
                    </Link>
                    <Link href="/admin/inscripciones" className="block px-4 py-2.5 rounded-md hover:bg-gray-50 text-gray-600 hover:text-black font-medium transition-colors">
                        Inscripciones
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <form action={logout}>
                        <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors text-sm font-medium">
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
