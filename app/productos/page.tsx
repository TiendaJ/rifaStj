import { getProductos, getMarcas } from '@/app/actions/productos';
import { getCategorias } from '@/app/actions/categorias';
import ProductCatalog from './ProductCatalog';

export const dynamic = 'force-dynamic';

export default async function ProductosPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; minPrice?: string; maxPrice?: string; marca?: string; page?: string; limit?: string }> }) {
    const params = await searchParams;
    const q = params.q || '';
    const category = params.category || 'all';
    const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined;
    const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined;
    const marca = params.marca || 'all';
    const page = parseInt(params.page || '1');
    const limit = parseInt(params.limit || '12');

    const [productosData, categorias, marcas] = await Promise.all([
        getProductos(q, category, minPrice, maxPrice, marca, page, limit),
        getCategorias(),
        getMarcas()
    ]);

    const productos = productosData.productos;
    const pagination = productosData.pagination;

    return (
        <ProductCatalog
            productos={productos}
            categorias={categorias}
            marcas={marcas}
            pagination={pagination}
        />
    );
}

