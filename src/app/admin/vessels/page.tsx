"use client";

import { useState } from "react";
import { Plus, Ship, Edit2, Trash2, Users, Wrench, XCircle } from "lucide-react";
import { VesselFormModal } from "@/components/admin/VesselFormModal";

const mockVessels = [
  { id: 1, name: "Galaxy I", capacity: 16, owner: "Galapagos EcoTours S.A.", status: "active" },
  { id: 2, name: "Sea Wolf", capacity: 12, owner: "Wolf Expeditions", status: "active" },
  { id: 3, name: "Santa Cruz II", capacity: 90, owner: "Metropolitan Touring", status: "maintenance" },
  { id: 4, name: "La Pinta", capacity: 48, owner: "Metropolitan Touring", status: "out_of_service" },
];

const statusConfig = {
  active: {
    label: "Activa",
    icon: Ship,
    iconWrap: "bg-teal-50 text-[var(--primary)]",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10",
  },
  maintenance: {
    label: "Mantenimiento",
    icon: Wrench,
    iconWrap: "bg-amber-50 text-amber-600",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10",
  },
  out_of_service: {
    label: "Fuera de servicio",
    icon: XCircle,
    iconWrap: "bg-rose-50 text-rose-600",
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/10",
  },
} as const;

type VesselStatus = keyof typeof statusConfig;

export default function VesselsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl space-y-7 py-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Operación · Flota</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Embarcaciones</h1>
          <p className="mt-1 text-sm text-slate-500">Controla la flota, capacidad y estado operativo.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition-all hover:bg-[var(--primary-strong)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Nueva embarcación
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass rounded-2xl p-4"><p className="text-xs font-semibold text-slate-500">Total flota</p><p className="mt-1 text-2xl font-bold text-slate-900">{mockVessels.length}</p></div>
        <div className="glass rounded-2xl p-4"><p className="text-xs font-semibold text-slate-500">Activas</p><p className="mt-1 text-2xl font-bold text-emerald-600">{mockVessels.filter(v => v.status === "active").length}</p></div>
        <div className="glass rounded-2xl p-4"><p className="text-xs font-semibold text-slate-500">Mantenimiento</p><p className="mt-1 text-2xl font-bold text-amber-600">{mockVessels.filter(v => v.status === "maintenance").length}</p></div>
        <div className="glass rounded-2xl p-4"><p className="text-xs font-semibold text-slate-500">Capacidad total</p><p className="mt-1 text-2xl font-bold text-[var(--primary)]">{mockVessels.reduce((sum, v) => sum + v.capacity, 0)}</p></div>
      </div>

      <div className="space-y-3">
        {mockVessels.map((vessel) => {
          const config = statusConfig[vessel.status as VesselStatus];
          const StatusIcon = config.icon;
          return (
            <article key={vessel.id} className="glass group rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5 sm:p-5">
              <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1.5fr)_220px_auto]">
                <div className="flex min-w-0 items-center gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${config.iconWrap}`}>
                    <StatusIcon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-bold text-slate-900">{vessel.name}</h2>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${config.badge}`}>{config.label}</span>
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-500">Operada por <span className="font-medium text-slate-700">{vessel.owner}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-3 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-[var(--primary)]"><Users className="h-4 w-4" /></div>
                  <div><p className="text-lg font-bold leading-none text-slate-900">{vessel.capacity}</p><p className="mt-1 text-[11px] font-medium text-slate-500">pasajeros máx.</p></div>
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 pt-3 md:border-t-0 md:pt-0">
                  <button type="button" aria-label={`Editar ${vessel.name}`} className="min-h-10 flex-1 rounded-xl px-4 text-sm font-semibold text-slate-600 transition hover:bg-teal-50 hover:text-[var(--primary)] md:flex-none"><Edit2 className="mr-2 inline h-4 w-4" />Editar</button>
                  <button type="button" aria-label={`Eliminar ${vessel.name}`} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <VesselFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
