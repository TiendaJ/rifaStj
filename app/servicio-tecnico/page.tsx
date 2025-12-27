import { Wrench, Battery, Smartphone, ShieldCheck, Zap, Droplets, MapPin, Truck, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import FacebookFeed from "@/components/FacebookFeed";

export default function ServicioTecnicoPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* HERO SECTION */}
            <section className="relative w-full h-[600px] flex items-center justify-center bg-black text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1588702547923-7093a6c3f067?q=80&w=1500&auto=format&fit=crop"
                        alt="Service Hero"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
                    <p className="text-[#F5F5F5] font-semibold uppercase tracking-[2px] mb-4 text-[14px]">Soporte Especializado</p>
                    <h1 className="text-[40px] md:text-[70px] font-extrabold leading-[1] tracking-[-1px] uppercase mb-6">
                        Reparación <br /> Profesional.
                    </h1>
                    <p className="text-[16px] md:text-[18px] text-gray-200 mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
                        Repuestos, técnicos con experiencia y garantía real. <br />Devolvemos la vida a tu equipo sin excusas.
                    </p>
                    <Link
                        href="https://wa.me/51951381439?text=Hola,%20quisiera%20consultar%20por%20servicio%20técnico"
                        target="_blank"
                        className="inline-flex items-center justify-center bg-white text-black font-bold text-[15px] uppercase tracking-[1px] px-10 py-4 min-h-[52px] border-2 border-white hover:bg-transparent hover:text-white transition-colors rounded-none"
                    >
                        <Wrench className="w-5 h-5 mr-2" />
                        Cotizar Reparación
                    </Link>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-[100px] border-b border-[#E5E5E5]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-left mb-16">
                        <h2 className="text-[30px] md:text-[40px] font-extrabold leading-[1] tracking-[-0.5px] uppercase mb-4">Nuestros Servicios</h2>
                        <p className="text-[#6E6E6E] max-w-2xl text-[16px]">
                            Soluciones integrales para los problemas más exigentes. No parches, reparaciones.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#E5E5E5]">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-8 border-r border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors group">
                                <service.icon className="w-10 h-10 mb-6 text-black group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                <h3 className="text-[18px] font-bold uppercase mb-3 tracking-tight">{service.title}</h3>
                                <p className="text-[#6E6E6E] text-[14px] leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DELIVERY SECTION */}
            <section className="py-[100px] bg-[#F5F5F5]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-start gap-12">
                        <div className="flex-1">
                            <div className="inline-block p-3 bg-black text-white mb-6">
                                <Truck className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h2 className="text-[30px] md:text-[50px] font-extrabold leading-[1] tracking-[-1px] uppercase mb-6 text-black">
                                Recojos Delivery <br /> y Envíos.
                            </h2>
                            <p className="text-[16px] text-black font-medium mb-8 max-w-md">
                                "Para cada recojo de equipo solicitamos tus datos y te entregamos tu Ticket de Servicio."
                            </p>

                            <div className="space-y-8">
                                <div className="bg-white border-l-4 border-black p-6 shadow-sm">
                                    <h3 className="text-[18px] font-bold uppercase mb-2 flex items-center gap-2">
                                        Protocolo de Seguridad
                                    </h3>
                                    <p className="text-[#6E6E6E] text-[15px]">
                                        Garantía total de recepción. Tu equipo está seguro desde que sale de tus manos.
                                    </p>
                                </div>
                                <div className="bg-white border-l-4 border-black p-6 shadow-sm">
                                    <h3 className="text-[18px] font-bold uppercase mb-2">
                                        Cobertura Regional (San Martín)
                                    </h3>
                                    <p className="text-[#6E6E6E] text-[15px] mb-3">
                                        Recibimos paquetes y teléfonos de toda la región. Delivery previa coordinación.
                                    </p>
                                    <div className="flex gap-4 text-2xl grayscale opacity-70">
                                        <span>🌴</span><span>📦</span><span>🚗</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full h-[500px] bg-gray-200 relative">
                            <img
                                src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2670&auto=format&fit=crop"
                                alt="Delivery"
                                className="w-full h-full object-cover grayscale mix-blend-multiply"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* STEPS SECTION */}
            <section className="py-[100px] bg-black text-white border-y border-[#333]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="mb-16 border-b border-[#333] pb-8">
                        <h2 className="text-[30px] md:text-[40px] font-extrabold uppercase tracking-[-0.5px]">Proceso Simplificado</h2>
                        <p className="text-gray-400 mt-2">Tu equipo listo en 4 pasos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                <div className="text-[80px] font-black text-[#222] leading-none mb-4 group-hover:text-white transition-colors duration-500">
                                    0{index + 1}
                                </div>
                                <h3 className="text-[18px] font-bold uppercase mb-3 text-white">{step.title}</h3>
                                <p className="text-gray-400 text-[14px] leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LOCATION & CONTACT SECTION */}
            <section className="py-[100px]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-0 border-2 border-black">
                        {/* Location */}
                        <div className="bg-black text-white p-10 md:p-16 flex flex-col justify-center">
                            <MapPin className="w-12 h-12 mb-8 text-white" strokeWidth={1.5} />
                            <h2 className="text-[30px] md:text-[42px] font-extrabold uppercase mb-8 leading-[1.1]">
                                Sede <br /> Tarapoto.
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-500 text-[12px] uppercase tracking-[2px] font-bold mb-2">Dirección</p>
                                    <p className="text-[18px] font-medium border-b border-[#333] pb-2 inline-block">Jr. Augusto B. Leguia 1201</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[12px] uppercase tracking-[2px] font-bold mb-4">Referencias</p>
                                    <ul className="space-y-3 text-gray-300 text-[15px]">
                                        <li className="flex items-start gap-3">
                                            <span className="text-white mt-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
                                            A dos cuadras de Electro Oriente
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-white mt-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
                                            En una misma esquina
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-white mt-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
                                            Al costado del colegio Adventista
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contact Numbers */}
                        <div className="bg-white p-10 md:p-16 flex flex-col justify-center border-l-0 md:border-l-2 border-black">
                            <Phone className="w-12 h-12 mb-8 text-black" strokeWidth={1.5} />
                            <h2 className="text-[30px] md:text-[42px] font-extrabold uppercase mb-8 leading-[1.1] text-black">
                                Contacto <br /> Oficial.
                            </h2>
                            <div className="space-y-4 w-full">
                                <a
                                    href="https://wa.me/51951381439"
                                    target="_blank"
                                    className="flex items-center justify-between w-full p-6 border-2 border-[#E5E5E5] hover:border-black hover:bg-black hover:text-white transition-all duration-300 group "
                                >
                                    <span className="text-[20px] font-bold tracking-tight">951 381 439</span>
                                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>

                                <a
                                    href="https://wa.me/51962739577"
                                    target="_blank"
                                    className="flex items-center justify-between w-full p-6 border-2 border-[#E5E5E5] hover:border-black hover:bg-black hover:text-white transition-all duration-300 group"
                                >
                                    <span className="text-[20px] font-bold tracking-tight">962 739 577</span>
                                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FACEBOOK COMMUNITY SECTION */}
            <section className="py-[100px] bg-[#F9F9F9] border-t border-[#E5E5E5]">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <div className="mb-12">
                        <h2 className="text-[30px] md:text-[50px] font-extrabold leading-[1] tracking-[-1px] uppercase mb-4 text-black">
                            Comunidad Jshop
                        </h2>
                        <p className="text-[16px] text-[#666] font-medium max-w-2xl mx-auto">
                            Únete a nuestra comunidad en Facebook. Mira los últimos trabajos, sorteos y las opiniones de nuestros clientes satisfechos.
                        </p>
                    </div>

                    <div className="flex justify-center w-full">
                        <div className="bg-white p-4 shadow-xl border border-gray-100 max-w-[550px] w-full">
                            <FacebookFeed pageUrl="https://www.facebook.com/jarelrepair" height={600} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const services = [
    {
        title: "Cambio de Pantalla",
        description: "Reemplazo de pantallas rotas o táctiles defectuosos con repuestos de calidad original.",
        icon: Smartphone
    },
    {
        title: "Batería",
        description: "Instalación de baterías nuevas para recuperar la autonomía original de tu dispositivo.",
        icon: Battery
    },
    {
        title: "Software",
        description: "Actualizaciones, formateos, recuperación de datos y solución de errores de sistema.",
        icon: Zap
    },
    {
        title: "Daño por Agua",
        description: "Limpieza química profesional para equipos accidentados con líquidos o humedad.",
        icon: Droplets
    }
];

const steps = [
    {
        title: "Recepción",
        description: "Trae tu equipo a nuestra tienda o envíalo por delivery. Documentamos todo."
    },
    {
        title: "Diagnóstico",
        description: "Revisamos el problema a fondo y te damos un presupuesto exacto sin sorpresas."
    },
    {
        title: "Reparación",
        description: "Nuestros expertos reparan tu equipo con precisión y repuestos de calidad."
    },
    {
        title: "Entrega",
        description: "Recoge tu equipo funcionando al 100% y con garantía por escrito."
    }
];
