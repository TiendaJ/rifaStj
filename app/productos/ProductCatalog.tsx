'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, ChevronLeft, ChevronRight, Filter, X, Heart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

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
    marca?: string | null;
    fotos: string[];
    categoria?: Categoria;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface ProductCatalogProps {
    productos: Producto[];
    categorias: Categoria[];
    marcas: string[];
    pagination: Pagination;
}

export default function ProductCatalog({ productos, categorias, marcas, pagination }: ProductCatalogProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { addToCart } = useCart();

    const [showFilters, setShowFilters] = useState(false);

    // Initial State from URL
    const initialCategory = searchParams.get('category') || 'all';
    const initialMarca = searchParams.get('marca') || 'all';
    const initialSearch = searchParams.get('q') || '';
    const initialMinPrice = searchParams.get('minPrice') || '';
    const initialMaxPrice = searchParams.get('maxPrice') || '';

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [minPrice, setMinPrice] = useState(initialMinPrice);
    const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

    // Debounced Search Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            const currentQ = params.get('q') || '';

            if (searchQuery !== currentQ) {
                if (searchQuery) params.set('q', searchQuery);
                else params.delete('q');
                params.set('page', '1');
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, pathname, router, searchParams]);

    // Handle Filters
    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (minPrice) params.set('minPrice', minPrice);
        else params.delete('minPrice');

        if (maxPrice) params.set('maxPrice', maxPrice);
        else params.delete('maxPrice');

        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: true });
    };

    // Filter Sidebar Component
    const FilterSidebar = () => (
        <div className="space-y-8">
            {/* Search (Mobile/Sidebar version) */}
            <div className="block md:hidden mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="BUSCAR..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 focus:border-black outline-none font-semibold text-sm uppercase tracking-wide"
                    />
                    <Search className="absolute left-3 top-3.5 text-black w-4 h-4" />
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-extrabold uppercase text-sm mb-4 tracking-widest">Categorías</h3>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => updateFilter('category', 'all')}
                        className={`text-left text-sm font-medium uppercase tracking-wide transition-colors ${initialCategory === 'all' ? 'text-black font-bold border-l-2 border-black pl-2' : 'text-gray-500 hover:text-black'}`}
                    >
                        Todas
                    </button>
                    {categorias.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => updateFilter('category', cat.id)}
                            className={`text-left text-sm font-medium uppercase tracking-wide transition-colors ${initialCategory === cat.id ? 'text-black font-bold border-l-2 border-black pl-2' : 'text-gray-500 hover:text-black'}`}
                        >
                            {cat.descripcion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div>
                <h3 className="font-extrabold uppercase text-sm mb-4 tracking-widest">Precio</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <input
                            type="number"
                            placeholder="MIN"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-1/2 p-2 bg-white border border-gray-200 focus:border-black outline-none text-sm font-medium"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="MAX"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-1/2 p-2 bg-white border border-gray-200 focus:border-black outline-none text-sm font-medium"
                        />
                    </div>
                    <button
                        onClick={applyPriceFilter}
                        className="w-full bg-black text-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                    >
                        Filtrar
                    </button>
                </div>
            </div>

            {/* Availability / Brands (Example structure) */}
            {marcas.length > 0 && (
                <div>
                    <h3 className="font-extrabold uppercase text-sm mb-4 tracking-widest">Marca</h3>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => updateFilter('marca', 'all')}
                            className={`text-left text-sm font-medium uppercase tracking-wide transition-colors ${initialMarca === 'all' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}
                        >
                            Todas
                        </button>
                        {marcas.map(m => (
                            <button
                                key={m}
                                onClick={() => updateFilter('marca', m)}
                                className={`text-left text-sm font-medium uppercase tracking-wide transition-colors ${initialMarca === m ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* Header / Title Area */}
            <div className="bg-white border-b border-gray-100 pt-8 pb-8 md:pt-16 md:pb-12 px-6 md:px-12 lg:px-20">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-2">Tienda</h1>
                        <p className="text-gray-500 text-sm md:text-base font-medium max-w-md">
                            Explora nuestra colección. Calidad y rendimiento garantizado.
                        </p>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden md:block w-full max-w-md">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="BUSCAR PRODUCTOS..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-black focus:bg-white outline-none font-bold text-sm uppercase tracking-wide transition-all"
                            />
                            <Search className="absolute left-0 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden w-full bg-black text-white py-3 px-6 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        <Filter size={16} /> Filtros {showFilters ? '(-)' : '(+)'}
                    </button>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-12">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Sidebar Desktop */}
                    <aside className="hidden md:block w-64 shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Mobile Sidebar (Collapsible) */}
                    {showFilters && (
                        <div className="md:hidden w-full mb-8 border-b border-gray-100 pb-8">
                            <FilterSidebar />
                        </div>
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Results Info */}
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{pagination.total} RESULTADOS</span>
                            {/* Sort could go here */}
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                            {productos.map(product => (
                                <div key={product.id} className="group flex flex-col text-left relative">
                                    <div className="aspect-[4/5] bg-[#F5F5F5] overflow-hidden mb-4 relative rounded-sm">
                                        <Link href={`/productos/${product.id}`} className="block w-full h-full">
                                            {product.fotos && product.fotos.length > 0 ? (
                                                <img
                                                    src={product.fotos[0]}
                                                    alt={product.nombre}
                                                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <ShoppingBag size={48} />
                                                </div>
                                            )}
                                        </Link>

                                        {product.cantidad <= 0 && (
                                            <div className="absolute top-2 right-2 bg-black text-white text-[12px] font-bold px-2 py-1 uppercase tracking-wider z-10">Agotado</div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="absolute bottom-3 right-3 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                                            <button
                                                onClick={(e) => { e.preventDefault(); /* Wishlist logic */ }}
                                                className="bg-white text-black p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                                                title="Añadir a favoritos"
                                            >
                                                <Heart size={18} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product);
                                                }}
                                                disabled={product.cantidad <= 0}
                                                className="bg-white text-black p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Añadir al carrito"
                                            >
                                                <ShoppingBag size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <Link href={`/productos/${product.id}`}>
                                        <div>
                                            <h3 className="font-semibold text-[16px] uppercase leading-tight mb-1 text-black group-hover:underline decoration-1">
                                                {product.nombre}
                                            </h3>
                                            <p className="text-[#6E6E6E] text-[14px] mb-2 font-normal">
                                                {product.categoria?.descripcion || 'Rendimiento confiable'}
                                            </p>
                                            <span className="text-[16px] font-semibold text-black">
                                                S/ {product.precio.toFixed(2)}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {productos.length === 0 && (
                            <div className="text-center py-24 bg-gray-50">
                                <Search className="text-gray-300 w-12 h-12 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-black uppercase mb-2">Sin resultados</h3>
                                <p className="text-gray-500 max-w-xs mx-auto mb-6">No encontramos productos que coincidan con tu búsqueda.</p>
                                <button
                                    onClick={() => {
                                        updateFilter('category', 'all');
                                        updateFilter('marca', 'all');
                                        setMinPrice('');
                                        setMaxPrice('');
                                        applyPriceFilter(); // Trigger URL clean
                                        setSearchQuery('');
                                    }}
                                    className="text-black font-black uppercase text-sm border-b-2 border-black hover:opacity-70 pb-1"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center mt-16 gap-4">
                                <button
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page <= 1}
                                    className="w-10 h-10 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-sm font-black text-black">
                                    PUESTO {pagination.page} DE {pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.totalPages}
                                    className="w-10 h-10 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
