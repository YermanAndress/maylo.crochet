// @/app/components/catalogo/CategoryItem.tsx
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: {
    name: string;
    count: string;
    image: string;
    href: string;
  };
  offset: number;
  isActive: boolean;
  isVisible: boolean;
}

export function CategoryItem({
  category,
  offset,
  isActive,
  isVisible,
}: CategoryItemProps) {
  return (
    <div
      className={cn(
        "absolute flex items-center justify-center transition-all duration-700",
        isActive ? "z-30" : "z-10",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      style={{
        transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: `translate3d(${offset * 320}px, 0, 0) scale(${isActive ? 1 : 0.75})`,
        filter: isActive ? "none" : "blur(4px)",
        willChange: "transform, opacity",
      }}
    >
      <Link
        href={category.href}
        className={cn(
          "group relative overflow-hidden rounded-[2.5rem] bg-card w-[280px] sm:w-[320px] aspect-[3/4] shadow-2xl transition-all",
          isActive ? "cursor-pointer" : "pointer-events-none shadow-none",
        )}
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={isActive}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div
          className={cn(
            "absolute bottom-8 left-8 right-8 text-white transition-all duration-500",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <p className="text-xs font-medium uppercase text-pink-200 mb-2">
            {category.count}
          </p>
          <h3 className="font-serif text-3xl font-semibold leading-tight">
            {category.name}
          </h3>
        </div>
      </Link>
    </div>
  );
}
