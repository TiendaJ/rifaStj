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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-black mb-2 text-lg">Información de Contacto</h3>
                        <div className="space-y-4 text-gray-600">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">📍</span>
                                <div>
                                    <p className="font-medium text-black">Dirección</p>
                                    <p>Jr. Augusto B.Leguia 1201</p>
                                    <p>Tarapoto, Perú</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl">✉️</span>
                                <div>
                                    <p className="font-medium text-black">Email</p>
                                    <p>soporte@jshop.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl">📱</span>
                                <div>
                                    <p className="font-medium text-black">WhatsApp</p>
                                    <p>+51 951 381 439</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl">⏰</span>
                                <div>
                                    <p className="font-medium text-black">Horario</p>
                                    <p>Lun - Sab: 8am - 8pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-black mb-3 text-lg">Síguenos</h3>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                <span className="sr-only">TikTok</span>
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="h-64 md:h-full min-h-[300px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.332377366368!2d-76.36867862526858!3d-6.479541563353457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ba0bf70286617b%3A0x6280436257762630!2sJr.%20Augusto%20B.%20Leguia%201201%2C%20Tarapoto%2022202!5e0!3m2!1ses!2spe!4v1701700000000!5m2!1ses!2spe"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
