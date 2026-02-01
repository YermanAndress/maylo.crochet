// @/app/components/catalogo/PatternsSection.tsx
import { getProductos } from "@/services/api";
import { Producto } from "@/types/producto";
import { PatternItem } from "./PatternItem";

export default async function PatternsSection() {
  const todosLosProductos: Producto[] = await getProductos();

  // Filtramos solo los patrones
  const patrones = todosLosProductos
    .filter((p) => p.categoria.toLowerCase() === "patron")
    .slice(0, 3); // Mostramos solo los 3 más recientes para el feed de inicio

  if (patrones.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-3">
            Explora
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
            Nuevos Patrones Para Tu Arte
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {patrones.map((item) => (
            <PatternItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
