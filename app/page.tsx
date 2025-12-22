import prisma from '@/lib/prisma';
import Link from 'next/link';
// import RifaCard from '@/components/RifaCard'; // Not used in new layout
import { getProductos } from '@/app/actions/productos';
import {
  ShieldCheck,
  MapPin,
  CreditCard,
  Smartphone,
  Headphones,
  Wrench,
  Flame,
  Star,
  ShoppingBag,
  ArrowRight,
  Image as ImageIcon,
  MessageCircle,
  Clock
} from 'lucide-react';

// Revalidate every minute to keep the list fresh
export const revalidate = 60;

export default async function HomePage() {
  // Fetch products for Featured section (take 4 for display)
  const { productos: allProductos } = await getProductos();
  const productos = allProductos.slice(0, 4);

  // We could still fetch rifas if needed, but the UI has replaced them.
  // const rifas = ... 


  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner Section - Full Width */}
      <section className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center mb-16 overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
            alt="Jshop Tecnología y Reparación"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Professional Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-10">
          <div className="max-w-3xl animate-fade-in text-left">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-600/90 text-white text-xs md:text-sm font-bold tracking-wider mb-6 uppercase border border-indigo-400/30 backdrop-blur-md shadow-lg">
              <MapPin size={14} /> Tienda Oficial en Tarapoto
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white leading-[1.1] drop-shadow-xl">
              Tecnología que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                Mueve tu Mundo
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-xl leading-relaxed font-light drop-shadow-md">
              Especialistas en <strong>reparación de celulares</strong> y venta de equipos premium. Garantía real y el mejor servicio post-venta de la ciudad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
              <Link
                href="/productos"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-full transition-all duration-300 text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1"
              >
                <ShoppingBag size={20} />
                Ver Catálogo
              </Link>
              <a
                href="https://wa.me/51951381439"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gray-800/50 border border-gray-600 backdrop-blur-md hover:bg-gray-700/70 text-white font-bold rounded-full transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:-translate-y-1"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 w-full space-y-16 md:space-y-24 pb-16">

        {/* 2. Quick Trust Indicators */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 -mt-24 relative z-20 mx-4 md:mx-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-indigo-50 p-4 rounded-full mb-4 text-indigo-600">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Garantía Asegurada</h3>
              <p className="text-gray-500 text-sm max-w-xs">Todos nuestros productos y servicios cuentan con respaldo total.</p>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-indigo-50 p-4 rounded-full mb-4 text-indigo-600">
                <MapPin size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Local Físico</h3>
              <p className="text-gray-500 text-sm max-w-xs">Ubícanos fácilmente en el centro de Tarapoto. Compra con seguridad.</p>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-indigo-50 p-4 rounded-full mb-4 text-indigo-600">
                <CreditCard size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Todos los Medios de Pago</h3>
              <p className="text-gray-500 text-sm max-w-xs">Aceptamos Yape, Plin, Transferencias y todas las Tarjetas.</p>
            </div>
          </div>
        </section>

        {/* 3. Featured Products */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2">Lo más vendido</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center">Productos Destacados</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {productos.map((producto) => (
              <Link
                href={`/productos/${producto.id}`}
                key={producto.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
              >
                <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
                  {producto.fotos && producto.fotos.length > 0 ? (
                    <img
                      src={producto.fotos[0]}
                      alt={producto.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon size={48} />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white p-2 rounded-full shadow-md text-gray-900 block">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                  {!producto.cantidad && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Agotado</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 md:text-lg group-hover:text-indigo-600 transition-colors">
                    {producto.nombre}
                  </h3>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium">Precio</span>
                      <span className="text-xl font-bold text-gray-900">S/ {producto.precio.toFixed(2)}</span>
                    </div>
                    <span className="bg-gray-900 text-white p-2.5 rounded-xl group-hover:bg-indigo-600 transition-colors shadow-lg shadow-gray-200">
                      <ShoppingBag size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/productos" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors group text-lg">
              Ver todo el catálogo
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* 4. Categorias */}
        <section>
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
            <div className="md:flex justify-between items-end mb-10">
              <div className="md:max-w-lg mb-6 md:mb-0">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Explora por Categorías</h2>
                <p className="text-gray-600 text-lg">Encuentra rápidamente lo que necesitas. Organizamos todo para ti.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* Celulares */}
              <Link href="/productos?q=celulares" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all text-center group flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <Smartphone size={40} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">Celulares</span>
                  <span className="text-sm text-gray-400">iPhone, Samsung...</span>
                </div>
              </Link>

              {/* Accesorios */}
              <Link href="/productos?q=accesorios" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all text-center group flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <Headphones size={40} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">Accesorios</span>
                  <span className="text-sm text-gray-400">Case, Audífonos...</span>
                </div>
              </Link>

              {/* Reparación */}
              <a href="https://wa.me/51951381439" target="_blank" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all text-center group flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <Wrench size={40} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">Servicio Técnico</span>
                  <span className="text-sm text-gray-400">Reparaciones express</span>
                </div>
              </a>

              {/* Ofertas */}
              <Link href="/productos" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all text-center group flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <Flame size={40} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 text-lg group-hover:text-red-600 transition-colors">Ofertas</span>
                  <span className="text-sm text-gray-400">Precios bajos</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Servicio Tecnico Banner */}
        <section className="bg-gray-900 rounded-3xl overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 opacity-30">
            {/* Abstract tech background pattern or image */}
            <img src="https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background Tech" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>

          <div className="relative z-10 p-10 md:p-20 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Wrench size={16} /> Especialistas en Hardware
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">¿Tu celular falló? <br /> <span className="text-blue-400">Nosotros lo revivimos.</span></h2>
              <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
                No arriesgues tu equipo. Contamos con laboratorio propio, repuestos originales y técnicos certificados. Diagnóstico rápido y certero.
              </p>
              <a
                href="https://wa.me/51951381439?text=Hola,%20necesito%20cotizar%20una%20reparaci%C3%B3n."
                target="_blank"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-lg hover:shadow-white/20 hover:-translate-y-1"
              >
                <MessageCircle size={20} className="mr-2" />
                Cotizar Reparación
              </a>
            </div>
            <div className="flex-1 w-full max-w-sm hidden md:block">
              {/* Could be an illustration or icon grid, keeping it clean for now */}
              <div className="grid grid-cols-2 gap-4 opacity-80">
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur">
                  <h4 className="text-white font-bold text-lg">Express</h4>
                  <p className="text-gray-400 text-sm">En 1 hora</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur">
                  <h4 className="text-white font-bold text-lg">Garantía</h4>
                  <p className="text-gray-400 text-sm">Escrita</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur">
                  <h4 className="text-white font-bold text-lg">Original</h4>
                  <p className="text-gray-400 text-sm">Repuestos</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur">
                  <h4 className="text-white font-bold text-lg">Datos</h4>
                  <p className="text-gray-400 text-sm">Seguros</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Testimonios */}
        <section>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">Con la confianza de Tarapoto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Testimonial Cards with nicer styling */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="text-6xl text-indigo-100 absolute top-4 right-6 font-serif select-none">"</div>
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed relative z-10">Rápidos y confiables. Compré un iPhone y me lo entregaron el mismo día. Súper recomendado.</p>
              <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white text-lg">CA</div>
                <div>
                  <span className="block font-bold text-gray-900">Carlos Arévalo</span>
                  <span className="text-xs text-gray-500">Cliente Verificado</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="text-6xl text-indigo-100 absolute top-4 right-6 font-serif select-none">"</div>
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed relative z-10">Creí que mi celular no tenía arreglo, pero ellos lo solucionaron en unas horas. Quedó perfecto.</p>
              <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg">MP</div>
                <div>
                  <span className="block font-bold text-gray-900">María Perea</span>
                  <span className="text-xs text-gray-500">Servicio Técnico</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="text-6xl text-indigo-100 absolute top-4 right-6 font-serif select-none">"</div>
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed relative z-10">La mejor tienda de accesorios que encontré. Tienen de todo y a buen precio.</p>
              <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center font-bold text-white text-lg">JR</div>
                <div>
                  <span className="block font-bold text-gray-900">Jorge Ramírez</span>
                  <span className="text-xs text-gray-500">Cliente Verificado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Ubicación y Contacto */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2">Contacto</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Visítanos en Tarapoto</h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                Estamos ubicados estratégicamente para estar cerca de ti. Ven a conocer nuestro showroom o trae tu equipo.</p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-indigo-50 p-3.5 rounded-xl text-indigo-600 shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Dirección Principal</h3>
                    <p className="text-gray-600 text-lg">Jr. Jiménez Pimentel 123 <br />(Ref. Cerca a la Plaza de Armas)</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-green-50 p-3.5 rounded-xl text-green-600 shrink-0">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">WhatsApp Directo</h3>
                    <p className="text-gray-600 text-lg">+51 951 381 439</p>
                    <a href="https://wa.me/51951381439" className="text-indigo-600 text-sm font-bold hover:underline mt-1 inline-block">Enviar mensaje ahora →</a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-orange-50 p-3.5 rounded-xl text-orange-600 shrink-0">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Horario de Atención</h3>
                    <p className="text-gray-600">Lun - Sáb: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] lg:h-auto bg-gray-200 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.971932356395!2d-76.37255866170428!3d-6.493863777098484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ba0bd76df29803%3A0x66c8845fc867a030!2sTarapoto!5e0!3m2!1sen!2spe!4v1709920000000!5m2!1sen!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
                title="Mapa de Ubicación"
              ></iframe>
            </div>
          </div>
        </section>

        {/* 8. CTA Final */}
        <section className="bg-gradient-to-br from-indigo-700 to-indigo-900 py-16 px-4 rounded-3xl text-center shadow-2xl relative overflow-hidden mx-4 md:mx-0">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -ml-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Tu tecnología en las mejores manos</h2>
            <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Únete a los cientos de clientes satisfechos en Tarapoto. Calidad, garantía y precios justos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/productos"
                className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-indigo-50 text-indigo-900 font-bold rounded-full transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Ir a la Tienda
              </Link>
              <a
                href="https://wa.me/51951381439"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/50 hover:bg-white/10 text-white font-bold rounded-full transition-all duration-300 text-lg flex items-center justify-center gap-2"
              >
                Conversar Ahora
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
