export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number; // Cambiado de Integer a number
  imagen: string;
  pdfUrl?: string; // Asegúrate de que coincida con Java
  categoria: string;
  is_made_to_order: boolean; // Cambiado de is_made_to_order
}
