// src/components/admin/AdminHeader.tsx
"use client";

import { LogOut, Plus, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AdminHeader() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-card p-6 rounded-3xl border border-border shadow-sm">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">
          Gestión de Inventario
        </h1>
        <p className="text-muted-foreground text-sm">
          Administra tus amigurumis y patrones
        </p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Botón Nuevo Producto con estilo llamativo */}

        <Link
          href="/admin/form"
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:scale-110 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus size={18} /> Nuevo Producto
        </Link>

        {/* Botón Cerrar Sesión más sutil pero elegante */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-border hover:scale-110 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-muted-foreground disabled:opacity-50 active:scale-95 cursor-pointer"
          title="Cerrar Sesión"
        >
          <LogOut size={20} className={isLoggingOut ? "animate-pulse" : ""} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </div>
  );
}
