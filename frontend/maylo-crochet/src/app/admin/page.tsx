"use client"; // 1. Obligatorio para usar useState

import { useEffect, useState } from "react";
import ProducTable from "@/components/admin/ProducTable";
import AdminHeader from "@/components/admin/AdminHeader";
import { getProductos } from "@/services/api";
import { Producto } from "@/types/producto";

// 2. QUITAMOS el 'async' de la función principal
export default function AdminDashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      <AdminHeader />
      <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-muted-foreground animate-pulse">
            Cargando inventario de Maylo Crochet...
          </div>
        ) : (
          <ProducTable productosIniciales={productos} />
        )}
      </div>
    </main>
  );
}
