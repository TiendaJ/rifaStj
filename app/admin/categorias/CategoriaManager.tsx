'use client';

import { useState } from 'react';
import { createCategoria, deleteCategoria, updateCategoria } from '@/app/actions/categorias';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

interface Categoria {
    id: string;
    descripcion: string;
}

export default function CategoriaManager({ categorias }: { categorias: Categoria[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            let result;
            if (editingCategoria) {
                result = await updateCategoria(editingCategoria.id, formData);
            } else {
                result = await createCategoria(formData);
            }

            if (result && 'error' in result) {
                alert(result.error);
            } else {
                setIsModalOpen(false);
                setEditingCategoria(null);
            }
        } catch (error) {
            console.error(error);
            alert('Error al guardar la categoría');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;
        try {
            await deleteCategoria(id);
        } catch (error) {
            console.error(error);
            alert('Error al eliminar');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
                <button
                    onClick={() => {
                        setEditingCategoria(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                >
                    <Plus size={20} />
                    Nueva Categoría
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Descripción</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categorias.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900">{cat.descripcion}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingCategoria(cat);
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {categorias.length === 0 && (
                            <tr>
                                <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                                    No hay categorías registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold">
                                {editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form action={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción
                                </label>
                                <input
                                    name="descripcion"
                                    defaultValue={editingCategoria?.descripcion}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="Ej. Electrónica"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
