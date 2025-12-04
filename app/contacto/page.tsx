export default function ContactoPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Contáctanos</h1>
                <p className="text-gray-500 max-w-lg mx-auto">
                    ¿Tienes alguna duda o problema? Estamos aquí para ayudarte.
                    Envíanos un mensaje y te responderemos lo antes posible.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="asunto" className="text-sm font-medium text-gray-700">
                            Asunto
                        </label>
                        <input
                            type="text"
                            id="asunto"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="¿En qué podemos ayudarte?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="mensaje" className="text-sm font-medium text-gray-700">
                            Mensaje
                        </label>
                        <textarea
                            id="mensaje"
                            rows={4}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                            placeholder="Escribe tu mensaje aquí..."
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full bg-black text-white px-4 py-3 rounded-md font-medium hover:bg-gray-800 transition-all active:scale-95"
                    >
                        Enviar mensaje
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm text-gray-500 pt-8 border-t border-gray-100">
                <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <p>soporte@jshop.com</p>
                </div>
                <div>
                    <h3 className="font-semibold text-black mb-1">WhatsApp</h3>
                    <p>+51 951 381 439</p>
                </div>
                <div>
                    <h3 className="font-semibold text-black mb-1">Horario</h3>
                    <p>Lun - Sab: 8am - 8pm</p>
                </div>
            </div>
        </div>
    );
}
