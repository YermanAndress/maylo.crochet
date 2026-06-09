"use client";

import Image from "next/image";
import Link from "next/link";
import { Producto } from "@/types/producto";
import { FormatPrice } from "@/lib/utils";
import { Sparkles } from "lucide-react"; // Icono para resaltar lo especial

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function PersonalizadoItem({ item }: { item: Producto }) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted shadow-xl transition-all duration-500 hover:shadow-pink-200/20">
      {/* Etiqueta flotante de Personalizado */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
        <Sparkles className="h-3 w-3 text-pink-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-pink-600">
          Personalizado
        </span>
      </div>

      <Image
        src={`${API_URL}${item.imagen}`}
        alt={item.nombre}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Degradado más suave y estético */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

      <Link
        href={`/producto/${item.id}`}
        className="absolute inset-0 z-10 flex flex-col justify-end p-6"
      >
        <div className="translate-y-4 transition-all duration-500 group-hover:translate-y-0">
          <h3 className="font-serif text-2xl font-bold text-white mb-1">
            {item.nombre}
          </h3>

          {/* Precio con un estilo más destacado */}
          <div className="flex items-center justify-between">
            <span className="text-pink-200 font-bold text-xl">
              Desde {FormatPrice(item.precio)}
            </span>
            <span className="text-white text-xs underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              Ver opciones
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}