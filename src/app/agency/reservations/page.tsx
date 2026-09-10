"use client";

import Link from "next/link";
import { Search, Clock, CheckCircle2, Download, CreditCard, Anchor, FileText, XCircle } from "lucide-react";

const mockReservations = [
  { id: "RES-2026-8942", boatName: "Galaxy I", routeName: "Isla Isabela & Fernandina", date: "15 Oct 2026", passengers: 2, leadPassenger: "Juan Pérez", status: "confirmed", totalNet: 2125.00, bookedAt: "Hace 2 días" },
  { id: "RES-2026-8943", boatName: "Sea Wolf", routeName: "San Cristóbal & Española", date: "20 Nov 2026", passengers: 4, leadPassenger: "María Gómez", status: "blocked", timeLeft: "12h 45m", totalNet: 5100.00, bookedAt: "Hace 11 horas" },
  { id: "RES-2026-8800", boatName: "La Pinta", routeName: "Islas Centrales", date: "10 Sep 2026", passengers: 1, leadPassenger: "Carlos Ruiz", status: "cancelled", totalNet: 950.00, bookedAt: "Hace 1 mes" }
];

export default function AgencyReservationsPage() {
  return (
    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 px-4 py-8 duration-500 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">Gestión · Agencia</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mis Reservas</h1>
          <p className="text-slate-500">Historial de cupos bloqueados y confirmados.</p>
        </div>
        <Link href="/agency" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 hover:scale-[1.02] active:scale-95">
          <Search className="h-5 w-5" /> Nueva Búsqueda
        </Link>
      </div>

      <div className="space-y-4">
        {mockReservations.map((res) => (
          <div key={res.id} className="glass flex flex-col gap-6 rounded-2xl border border-slate-200/70 p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg lg:flex-row lg:items-center">
            <div className="flex shrink-0 flex-row items-center justify-between border-b border-slate-100 pb-4 lg:w-48 lg:flex-col lg:items-start lg:justify-center lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">CÓDIGO</p>
                <p className="font-mono font-bold text-slate-900">{res.id}</p>
              </div>
              <div className="lg:mt-3">
                {res.status === "confirmed" && <span className="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Confirmada</span>}
                {res.status === "blocked" && <span className="flex items-center gap-1.5 rounded-lg bg-orange-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-700"><Clock className="h-4 w-4" /> Bloqueada</span>}
                {res.status === "cancelled" && <span className="flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-700"><XCircle className="h-4 w-4" /> Cancelada</span>}
              </div>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-primary"><Anchor className="h-4 w-4" /> {res.boatName}</p>
                <p className="text-lg font-bold leading-tight text-slate-900">{res.routeName}</p>
                <p className="text-sm font-medium text-slate-500">Salida: {res.date}</p>
              </div>
              <div className="space-y-1 sm:border-l sm:border-slate-100 sm:pl-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Titular & Cupos</p>
                <p className="flex items-center gap-2 text-base font-bold text-slate-900"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-xs text-blue-600">{res.passengers}</span>{res.leadPassenger}</p>
                <p className="text-xs font-medium text-slate-500">Gestionado: {res.bookedAt}</p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row lg:w-48 lg:flex-col lg:justify-end lg:border-l lg:border-t-0 lg:pl-6">
              <div className="w-full text-center sm:text-left lg:text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Neto a Pagar</p>
                <p className="text-2xl font-black text-slate-900">${res.totalNet.toFixed(2)}</p>
              </div>
              <div className="w-full">
                {res.status === "confirmed" && <button type="button" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 text-sm font-bold text-emerald-700 transition-all duration-300 ease-out hover:bg-emerald-100 active:scale-95"><Download className="h-4 w-4" /> Voucher</button>}
                {res.status === "blocked" && <button type="button" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-md transition-all duration-300 ease-out hover:bg-primary-strong active:scale-95"><CreditCard className="h-4 w-4" /> Pagar Ahora</button>}
                {res.status === "cancelled" && <button type="button" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-600 transition-all duration-300 ease-out hover:bg-slate-200 active:scale-95"><FileText className="h-4 w-4" /> Detalles</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
