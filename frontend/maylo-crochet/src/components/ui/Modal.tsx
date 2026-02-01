// components/Modal.tsx
"use client";

import { X } from "lucide-react";

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro con desenfoque */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Contenedor del formulario */}
      <div className="relative bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl z-10 animate-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors z-20"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
