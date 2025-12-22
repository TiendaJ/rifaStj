'use client';
import Link from "next/link";
import { Ticket, CreditCard, Gift, Search, ArrowRight, Calendar } from "lucide-react";

export default function ComoFuncionaPage() {
    const steps = [
        {
            number: "01",
            title: "Explora",
            description: "Busca un producto que te interese en nuestro catálogo de rifas exclusivas o venta directa."
        },
        {
            number: "02",
            title: "Selecciona",
            description: "Elige la rifa y la cantidad de tickets que deseas adquirir, o compra el producto directamente."
        },
        {
            number: "03",
            title: "Participa",
            description: "Realiza el pago de forma segura con Yape, Plin o tarjeta. Todo 100% online."
        },
        {
            number: "04",
            title: "Gana",
            description: "Espera el sorteo o recibe tu producto en tiempo récord. Garantía asegurada."
        }
    ];

    return (
        <div className="font-sans text-black bg-white">
            {/* Hero Section */}
            <section className="bg-black text-white py-20 md:py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                        ¿Cómo Funciona?
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Es simple. Elige tu tecnología, compra tu ticket y espera los resultados.
                        Sin complicaciones.
                    </p>
                </div>
            </section>

            {/* Steps Grid */}
            <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-start group">
                            <span className="text-6xl md:text-7xl font-black text-gray-100 mb-6 group-hover:text-black transition-colors duration-500">
                                {step.number}
                            </span>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 font-medium leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#F5F5F5] py-20 md:py-32 px-6 text-center border-t border-gray-200">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                        ¿Listo para probar tu suerte?
                    </h2>
                    <p className="text-gray-500 font-medium mb-10 max-w-lg mx-auto">
                        Únete a miles de ganadores. Tu próximo dispositivo favorito te espera.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/productos"
                            className="inline-flex items-center justify-center bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-gray-900 transition-all hover:scale-105"
                        >
                            Ver Catálogo
                        </Link>
                        <Link
                            href="/terminos"
                            className="inline-flex items-center justify-center bg-transparent border-2 border-black text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                        >
                            Ver Bases
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
