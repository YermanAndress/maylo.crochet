import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
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
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
