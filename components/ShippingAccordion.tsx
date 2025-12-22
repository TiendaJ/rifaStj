'use client';

import { Truck, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function ShippingAccordion() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-black" />
                    <span className="font-bold text-sm uppercase tracking-wide">Envíos y Soporte</span>
                </div>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
                <div className="p-4 bg-white text-sm text-gray-600 space-y-4">
                    <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 mt-0.5 text-black" />
                        <div>
                            <p className="font-bold text-black text-xs uppercase mb-1">Tiempo de Entrega</p>
                            <p className="text-xs">Tarapoto: <span className="text-green-600 font-bold">Mismo día / 24h</span></p>
                            <p className="text-xs">Nacional: <span className="font-medium">2 a 3 días hábiles</span> (Shalom/Olva)</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Truck className="w-4 h-4 mt-0.5 text-black" />
                        <div>
                            <p className="font-bold text-black text-xs uppercase mb-1">Costos de Envío</p>
                            <ul className="text-xs list-disc pl-3 space-y-1">
                                <li>Tarapoto Centro: <strong>Gratis</strong></li>
                                <li>Alrededores: <strong>S/ 5.00</strong></li>
                                <li>Envíos Nacionales: <strong>Pago en destino</strong></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 border-t border-gray-100 pt-3">
                        <HelpCircle className="w-4 h-4 mt-0.5 text-black" />
                        <div>
                            <p className="font-bold text-black text-xs uppercase mb-1">¿Necesitas Ayuda?</p>
                            <p className="text-xs">Soporte directo por WhatsApp para seguimiento y dudas.</p>
                            <a href="https://wa.me/51951381439" target="_blank" className="text-xs font-bold underline mt-1 block hover:text-indigo-600">Contactar Soporte</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
