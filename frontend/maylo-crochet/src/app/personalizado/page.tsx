// src/app/page.tsx
import { PersonalizadoPage } from "@/components/personalizado/PersonalizadoPage";
// ... otras importaciones ...

export default async function HomePage() {
  // ... tu código existente ...

  return (
    <main>
      {/* ... Hero, FeaturedProducts, etc. ... */}
      <PersonalizadoPage /> {/* 👈 Aquí la añades */}
      {/* ... otros componentes ... */}
    </main>
  );
}
