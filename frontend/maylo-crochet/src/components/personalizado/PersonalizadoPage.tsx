"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, X, CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";

interface PersonalizedItem {
  id: string;
  nombre: string;
  descripcion: string;
  detalles: string[]; // Lista de cosas que puede elegir
  imagenSrc: string;
  precioDesde: number;

}

const personalizedOptions: PersonalizedItem[] = [
  {
    id: "amigurumi-base",
    nombre: "Amigurumi Base",
    descripcion: "Elige tu animal favorito y personaliza colores y accesorios.",
    detalles: ["Tamaño personalizable (10cm - 30cm)", "Paleta de colores a elección", "Accesorios (gorritos, lazos, bufandas)", "Opción de sonajero interno"],
    imagenSrc: "/images/personalizados/conejito-base.jpg",
    precioDesde: 80000,
  },
  {
    id: "retrato-mascota",
    nombre: "Retrato de Mascota",
    descripcion: "Tejemos a tu mejor amigo en fiel detalle.",
    detalles: ["Basado en fotos reales", "Etiqueta con nombre tejida", "Argolla para colgar opcional", "Empaque de regalo premium"],
    imagenSrc: "/images/personalizados/perrito-retrato.jpg",
    precioDesde: 120000,
  },
  // ... añade los demás aquí
];

export function PersonalizadoPage() {
  const [selectedItem, setSelectedItem] = useState<PersonalizedItem | null>(null);

  return (
    <section className="py-16 lg:py-28 bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg font-bold tracking-widest text-pink-600 uppercase mb-3">Galería Creativa</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-purple-800">Magia Personalizada</h2>
        </div>

        {/* Grid de Galería */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalizedOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white shadow-lg transition-all duration-500 hover:scale-[1.02]"
            >
              <Image src={item.imagenSrc} alt={item.nombre} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 p-8 text-white">
                <h3 className="text-2xl font-bold font-serif">{item.nombre}</h3>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  Click para ver detalles
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL DE DETALLE --- */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div 
              className="bg-white rounded-[3rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón Cerrar */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-20 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <X className="h-6 w-6 text-purple-900" />
              </button>

              {/* Imagen en el Modal */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <Image src={selectedItem.imagenSrc} alt={selectedItem.nombre} fill className="object-cover" />
              </div>

              {/* Contenido en el Modal */}
              <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4 text-pink-600">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-bold uppercase tracking-tighter text-sm">Opción Personalizable</span>
                </div>
                
                <h2 className="text-4xl font-serif font-bold text-purple-950 mb-4">{selectedItem.nombre}</h2>
                <p className="text-muted-foreground mb-8">{selectedItem.descripcion}</p>

                <div className="space-y-3 mb-10">
                  <p className="font-bold text-purple-900">¿Qué puedes elegir?</p>
                  {selectedItem.detalles.map((detalle, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {detalle}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Inicia desde</p>
                    <p className="text-2xl font-bold text-purple-900">${new Intl.NumberFormat("es-CO").format(selectedItem.precioDesde)}</p>
                  </div>
                  <Link
                    href={`https://wa.me/TUNUMERO?text=Hola! Me interesa personalizar un ${selectedItem.nombre}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Cotizar
                  </Link>
                </div>
              </div>
            </div>
            {/* Overlay para cerrar al hacer clic fuera */}
            <div className="absolute inset-0 -z-10" onClick={() => setSelectedItem(null)} />
          </div>
        )}
      </div>
    </section>
  );
}