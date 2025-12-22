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
    <div className="space-y-12 md:space-y-16 px-4 md:px-0">
      {/* Hero section - Centered, high contrast, minimal */}
      <section className="max-w-4xl mx-auto text-center pt-8 md:pt-12 mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 leading-tight">
          Venta y reparación de celulares en Tarapoto. <br className="hidden md:block" />
          <span className="text-indigo-600">Compra seguro, rápido y con garantía.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Celulares, accesorios y servicio técnico especializado. Pagos fáciles y entrega inmediata.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/productos"
            className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors duration-200 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Comprar ahora
          </Link>
          <a
            href="https://wa.me/51951381439?text=Hola,%20estoy%20interesado%20en%20equipos%20y%20servicios%20de%20Jshop."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-colors duration-200 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      {/* 2. Quick Trust Indicators */}
      <section className="max-w-4xl mx-auto mb-16 md:mb-24 px-4 hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
            <div className="bg-indigo-100 p-3 rounded-full mb-3 text-indigo-600">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Garantía real</h3>
            <p className="text-gray-500 text-sm">Respaldo total en tu compra</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
            <div className="bg-indigo-100 p-3 rounded-full mb-3 text-indigo-600">
              <MapPin size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Atención en Tarapoto</h3>
            <p className="text-gray-500 text-sm">Tienda física y soporte local</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
            <div className="bg-indigo-100 p-3 rounded-full mb-3 text-indigo-600">
              <CreditCard size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Pagos seguros</h3>
            <p className="text-gray-500 text-sm">Yape, Plin y todas las tarjetas</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-6xl mx-auto mb-16 md:mb-24 px-4">
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">Productos Destacados</h2>
          <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {productos.map((producto) => (
            <Link
              href={`/productos/${producto.id}`}
              key={producto.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="aspect-square relative bg-gray-100 overflow-hidden">
                {producto.fotos && producto.fotos.length > 0 ? (
                  <img
                    src={producto.fotos[0]}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon size={48} />
                  </div>
                )}
                {!producto.cantidad && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Agotado</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 md:text-lg group-hover:text-indigo-600 transition-colors">
                  {producto.nombre}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">S/ {producto.precio.toFixed(2)}</span>
                  <span className="bg-black text-white p-2 rounded-full group-hover:bg-indigo-600 transition-colors">
                    <ShoppingBag size={18} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/productos" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors group">
            Ver todo el catálogo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 4. Categorias Claras */}
      <section className="max-w-6xl mx-auto mb-16 md:mb-24 px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 md:mb-12 text-center">Explora por Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Celulares */}
          <Link href="/productos?q=celulares" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all text-center group flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smartphone size={32} />
            </div>
            <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Celulares</span>
          </Link>

          {/* Accesorios */}
          <Link href="/productos?q=accesorios" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all text-center group flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Headphones size={32} />
            </div>
            <span className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Accesorios</span>
          </Link>

          {/* Reparación */}
          <a href="https://wa.me/51951381439" target="_blank" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all text-center group flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench size={32} />
            </div>
            <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Reparación</span>
          </a>

          {/* Ofertas */}
          <Link href="/productos" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all text-center group flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame size={32} />
            </div>
            <span className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Ofertas</span>
          </Link>
        </div>
      </section>

      {/* 5. Servicio Tecnico */}
      <section className="bg-gray-900 py-16 md:py-20 mb-16 md:mb-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Wrench className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">¿Tu celular falló? Nosotros lo reparamos.</h2>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Diagnóstico claro, repuestos de calidad y garantía por escrito. No dejes tu equipo en manos de cualquiera.
          </p>
          <a
            href="https://wa.me/51951381439?text=Hola,%20necesito%20una%20cotizaci%C3%B3n%20para%20reparaci%C3%B3n."
            target="_blank"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-indigo-50 transition-colors text-lg"
          >
            Cotizar reparación
          </a>
        </div>
      </section>

      {/* 6. Testimonios */}
      <section className="max-w-6xl mx-auto mb-16 md:mb-24 px-4 bg-gray-50 rounded-3xl py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-12 text-center">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex gap-1 mb-4 text-yellow-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-gray-600 mb-6 italic">"Rápidos y confiables. Compré un iPhone y me lo entregaron el mismo día. Súper recomendado."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">CA</div>
              <span className="font-bold text-gray-900">Carlos A.</span>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex gap-1 mb-4 text-yellow-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-gray-600 mb-6 italic">"Me salvaron la vida con la reparación de mi pantalla. Quedó como nuevo y con garantía."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">MP</div>
              <span className="font-bold text-gray-900">María P.</span>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex gap-1 mb-4 text-yellow-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-gray-600 mb-6 italic">"Excelente atención al cliente. Me ayudaron a configurar mi nuevo equipo. 10/10."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">JR</div>
              <span className="font-bold text-gray-900">Jorge R.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Ubicación y Contacto */}
      <section className="max-w-6xl mx-auto mb-16 md:mb-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1 h-[400px] w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.971932356395!2d-76.37255866170428!3d-6.493863777098484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ba0bd76df29803%3A0x66c8845fc867a030!2sTarapoto!5e0!3m2!1sen!2spe!4v1709920000000!5m2!1sen!2spe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Jshop"
            ></iframe>
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Visítanos en Tarapoto</h2>
              <p className="text-gray-600 text-lg mb-8">
                Estamos ubicados en el corazón de la ciudad para brindarte la mejor atención. Ven y conoce nuestros productos.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Dirección</h3>
                  <p className="text-gray-600">Jr. Jiménez Pimentel 123 (Ref. Plaza de Armas)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-green-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600">+51 951 381 439</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Horario de Atención</h3>
                  <p className="text-gray-600">Lunes a Sábado: 9:00 AM - 1:00 PM / 3:00 PM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA Final */}
      <section className="bg-indigo-600 py-16 px-4 mb-12 rounded-3xl mx-4 md:mx-auto max-w-7xl text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-700/50 pattern-grid-lg opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Compra con confianza</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
            Atención directa en Tarapoto. Productos garantizados y soporte post-venta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/productos"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-indigo-900 font-bold rounded-full transition-colors duration-200 text-lg shadow-lg"
            >
              Comprar ahora
            </Link>
            <a
              href="https://wa.me/51951381439"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold rounded-full transition-colors duration-200 text-lg flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
