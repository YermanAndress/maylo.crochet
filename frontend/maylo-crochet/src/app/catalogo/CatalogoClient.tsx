"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

// Importamos nuestros nuevos componentes
import { ProductFilter } from "@/components/catalogo/ProductFilter";
import { ProductCard } from "@/components/ProductCard";
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

  useEffect(() => {
    if (categoriaQuery) setCategoria(categoriaQuery);
  }, [categoriaQuery]);

  const categorias = [
    "Todas",
    ...Array.from(new Set(productos.map((p) => p.categoria))),
  ];

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
        {/* Cabecera simplificada */}
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

        {/* Grid dinámico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              variant="compact"
            />
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No se encontraron productos que coincidan con los filtros.
          </div>
        )}
      </main>
    </div>
  );
}
