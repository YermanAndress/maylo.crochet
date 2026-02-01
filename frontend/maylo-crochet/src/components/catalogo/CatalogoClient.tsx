// Mueve este archivo a: src/components/catalogo/CatalogoClient.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

import { ProductFilter } from "./ProductFilter"; // Import local
import { ProductCard } from "@/components/products/ProductCard";
import { Producto } from "@/types/producto";

export default function CatalogoClient({
  productos,
}: {
  productos: Producto[];
}) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoriaQuery = searchParams.get("categoria");

  const [categoria, setCategoria] = useState(categoriaQuery || "Todas");
  const [precioMax, setPrecioMax] = useState(200000);
  const [orden, setOrden] = useState("fecha-desc");

  // Sincronizar la categoría si cambia la URL (ej. desde el Navbar o CategoriesSection)
  useEffect(() => {
    if (categoriaQuery) {
      setCategoria(categoriaQuery);
    } else {
      setCategoria("Todas");
    }
  }, [categoriaQuery]);

  const categorias = useMemo(
    () => ["Todas", ...Array.from(new Set(productos.map((p) => p.categoria)))],
    [productos],
  );

  const productosFiltrados = useMemo(() => {
    return productos
      .filter((p) => {
        const matchCategoria =
          categoria === "Todas" || p.categoria === categoria;
        const matchPrecio = p.precio <= precioMax;
        const matchSearch =
          searchQuery === "" ||
          p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(searchQuery.toLowerCase());

        return matchCategoria && matchPrecio && matchSearch;
      })
      .sort((a, b) => {
        if (orden === "precio-asc") return a.precio - b.precio;
        if (orden === "precio-desc") return b.precio - a.precio;
        return 0;
      });
  }, [productos, categoria, precioMax, orden, searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <ProductFilter
        categorias={categorias}
        categoriaActual={categoria}
        setCategoria={setCategoria}
        precioMax={precioMax}
        setPrecioMax={setPrecioMax}
      />

      <main className="flex-1">
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-8 bg-card p-4 rounded-xl border border-border/50">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-bold text-foreground">
              {productosFiltrados.length}
            </span>{" "}
            productos
          </p>
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-muted-foreground" />
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="bg-transparent text-sm font-medium outline-none cursor-pointer"
            >
              <option value="fecha-desc">Más recientes</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Grid dinámico - CORREGIDO: Usamos productosFiltrados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              variant="compact"
            />
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border mt-4">
            <p className="text-muted-foreground">
              No se encontraron productos que coincidan con los filtros.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
