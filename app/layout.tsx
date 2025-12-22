import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { getSession } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnnouncementBar } from "@/components/AnnouncementBar"; // Import added correctly
import "./globals.css";

// Montserrat font as requested (Regular 400, SemiBold 600, ExtraBold 800)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "Jshop | Tecnología y Accesorios en Tarapoto",
    template: "%s | Jshop",
  },
  description: "Tienda de tecnología en Tarapoto. Venta de celulares, accesorios premium y servicio técnico especializado con garantía. Envíos a todo el Perú.",
  keywords: ["celulares", "iphone", "samsung", "xiaomi", "accesorios", "cargadores", "audífonos", "servicio técnico", "tarapoto", "san martin"],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://jshop.pe", // Assuming domain or placeholder
    siteName: "Jshop Tecnología",
    title: "Jshop | Tecnología y Accesorios en Tarapoto",
    description: "Encuentra los mejores celulares y accesorios con garantía en Tarapoto.",
    images: [
      {
        url: "/og-image.jpg", // We might not have this yet but it's good practice
        width: 1200,
        height: 630,
        alt: "Jshop Tecnología",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jshop | Tecnología y Accesorios",
    description: "Celulares y servicio técnico garantizado en Tarapoto.",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased font-sans bg-white text-black bg-grid-pattern min-h-screen flex flex-col`}
      >
        <AnnouncementBar />
        {/* Header – Ultra-minimal, sticky, backdrop blur */}
        <Navbar session={session} />

        {/* Main Content - Full width, pages control their own spacing */}
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
