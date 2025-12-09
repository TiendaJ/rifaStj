import { getProductos } from '@/app/actions/productos';
import { getCategorias } from '@/app/actions/categorias';
import ProductCatalog from './ProductCatalog';

export const dynamic = 'force-dynamic';

export default async function ProductosPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; page?: string; limit?: string }> }) {
    const params = await searchParams;
    const q = params.q || '';
    const category = params.category || 'all';
    const page = parseInt(params.page || '1');
    const limit = parseInt(params.limit || '12');

    const [productosData, categorias] = await Promise.all([
        getProductos(q, category, page, limit),
        getCategorias()
    ]);

    const productos = productosData.productos;
    const pagination = productosData.pagination;

    return (
        <ProductCatalog productos={productos} categorias={categorias} pagination={pagination} />
    );
}

