import { getCategorias } from '@/app/actions/categorias';
import CategoriaManager from './CategoriaManager';

export default async function CategoriasPage() {
    const categorias = await getCategorias();
    return <CategoriaManager categorias={categorias} />;
}
