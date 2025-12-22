export default function DevolucionesPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 font-sans">
            <div className="mb-12 border-b border-gray-100 pb-8">
                <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tighter mb-4 text-black">Política de Devoluciones</h1>
                <p className="text-gray-500 font-bold uppercase tracking-wide text-xs">Última actualización: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-8 text-gray-600">
                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">1. Plazos de devolución</h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        Tienes un plazo de 48 horas tras recibir tu pedido para notificar cualquier defecto de fábrica o error en el envío.
                        Pasado este tiempo, aplicará la garantía estándar del fabricante si corresponde.
                    </p>
                </section>

                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">2. Condiciones del producto</h2>
                    <div className="leading-relaxed text-sm md:text-base space-y-2">
                        <p>Para aceptar una devolución, el producto debe cumplir con:</p>
                        <ul className="space-y-2 pl-4">
                            <li className="flex gap-2"><span className="font-bold text-black">-</span> Estar en su empaque original sin daños.</li>
                            <li className="flex gap-2"><span className="font-bold text-black">-</span> Incluir todos los accesorios y manuales.</li>
                            <li className="flex gap-2"><span className="font-bold text-black">-</span> No presentar signos de mal uso o manipulación indebida.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">3. Proceso</h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        Para iniciar un reclamo, contacta a nuestro soporte en WhatsApp con tu número de pedido y fotos/video del problema.
                        Evaluaremos el caso en un plazo máximo de 24 horas.
                    </p>
                </section>

                <section>
                    <h2 className="font-bold uppercase tracking-wide text-black mb-4 text-sm">4. Reembolsos</h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        Si procede el reembolso, este se realizará a la misma cuenta o tarjeta utilizada para la compra en un plazo de 3 a 5 días hábiles.
                    </p>
                </section>
            </div>
        </div>
    );
}
