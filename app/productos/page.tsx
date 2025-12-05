import { getProductos } from '@/app/actions/productos';
import { getCategorias } from '@/app/actions/categorias';
import ProductCatalog from './ProductCatalog';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getSession } from '@/app/actions/auth';

export const dynamic = 'force-dynamic';

export default async function ProductosPage() {
    const [productos, categorias, session] = await Promise.all([
        getProductos(),
        getCategorias(),
        getSession()
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar session={session} />
            <main className="flex-grow">
                <ProductCatalog productos={productos} categorias={categorias} />
            </main>
            <Footer />
        </div>
    );
}
