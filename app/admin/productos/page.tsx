import { getProductos } from '@/app/actions/productos';
import { getCategorias } from '@/app/actions/categorias';
import ProductoManager from './ProductoManager';

export default async function ProductosPage() {
    const [productos, categorias] = await Promise.all([
        getProductos(),
        getCategorias()
    ]);
    return <ProductoManager productos={productos} categorias={categorias} />;
}
