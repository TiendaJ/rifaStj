import Link from 'next/link';
import { Lock, Facebook, Instagram, Twitter, Linkedin, Youtube, ExternalLink, Share2, Music2 } from 'lucide-react';
import { getSocialMediaLinks } from '@/app/actions/social-media';

// Map of icon names to components
const IconMap: { [key: string]: any } = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    tiktok: Music2, // Using Music2 as a proxy for TikTok since it might not be in the version of lucide-react used
    default: ExternalLink
};

export async function Footer() {
    const currentYear = new Date().getFullYear();
    const { data: socialLinks } = await getSocialMediaLinks();

    return (
        <footer className="w-full bg-black text-white border-t border-gray-900 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
                                <img src="/logoWhite.png" alt="Jshop Logo" className="w-14 h-14 object-contain" />
                                <span style={{ marginLeft: "-15px" }}  >Jshop</span>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-2">
                                La plataforma de productos exclusivos. Garantía, seguridad y confianza en cada transacción.
                            </p>
                        </div>

                        {/* Social Links */}
                        {socialLinks && socialLinks.length > 0 && (
                            <div className="flex flex-wrap gap-4">
                                {socialLinks.filter((link: any) => link.activo).map((link: any) => {
                                    // Resolve icon component
                                    const iconKey = link.icono?.toLowerCase() || 'default';
                                    const IconComponent = IconMap[iconKey] || IconMap['default'];

                                    return (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 group"
                                            aria-label={link.nombre}
                                            style={{
                                                // Optional: Use the custom color on hover if provided
                                                // borderColor: link.color || undefined 
                                            }}
                                        >
                                            <IconComponent size={20} className="transition-transform group-hover:scale-110" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
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
        </footer >
    );
}
