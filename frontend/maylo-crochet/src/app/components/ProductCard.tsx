// @/app/components/catalogo/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link"; // Importamos Link

import { AddToCartButton } from "@/app/components/ui/AddToCartButton";
import { Producto } from "@/app/types/producto";
import { FormatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  producto: Producto;
  variant?: "default" | "compact";
}

export function ProductCard({ producto, variant = "default" }: Props) {
  const isCompact = variant === "compact";

  return (
    <article
      className={cn(
        "group bg-card rounded-2xl overflow-hidden border border-border/50 transition-all duration-300 flex flex-col h-full",
        "hover:border-border hover:shadow-md hover:scale-[1.02]",
      )}
    >
      {/* Envolvemos la imagen y la info en un Link, excepto el botón de acción */}
      <Link href={`/producto/${producto.id}`} className="flex-1 flex flex-col">
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={`http://127.0.0.1:8080${producto.imagen}`}
            alt={producto.nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Contenido */}
        <div className={cn("flex flex-col flex-1", isCompact ? "p-4" : "p-5")}>
          <div className="mb-4">
            <p
              className={cn(
                "font-bold tracking-widest text-muted-foreground uppercase mb-1",
                isCompact ? "text-[9px]" : "text-[10px]",
              )}
            >
              {producto.categoria}
            </p>
            <h3
              className={cn(
                "font-serif font-semibold text-foreground line-clamp-2",
                isCompact ? "text-lg" : "text-xl",
              )}
            >
              {producto.nombre}
            </h3>
          </div>
        </div>
      </Link>

      {/* Footer de la Card - Fuera del Link principal para que el botón funcione independiente */}
      <div
        className={cn(
          "flex items-center justify-between mt-auto pt-4 border-t border-border/10",
          isCompact ? "mx-4 mb-4" : "mx-5 mb-5",
        )}
      >
        <span
          className={cn(
            "font-bold text-primary",
            isCompact ? "text-lg" : "text-xl",
          )}
        >
          {FormatPrice(producto.precio)}
        </span>

        <AddToCartButton producto={producto} />
      </div>
    </article>
  );
}
