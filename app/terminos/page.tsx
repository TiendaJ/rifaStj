export default function TerminosPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 font-sans">
            <div className="mb-12 border-b border-gray-100 pb-8">
                <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tighter mb-4 text-black">Términos y Condiciones</h1>
                <p className="text-gray-500 font-bold uppercase tracking-wide text-xs">Última actualización: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-8 text-gray-600">
                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">1. Aceptación de los términos</h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        Al acceder y utilizar Jshop, aceptas cumplir con estos términos y condiciones.
                        Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestros servicios.
                    </p>
                </section>

                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">2. Descripción del servicio</h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        Jshop es una plataforma que facilita la organización y participación en rifas y la venta de productos tecnológicos.
                        Actuamos con transparencia y garantía en todas nuestras operaciones.
                    </p>
                </section>

                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">3. Reglas de participación y compra</h2>
                    <ul className="space-y-3 text-sm md:text-base list-none">
                        <li className="flex gap-2">
                            <span className="font-bold text-black">•</span>
                            Debes ser mayor de edad para realizar compras o participar en sorteos.
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-black">•</span>
                            Los pagos deben realizarse a través de nuestros canales oficiales (Yape, Plin, Transferencia).
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-black">•</span>
                            Los productos están sujetos a disponibilidad de stock.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">4. Política de reembolsos</h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        Para productos físicos, aceptamos devoluciones solo por defectos de fábrica dentro de las primeras 48 horas.
                        Para rifas, no se realizan reembolsos una vez adquirido el ticket.
                    </p>
                </section>
            </div>
        </div>
    );
}
