'use client';

import { useState } from 'react';
import { createProducto, deleteProducto, updateProducto } from '@/app/actions/productos';
import { createClient } from '@supabase/supabase-js';
import { Pencil, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';

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
    fotos: string[];
    videos?: string[];
    categoria?: Categoria;
}

export default function ProductoManager({ productos, categorias }: { productos: Producto[], categorias: Categoria[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            let result;
            if (editingProducto) {
                editingProducto.fotos.forEach(foto => {
                    formData.append('existing_fotos', foto);
                });

                if (editingProducto.videos) {
                    editingProducto.videos.forEach(video => {
                        formData.append('existing_videos', video);
                    });
                }
                result = await updateProducto(editingProducto.id, formData);
            } else {
                result = await createProducto(formData);
            }

            if (result && 'error' in result) {
                alert(result.error);
            } else {
                setIsModalOpen(false);
                setEditingProducto(null);
            }
        } catch (error) {
            console.error(error);
            alert('Error al guardar el producto: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;
        setDeletingId(id);
        try {
            await deleteProducto(id);
        } catch (error) {
            console.error(error);
            alert('Error al eliminar');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
                <button
                    onClick={() => {
                        setEditingProducto(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                >
                    <Plus size={20} />
                    Nuevo Producto
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Producto</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Categoría</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Precio</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Stock</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {productos.map((prod) => (
                            <tr key={prod.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            {prod.fotos && prod.fotos.length > 0 ? (
                                                <img src={prod.fotos[0]} alt={prod.nombre} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <ImageIcon size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{prod.nombre}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{prod.descripcion}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                        {prod.categoria?.descripcion || 'Sin categoría'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-900">S/ {prod.precio.toFixed(2)}</td>
                                <td className="px-6 py-4 text-gray-600">{prod.cantidad}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingProducto(prod);
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prod.id)}
                                            disabled={!!deletingId}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            {deletingId === prod.id ? (
                                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <Trash2 size={18} />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {productos.map((prod) => (
                    <div key={prod.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {prod.fotos && prod.fotos.length > 0 ? (
                                <img src={prod.fotos[0]} alt={prod.nombre} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <ImageIcon size={24} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium text-gray-900 truncate pr-2">{prod.nombre}</h3>
                                <div className="flex gap-1 flex-shrink-0">
                                    <button
                                        onClick={() => {
                                            setEditingProducto(prod);
                                            setIsModalOpen(true);
                                        }}
                                        className="p-1.5 text-blue-600 bg-blue-50 rounded-md"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(prod.id)}
                                        disabled={!!deletingId}
                                        className="p-1.5 text-red-600 bg-red-50 rounded-md disabled:opacity-50"
                                    >
                                        {deletingId === prod.id ? (
                                            <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Trash2 size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1 mb-2">{prod.descripcion}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">
                                    {prod.categoria?.descripcion || 'General'}
                                </span>
                                <div className="text-right">
                                    <div className="font-bold text-gray-900">S/ {prod.precio.toFixed(2)}</div>
                                    <div className="text-xs text-gray-500">Stock: {prod.cantidad}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {productos.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                        No hay productos registrados
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold">
                                {editingProducto ? 'Editar Producto' : 'Nuevo Producto'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form action={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input
                                        name="nombre"
                                        defaultValue={editingProducto?.nombre}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        defaultValue={editingProducto?.descripcion}
                                        required
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
                                    <input
                                        name="precio"
                                        type="number"
                                        step="0.01"
                                        defaultValue={editingProducto?.precio}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad (Stock)</label>
                                    <input
                                        name="cantidad"
                                        type="number"
                                        defaultValue={editingProducto?.cantidad}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <select
                                        name="categoria_id"
                                        defaultValue={editingProducto?.categoria_id}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
                                    >
                                        <option value="">Seleccionar categoría...</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.descripcion}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fotos</label>
                                    <input
                                        name="fotos"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Puedes seleccionar múltiples fotos.</p>

                                    {editingProducto && editingProducto.fotos && editingProducto.fotos.length > 0 && (
                                        <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                                            {editingProducto.fotos.map((foto, idx) => (
                                                <div key={idx} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 group">
                                                    <img src={foto} alt={`Foto ${idx}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newFotos = editingProducto.fotos.filter((_, i) => i !== idx);
                                                            setEditingProducto({ ...editingProducto, fotos: newFotos });
                                                        }}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                                                        title="Eliminar foto"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Videos</label>
                                    <input
                                        name="videos"
                                        type="file"
                                        multiple
                                        accept="video/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Puedes seleccionar múltiples videos.</p>

                                    {editingProducto && editingProducto.videos && editingProducto.videos.length > 0 && (
                                        <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                                            {editingProducto.videos.map((video, idx) => (
                                                <div key={idx} className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 group bg-gray-100">
                                                    <video src={video} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newVideos = (editingProducto.videos || []).filter((_, i) => i !== idx);
                                                            setEditingProducto({ ...editingProducto, videos: newVideos });
                                                        }}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600 z-10"
                                                        title="Eliminar video"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
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
                                    {isLoading ? 'Guardando...' : 'Guardar Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
