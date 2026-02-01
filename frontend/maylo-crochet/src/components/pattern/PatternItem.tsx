// @/app/components/catalogo/PatternItem.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { Producto } from "@/types/producto";
import { FormatPrice } from "@/lib/utils";

export function PatternItem({ item }: { item: Producto }) {
  const baseUrl = "http://127.0.0.1:8080";

  return (
    <article className="group relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-lg">
      {/* 1. Capa de Imagen (Fondo) */}
      <Image
        src={`${baseUrl}${item.imagen}`}
        alt={item.nombre}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* 2. Overlay con Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />

      {/* 3. Enlace al detalle (Cubre casi toda la card) */}
      <Link
        href={`/producto/${item.id}`}
        className="absolute inset-0 z-10 flex flex-col justify-end p-6"
      >
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          <h3 className="font-serif text-2xl font-bold text-white mb-1 leading-tight truncate">
            {item.nombre}
          </h3>
          <p className="text-sm text-white/80 line-clamp-2 mb-2">
            {item.descripcion}
          </p>
          <span className="text-pink-200 font-bold text-lg">
            {FormatPrice(item.precio)}
          </span>
        </div>
      </Link>

      {/* 4. Botón de Carrito (Capa superior separada) */}
      <div className="absolute bottom-6 right-6 z-20">
        <AddToCartButton producto={item} showText={true} />
      </div>
    </article>
  );
}
