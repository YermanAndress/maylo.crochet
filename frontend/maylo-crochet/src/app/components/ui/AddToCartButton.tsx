"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";
import { Producto } from "@/app/types/producto";
import { cn } from "@/lib/utils";

interface Props {
  producto: Producto;
  className?: string;
  showText?: boolean;
}

export function AddToCartButton({
  producto,
  className,
  showText = false,
}: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    // Evita que si la card tiene un Link, se dispare al hacer clic en el botón
    e.preventDefault();
    e.stopPropagation();

    addToCart(producto);
    toast.success("¡Agregado!", {
      description: `${producto.nombre} ya está en tu carrito.`,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className={cn(
        "flex items-center justify-center gap-2 bg-primary text-white rounded-full transition-all active:scale-90 shadow-sm hover:scale-105 cursor-pointer",
        showText ? "px-5 py-2.5 font-bold text-sm" : "p-2.5",
        className,
      )}
    >
      <ShoppingBag className={showText ? "h-4 w-4" : "h-5 w-5"} />
      {showText && "Agregar"}
    </button>
  );
}
