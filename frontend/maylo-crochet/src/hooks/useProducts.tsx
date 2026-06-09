// 2. Crear hook personalizado para productos
// frontend/maylo-crochet/src/app/hooks/useProductos.ts
"use client";

import { useState, useEffect } from "react";
import { Producto } from "@/types/producto";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/productos`);
      if (!res.ok) throw new Error("Error al cargar productos");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return { productos, loading, error, refetch: fetchProductos };
}
