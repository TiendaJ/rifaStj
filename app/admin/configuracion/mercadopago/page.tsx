'use client';

import { useState, useEffect } from 'react';
import { getMercadoPagoConfig, saveMercadoPagoConfig } from '@/app/actions/mercadopago';
import { Save, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';

export default function MercadoPagoConfigPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [form, setForm] = useState({
        id: '',
        public_key: '',
        access_token: '',
        environment: 'sandbox',
        activo: true
    });

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        setIsLoading(true);
        const result = await getMercadoPagoConfig();
        if (result.success && result.data) {
            setForm({
                id: result.data.id,
                public_key: result.data.public_key,
                access_token: result.data.access_token,
                environment: result.data.environment,
                activo: result.data.activo
            });
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        const result = await saveMercadoPagoConfig(form);

        if (result.success) {
            setMessage({ type: 'success', text: 'Configuración guardada correctamente.' });
            if (result.data) {
                setForm(prev => ({ ...prev, id: result.data?.id || '' }));
            }
        } else {
            setMessage({ type: 'error', text: result.error || 'Error al guardar.' });
        }
        setIsSaving(false);
    };

    if (isLoading) return <div className="p-8">Cargando...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-3 rounded-full">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Mercado Pago</h1>
                    <p className="text-gray-500">Configuración de pasarela de pagos</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {message && (
                        <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            <p>{message.text}</p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Public Key</label>
                                <input
                                    type="text"
                                    required
                                    value={form.public_key}
                                    onChange={e => setForm(prev => ({ ...prev, public_key: e.target.value }))}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    placeholder="APP_USR-..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Access Token</label>
                                <input
                                    type="password"
                                    required
                                    value={form.access_token}
                                    onChange={e => setForm(prev => ({ ...prev, access_token: e.target.value }))}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    placeholder="APP_USR-..."
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Entorno</label>
                                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, environment: 'sandbox' }))}
                                        className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${form.environment === 'sandbox'
                                                ? 'bg-white shadow text-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Sandbox (Pruebas)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, environment: 'production' }))}
                                        className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${form.environment === 'production'
                                                ? 'bg-white shadow text-green-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Producción
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Use Sandbox para pruebas. Cambie a Producción solo cuando esté listo para recibir pagos reales.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, activo: !prev.activo }))}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${form.activo ? 'bg-green-500' : 'bg-gray-200'
                                        }`}
                                >
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${form.activo ? 'translate-x-5' : 'translate-x-0'
                                        }`} />
                                </button>
                                <span className="text-sm font-medium text-gray-700">Estado: {form.activo ? 'Activo' : 'Inactivo'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Guardar Configuración
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
