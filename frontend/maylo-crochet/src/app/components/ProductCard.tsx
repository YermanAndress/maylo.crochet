// @/app/components/catalogo/ProductCard.tsx
"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Producto } from "@/app/types/producto";
import { FormatPrice } from "@/lib/utils";

export function ProductCard({ producto }: { producto: Producto }) {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-border transition-all hover:shadow-md hover:scale-[1.02] duration-300 flex flex-col h-full">
      {/* Contenedor de Imagen */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={`http://127.0.0.1:8080${producto.imagen}`}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-1">
            {producto.categoria}
          </p>
          <h3 className="font-serif text-xl font-semibold text-foreground line-clamp-2">
            {producto.nombre}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/10">
          <span className="text-xl font-bold text-primary">
            {FormatPrice(producto.precio)}
          </span>

          <button className="flex items-center justify-center p-2.5 bg-primary text-white rounded-full hover:bg-lavender transition-all active:scale-90 shadow-sm hover:scale-110 cursor-pointer">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
