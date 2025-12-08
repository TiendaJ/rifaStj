'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingBag } from 'lucide-react';
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

export default function ProductCatalog({ productos, categorias }: { productos: Producto[], categorias: Categoria[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Initialize from URL or default to 'all'
    const initialCategory = searchParams.get('categoria') || 'all';
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');

    // Sync state with URL params if they change externally (e.g. back button)
    useEffect(() => {
        const cat = searchParams.get('categoria');
        if (cat) {
            setSelectedCategory(cat);
        } else {
            setSelectedCategory('all');
        }
    }, [searchParams]);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        const params = new URLSearchParams(searchParams);
        if (categoryId === 'all') {
            params.delete('categoria');
        } else {
            params.set('categoria', categoryId);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const filteredProducts = productos.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.categoria_id === selectedCategory;
        const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Nuestros Productos</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explora nuestra selección exclusiva de productos de alta calidad.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === 'all'
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
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id
                                    ? 'bg-black text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat.descripcion}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {filteredProducts.map(product => (
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
                                    <span className="text-base font-bold text-gray-900">
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

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-400 w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron productos</h3>
                        <button
                            onClick={() => { handleCategoryChange('all'); setSearchQuery(''); }}
                            className="mt-4 text-indigo-600 font-medium hover:text-indigo-800"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
