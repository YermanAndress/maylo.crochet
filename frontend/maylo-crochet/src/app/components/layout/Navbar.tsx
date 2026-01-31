// @/app/components/layout/Navbar.tsx
"use client";

import { Menu, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/Sheet";
import { ShopBagButton } from "@/app/components/ui/ShopBagButton";
import { NavLinks } from "./NavLinks";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            Hilitos de Amor
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavLinks className="hidden lg:flex lg:items-center lg:gap-8" />

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:flex p-2 hover:bg-muted rounded-full transition-colors">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </button>

          <ShopBagButton count={0} />

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-8 mt-8">
                <span className="font-serif text-2xl font-semibold">
                  Hilitos de Amor
                </span>
                <NavLinks
                  className="flex flex-col gap-6"
                  onClick={() => setIsOpen(false)} // Se cierra al hacer clic
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
