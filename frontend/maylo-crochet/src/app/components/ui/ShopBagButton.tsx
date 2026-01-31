// @/app/components/layout/CartButton.tsx
import { ShoppingBag } from "lucide-react";

export function ShopBagButton({ count }: { count: number }) {
  return (
    <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
          {count}
        </span>
      )}
      <span className="sr-only">Carrito</span>
    </button>
  );
}
