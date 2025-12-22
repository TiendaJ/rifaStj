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
    <div className="flex flex-col w-full font-sans text-black bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center mb-16 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1592496001020-d31bd830651f?q=80&w=2070&auto=format&fit=crop"
            alt="Tecnología Jshop"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 flex flex-col justify-center h-full">
          <div className="max-w-4xl">
            <p className="text-[#FF4D00] font-bold uppercase tracking-widest mb-4">¿Qué estás buscando hoy?</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase italic leading-[0.9]">
              Tecnología <br /> que rinde.
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 max-w-xl leading-relaxed font-medium">
              Celulares y accesorios con calidad garantizada en Tarapoto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
              <Link
                href="/productos"
                className="w-full sm:w-auto px-10 py-4 bg-[#FF4D00] hover:bg-orange-600 text-white font-black uppercase tracking-wider rounded-none skew-x-[-10deg] transition-all duration-300 hover:skew-x-0"
              >
                <span className="skew-x-[10deg] inline-block">Comprar Ahora</span>
              </Link>
              <a
                href="https://wa.me/51951381439"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-white/10 border-2 border-white hover:bg-white text-white hover:text-black font-black uppercase tracking-wider rounded-none skew-x-[-10deg] transition-all duration-300 hover:skew-x-0"
              >
                <span className="skew-x-[10deg] inline-block">Cotizar Reparación</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (Updated Copy) */}
      <section className="w-full px-6 md:px-12 lg:px-20 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-gray-100 pb-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">Nuestros más vendidos</h2>
            <p className="text-base text-[#6B6B6B] max-w-lg">
              Encuentra los celulares y accesorios que más se eligen cada día. Diseñados para acompañar tu ritmo, sin sorpresas.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link href="/productos" className="inline-block border-b-2 border-black pb-1 text-lg font-black uppercase hover:text-[#FF4D00] hover:border-[#FF4D00] transition-colors">
              Ver todos los productos &rarr;
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {productos.map((producto) => (
            <Link
              href={`/productos/${producto.id}`}
              key={producto.id}
              className="group flex flex-col"
            >
              <div className="aspect-[4/5] bg-[#F5F5F5] overflow-hidden mb-4 relative">
                {producto.fotos && producto.fotos.length > 0 ? (
                  <img
                    src={producto.fotos[0]}
                    alt={producto.nombre}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon size={48} />
                  </div>
                )}
                {!producto.cantidad && (
                  <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 uppercase">Agotado</div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg uppercase leading-tight mb-1 group-hover:text-[#FF4D00] transition-colors">{producto.nombre}</h3>
                <p className="text-[#6B6B6B] text-sm mb-2">Rendimiento confiable para tu día a día.</p>
                <span className="text-xl font-black">S/ {producto.precio.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-black text-white py-20 mb-24">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-[#6B6B6B] font-bold uppercase tracking-widest mb-4">Categorías Clave</h2>
            <p className="text-xl md:text-2xl font-black italic">Encuentra lo que necesitas con claridad.<br />Nada de confundir al cliente.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <Link href="/productos?q=celulares" className="group">
              <div className="text-3xl md:text-4xl font-black uppercase italic group-hover:text-[#FF4D00] transition-colors mb-2">Celulares</div>
              <div className="h-1 w-0 bg-[#FF4D00] mx-auto group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/productos?q=accesorios" className="group">
              <div className="text-3xl md:text-4xl font-black uppercase italic group-hover:text-[#FF4D00] transition-colors mb-2">Accesorios</div>
              <div className="h-1 w-0 bg-[#FF4D00] mx-auto group-hover:w-full transition-all duration-300"></div>
            </Link>
            <a href="https://wa.me/51951381439" target="_blank" className="group">
              <div className="text-3xl md:text-4xl font-black uppercase italic group-hover:text-[#FF4D00] transition-colors mb-2">Servicio Técnico</div>
              <div className="h-1 w-0 bg-[#FF4D00] mx-auto group-hover:w-full transition-all duration-300"></div>
            </a>
            <Link href="/productos" className="group">
              <div className="text-3xl md:text-4xl font-black uppercase italic group-hover:text-[#FF4D00] transition-colors mb-2">Ofertas</div>
              <div className="h-1 w-0 bg-[#FF4D00] mx-auto group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE SECTION */}
      <section className="w-full px-6 md:px-12 lg:px-20 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-[500px] w-full bg-[#F5F5F5]">
            <img
              src="https://images.unsplash.com/photo-1588702547923-7093a6c3f067?q=80&w=1500&auto=format&fit=crop"
              alt="Reparación Técnica"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-[0.9]">Precisión técnica,<br /> Resultados reales.</h2>
            <p className="text-base md:text-lg text-[#6B6B6B] mb-8 font-medium">
              Reparamos tu celular con diagnóstico claro, repuestos de calidad y garantía por escrito.
            </p>
            <a
              href="https://wa.me/51951381439"
              target="_blank"
              className="inline-block px-10 py-4 bg-black text-white font-black uppercase tracking-wider hover:bg-[#FF4D00] transition-colors skew-x-[-10deg]"
            >
              <span className="skew-x-[10deg] inline-block">Solicitar Diagnóstico</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (Trust) */}
      <section className="w-full px-6 md:px-12 lg:px-20 mb-24">
        <div className="border-l-4 border-[#FF4D00] pl-6 py-2">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">Rápido. Confiable. Profesional.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-base font-bold text-[#6B6B6B] mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[#FF4D00]">✔</span> Atención local en Tarapoto
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FF4D00]">✔</span> Pagos seguros: Yape, Plin, tarjetas
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FF4D00]">✔</span> Entrega eficiente
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FF4D00]">✔</span> Garantía real en productos y reparaciones
            </div>
          </div>
          <p className="text-lg font-black italic text-black">Tecnología sin sorpresas. Solo resultados.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full px-6 md:px-12 lg:px-20 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg md:text-xl font-bold italic mb-6">“Fueron claros, rápidos y profesionales. 100% recomendados.”</p>
            <p className="text-[#6B6B6B] font-bold uppercase">— Cliente satisfecho</p>
          </div>
          <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg md:text-xl font-bold italic mb-6">“Compré mi celular y llegó el mismo día con garantía.”</p>
            <p className="text-[#6B6B6B] font-bold uppercase">— Cliente Jshop</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA (Location/Contact) */}
      <section className="relative w-full py-24 bg-black text-white text-center overflow-hidden">
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">Atención directa en Tarapoto.</h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Soporte por WhatsApp.<br />
            Sitio físico y atención humana cuando lo necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://wa.me/51951381439"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 bg-[#FF4D00] hover:bg-orange-600 text-white font-black uppercase tracking-wider rounded-none skew-x-[-10deg] transition-all"
            >
              <span className="skew-x-[10deg] inline-block">Hablar por WhatsApp</span>
            </a>
            <Link
              href="https://maps.google.com/?q=Tarapoto" /* Placeholder, should ideally be real link or contact page */
              target="_blank"
              className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-white hover:bg-white text-white hover:text-black font-black uppercase tracking-wider rounded-none skew-x-[-10deg] transition-all"
            >
              <span className="skew-x-[10deg] inline-block">Visítanos</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
