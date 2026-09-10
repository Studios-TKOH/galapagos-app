"use client";

import Link from "next/link";
import { Users, Clock, AlertTriangle, ArrowRight, Anchor } from "lucide-react";

export default function OperatorDashboard() {
  return (
    <div className="space-y-6 p-4 pb-24 sm:p-5">
      <div className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Panel operativo</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">¡Hola, Capitán! 👋</h1>
        <p className="mt-1 text-sm text-slate-500">Resumen operativo para el día de hoy.</p>
      </div>

      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[var(--primary)] to-[#075b69] p-5 text-white shadow-xl shadow-teal-900/15">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 right-0 opacity-10"><Anchor className="h-32 w-32" /></div>
        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between gap-3">
            <span className="rounded-lg bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">Próximo zarpe</span>
            <span className="flex items-center gap-1 text-sm font-bold"><Clock className="h-4 w-4" />En 2 horas</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Isabela &amp; Fernandina</h2>
          <p className="mt-1 text-sm text-teal-100">Salida: 08:00 AM • Pto. Ayora</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-100">Pasajeros</p>
              <p className="mt-1 flex items-center gap-2 text-2xl font-black"><Users className="h-5 w-5" />12<span className="text-sm text-teal-100">/16</span></p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-100">Cupos libres</p>
              <p className="mt-1 text-2xl font-black text-emerald-200">4</p>
            </div>
          </div>

          <Link href="/operator/availability" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-[var(--primary)] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 active:scale-[0.98]">
            Actualizar cupos <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Alertas recientes</h2>
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-orange-700">1 activa</span>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-orange-50/80 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm"><AlertTriangle className="h-5 w-5" /></span>
            <div>
              <p className="text-sm font-bold text-orange-900">Reserva bloqueada a punto de expirar</p>
              <p className="mt-1 text-xs leading-relaxed text-orange-800">La agencia “Galapagos Dreams” tiene 4 cupos bloqueados que expiran en 30 minutos.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
