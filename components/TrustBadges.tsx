import { ShieldCheck, Lock, RotateCcw, CreditCard } from 'lucide-react';

export function TrustBadges() {
    return (
        <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100 mt-6">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-full shrink-0">
                    <Lock className="w-5 h-5 text-black" />
                </div>
                <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide text-gray-900 mb-0.5">Pago 100% Seguro</h4>
                    <p className="text-[10px] text-gray-500 leading-tight">Tu información está protegida con encriptación SSL.</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-full shrink-0">
                    <ShieldCheck className="w-5 h-5 text-black" />
                </div>
                <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide text-gray-900 mb-0.5">Garantía de Calidad</h4>
                    <p className="text-[10px] text-gray-500 leading-tight">Productos verificados y originales.</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-full shrink-0">
                    <RotateCcw className="w-5 h-5 text-black" />
                </div>
                <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide text-gray-900 mb-0.5">Devoluciones Fáciles</h4>
                    <p className="text-[10px] text-gray-500 leading-tight">Política de devolución transparente.</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-full shrink-0">
                    <CreditCard className="w-5 h-5 text-black" />
                </div>
                <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide text-gray-900 mb-0.5">Todos los medios</h4>
                    <p className="text-[10px] text-gray-500 leading-tight">Aceptamos Yape, Plin y tarjetas.</p>
                </div>
            </div>
        </div>
    );
}
