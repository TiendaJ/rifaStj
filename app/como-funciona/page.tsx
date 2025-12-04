import Link from "next/link";
import { Ticket, CreditCard, Gift, Search } from "lucide-react";

export default function ComoFuncionaPage() {
    const steps = [
        {
            icon: <Search className="w-8 h-8 text-white" />,
            title: "1. Elige tu Rifa",
            description: "Explora nuestro catálogo de rifas activas. Tenemos premios increíbles esperando por ti, desde tecnología hasta experiencias únicas.",
            color: "bg-blue-500"
        },
        {
            icon: <Ticket className="w-8 h-8 text-white" />,
            title: "2. Selecciona tus Números",
            description: "Elige tus números de la suerte manualmente o utiliza nuestra herramienta de selección aleatoria para mayor emoción.",
            color: "bg-purple-500"
        },
        {
            icon: <CreditCard className="w-8 h-8 text-white" />,
            title: "3. Realiza el Pago",
            description: "Paga de forma rápida y segura utilizando Yape, Plin o transferencia bancaria. Tu seguridad es nuestra prioridad.",
            color: "bg-pink-500"
        },
        {
            icon: <Gift className="w-8 h-8 text-white" />,
            title: "4. ¡Gana!",
            description: "Una vez confirmado tu pago, recibirás tu ticket digital. ¡Sigue la transmisión en vivo y descubre si eres el ganador!",
            color: "bg-green-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 bg-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-50"></div>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        ¿Cómo Funciona?
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                        Participar en nuestras rifas es muy sencillo. Sigue estos 4 pasos y estarás más cerca de ganar premios increíbles.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center group">
                                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        ¿Listo para ganar?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        No pierdas la oportunidad de llevarte uno de nuestros grandes premios. ¡Empieza ahora!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                    >
                        Ver Rifas Disponibles
                    </Link>
                </div>
            </section>
        </div>
    );
}
