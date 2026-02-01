// @/app/producto/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

import { AddToCartButton } from "@/app/components/ui/AddToCartButton";
import { getProductos } from "@/app/services/api";
import { Producto } from "@/app/types/producto";
import { FormatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  const productos = await getProductos();

  return productos.map((p: Producto) => ({
    id: String(p.id),
  }));
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>; // Definimos que params ahora es una Promesa
}) {
  // 1. Unwrapp (desenvolver) la promesa de params usando await
  const { id } = await params;

  const productos = await getProductos();

  // 2. Ahora usamos 'id' después de haberlo esperado
  const producto = productos.find((p: Producto) => p.id === Number(id));

  if (!producto) notFound();

  const baseUrl = "http://127.0.0.1:8080";

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Galería de Imagen */}
        <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-muted shadow-inner">
          <Image
            src={`${baseUrl}${producto.imagen}`}
            alt={producto.nombre}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

        {/* Información del Producto */}
        <div className="flex flex-col justify-center space-y-8">
          <header>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              {producto.categoria}
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              {producto.nombre}
            </h1>
          </header>

          <p className="text-3xl font-bold text-primary">
            {FormatPrice(producto.precio)}
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-prose">
            {producto.descripcion}
          </p>

          {/* Estado de Fabricación / Stock */}
          <div className="py-6 border-y border-border">
            {!producto.is_made_to_order ? (
              <div className="flex items-center gap-3">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${producto.stock < 5 ? "bg-orange-500 animate-pulse" : "bg-green-500"}`}
                />
                <span className="text-sm font-medium">
                  {producto.stock < 5
                    ? `¡Solo quedan ${producto.stock} unidades!`
                    : `${producto.stock} unidades en inventario`}
                </span>
              </div>
            ) : (
              <div className="bg-accent/30 p-4 rounded-2xl border border-accent">
                <p className="text-sm text-accent-foreground font-medium flex gap-2">
                  <span>🧶</span>
                  Producto hecho bajo pedido. Tiempo de entrega: 15-20 días
                  hábiles.
                </p>
              </div>
            )}
          </div>

          {/* Acciones de Compra */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AddToCartButton
              producto={producto}
              showText={true}
              className="py-5 text-lg shadow-lg"
            />

{/*             {producto.pdfUrl && (
              <a
                href={`${baseUrl}${producto.pdfUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary py-4 rounded-full font-bold hover:bg-primary/5 transition-all text-center"
              >
                📥 Descargar Patrón PDF
              </a>
            )} */}
          </div>
        </div>
      </div>
    </main>
  );
}
