"use client";

import { useState, ChangeEvent, useRef, FormEvent, useEffect } from "react";
import { ImageIcon, UploadCloud, FileText, X } from "lucide-react";
import Image from "next/image";

interface ProductFormProps {
  productoId?: string | number | null;
  onSuccess?: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductForm({
  productoId,
  onSuccess,
}: ProductFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [precioVisual, setPrecioVisual] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [is_made_to_order, setIsMadeToOrder] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (productoId) {
      const fetchProducto = async () => {
        try {
          const res = await fetch(`${API_URL}/api/productos/${productoId}`);
          const data = await res.json();

          if (formRef.current) {
            formRef.current.nombre.value = data.nombre;
            formRef.current.descripcion.value = data.descripcion;
            formRef.current.categoria.value = data.categoria;
            if (!data.is_made_to_order)
              formRef.current.stock.value = data.stock;
          }

          setPrecioVisual(new Intl.NumberFormat("es-CO").format(data.precio));
          setIsMadeToOrder(data.is_made_to_order);

          // Importante: Si la imagen existe, le ponemos la URL del backend para verla
          if (data.imagen) {
            setPreview(`${API_URL}${data.imagen}`);
          }
          if (data.pdfUrl) setPdfName("Archivo cargado anteriormente");
        } catch (error) {
          console.error("Error cargando producto:", error);
        }
      };
      fetchProducto();
    }
  }, [productoId]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handlePrecioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPrecioVisual(
      value === "" ? "" : new Intl.NumberFormat("es-CO").format(Number(value)),
    );
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fileInput = formData.get("imagen") as File;

    if (!preview && (!fileInput || fileInput.size === 0)) {
      alert("La imagen es obligatoria.");
      return;
    }

    // Validar tamaño de archivo
    if (fileInput && fileInput.size > 5 * 1024 * 1024) {
      // 5MB
      alert("La imagen no debe superar 5MB");
      return;
    }

    setLoading(true);

    // Limpiamos el campo "imagen" que trae el archivo del input
    formData.delete("imagen");

    if (fileInput && fileInput.size > 0) {
      // Caso A: Hay un archivo nuevo seleccionado
      formData.append("archivoImagen", fileInput);
    } else if (productoId && preview) {
      // Caso B: No hay archivo nuevo, pero tenemos una imagen previa (Edición)
      // Extraemos solo la ruta relativa (/uploads/...) quitando el dominio
      const rutaRelativa = preview.replace(`${API_URL}/`, "");
      formData.set("imagen", rutaRelativa);
    }

    formData.set("precio", precioVisual.replace(/\./g, ""));
    formData.set("is_made_to_order", String(is_made_to_order));
    if (is_made_to_order) formData.set("stock", "0");

    try {
      const res = await fetch(
        productoId
          ? `${API_URL}/api/productos/${productoId}`
          : `${API_URL}/api/productos`,
        {
          method: productoId ? "PUT" : "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error al guardar el producto");
      }

      alert("¡Operación exitosa!");
      onSuccess?.();
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={`${!productoId ? "max-w-2xl mx-auto p-8" : "p-6"}`}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`space-y-6 bg-card ${!productoId ? "p-8 rounded-3xl border border-border shadow-xl" : ""}`}
      >
        <h1 className="font-serif text-3xl font-bold text-center text-primary">
          {productoId ? "Editar Producto" : "Gestionar Producto"}
        </h1>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer w-full aspect-video rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 overflow-hidden flex flex-col items-center justify-center transition-all hover:border-primary/50"
        >
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium backdrop-blur-sm">
                Click para cambiar imagen
              </div>
            </>
          ) : (
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">
                Click para subir foto (Obligatorio)
              </p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            name="imagen"
          />
        </div>

        <div className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre del Amigurumi"
            className="w-full p-3 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <textarea
            name="descripcion"
            placeholder="Describe este producto..."
            rows={4}
            className="w-full p-3 rounded-xl border bg-background resize-none outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <div className="grid grid-cols-4 gap-4 items-end">
            <div className="relative col-span-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">
                $
              </span>
              <input
                type="text"
                value={precioVisual}
                onChange={handlePrecioChange}
                placeholder="Precio"
                className="w-full pl-7 p-3 rounded-xl border bg-background outline-none font-medium focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="relative col-span-2">
              <select
                name="categoria"
                className="w-full p-3.5 text-center rounded-xl border bg-background cursor-pointer outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Amigurumi">Amigurumi</option>
                <option value="Llavero">Llavero</option>
                <option value="Ramo">Ramo</option>
                <option value="Personalizado">Personalizado</option>
                <option value="Patron">Patrón</option>
              </select>
            </div>

            <div className="col-span-4 space-y-2">
              <div className="flex bg-muted rounded-xl p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setIsMadeToOrder(false)}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg ${!is_made_to_order ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
                >
                  EN STOCK
                </button>
                <button
                  type="button"
                  onClick={() => setIsMadeToOrder(true)}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg ${is_made_to_order ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
                >
                  A PEDIDO
                </button>
              </div>
              {!is_made_to_order ? (
                <input
                  name="stock"
                  type="number"
                  min={1}
                  placeholder="Cantidad"
                  className="w-full p-2.5 rounded-xl border bg-background text-center text-sm"
                  required
                />
              ) : (
                <div className="h-[42px] flex items-center justify-center text-[10px] text-soft-purple italic">
                  Se habilitará botón "Tejer por encargo"
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative p-4 rounded-xl border border-soft-purple/30 bg-soft-purple/5 flex items-center gap-4 group">
          <input
            name="pdf"
            type="file"
            accept=".pdf"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={(e) => setPdfName(e.target.files?.[0]?.name || "")}
          />

          <FileText className="text-soft-purple shrink-0" />

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-soft-purple uppercase tracking-wider">
              Patrón Digital (Opcional)
            </p>

            <p className="text-xs truncate text-muted-foreground">
              {pdfName || "Adjuntar PDF"}
            </p>
          </div>

          {pdfName && (
            <X
              className="text-red-400 cursor-pointer z-20"
              size={18}
              onClick={() => setPdfName("")}
            />
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-deep-blue transition-all disabled:opacity-50"
        >
          {loading ? (
            "Subiendo..."
          ) : (
            <>
              <UploadCloud size={20} /> {productoId ? "Actualizar" : "Publicar"}
            </>
          )}
        </button>
      </form>
    </main>
  );
}
