'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface Categoria {
    id: string;
    descripcion: string;
}

interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    categoria_id: string;
    fotos: string[];
    categoria?: Categoria;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export default function ProductCatalog({ productos, categorias, pagination }: { productos: Producto[], categorias: Categoria[], pagination: Pagination }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const initialCategory = searchParams.get('category') || 'all';
    const initialSearch = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    // Update URL when searchQuery changes (Debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            const currentQ = params.get('q') || '';

            if (searchQuery !== currentQ) {
                if (searchQuery) {
                    params.set('q', searchQuery);
                } else {
                    params.delete('q');
                }
                params.set('page', '1'); // Reset to page 1 on search
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, pathname, router, searchParams]);

    // Initialize state from URL params
    useEffect(() => {
        const q = searchParams.get('q');
        if (q !== null && q !== searchQuery) {
            setSearchQuery(q);
        }
    }, [searchParams]);


    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (categoryId === 'all') {
            params.delete('category');
        } else {
            params.set('category', categoryId);
        }
        params.set('page', '1'); // Reset to page 1 on category change
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: true });
    };

    const handleLimitChange = (newLimit: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', newLimit);
        params.set('page', '1'); // Reset to page 1
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6 md:mb-12">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight">Nuestros Productos</h1>
                    <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Explora nuestra selección exclusiva de productos de alta calidad.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col-reverse md:flex-row gap-4 mb-6 md:mb-8 items-center justify-between bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 sticky top-0 md:static z-20 mx-[-1rem] md:mx-0 px-4 md:px-4">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar mask-linear-gradient">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${initialCategory === 'all'
                                ? 'bg-black text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Todos
                        </button>
                        {categorias.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${initialCategory === cat.id
                                    ? 'bg-black text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat.descripcion}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <select
                            value={pagination.limit}
                            onChange={(e) => handleLimitChange(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="12">12 por pág.</option>
                            <option value="24">24 por pág.</option>
                            <option value="48">48 por pág.</option>
                        </select>

                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {productos.map(product => (
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
                                <p className="text-gray-500 text-xs mb-2 line-clamp-2 flex-grow">
                                    {product.descripcion}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                                    <span className="text-sm md:text-base font-bold text-gray-900">
                                        S/ {product.precio.toFixed(2)}
                                    </span>
                                    <button
                                        disabled={product.cantidad <= 0}
                                        className="bg-black text-white p-1.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group-active:scale-95"
                                        title="Ver detalles"
                                    >
                                        <ShoppingBag size={14} />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {productos.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-400 w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron productos</h3>
                        <button
                            onClick={() => {
                                handleCategoryChange('all');
                                setSearchQuery('');
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete('q');
                                params.delete('category');
                                params.set('page', '1');
                                router.replace(`${pathname}?${params.toString()}`);
                            }}
                            className="mt-4 text-indigo-600 font-medium hover:text-indigo-800"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 gap-4">
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page <= 1}
                            className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm text-gray-600 font-medium">
                            Página {pagination.page} de {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page >= pagination.totalPages}
                            className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
