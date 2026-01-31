const API_URL = "http://localhost:8080/api/productos";

export const getProductos = async () => {
  const res = await fetch(API_URL, { cache: "no-store" }); // 'no-store' para datos siempre frescos
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};
