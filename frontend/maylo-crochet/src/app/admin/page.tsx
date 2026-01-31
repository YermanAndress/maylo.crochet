import ProducTable from "@/app/components/admin/ProducTable";
import { getProductos } from "@/app/services/api";
import { Producto } from "@/app/types/producto";

import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const productos: Producto[] = await getProductos();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-deep-blue">
          Panel de Control
        </h1>
        <Link
          href="/admin/form"
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-soft-purple transition-all"
        >
          <Plus size={18} /> Nuevo Producto
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <ProducTable productosIniciales={productos} />
      </div>
    </div>
  );
}
