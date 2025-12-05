import { getProductoById } from '@/app/actions/productos';
import { notFound } from 'next/navigation';
import { ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ProductActions from './ProductActions';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const producto = await getProductoById(id);

    if (!producto) {
        notFound();
    }

    const whatsappMessage = `Hola, estoy interesado en el producto *${producto.nombre}* que vi en Jshop.`;
    const whatsappLink = `https://wa.me/51999999999?text=${encodeURIComponent(whatsappMessage)}`; // Replace with actual number

    return (
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
                                <ProductActions whatsappLink={whatsappLink} cantidad={producto.cantidad} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
