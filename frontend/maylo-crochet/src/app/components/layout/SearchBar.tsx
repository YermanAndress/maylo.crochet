// @/app/components/layout/SearchBar.tsx
"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: () => void; // Prop opcional para cerrar menús
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/catalogo?search=${encodeURIComponent(query)}`);
      if (onSearch) onSearch(); // Cerramos el Sheet si existe la función
      setQuery(""); // Limpiamos el input después de buscar
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative group">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar amigurumis..."
        className="pl-10 pr-4 py-2 rounded-full border border-border bg-muted/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-48 lg:w-64 transition-all duration-300"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
    </form>
  );
}
