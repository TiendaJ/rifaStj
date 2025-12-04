'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserProfileForm from './UserProfileForm';

type Props = {
    inscripciones: any[];
    user: any;
};

export default function DashboardTabs({ inscripciones, user }: Props) {
    const [activeTab, setActiveTab] = useState<'rifas' | 'perfil'>('rifas');

    return (
        <div>
            {/* Tabs Header */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('rifas')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'rifas'
                            ? 'text-black border-b-2 border-black'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Mis Rifas
                </button>
                <button
                    onClick={() => setActiveTab('perfil')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'perfil'
                            ? 'text-black border-b-2 border-black'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Mi Perfil
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'rifas' ? (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid gap-4">
                            {inscripciones.map((ins) => (
                                <div key={ins.id} className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-300 transition-colors">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        {ins.rifa.imagen ? (
                                            <img src={ins.rifa.imagen} alt={ins.rifa.nombre} className="w-16 h-16 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                                        ) : (
                                            <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400 font-mono flex-shrink-0">
                                                NO_IMG
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <h3 className="text-base md:text-lg font-bold text-black truncate">{ins.rifa.nombre}</h3>
                                            <p className="text-gray-500 text-xs md:text-sm">Inscrito el {new Date(ins.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
                                        <div className="text-left md:text-right">
                                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-medium">Estado</div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${ins.estado === 'confirmado' ? 'bg-green-50 text-green-700 border-green-200' :
                                                ins.estado === 'pendiente' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                    ins.estado === 'rechazado' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-blue-50 text-blue-700 border-blue-200'
                                                }`}>
                                                {ins.estado.toUpperCase()}
                                            </span>
                                        </div>
                                        {ins.comprobante_imagen && (
                                            <a href={ins.comprobante_imagen} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black text-sm underline font-medium whitespace-nowrap">
                                                Ver Comprobante
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {inscripciones.length === 0 && (
                                <div className="text-center py-12 md:py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300 px-4">
                                    <p className="text-gray-500 mb-6">No te has inscrito a ninguna rifa aún.</p>
                                    <Link href="/" className="btn-primary w-full md:w-auto inline-block">
                                        Explorar Rifas Disponibles
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
                        <UserProfileForm user={user} />
                    </div>
                )}
            </div>
        </div>
    );
}
