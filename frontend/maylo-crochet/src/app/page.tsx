import { InstagramFeed } from "@/app/components/layout/InstagramFeed";
import { CategoriesSection } from "@/app/components/CategoriesSection";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import PatternsSection from "@/app/components/PatternsSection";

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
