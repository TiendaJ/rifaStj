export default function PrivacidadPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 font-sans">
            <div className="mb-12 border-b border-gray-100 pb-8">
                <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tighter mb-4 text-black">Política de Privacidad</h1>
                <p className="text-gray-500 font-bold uppercase tracking-wide text-xs">Última actualización: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-8 text-gray-600">
                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">1. Recopilación de información</h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        Recopilamos información que nos proporcionas directamente, como tu nombre, correo electrónico
                        y número de teléfono al registrarte o participar en una rifa.
                    </p>
                </section>

                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">2. Uso de la información</h2>
                    <div className="leading-relaxed text-sm md:text-base space-y-2">
                        <p>Utilizamos tu información para:</p>
                        <ul className="space-y-2 pl-4">
                            <li className="flex gap-2"><span className="font-bold text-black">-</span> Procesar tus participaciones.</li>
                            <li className="flex gap-2"><span className="font-bold text-black">-</span> Enviarte confirmaciones y actualizaciones.</li>
                            <li className="flex gap-2"><span className="font-bold text-black">-</span> Mejorar nuestros servicios.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">3. Protección de datos</h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales
                        contra acceso no autorizado, pérdida o alteración. Tienes derecho a solicitar la eliminación de tus datos escribiendo a soporte.
                    </p>
                </section>
            </div>
        </div>
    );
}
