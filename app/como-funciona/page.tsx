import Link from "next/link";
import { Ticket, CreditCard, Gift, Search, ArrowRight, Calendar } from "lucide-react";

export default function ComoFuncionaPage() {
    const steps = [
        {
            icon: <Search className="w-6 h-6 text-white" />,
            title: "Explora",
            description: "Buscas un producto que te interese en nuestro catálogo de rifas exclusivas.",
            gradient: "from-pink-500 via-red-500 to-yellow-500"
        },
        {
            icon: <Ticket className="w-6 h-6 text-white" />,
            title: "Selecciona",
            description: "Selecciona la rifa y la cantidad de tickets que deseas adquirir.",
            gradient: "from-blue-400 via-indigo-500 to-purple-500"
        },
        {
            icon: <CreditCard className="w-6 h-6 text-white" />,
            title: "Participa",
            description: "Realizas el pago de forma segura y rápida con tus métodos favoritos.",
            gradient: "from-green-400 via-emerald-500 to-teal-500"
        },
        {
            icon: <Calendar className="w-6 h-6 text-white" />,
            title: "Espera",
            description: "Esperas el día que se realizará la rifa. Te avisaremos a tu número de teléfono si eres el ganador.",
            gradient: "from-orange-400 via-amber-500 to-yellow-500"
        }
    ];

    return (
        <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-white opacity-70"></div>

                <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
                        <span className="text-xs font-medium text-gray-600">Simple y Transparente</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-black">
                        Cómo Funciona Jshop
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Participar es tan fácil como ganar. Cuatro pasos simples te separan de tu próximo gran premio.
                    </p>
                </div>
            </section>

            {/* Steps Grid */}
            <section className="py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative p-1 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="relative h-full bg-white rounded-xl p-8 flex flex-col items-start transition-colors">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        {step.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-3 tracking-tight">
                                        {index + 1}. {step.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 border-t border-gray-100 relative overflow-hidden bg-gray-50">
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 tracking-tighter">
                        ¿Listo para probar tu suerte?
                    </h2>
                    <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
                        Únete a miles de ganadores que ya disfrutan de sus premios. Tu momento es ahora.
                    </p>
                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href="/"
                            className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Ver Rifas Disponibles
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/terminos"
                            className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors"
                        >
                            Ver Términos y Condiciones
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
