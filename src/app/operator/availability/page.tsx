"use client";

import { useState } from "react";
import { Minus, Plus, Calendar, Save, CheckCircle2 } from "lucide-react";

const initialDepartures = [
  { id: 1, routeName: "Isabela & Fernandina", date: "Hoy, 08:00 AM", maxCapacity: 16, availableSeats: 4, status: "active" },
  { id: 2, routeName: "San Cristóbal", date: "Mañana, 07:30 AM", maxCapacity: 16, availableSeats: 16, status: "active" },
  { id: 3, routeName: "Santa Cruz (Bahía)", date: "Jue 17 Oct, 09:00 AM", maxCapacity: 16, availableSeats: 0, status: "full" },
];

export default function OperatorAvailabilityPage() {
  const [departures, setDepartures] = useState(initialDepartures);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdateSeats = (id: number, delta: number) => {
    setDepartures((current) => current.map((dep) => {
      if (dep.id !== id) return dep;
      const newSeats = Math.max(0, Math.min(dep.maxCapacity, dep.availableSeats + delta));
      return { ...dep, availableSeats: newSeats, status: newSeats === 0 ? "full" : "active" };
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 p-4 pb-24 sm:p-5">
      <div className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Operación</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Gestor de cupos</h1>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">Toca los botones para actualizar tu disponibilidad.</p>
      </div>

      <div className="space-y-4">
        {departures.map((dep) => (
          <section key={dep.id} className={`rounded-[26px] border p-4 shadow-sm transition ${dep.status === "full" ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-white"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-lg font-bold leading-tight text-slate-900">{dep.routeName}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500"><Calendar className="h-4 w-4" />{dep.date}</p>
              </div>
              {dep.status === "full" && <span className="shrink-0 rounded-lg bg-rose-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-rose-700">Lleno</span>}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-3">
              <div className="px-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Cupos libres</p>
                <p className={`mt-0.5 text-3xl font-black ${dep.availableSeats > 0 ? "text-[var(--primary)]" : "text-slate-400"}`}>{dep.availableSeats}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleUpdateSeats(dep.id, -1)} disabled={dep.availableSeats === 0} aria-label={`Quitar un cupo de ${dep.routeName}`} className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
                  <Minus className="h-6 w-6" />
                </button>
                <button type="button" onClick={() => handleUpdateSeats(dep.id, 1)} disabled={dep.availableSeats === dep.maxCapacity} aria-label={`Añadir un cupo a ${dep.routeName}`} className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[var(--primary)] shadow-sm transition hover:bg-teal-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
                  <Plus className="h-6 w-6" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-right text-[11px] font-medium text-slate-400">Capacidad máxima: {dep.maxCapacity}</p>
          </section>
        ))}
      </div>

      <div className="sticky bottom-20 z-40">
        <button type="button" onClick={handleSave} disabled={isSaving} aria-live="polite" className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-xl transition active:scale-[0.98] disabled:cursor-wait ${showSuccess ? "bg-emerald-500" : "bg-[var(--primary)] hover:bg-[var(--primary-strong)]"}`}>
          {isSaving ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : showSuccess ? <><CheckCircle2 className="h-6 w-6" />¡Actualizado!</> : <><Save className="h-6 w-6" />Guardar cambios</>}
        </button>
      </div>
    </div>
  );
}
