import { getProductoById } from '@/app/actions/productos';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ProductActions from './ProductActions';
import ProductMediaGallery from './ProductMediaGallery';
import { TrustBadges } from '@/components/TrustBadges';
import { ProductReviews } from '@/components/ProductReviews';
import { ShippingAccordion } from '@/components/ShippingAccordion';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    const producto = await getProductoById(id) as any;

    if (!producto) {
        return {
            title: 'Producto No Encontrado',
        };
    }

    return {
        title: producto.nombre,
        description: producto.descripcion?.substring(0, 160) || `Compra ${producto.nombre} en Jshop.`,
        openGraph: {
            title: `${producto.nombre} - S/ ${producto.precio.toFixed(2)}`,
            description: producto.descripcion,
            images: producto.fotos && producto.fotos.length > 0 ? [{ url: producto.fotos[0] }] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: producto.nombre,
            description: `S/ ${producto.precio.toFixed(2)} - Garantía Jshop`,
            images: producto.fotos && producto.fotos.length > 0 ? [producto.fotos[0]] : [],
        }
    };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const producto = await getProductoById(id) as any;

    if (!producto) {
        notFound();
    }

    const whatsappMessage = `Hola, estoy interesado en el producto *${producto.nombre}* que vi en Jshop.`;
    const whatsappLink = `https://wa.me/51951381439?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="min-h-screen bg-white pb-32 md:pb-12">
            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100 flex items-center px-4 h-14">
                <Link href="/productos" className="text-black">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <span className="ml-4 font-bold text-sm uppercase tracking-wider truncate flex-1 text-center pr-9">
                    {producto.nombre}
                </span>
            </div>

            <div className="max-w-[1600px] mx-auto md:px-6 lg:px-8 md:pt-8 text-slate-800">
                <div className="hidden md:block mb-6">
                    <Link
                        href="/productos"
                        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3 mr-2" />
                        Volver
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 text-slate-900">
                    {/* LEFT COLUMN: Gallery */}
                    <div className="w-full md:w-[65%] lg:w-[60%]">
                        <ProductMediaGallery
                            nombre={producto.nombre}
                            fotos={producto.fotos || []}
                            videos={producto.videos || []}
                            isSoldOut={producto.cantidad <= 0}
                        />
                    </div>

                    {/* RIGHT COLUMN: Details (Sticky) */}
                    <div className="w-full md:w-[35%] lg:w-[40%] text-slate-900">
                        <div className="sticky top-24 space-y-6 px-4 md:px-0 text-slate-900">
                            {/* Header Info */}
                            <div className="space-y-2">
                                <h1 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight leading-none text-slate-900">
                                    {producto.nombre}
                                </h1>
                                <div className="flex items-center justify-between text-slate-900">
                                    <span className="text-xl md:text-2xl font-bold text-gray-900 ">
                                        S/ {producto.precio.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        {producto.categoria?.descripcion || 'General'}
                                    </span>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Description */}
                            <div className="prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed">
                                <p>{producto.descripcion}</p>
                            </div>

                            {/* Actions */}
                            <div className="pt-4">
                                <ProductActions whatsappLink={whatsappLink} cantidad={producto.cantidad} />
                            </div>

                            {/* Extra Info */}
                            <div className="space-y-4 pt-6">
                                <ShippingAccordion />
                                <TrustBadges />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews & Related */}
                <div className="mt-20 px-4 md:px-0 max-w-4xl mx-auto">
                    <ProductReviews />
                </div>

                <div className="mt-20 px-4 md:px-0">
                    <h2 className="text-xl font-bold text-black uppercase tracking-wider mb-8 text-center">También te podría gustar</h2>
                    <RelatedProductsList categoriaId={producto.categoria_id} currentProductId={producto.id} />
                </div>
            </div>
        </div>
    );
}

// Related Products Component (Client or Server Component is fine, let's keep it here for simplicity)
import { getRelatedProducts } from '@/app/actions/productos';

async function RelatedProductsList({ categoriaId, currentProductId }: { categoriaId: string, currentProductId: string }) {
    const relatedProducts = await getRelatedProducts(categoriaId, currentProductId);

    if (relatedProducts.length === 0) return null;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-4 md:px-0">
            {relatedProducts.map(product => (
                <Link
                    href={`/productos/${product.id}`}
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full cursor-pointer"
                >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                        {product.fotos && product.fotos.length > 0 ? (
                            <img
                                src={product.fotos[0]}
                                alt={product.nombre}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <ShoppingBag size={48} opacity={0.2} />
                            </div>
                        )}
                        {product.cantidad <= 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Agotado</span>
                            </div>
                        )}
                    </div>

                    <div className="p-3 flex flex-col flex-grow">
                        <div className="mb-1">
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded-md">
                                {product.categoria?.descripcion || 'General'}
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {product.nombre}
                        </h3>
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                            <span className="text-sm md:text-base font-bold text-gray-900">
                                S/ {product.precio.toFixed(2)}
                            </span>
                            <div className="bg-black text-white p-1.5 rounded-full hover:bg-gray-800 transition-colors">
                                <ShoppingBag size={14} />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
