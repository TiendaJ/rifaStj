import { getProductos } from '@/app/actions/productos';
import { getCategorias } from '@/app/actions/categorias';
import ProductCatalog from './ProductCatalog';

export const dynamic = 'force-dynamic';

export default async function ProductosPage() {
    const [productos, categorias] = await Promise.all([
        getProductos(),
        getCategorias()
    ]);

    return (
        <ProductCatalog productos={productos} categorias={categorias} />
    );
}
