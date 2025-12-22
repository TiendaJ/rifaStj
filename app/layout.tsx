import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSession } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

// Inter font for body text (high‑performance sans‑serif)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});




export const metadata: Metadata = {
  title: "Jshop - Participa y Gana",
  description: "Plataforma de rifas online. Participa por premios increíbles con cupos limitados.",
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
        className={`${inter.variable} antialiased font-sans bg-white text-black bg-grid-pattern min-h-screen flex flex-col`}
      >
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
