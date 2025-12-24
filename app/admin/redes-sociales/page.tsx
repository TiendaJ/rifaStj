'use client';

import { useState, useEffect } from 'react';
import {
    getSocialMediaLinks,
    createSocialMediaLink,
    updateSocialMediaLink,
    deleteSocialMediaLink
} from '@/app/actions/social-media';
import { SocialMediaLink } from '@/app/actions/social-media';
import { Plus, Edit2, Trash2, Globe, Check, X, Save } from 'lucide-react';

export default function RedesSocialesPage() {
    const [links, setLinks] = useState<SocialMediaLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialMediaLink | null>(null);

    // Form states
    const [nombre, setNombre] = useState('');
    const [url, setUrl] = useState('');
    const [icono, setIcono] = useState('');
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        setLoading(true);
        const result = await getSocialMediaLinks();
        if (result.success && result.data) {
            setLinks(result.data);
        }
        setLoading(false);
    };

    const handleOpenModal = (link?: SocialMediaLink) => {
        if (link) {
            setEditingLink(link);
            setNombre(link.nombre);
            setUrl(link.url);
            setIcono(link.icono || '');
            setColor(link.color || '#000000');
        } else {
            setEditingLink(null);
            setNombre('');
            setUrl('');
            setIcono('');
            setColor('#000000');
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLink) {
            await updateSocialMediaLink(editingLink.id, { nombre, url, icono, color });
        } else {
            await createSocialMediaLink({ nombre, url, icono, color });
        }
        setIsModalOpen(false);
        fetchLinks();
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar esta red social?')) {
            await deleteSocialMediaLink(id);
            fetchLinks();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Configuración de Redes Sociales</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Nueva Red Social
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-500">Nombre</th>
                                <th className="px-6 py-4 font-medium text-gray-500">URL</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Icono</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Color</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Cargando...
                                    </td>
                                </tr>
                            ) : links.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No hay redes sociales configuradas.
                                    </td>
                                </tr>
                            ) : (
                                links.map((link) => (
                                    <tr key={link.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{link.nombre}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                                                {link.url} <Globe size={14} />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{link.icono}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-6 h-6 rounded-full border border-gray-200"
                                                    style={{ backgroundColor: link.color || '#ddd' }}
                                                />
                                                <span className="text-gray-500">{link.color}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(link)}
                                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(link.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold mb-4">
                            {editingLink ? 'Editar Red Social' : 'Nueva Red Social'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    required
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                                    placeholder="Ej: Facebook"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                <input
                                    type="url"
                                    required
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icono (Clave)</label>
                                <input
                                    type="text"
                                    value={icono}
                                    onChange={(e) => setIcono(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                                    placeholder="Ej: facebook, instagram (lucide-react name o similar)"
                                />
                                <p className="text-xs text-gray-500 mt-1">Nombre del icono para usar en el frontend.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="h-10 w-10 p-1 border border-gray-300 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                                        placeholder="#000000"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
