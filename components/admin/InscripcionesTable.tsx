"use client";

import { useState } from "react";
import { Search, Filter, Eye, X, Check, XCircle } from "lucide-react";
import { updateEstadoInscripcion } from "@/app/actions/inscripcion";
import Image from "next/image";

interface InscripcionesTableProps {
    inscripciones: any[];
}

export default function InscripcionesTable({ inscripciones }: InscripcionesTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const filteredInscripciones = inscripciones.filter((ins) => {
        const matchesSearch =
            ins.participante.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ins.participante.dni?.includes(searchTerm) ||
            ins.rifa.nombre.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || ins.estado === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, DNI o rifa..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400 w-4 h-4" />
                    <select
                        className="border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 bg-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Todos los estados</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-medium text-xs uppercase tracking-wider">Participante</th>
                                <th className="p-4 font-medium text-xs uppercase tracking-wider">Rifa</th>
                                <th className="p-4 font-medium text-xs uppercase tracking-wider">Comprobante</th>
                                <th className="p-4 font-medium text-xs uppercase tracking-wider">Estado</th>
                                <th className="p-4 font-medium text-xs uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInscripciones.map((ins) => (
                                <tr key={ins.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="text-gray-900 font-medium">{ins.participante.nombre || 'Sin nombre'}</div>
                                        <div className="text-xs text-gray-500 font-mono">{ins.participante.dni}</div>
                                        <div className="text-xs text-gray-400">{ins.participante.telefono}</div>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">{ins.rifa.nombre}</td>
                                    <td className="p-4">
                                        {ins.comprobante_imagen ? (
                                            <button
                                                onClick={() => setSelectedImage(ins.comprobante_imagen)}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium bg-blue-50 px-2 py-1 rounded border border-blue-100 transition-colors"
                                            >
                                                <Eye className="w-3 h-3" />
                                                Ver
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Sin comprobante</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${ins.estado === 'confirmado' ? 'bg-green-50 text-green-700 border-green-200' :
                                                ins.estado === 'pendiente' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                    ins.estado === 'rechazado' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-blue-50 text-blue-700 border-blue-200'
                                            }`}>
                                            {ins.estado.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {ins.estado === 'pendiente' && (
                                                <>
                                                    <form action={updateEstadoInscripcion.bind(null, ins.id)}>
                                                        <input type="hidden" name="estado" value="confirmado" />
                                                        <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors" title="Aprobar">
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                    </form>
                                                    <form action={updateEstadoInscripcion.bind(null, ins.id)}>
                                                        <input type="hidden" name="estado" value="rechazado" />
                                                        <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" title="Rechazar">
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </form>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredInscripciones.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500">
                                        No se encontraron inscripciones que coincidan con los filtros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="relative w-full h-[80vh]">
                            <Image
                                src={selectedImage}
                                alt="Comprobante de pago"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-900">Comprobante de Pago</span>
                            <a
                                href={selectedImage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Abrir original
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
