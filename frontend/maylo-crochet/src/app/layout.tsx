import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { CartProvider } from "@/app/context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hilitos de Amor | Amigurumis y Tejidos Artesanales",
  description:
    "Tienda artesanal de amigurumis personalizados, ramos tejidos y patrones únicos hechos con amor.",
  keywords: ["amigurumis", "tejidos", "crochet", "personalizados", "artesanía"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Toaster richColors position="bottom-right" />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
