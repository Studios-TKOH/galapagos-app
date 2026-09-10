"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Clock, DollarSign, Edit2, Trash2, Image as ImageIcon, CheckCircle2, CircleOff } from "lucide-react";
import { TourFormModal } from "@/components/admin/TourFormModal";

const mockTours = [
  {
    id: 1,
    name: "San Cristóbal 360",
    description: "Vuelta completa a la isla visitando León Dormido, Cerro Brujo y Bahía Sardina.",
    duration: "Full Day (8 hrs)",
    price: 150.00,
    active: true,
    image: "https://images.unsplash.com/photo-1596409890119-86927a4d4679?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Tour Isla Isabela",
    description: "Visita a Las Tintoreras, snorkel con tortugas marinas y pinguinos.",
    duration: "Full Day (7 hrs)",
    price: 120.00,
    active: true,
    image: "https://images.unsplash.com/photo-1570535978434-6cb60d70dafc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Bahía Tour",
    description: "Recorrido cercano en Puerto Ayora, Lobería y Canal del Amor.",
    duration: "Half Day (4 hrs)",
    price: 60.00,
    active: false,
    image: null
  }
];

export default function ToursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl space-y-7 py-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Catálogo
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Rutas y Tours</h1>
          <p className="mt-1 text-sm text-slate-500">Gestiona las experiencias disponibles para tus pasajeros.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0b7f8c] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0b7f8c]/20 transition-all hover:-translate-y-0.5 hover:bg-[#086874] hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          Nueva ruta
        </button>
      </section>

      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <p className="text-sm font-medium text-slate-600"><span className="font-bold text-slate-900">{mockTours.length}</span> experiencias en catálogo</p>
        <span className="text-xs text-slate-400">Actualizado recientemente</span>
      </div>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mockTours.map((tour) => (
          <article key={tour.id} className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_8px_30px_rgba(16,42,67,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,42,67,0.1)]">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              {tour.image ? (
                <Image src={tour.image} alt={tour.name} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-[#e5f5f6] text-slate-300">
                  <ImageIcon className="h-12 w-12" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/45 to-transparent" />
              <div className="absolute left-4 top-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm backdrop-blur-md ${tour.active ? "bg-white/95 text-emerald-700" : "bg-slate-800/85 text-white"}`}>
                  {tour.active ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleOff className="h-3.5 w-3.5" />}
                  {tour.active ? "Activo" : "Inactivo"}
                </span>
              </div>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-xs font-medium text-white/80">Experiencia turística</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{tour.name}</h2>
              <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">{tour.description}</p>

              <div className="mt-5 flex items-center gap-5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#0b7f8c]" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">${tour.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button type="button" aria-label={`Editar ${tour.name}`} className="min-h-10 flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 text-sm font-semibold text-slate-600 transition-colors hover:bg-[#e5f5f6] hover:text-[#0b7f8c]">
                  <Edit2 className="h-4 w-4" />
                  Editar
                </button>
                <button type="button" aria-label={`Eliminar ${tour.name}`} className="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <TourFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
