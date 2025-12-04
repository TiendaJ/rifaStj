export default function PrivacidadPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Política de Privacidad</h1>
                <p className="text-gray-500">Última actualización: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
                <section>
                    <h2 className="text-xl font-semibold text-black mb-3">1. Recopilación de información</h2>
                    <p>
                        Recopilamos información que nos proporcionas directamente, como tu nombre, correo electrónico
                        y número de teléfono al registrarte o participar en una rifa.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black mb-3">2. Uso de la información</h2>
                    <p>
                        Utilizamos tu información para:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Procesar tus participaciones en las rifas.</li>
                        <li>Enviarte confirmaciones y actualizaciones sobre los sorteos.</li>
                        <li>Mejorar nuestros servicios y prevenir fraudes.</li>
                        <li>Cumplir con obligaciones legales.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black mb-3">3. Protección de datos</h2>
                    <p>
                        Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales
                        contra acceso no autorizado, pérdida o alteración.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black mb-3">4. Contacto</h2>
                    <p>
                        Si tienes preguntas sobre nuestra política de privacidad, puedes contactarnos a través de nuestra
                        página de contacto.
                    </p>
                </section>
            </div>
        </div>
    );
}
