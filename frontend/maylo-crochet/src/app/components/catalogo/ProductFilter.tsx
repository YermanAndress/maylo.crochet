import { SlidersHorizontal } from "lucide-react";
import { FormatPrice } from "@/lib/utils";

interface Props {
  categorias: string[];
  categoriaActual: string;
  setCategoria: (cat: string) => void;
  precioMax: number;
  setPrecioMax: (precio: number) => void;
}

export function ProductFilter({
  categorias,
  categoriaActual,
  setCategoria,
  precioMax,
  setPrecioMax,
}: Props) {
  return (
    <aside className="w-full lg:w-64 space-y-8 shrink-0">
      <div>
        <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
          <SlidersHorizontal size={18} /> Categorías
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                categoriaActual === cat
                  ? "bg-primary text-white"
                  : "hover:bg-lavender/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-serif text-lg font-bold mb-4">Precio Máximo</h3>
        <input
          type="range"
          min="0"
          max="200000"
          step="10000"
          value={precioMax}
          onChange={(e) => setPrecioMax(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="text-sm mt-2 font-medium text-primary">
          {FormatPrice(precioMax)}
        </p>
      </div>
    </aside>
  );
}
