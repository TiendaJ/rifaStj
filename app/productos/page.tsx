import { getProductos } from '@/app/actions/productos';
import { getCategorias } from '@/app/actions/categorias';
import ProductCatalog from './ProductCatalog';

export const dynamic = 'force-dynamic';

export default async function ProductosPage() {
    const [productosData, categorias] = await Promise.all([
        getProductos('', 'all', 1, 10000),
        getCategorias()
    ]);

    // Safety check if getProductos returns array (old behavior) or object (new behavior)
    // Based on recent changes, it returns { productos, pagination }
    const productos = Array.isArray(productosData) ? productosData : productosData.productos;

    return (
        <ProductCatalog productos={productos} categorias={categorias} />
    );
}
