import Link from "next/link";
import { Ticket, CreditCard, Gift, Search, ArrowRight } from "lucide-react";

export default function ComoFuncionaPage() {
    const steps = [
        {
            icon: <Search className="w-6 h-6 text-white" />,
            title: "Explora",
            description: "Navega por nuestro catálogo exclusivo de rifas. Tecnología, experiencias y premios que te sorprenderán.",
            gradient: "from-pink-500 via-red-500 to-yellow-500"
        },
        {
            icon: <Ticket className="w-6 h-6 text-white" />,
            title: "Selecciona",
            description: "Elige tus números de la suerte. Usa nuestra herramienta de selección aleatoria si te sientes con suerte.",
            gradient: "from-blue-400 via-indigo-500 to-purple-500"
        },
        {
            icon: <CreditCard className="w-6 h-6 text-white" />,
            title: "Participa",
            description: "Pago seguro y rápido con Yape, Plin o transferencia. Tu seguridad es nuestra prioridad absoluta.",
            gradient: "from-green-400 via-emerald-500 to-teal-500"
        },
        {
            icon: <Gift className="w-6 h-6 text-white" />,
            title: "Gana",
            description: "Recibe tu ticket digital al instante. ¡Sigue el sorteo en vivo y prepárate para celebrar!",
            gradient: "from-orange-400 via-amber-500 to-yellow-500"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-40"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm mb-8">
                        <span className="text-xs font-medium text-gray-300">Simple y Transparente</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        Cómo Funciona Jshop
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Participar es tan fácil como ganar. Cuatro pasos simples te separan de tu próximo gran premio.
                    </p>
                </div>
            </section>

            {/* Steps Grid */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative p-1 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                                <div className="relative h-full bg-black rounded-xl p-8 flex flex-col items-start border border-gray-800 group-hover:border-gray-700 transition-colors">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {step.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                        {index + 1}. {step.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 border-t border-gray-900 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"></div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter">
                        ¿Listo para probar tu suerte?
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
                        Únete a miles de ganadores que ya disfrutan de sus premios. Tu momento es ahora.
                    </p>
                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                    >
                        Ver Rifas Disponibles
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
