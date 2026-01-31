// @/app/components/catalogo/FeaturedProducts.tsx
import Link from "next/link";
import { getProductos } from "@/app/services/api";
import { Producto } from "@/app/types/producto";
import { ProductCard } from "./ProductCard";

export default async function FeaturedProducts() {
  const productos: Producto[] = await getProductos();

  // Filtramos para NO mostrar patrones y tomamos los últimos 6
  const destacados = productos
    .filter((p) => p.categoria.toLowerCase() !== "patron")
    .slice(0, 6);

  return (
    <section id="productos" className="py-16 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Cabecera */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-3">
            Productos Destacados
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
            Hechos Con Amor
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Cada pieza está tejida a mano con materiales de alta calidad y mucho
            cariño.
          </p>
        </div>

        {/* Grid dinámico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destacados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        {/* Botón CTA */}
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
