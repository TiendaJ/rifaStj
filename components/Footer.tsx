import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-800 bg-black mt-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-lg font-bold tracking-tight text-white">
                            Jshop
                        </span>
                        <p className="text-sm text-gray-400">
                            © {currentYear} Jshop. Todos los derechos reservados.
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm text-gray-400">
                        <Link href="/terminos" className="hover:text-white transition-colors">
                            Términos
                        </Link>
                        <Link href="/privacidad" className="hover:text-white transition-colors">
                            Privacidad
                        </Link>
                        <Link href="/contacto" className="hover:text-white transition-colors">
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
