import { Suspense } from "react";

import CatalogoClient from "@/app/catalogo/CatalogoClient";
import { getProductos } from "@/services/api";

export default async function CatalogoPage() {
  // Obtenemos los productos desde el servidor
  const productos = await getProductos();

  return (
    <section className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h1 className="font-serif text-4xl font-bold mb-12 text-center lg:text-left">
          Catálogo Completo
        </h1>

        <Suspense
          fallback={
            <div className="text-center py-20">Cargando catálogo...</div>
          }
        >
          <CatalogoClient productos={productos} />
        </Suspense>
      </div>
    </section>
  );
}
