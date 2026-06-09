// @/app/components/catalogo/PatternsSection.tsx
import { getProductos } from "@/services/api";
import { Producto } from "@/types/producto";
import { PersonalizadoItem } from "./PersonalizadoItem";
import Link from "next/link";

export default async function PersonalizadoSection() {
  const todosLosProductos: Producto[] = await getProductos();

  // Filtramos solo los patrones
  const patrones = todosLosProductos
    .filter((p) => p.categoria.toLowerCase() === "personalizado")
    .reverse()
    .slice(0, 3); // Mostramos solo los 3 más recientes para el feed de inicio

  if (patrones.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg font-bold tracking-widest text-primary uppercase mb-3">
            Crea
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
            Tu Propio Diseño Personalizado
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {patrones.map((item) => (
            <PersonalizadoItem key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center rounded-full px-12 py-4 text-sm font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
          >
            Ver todo el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
