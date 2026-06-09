// @/app/components/layout/Navbar.tsx
"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { ShopBagButton } from "@/components/ui/ShopBagButton";
import { useCart } from "@/context/CartContext"; // Importamos el hook
import { SearchBar } from "./SearchBar";
import { NavLinks } from "./NavLinks";

export function Navbar() {
  // Extraemos 'items' que es donde están los productos guardados
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Calculamos la cantidad total de artículos sumando sus cantidades individuales
  const totalItems = items.reduce(
    (acc: number, item) => acc + item.quantity,
    0,
  );
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
      <nav className="mx-auto flex max-w-screen items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            MayloCrochet
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavLinks className="hidden lg:flex lg:items-center lg:gap-10" />

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* BARRA DE BÚSQUEDA: Ahora visible en Desktop */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <Link href="/cart" className="lg:block">
            <ShopBagButton count={totalItems} />
          </Link>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 hover:bg-muted rounded-full transition-colors cursor-pointer">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-8 mt-8">
                <span className="font-serif text-2xl font-semibold">Menú</span>

                {/* Búsqueda en móvil */}
                <SearchBar onSearch={() => setIsOpen(false)} />

                <NavLinks
                  className="flex flex-col gap-6"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
