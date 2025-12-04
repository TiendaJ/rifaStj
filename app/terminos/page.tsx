export default function TerminosPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Términos y Condiciones</h1>
                <p className="text-gray-500">Última actualización: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
                <section>
                    <h2 className="text-xl font-semibold text-black mb-3">1. Aceptación de los términos</h2>
                    <p>
                        Al acceder y utilizar Jshop, aceptas cumplir con estos términos y condiciones.
                        Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestros servicios.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black mb-3">2. Descripción del servicio</h2>
                    <p>
                        Jshop es una plataforma que facilita la organización y participación en rifas.
                        Actuamos como intermediarios tecnológicos para la gestión de tickets y sorteos.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black mb-3">3. Reglas de participación</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Debes ser mayor de edad para participar.</li>
                        <li>Los pagos deben realizarse a través de los medios autorizados.</li>
                        <li>Los tickets son intransferibles una vez registrados.</li>
                        <li>La fecha del sorteo puede estar sujeta a cambios por fuerza mayor.</li>
                        <li>El método de sorteo será determinado por los organizadores según lo consideren más conveniente.</li>
                        <li>Es requisito indispensable que el ganador permita tomarse una foto recibiendo el premio.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black mb-3">4. Política de reembolsos</h2>
                    <p>
                        No se realizan reembolsos una vez adquirido el ticket, salvo en caso de cancelación definitiva del evento
                        por parte de los organizadores.
                    </p>
                </section>
            </div>
        </div>
    );
}
