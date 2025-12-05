import { getProductoById } from '@/app/actions/productos';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getSession } from '@/lib/auth';
import { ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const [producto, session] = await Promise.all([
        getProductoById(id),
        getSession()
    ]);

    if (!producto) {
        notFound();
    }

    const whatsappMessage = `Hola, estoy interesado en el producto *${producto.nombre}* que vi en Jshop.`;
    const whatsappLink = `https://wa.me/51999999999?text=${encodeURIComponent(whatsappMessage)}`; // Replace with actual number

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar session={session} />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/productos"
                        className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al catálogo
                    </Link>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {/* Product Image */}
                            <div className="bg-gray-100 aspect-square relative">
                                {producto.fotos && producto.fotos.length > 0 ? (
                                    <img
                                        src={producto.fotos[0]}
                                        alt={producto.nombre}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ShoppingBag size={64} opacity={0.2} />
                                    </div>
                                )}
                                {producto.cantidad <= 0 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">Agotado</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="p-8 md:p-12 flex flex-col">
                                <div className="mb-4">
                                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                                        {producto.categoria?.descripcion || 'General'}
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                                    {producto.nombre}
                                </h1>

                                <div className="text-3xl font-bold text-gray-900 mb-6">
                                    S/ {producto.precio.toFixed(2)}
                                </div>

                                <div className="prose prose-gray max-w-none mb-8 text-gray-600 leading-relaxed">
                                    <p>{producto.descripcion}</p>
                                </div>

                                <div className="mt-auto pt-8 border-t border-gray-100">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                            <span>Disponibilidad:</span>
                                            <span className={producto.cantidad > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                                {producto.cantidad > 0 ? `${producto.cantidad} unidades` : 'Agotado'}
                                            </span>
                                        </div>

                                        <a
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${producto.cantidad > 0
                                                    ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                            onClick={(e) => {
                                                if (producto.cantidad <= 0) e.preventDefault();
                                            }}
                                        >
                                            <MessageCircle size={24} />
                                            {producto.cantidad > 0 ? 'Comprar por WhatsApp' : 'No disponible'}
                                        </a>
                                        <p className="text-center text-xs text-gray-400 mt-2">
                                            Serás redirigido a WhatsApp para coordinar la compra.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
