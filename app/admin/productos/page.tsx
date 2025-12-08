import { getProductos } from '@/app/actions/productos';
import { getCategorias } from '@/app/actions/categorias';
import ProductoManager from './ProductoManager';

export default async function ProductosPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; page?: string }> }) {
    const params = await searchParams;
    const q = params.q || '';
    const category = params.category || 'all';
    const page = parseInt(params.page || '1');
    const limit = 10;

    const [productosData, categorias] = await Promise.all([
        getProductos(q, category, page, limit),
        getCategorias()
    ]);

    return (
        <ProductoManager
            productos={productosData.productos}
            categorias={categorias}
            pagination={productosData.pagination}
        />
    );
}
