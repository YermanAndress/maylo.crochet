"use client";

import { Pencil, Trash2, Loader2 } from "lucide-react"; // Añadimos un spinner
import { useRouter } from "next/navigation";
import { useState } from "react";

import ProductForm from "@/components/admin/ProductForm";
import { Producto } from "@/types/producto";
import Modal from "@/components/ui/Modal";

export default function ProducTable({
  productosIniciales,
}: {
  productosIniciales: Producto[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const router = useRouter();

  const abrirEdicion = (id: string | number) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // --- LÓGICA PARA ELIMINAR ---
  const handleEliminar = async (id: string | number, nombre: string) => {
    if (
      !confirm(
        `¿Estás seguro de que quieres eliminar "${nombre}"? Esta acción no se puede deshacer.`,
      )
    ) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/productos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Error al intentar eliminar el producto.");
      }
    } catch (error) {
      console.error("Error eliminando:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <table className="w-full border-collapse">
        <thead className="bg-muted/50 text-muted-foreground text-sm font-medium">
          <tr>
            <th className="p-4 text-left">Producto</th>
            <th className="p-4 text-center">Categoría</th>
            <th className="p-4 text-center">Precio</th>
            <th className="p-4 text-center">Stock</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {productosIniciales.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="p-8 text-center text-muted-foreground italic"
              >
                No hay productos publicados todavía.
              </td>
            </tr>
          ) : (
            productosIniciales.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-muted/30 transition-colors group"
              >
                <td className="p-4 font-medium">{p.nombre}</td>
                <td className="p-4 text-center text-sm">{p.categoria}</td>
                <td className="p-4 text-center font-mono">
                  ${new Intl.NumberFormat("es-CO").format(p.precio)}
                </td>
                <td className="p-4 text-center">
                  {p.is_made_to_order ? (
                    <span className="text-[10px] bg-soft-purple/10 text-soft-purple px-2 py-1 rounded-full font-bold uppercase tracking-tighter">
                      Bajo Pedido
                    </span>
                  ) : (
                    <span
                      className={p.stock < 3 ? "text-orange-500 font-bold" : ""}
                    >
                      {p.stock}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => abrirEdicion(p.id)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleEliminar(p.id, p.nombre)}
                    disabled={deletingId === p.id}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors disabled:opacity-30"
                    title="Eliminar"
                  >
                    {deletingId === p.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal onClose={cerrarModal}>
          <ProductForm
            productoId={editingId}
            onSuccess={() => {
              cerrarModal();
              router.refresh(); // Refrescar la tabla tras editar
            }}
          />
        </Modal>
      )}
    </>
  );
}
