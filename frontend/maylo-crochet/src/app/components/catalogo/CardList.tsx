import { ShoppingBag } from "lucide-react";
import Image from "next/image";

import { Producto } from "@/app/types/producto";
import { FormatPrice } from "@/lib/utils";

export function CardList({ producto }: { producto: Producto }) {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-border transition-all flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted shrink-0">
        <Image
          src={`http://127.0.0.1:8080${producto.imagen}`}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase">
          {producto.categoria}
        </p>
        <h3 className="font-serif text-lg font-semibold mb-2">
          {producto.nombre}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-lg font-semibold text-primary">
            {FormatPrice(producto.precio)}
          </span>
          <button className="p-2 bg-primary text-white rounded-full hover:bg-lavender transition-all">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
