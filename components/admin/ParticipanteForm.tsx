'use client';

import { createParticipante, updateParticipante } from '@/app/actions/participante';
import { useActionState } from 'react';
import Link from 'next/link';
import LocationSearcher from './LocationSearcher';

type Participante = {
    id?: string;
    dni?: string | null;
    telefono?: string | null;
    email?: string | null;
    nombre?: string | null;
    estado_cuenta?: string;
    direccion?: string | null;
    departamento?: string | null;
    provincia?: string | null;
    distrito?: string | null;
};

export default function ParticipanteForm({ participante }: { participante?: Participante }) {
    const actionFn = participante?.id ? updateParticipante.bind(null, participante.id) : createParticipante;
    const [state, action, pending] = useActionState(actionFn, undefined);

    return (
        <form action={action} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                        <input
                            name="dni"
                            defaultValue={participante?.dni || ''}
                            maxLength={8}
                            required
                            className="input-tech"
                        />
                        {state?.error && 'dni' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.dni?.[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                            name="telefono"
                            type="tel"
                            defaultValue={participante?.telefono || ''}
                            required
                            className="input-tech"
                        />
                        {state?.error && 'telefono' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.telefono?.[0]}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Opcional)</label>
                    <input
                        name="email"
                        type="email"
                        defaultValue={participante?.email || ''}
                        className="input-tech"
                        placeholder="ejemplo@correo.com"
                    />
                    {state?.error && 'email' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.email?.[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        name="nombre"
                        defaultValue={participante?.nombre || ''}
                        className="input-tech"
                    />
                    {state?.error && 'nombre' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.nombre?.[0]}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LocationSearcher
                        defaultDep={participante?.departamento}
                        defaultProv={participante?.provincia}
                        defaultDist={participante?.distrito}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Exacta</label>
                        <input
                            name="direccion"
                            defaultValue={participante?.direccion || ''}
                            className="input-tech"
                            placeholder="Av. Principal 123..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {participante?.id ? 'Nueva Contraseña (Opcional)' : 'Contraseña'}
                    </label>
                    <input
                        name="password"
                        type="password"
                        required={!participante?.id}
                        className="input-tech"
                        placeholder={participante?.id ? 'Dejar en blanco para mantener actual' : 'Mínimo 6 caracteres'}
                    />
                    {state?.error && 'password' in state.error && <p className="text-red-500 text-xs mt-1">{state.error.password?.[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado de Cuenta</label>
                    <select
                        name="estado_cuenta"
                        defaultValue={participante?.estado_cuenta || 'activo'}
                        className="input-tech"
                    >
                        <option value="activo">Activo</option>
                        <option value="bloqueado">Bloqueado</option>
                    </select>
                </div>

                {state?.error && 'root' in state.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                        {state.error.root?.[0]}
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Link href="/admin/participantes" className="px-4 py-2 text-gray-500 hover:text-black transition-colors">
                    Cancelar
                </Link>
                <button
                    type="submit"
                    disabled={pending}
                    className="btn-primary"
                >
                    {pending ? 'Guardando...' : (participante?.id ? 'Actualizar Participante' : 'Crear Participante')}
                </button>
            </div>
        </form>
    );
}
