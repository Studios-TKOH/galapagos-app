"use client";

import { useState } from "react";
import { Plus, Mail, MessageCircle, Edit2, ShieldBan, CheckCircle2 } from "lucide-react";
import { AgencyFormModal } from "@/components/admin/AgencyFormModal";

const mockAgencies = [
  { id: 1, name: "Galapagos Dreams", email: "reservas@galapagosdreams.com", phone: "+593 98 123 4567", commission: 15, status: "active", reservationsThisMonth: 24 },
  { id: 2, name: "Blue Water Tours", email: "info@bluewatertours.ec", phone: "+593 99 765 4321", commission: 20, status: "active", reservationsThisMonth: 12 },
  { id: 3, name: "Ecuador Travel & Co.", email: "booking@ecuadortravel.com", phone: "+593 97 111 2222", commission: 10, status: "suspended", reservationsThisMonth: 0 },
  { id: 4, name: "Nature Expeditions", email: "hello@nature-expeditions.com", phone: "+593 99 888 7777", commission: 15, status: "active", reservationsThisMonth: 8 },
];

export default function AgenciesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl space-y-7 py-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Red comercial · B2B</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Directorio de Agencias</h1>
          <p className="mt-1 text-sm text-slate-500">Gestiona aliados comerciales, permisos y comisiones.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition-all hover:bg-[var(--primary-strong)] hover:-translate-y-0.5 active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Nueva agencia
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass rounded-2xl p-4"><p className="text-xs font-semibold text-slate-500">Agencias</p><p className="mt-1 text-2xl font-bold text-slate-900">{mockAgencies.length}</p></div>
        <div className="glass rounded-2xl p-4"><p className="text-xs font-semibold text-slate-500">Activas</p><p className="mt-1 text-2xl font-bold text-emerald-600">{mockAgencies.filter(a => a.status === "active").length}</p></div>
        <div className="glass rounded-2xl p-4"><p className="text-xs font-semibold text-slate-500">Reservas este mes</p><p className="mt-1 text-2xl font-bold text-[var(--primary)]">{mockAgencies.reduce((sum, a) => sum + a.reservationsThisMonth, 0)}</p></div>
        <div className="glass rounded-2xl p-4"><p className="text-xs font-semibold text-slate-500">Comisión media</p><p className="mt-1 text-2xl font-bold text-slate-900">{Math.round(mockAgencies.reduce((sum, a) => sum + a.commission, 0) / mockAgencies.length)}%</p></div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mockAgencies.map((agency) => {
          const active = agency.status === "active";
          return (
            <article key={agency.id} className={`glass group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 ${!active ? "opacity-85" : ""}`}>
              <div className="border-b border-slate-100 bg-gradient-to-br from-white to-slate-50/80 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold shadow-sm ${active ? "bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white" : "bg-slate-100 text-slate-400"}`}>{agency.name.charAt(0)}</div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${active ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10" : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/10"}`}>
                    {active ? <CheckCircle2 className="h-3 w-3" /> : <ShieldBan className="h-3 w-3" />} {active ? "Activa" : "Suspendida"}
                  </span>
                </div>
                <h2 className={`mt-4 truncate text-xl font-bold ${active ? "text-slate-900" : "text-slate-500"}`}>{agency.name}</h2>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-3">
                  <a href={`mailto:${agency.email}`} className="group/link flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-[var(--primary)]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition group-hover/link:bg-teal-50"><Mail className="h-4 w-4" /></span><span className="truncate">{agency.email}</span>
                  </a>
                  <a href={`https://wa.me/${agency.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="group/link flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-emerald-600">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition group-hover/link:bg-emerald-50"><MessageCircle className="h-4 w-4" /></span><span>{agency.phone}</span>
                  </a>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Comisión</p><p className="mt-1 text-lg font-bold text-slate-900">{agency.commission}%</p></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mes actual</p><p className="mt-1 text-lg font-bold text-slate-900">{agency.reservationsThisMonth} <span className="text-xs font-medium text-slate-400">res.</span></p></div>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/70">
                <button type="button" className="min-h-11 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-[var(--primary)]"><Edit2 className="h-4 w-4" />Editar</button>
                <button type="button" className={`min-h-11 flex items-center justify-center gap-2 text-sm font-semibold transition ${active ? "text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"}`}><ShieldBan className="h-4 w-4" />{active ? "Suspender" : "Reactivar"}</button>
              </div>
            </article>
          );
        })}
      </div>

      <AgencyFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
