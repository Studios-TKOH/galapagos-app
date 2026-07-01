"use client";

import Link from "next/link";
import { Search, Clock, CheckCircle2, Download, CreditCard, Anchor, FileText, XCircle } from "lucide-react";

// Mock data para las reservas
const mockReservations = [
  {
    id: "RES-2026-8942",
    boatName: "Galaxy I",
    routeName: "Isla Isabela & Fernandina",
    date: "15 Oct 2026",
    passengers: 2,
    leadPassenger: "Juan Pérez",
    status: "confirmed",
    totalNet: 2125.00,
    bookedAt: "Hace 2 días"
  },
  {
    id: "RES-2026-8943",
    boatName: "Sea Wolf",
    routeName: "San Cristóbal & Española",
    date: "20 Nov 2026",
    passengers: 4,
    leadPassenger: "María Gómez",
    status: "blocked",
    timeLeft: "12h 45m",
    totalNet: 5100.00,
    bookedAt: "Hace 11 horas"
  },
  {
    id: "RES-2026-8800",
    boatName: "La Pinta",
    routeName: "Islas Centrales",
    date: "10 Sep 2026",
    passengers: 1,
    leadPassenger: "Carlos Ruiz",
    status: "cancelled",
    totalNet: 950.00,
    bookedAt: "Hace 1 mes"
  }
];

export default function AgencyReservationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Mis Reservas</h1>
          <p className="text-slate-500 dark:text-slate-400">Historial de cupos bloqueados y confirmados.</p>
        </div>
        <Link 
          href="/agency"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out shadow-sm hover:scale-[1.02] active:scale-95"
        >
          <Search className="w-5 h-5" />
          Nueva Búsqueda
        </Link>
      </div>

      {/* Tarjetas de Reservas */}
      <div className="space-y-4">
        {mockReservations.map((res) => (
          <div 
            key={res.id} 
            className="glass rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center gap-6 transition-all duration-300 ease-in-out border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-primary/5"
          >
            
            {/* Indicador de Estado y Código */}
            <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-start lg:w-48 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-4 lg:pb-0 lg:pr-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">CÓDIGO</p>
                <p className="font-mono font-bold text-slate-900 dark:text-white">{res.id}</p>
              </div>
              
              <div className="lg:mt-3">
                {res.status === 'confirmed' && (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Confirmada
                  </span>
                )}
                {res.status === 'blocked' && (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Bloqueada
                  </span>
                )}
                {res.status === 'cancelled' && (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Cancelada
                  </span>
                )}
              </div>
            </div>

            {/* Detalles del Tour y Pasajeros */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary flex items-center gap-1.5 uppercase tracking-wide">
                  <Anchor className="w-4 h-4" /> {res.boatName}
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{res.routeName}</p>
                <p className="text-sm text-slate-500 font-medium">Salida: {res.date}</p>
              </div>

              <div className="space-y-1 sm:border-l border-slate-100 dark:border-slate-800 sm:pl-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Titular & Cupos</p>
                <p className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 flex items-center justify-center text-xs">
                    {res.passengers}
                  </span>
                  {res.leadPassenger}
                </p>
                <p className="text-xs text-slate-500 font-medium">Gestionado: {res.bookedAt}</p>
              </div>
            </div>

            {/* Resumen Financiero y Acciones */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between lg:justify-end gap-4 lg:w-48 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 lg:pl-6">
              <div className="text-center sm:text-left lg:text-right w-full">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Neto a Pagar</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">${res.totalNet.toFixed(2)}</p>
              </div>

              <div className="w-full">
                {res.status === 'confirmed' && (
                  <button type="button" className="w-full min-h-11 flex items-center justify-center gap-2 px-4 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl transition-all duration-300 ease-in-out active:scale-95">
                    <Download className="w-4 h-4" /> Voucher
                  </button>
                )}
                {res.status === 'blocked' && (
                  <button type="button" className="w-full min-h-11 flex items-center justify-center gap-2 px-4 text-sm font-bold text-white bg-primary hover:bg-blue-600 rounded-xl transition-all duration-300 ease-in-out shadow-md active:scale-95">
                    <CreditCard className="w-4 h-4" /> Pagar Ahora
                  </button>
                )}
                {res.status === 'cancelled' && (
                  <button type="button" className="w-full min-h-11 flex items-center justify-center gap-2 px-4 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all duration-300 ease-in-out active:scale-95">
                    <FileText className="w-4 h-4" /> Detalles
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
