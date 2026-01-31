// @/app/components/catalogo/PatternItem.tsx
"use client"; // Lo marcamos como cliente por la interactividad del botón

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Producto } from "@/app/types/producto";
import { FormatPrice } from "@/lib/utils";

export function PatternItem({ item }: { item: Producto }) {
  return (
    <article className="group relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-lg">
      <Image
        src={`http://127.0.0.1:8080${item.imagen}`}
        alt={item.nombre}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay con Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent flex items-end">
        <div className="p-6 w-full flex justify-between items-end gap-4 transform transition-transform duration-500 group-hover:-translate-y-2">
          {/* Textos */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-2xl font-bold text-white mb-1 leading-tight truncate">
              {item.nombre}
            </h3>
            <p className="text-sm text-white/80 line-clamp-2 mb-1">
              {item.descripcion}
            </p>
            <span className="text-accent font-bold text-lg">
              {FormatPrice(item.precio)}
            </span>
          </div>

          {/* Acción */}
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full cursor-pointer text-sm font-bold hover:bg-lavender transition-all active:scale-95 shadow-md hover:scale-105 shrink-0">
            <ShoppingBag className="h-4 w-4" />
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
