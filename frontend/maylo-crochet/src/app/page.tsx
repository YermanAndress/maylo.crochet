import { CategoriesSection } from "@/components/category/CategoriesSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import PatternsSection from "@/components/pattern/PatternsSection";
import { InstagramFeed } from "@/components/layout/InstagramFeed";

export default async function Page() {
  return (
    <main className="min-h-screen">
      {/* 1. Categorías / Colecciones */}
      <CategoriesSection />

      {/* 2. Grid de Productos Físicos */}
      <FeaturedProducts />

      {/* 3. Sección de Patrones Digitales */}
      <PatternsSection />

      {/* 4. Feed de Redes Sociales */}
      <InstagramFeed />
    </main>
  );
}
