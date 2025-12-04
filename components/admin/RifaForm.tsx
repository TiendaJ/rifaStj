'use client';

import { createRifa, updateRifa } from '@/app/actions/rifa';
import { useActionState } from 'react';
import Link from 'next/link';

type Rifa = {
    id?: string;
    nombre?: string;
    descripcion?: string;
    monto?: number;
    precio_producto?: number | null;
    capacidad_maxima?: number;
    estado?: string;
    imagen?: string | null;
    fecha_sorteo?: Date | null;
};

export default function RifaForm({ rifa }: { rifa?: Rifa }) {
    const actionFn = rifa?.id ? updateRifa.bind(null, rifa.id) : createRifa;
    const [state, action, pending] = useActionState(actionFn, undefined);

    return (
        <form action={action} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        name="nombre"
                        defaultValue={rifa?.nombre}
                        required
                        className="input-tech"
                    />
                    {state?.error && 'nombre' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.nombre?.[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                        name="descripcion"
                        defaultValue={rifa?.descripcion}
                        required
                        rows={4}
                        className="input-tech"
                    />
                    {state?.error && 'descripcion' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.descripcion?.[0]}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio Ticket ($)</label>
                        <input
                            name="monto"
                            type="number"
                            step="0.01"
                            defaultValue={rifa?.monto}
                            required
                            className="input-tech"
                        />
                        {state?.error && 'monto' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.monto?.[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio Producto (Ref.)</label>
                        <input
                            name="precio_producto"
                            type="number"
                            step="0.01"
                            defaultValue={rifa?.precio_producto ?? ''}
                            className="input-tech"
                        />
                        {state?.error && 'precio_producto' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.precio_producto?.[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad Máxima</label>
                        <input
                            name="capacidad_maxima"
                            type="number"
                            defaultValue={rifa?.capacidad_maxima}
                            required
                            className="input-tech"
                        />
                        {state?.error && 'capacidad_maxima' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.capacidad_maxima?.[0]}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del Sorteo</label>
                    <input
                        name="fecha_sorteo"
                        type="datetime-local"
                        defaultValue={rifa?.fecha_sorteo ? new Date(rifa.fecha_sorteo).toISOString().slice(0, 16) : ''}
                        className="input-tech"
                    />
                    {state?.error && 'fecha_sorteo' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.fecha_sorteo?.[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                        name="estado"
                        defaultValue={rifa?.estado || 'activa'}
                        className="input-tech"
                    >
                        <option value="activa">Activa</option>
                        <option value="pausada">Pausada</option>
                        <option value="finalizada">Finalizada</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                    <input
                        name="imagen"
                        type="file"
                        accept="image/*"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition-all"
                    />
                    {rifa?.imagen && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Imagen actual:</p>
                            <img src={rifa.imagen || undefined} alt="Preview" className="h-20 w-auto rounded-lg border border-gray-200" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Link href="/admin/rifas" className="px-4 py-2 text-gray-500 hover:text-black transition-colors">
                    Cancelar
                </Link>
                <button
                    type="submit"
                    disabled={pending}
                    className="btn-primary"
                >
                    {pending ? 'Guardando...' : (rifa?.id ? 'Actualizar Rifa' : 'Crear Rifa')}
                </button>
            </div>
        </form>
    );
}
