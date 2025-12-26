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
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center mb-0 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1592496001020-d31bd830651f?q=80&w=2070&auto=format&fit=crop"
            alt="Tecnología Jshop"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-center max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="w-full text-left">
            <p className="text-[#F5F5F5] font-semibold uppercase tracking-[1px] mb-4 text-[15px]">¿Qué estás buscando hoy?</p>
            <h1 className="text-[38px] md:text-[60px] font-extrabold leading-[1.1] tracking-[-0.5px] uppercase mb-6 text-white">
              Tecnología <br /> que rinde.
            </h1>
            <p className="text-[15px] md:text-[16px] leading-[1.6] text-gray-200 mb-8 max-w-xl font-normal">
              Celulares y accesorios con calidad garantizada en Tarapoto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
              <Link
                href="/productos"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-black font-semibold text-[15px] uppercase tracking-[1px] px-8 py-4 min-h-[52px] border-2 border-white hover:bg-transparent hover:text-white transition-colors rounded-none"
              >
                Comprar Ahora
              </Link>
              <a
                href="https://wa.me/51951381439"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent text-white font-semibold text-[15px] uppercase tracking-[1px] px-8 py-4 min-h-[52px] border-2 border-white hover:bg-white hover:text-black transition-colors rounded-none"
              >
                Cotizar Reparación
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (Featured) */}
      <section className="w-full py-[56px] md:py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#E5E5E5] pb-6">
            <div className="text-left">
              <h2 className="text-[30px] md:text-[40px] font-extrabold leading-[1.2] tracking-[-0.3px] uppercase text-black mb-4">Nuestros más vendidos</h2>
              <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#6E6E6E] max-w-lg font-normal">
                Encuentra los celulares y accesorios que más se eligen cada día. Diseñados para acompañar tu ritmo, sin sorpresas.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link href="/productos" className="inline-block border-b-2 border-black pb-1 text-[15px] font-semibold uppercase tracking-[1px] hover:text-[#6E6E6E] hover:border-[#6E6E6E] transition-colors text-black">
                Ver todos los productos &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {productos.map((producto) => (
              <Link
                href={`/productos/${producto.id}`}
                key={producto.id}
                className="group flex flex-col text-left"
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
                    <div className="absolute top-2 right-2 bg-black text-white text-[12px] font-bold px-2 py-1 uppercase tracking-wider">Agotado</div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-[16px] uppercase leading-tight mb-1 text-black group-hover:underline decoration-1">{producto.nombre}</h3>
                  <p className="text-[#6E6E6E] text-[14px] mb-2 font-normal">Rendimiento confiable.</p>
                  <span className="text-[16px] font-semibold text-black">S/ {producto.precio.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-black text-white py-[56px] md:py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-left mb-12">
            <h2 className="text-[#6E6E6E] font-bold uppercase tracking-widest mb-4 text-[14px]">Categorías Clave</h2>
            <p className="text-[26px] md:text-[32px] font-semibold leading-[1.3] text-white">Encuentra lo que necesitas con claridad.<br />Todo Claro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            <Link href="/productos?q=celulares" className="group block">
              <div className="text-[26px] md:text-[32px] font-bold uppercase text-white group-hover:text-[#E5E5E5] transition-colors mb-2">Celulares</div>
              <div className="h-[2px] w-full bg-[#333] group-hover:bg-white transition-all duration-300"></div>
            </Link>
            <Link href="/productos?q=accesorios" className="group block">
              <div className="text-[26px] md:text-[32px] font-bold uppercase text-white group-hover:text-[#E5E5E5] transition-colors mb-2">Accesorios</div>
              <div className="h-[2px] w-full bg-[#333] group-hover:bg-white transition-all duration-300"></div>
            </Link>
            <a href="https://wa.me/51951381439" target="_blank" className="group block">
              <div className="text-[26px] md:text-[32px] font-bold uppercase text-white group-hover:text-[#E5E5E5] transition-colors mb-2">Serv.Técnico</div>
              <div className="h-[2px] w-full bg-[#333] group-hover:bg-white transition-all duration-300"></div>
            </a>
            <Link href="/productos" className="group block">
              <div className="text-[26px] md:text-[32px] font-bold uppercase text-white group-hover:text-[#E5E5E5] transition-colors mb-2">Ofertas</div>
              <div className="h-[2px] w-full bg-[#333] group-hover:bg-white transition-all duration-300"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE SECTION */}
      <section className="w-full py-[56px] md:py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[500px] w-full bg-[#F5F5F5]">
              <img
                src="https://images.unsplash.com/photo-1588702547923-7093a6c3f067?q=80&w=1500&auto=format&fit=crop"
                alt="Reparación Técnica"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="order-1 md:order-2 text-left">
              <h2 className="text-[30px] md:text-[40px] font-extrabold leading-[1.2] tracking-[-0.3px] uppercase text-black mb-6">Precisión técnica,<br /> Resultados reales.</h2>
              <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#6E6E6E] mb-8 font-normal">
                Reparamos tu celular con diagnóstico claro, repuestos de calidad y garantía por escrito.
              </p>
              <a
                href="https://wa.me/51951381439"
                target="_blank"
                className="inline-flex items-center justify-center bg-black text-white font-semibold text-[15px] uppercase tracking-[1px] px-8 py-4 min-h-[52px] border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors rounded-none"
              >
                Solicitar Diagnóstico
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (Trust) */}
      <section className="w-full py-[56px] md:py-[100px] bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-left">
          <h2 className="text-[30px] md:text-[40px] font-extrabold leading-[1.2] tracking-[-0.3px] uppercase text-black mb-8">Rápido. Confiable. Profesional.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex items-start gap-3">
              <span className="text-black font-bold">✔</span>
              <span className="text-[15px] md:text-[16px] leading-[1.6] text-[#6E6E6E]">Atención local en Tarapoto</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-black font-bold">✔</span>
              <span className="text-[15px] md:text-[16px] leading-[1.6] text-[#6E6E6E]">Pagos seguros: Yape, Plin, tarjetas</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-black font-bold">✔</span>
              <span className="text-[15px] md:text-[16px] leading-[1.6] text-[#6E6E6E]">Entrega eficiente</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-black font-bold">✔</span>
              <span className="text-[15px] md:text-[16px] leading-[1.6] text-[#6E6E6E]">Garantía real en productos y reparaciones</span>
            </div>
          </div>
          <p className="text-[26px] font-semibold leading-[1.3] text-black italic mt-8">Tecnología sin sorpresas. Solo resultados.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full py-[56px] md:py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white border-2 border-black p-8 text-left">
              <Star className="text-black w-6 h-6 mb-4" />
              <p className="text-[18px] md:text-[20px] font-semibold italic mb-6 text-black">“Fueron claros, rápidos y profesionales. 100% recomendados.”</p>
              <p className="text-[#6E6E6E] font-bold uppercase text-[14px] tracking-wider">— Cliente satisfecho</p>
            </div>
            <div className="bg-white border-2 border-black p-8 text-left">
              <Star className="text-black w-6 h-6 mb-4" />
              <p className="text-[18px] md:text-[20px] font-semibold italic mb-6 text-black">“Compré mi celular y llegó el mismo día con garantía.”</p>
              <p className="text-[#6E6E6E] font-bold uppercase text-[14px] tracking-wider">— Cliente Jshop</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA (Location/Contact) */}
      <section className="relative w-full py-[56px] md:py-[100px] bg-black text-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-left">
          <h2 className="text-[38px] md:text-[60px] font-extrabold leading-[1.1] tracking-[-0.5px] uppercase mb-8 text-white">Atención directa<br /> en Tarapoto.</h2>
          <p className="text-[18px] text-gray-400 mb-12 max-w-2xl font-normal">
            Soporte por WhatsApp.<br />
            Sitio físico y atención humana cuando lo necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-start items-center">
            <a
              href="https://wa.me/51951381439"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-black font-semibold text-[15px] uppercase tracking-[1px] px-8 py-4 min-h-[52px] border-2 border-white hover:bg-transparent hover:text-white transition-colors rounded-none"
            >
              Hablar por WhatsApp
            </a>
            <Link
              href="https://maps.google.com/?q=Tarapoto"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent text-white font-semibold text-[15px] uppercase tracking-[1px] px-8 py-4 min-h-[52px] border-2 border-white hover:bg-white hover:text-black transition-colors rounded-none"
            >
              Visítanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
