// @/app/components/catalogo/CategoriesSection.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CategoryItem } from "./CategoryItem";

const CATEGORIES_DATA = [
  {
    id: 1,
    name: "Amigurumis",
    count: "12 productos",
    image: "/images/Spiderman.jpg",
    href: "/catalogo?categoria=Amigurumi",
  },
  {
    id: 2,
    name: "Personalizados",
    count: "8 productos",
    image: "/images/Spiderman.jpg",
    href: "/catalogo?categoria=Personalizado",
  },
  {
    id: 3,
    name: "Ramos",
    count: "15 productos",
    image: "/images/Spiderman.jpg",
    href: "/catalogo?categoria=Ramos",
  },
  {
    id: 4,
    name: "Llaveros",
    count: "15 productos",
    image: "/images/Spiderman.jpg",
    href: "/catalogo?categoria=Llavero",
  },
  {
    id: 5,
    name: "Patrones",
    count: "15 productos",
    image: "/images/Spiderman.jpg",
    href: "/catalogo?categoria=Patron",
  },
];

export function CategoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (step: number) => {
    setActiveIndex(
      (prev) => (prev + step + CATEGORIES_DATA.length) % CATEGORIES_DATA.length,
    );
  };

  return (
    <section id="colecciones" className="py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-serif text-4xl font-semibold mb-16">
          Nuestras Colecciones
        </h2>

        <div className="relative h-[500px] flex items-center justify-center">
          {CATEGORIES_DATA.map((category, index) => {
            let offset = index - activeIndex;
            if (offset > Math.floor(CATEGORIES_DATA.length / 2))
              offset -= CATEGORIES_DATA.length;
            if (offset < -Math.floor(CATEGORIES_DATA.length / 2))
              offset += CATEGORIES_DATA.length;

            return (
              <CategoryItem
                key={category.id}
                category={category}
                offset={offset}
                isActive={offset === 0}
                isVisible={Math.abs(offset) <= 1}
              />
            );
          })}

          {/* Botón Izquierdo */}
          <button
            onClick={() => move(-1)}
            className="absolute left-4 lg:left-10 z-40 p-4 rounded-full bg-accent text-violet-800 shadow-xl hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Botón Derecho */}
          <button
            onClick={() => move(1)}
            className="absolute right-4 lg:right-10 z-40 p-4 rounded-full bg-accent text-violet-800 shadow-xl hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Indicadores (Dots) */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {CATEGORIES_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-10 bg-primary" : "w-2.5 bg-accent",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
