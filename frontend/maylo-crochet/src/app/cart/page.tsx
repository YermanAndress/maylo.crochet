"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FormatPrice } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const numeroWhatsApp = process.env.NEXT_PUBLIC_WPP_NUMBER_TEST || "";

export default function CarritoPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      // Quitamos el min-h-screen si estorba y nos aseguramos de que sea un <main>
      <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh] max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-serif font-bold mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-muted-foreground mb-8">
          ¿Aún no has encontrado el amigurumi perfecto?
        </p>
        <Link
          href="/catalogo"
          className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all"
        >
          Ir al catálogo
        </Link>
      </main>
    );
  }

  const handleFinalizarCompra = () => {

    const listaProductos = items
      .map(
        (item) =>
          `- ${item.nombre} x${item.quantity} (${FormatPrice(item.precio * item.quantity)})`,
      )
      .join("\n");

    const mensaje = `¡Hola Maylo Crochet! 🧶🐶\n\nEstoy interesado en realizar el siguiente pedido:\n\n${listaProductos}\n\n*Total estimado: ${FormatPrice(total)}*\n\n¿Me podrías confirmar disponibilidad y costo de envío? 😊`;

    // ✅ Forma recomendada: Crea los parámetros de la URL de forma segura
    const params = new URLSearchParams({
      phone: numeroWhatsApp,
      text: mensaje,
    });

    const url = `https://api.whatsapp.com/send?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-100 max-w-7xl mx-auto px-4 py-12 lg:py-20">
      <h1 className="text-4xl font-serif font-bold mb-10">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Lista de Productos */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 sm:gap-6 border-b border-border pb-6 items-center"
            >
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={`${API_URL}${item.imagen}`}
                  alt={item.nombre}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">
                      {item.categoria}
                    </p>
                    <h3 className="text-lg font-bold leading-tight">
                      {item.nombre}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <Trash2 className="h-5 w-5 cursor-pointer" />
                  </button>
                </div>

                <p className="text-primary font-bold">
                  {FormatPrice(item.precio)}
                </p>

                {/* Control de Cantidad */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center border border-border rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de Compra */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-3xl p-8 sticky top-32">
            <h2 className="text-2xl font-serif font-bold mb-6">Resumen</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{FormatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span className="text-green-600 font-medium">
                  Calculado al finalizar
                </span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">{FormatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleFinalizarCompra}
              className="w-full bg-primary text-white py-4 rounded-full cursor-pointer font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mb-4"
            >
              Finalizar Compra
            </button>

            <Link
              href="/catalogo"
              className="block w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
