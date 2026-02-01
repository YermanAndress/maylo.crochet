const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/api/productos`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};
