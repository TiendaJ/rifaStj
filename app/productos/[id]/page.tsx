import { getProductoById } from '@/app/actions/productos';
import { notFound } from 'next/navigation';
import { ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ProductActions from './ProductActions';
import ProductMediaGallery from './ProductMediaGallery';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const producto = await getProductoById(id) as any; // Cast to any to access 'videos' until schema is synced

    if (!producto) {
        notFound();
    }

    const whatsappMessage = `Hola, estoy interesado en el producto *${producto.nombre}* que vi en Jshop.`;
    const whatsappLink = `https://wa.me/51951381439?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="min-h-screen bg-gray-50 pb-12 md:py-12 px-0 md:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="hidden md:block">
                    <Link
                        href="/productos"
                        className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al catálogo
                    </Link>
                </div>

                {/* Mobile Back Button (Top Bar) */}
                <div className="md:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-3 border-b border-gray-200 flex items-center">
                    <Link href="/productos" className="text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <span className="ml-4 font-semibold text-sm truncate">{producto.nombre}</span>
                </div>

                <div className="bg-white md:rounded-2xl shadow-sm md:border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Product Media Gallery */}
                        <div>
                            <ProductMediaGallery
                                nombre={producto.nombre}
                                fotos={producto.fotos || []}
                                videos={producto.videos || []}
                                isSoldOut={producto.cantidad <= 0}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-5 md:p-12 flex flex-col relative pb-28 md:pb-12">
                            <div className="mb-3 md:mb-4">
                                <span className="text-xs md:text-sm font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 md:px-3 py-1 rounded-full">
                                    {producto.categoria?.descripcion || 'General'}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 leading-tight">
                                {producto.nombre}
                            </h1>

                            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                                S/ {producto.precio.toFixed(2)}
                            </div>

                            <div className="prose prose-sm md:prose-base prose-gray max-w-none mb-8 text-gray-600 leading-relaxed">
                                <p>{producto.descripcion}</p>
                            </div>

                            <div className="mt-auto pt-0 md:pt-8 md:border-t border-gray-100">
                                <ProductActions whatsappLink={whatsappLink} cantidad={producto.cantidad} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
