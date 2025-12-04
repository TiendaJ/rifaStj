'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserProfileForm from './UserProfileForm';
import { jsPDF } from 'jspdf';

type Props = {
    inscripciones: any[];
    user: any;
};

export default function DashboardTabs({ inscripciones, user }: Props) {
    const [activeTab, setActiveTab] = useState<'rifas' | 'perfil'>('rifas');

    const generateTicketPDF = (ins: any) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [150, 80] // Small ticket size
        });

        // Background
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 150, 80, 'F');

        // Border
        doc.setLineWidth(1);
        doc.setDrawColor(0, 0, 0);
        doc.rect(5, 5, 140, 70);

        // Header
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('TICKET DE RIFA', 75, 15, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('JSHOP S.A.C.', 75, 20, { align: 'center' });

        // Content
        doc.setFontSize(10);
        doc.text(`Rifa:`, 15, 30);
        doc.setFont('helvetica', 'bold');
        doc.text(`${ins.rifa.nombre}`, 35, 30);

        doc.setFont('helvetica', 'normal');
        doc.text(`Código:`, 15, 38);
        doc.setFont('helvetica', 'bold');
        doc.text(`${ins.id.slice(0, 8).toUpperCase()}`, 35, 38); // Shortened ID for display

        doc.setFont('helvetica', 'normal');
        doc.text(`Fecha:`, 15, 46);
        doc.text(`${new Date(ins.created_at).toLocaleDateString()}`, 35, 46);

        doc.text(`Estado:`, 15, 54);
        doc.setTextColor(ins.estado === 'confirmado' ? 0 : 100, ins.estado === 'confirmado' ? 128 : 100, 0);
        doc.text(`${ins.estado.toUpperCase()}`, 35, 54);
        doc.setTextColor(0, 0, 0);

        // Footer
        doc.setFontSize(8);
        doc.text('Este ticket es su comprobante de participación.', 75, 65, { align: 'center' });
        doc.text(`ID Completo: ${ins.id}`, 75, 70, { align: 'center' });

        doc.save(`ticket-${ins.id.slice(0, 8)}.pdf`);
    };

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
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="grid gap-3">
                            {inscripciones.map((ins) => (
                                <div key={ins.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 hover:border-gray-300 transition-colors">
                                    {/* Image */}
                                    <div className="flex-shrink-0">
                                        {ins.rifa.imagen ? (
                                            <img src={ins.rifa.imagen} alt={ins.rifa.nombre} className="w-12 h-12 rounded-md object-cover border border-gray-100" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-mono">
                                                IMG
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow min-w-0 text-center sm:text-left w-full sm:w-auto">
                                        <h3 className="text-sm font-bold text-black truncate">{ins.rifa.nombre}</h3>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-gray-500 mt-0.5">
                                            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">#{ins.id.slice(0, 8).toUpperCase()}</span>
                                            <span>{new Date(ins.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Status & Actions */}
                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-gray-100 pt-2 sm:pt-0 mt-1 sm:mt-0">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${ins.estado === 'confirmado' ? 'bg-green-50 text-green-700 border-green-200' :
                                            ins.estado === 'pendiente' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                ins.estado === 'rechazado' ? 'bg-red-50 text-red-700 border-red-200' :
                                                    'bg-blue-50 text-blue-700 border-blue-200'
                                            }`}>
                                            {ins.estado.toUpperCase()}
                                        </span>

                                        <button
                                            onClick={() => generateTicketPDF(ins)}
                                            className="flex items-center gap-1 text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
                                            title="Descargar Ticket PDF"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                            <span className="hidden sm:inline">Ticket</span>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {inscripciones.length === 0 && (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 px-4">
                                    <p className="text-gray-500 mb-4 text-sm">No tienes inscripciones activas.</p>
                                    <Link href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline">
                                        Ver Rifas Disponibles
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
