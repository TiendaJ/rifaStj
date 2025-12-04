import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSession } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

        {/* Main Content - Centered, spacious */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
