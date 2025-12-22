import Link from 'next/link';
import { Lock } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-black text-white border-t border-gray-900 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-4">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                                <span className="text-sm">J</span>
                            </div>
                            <span>Jshop</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            La plataforma líder en rifas y productos exclusivos. Garantía, seguridad y confianza en cada transacción.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-200">Legal</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                            <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/devoluciones" className="hover:text-white transition-colors">Política de Devoluciones</Link></li>
                        </ul>
                    </div>

                    {/* Payments */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-200">Pagos Seguros</h3>
                        <div className="flex flex-wrap gap-2 text-gray-400 mb-6">
                            <span className="border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs font-medium rounded text-gray-300">VISA</span>
                            <span className="border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs font-medium rounded text-gray-300">Mastercard</span>
                            <span className="border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs font-medium rounded text-gray-300">Yape</span>
                            <span className="border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs font-medium rounded text-gray-300">Plin</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wide">
                            <Lock className="w-4 h-4" />
                            <span>SSL Encrypted</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {currentYear} Jshop. Todos los derechos reservados.</p>
                    <p className="flex items-center gap-1">
                        Desarrollado por <a href="#" className="text-white hover:underline font-bold">ExactaTi</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
