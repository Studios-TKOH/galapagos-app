"use client";

import { X, Users, CreditCard, Clock } from "lucide-react";
import { useState } from "react";

export type BookingTour = {
  boatName: string;
  routeName: string;
  price: number;
  availableSeats: number;
};

export function BookingModal({ isOpen, onClose, tour }: { isOpen: boolean; onClose: () => void; tour: BookingTour | null }) {
  const [passengers, setPassengers] = useState(2);
  const commissionRate = 0.15;

  if (!isOpen || !tour) return null;

  const publicTotal = tour.price * passengers;
  const commissionAmount = publicTotal * commissionRate;
  const netTotal = publicTotal - commissionAmount;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />

      <div role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 p-5 sm:p-6">
          <div className="min-w-0 pr-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Nueva reserva</p>
            <h2 id="booking-modal-title" className="mt-1 text-xl font-bold text-slate-900">Resumen de la reserva</h2>
            <p className="mt-1 truncate text-sm text-slate-500">{tour.boatName} · {tour.routeName}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar resumen de reserva" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-700 active:scale-95">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-5 sm:p-6">
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-slate-900"><Users className="h-5 w-5 text-[var(--primary)]" />Selección de pasajeros</h3>
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">Cantidad de pasajeros</p>
                <p className="mt-1 text-sm text-slate-500">Cupos disponibles: {tour.availableSeats}</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-1.5 ring-1 ring-slate-200">
                <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))} aria-label="Quitar un pasajero" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95">−</button>
                <span className="w-6 text-center text-lg font-bold text-slate-900">{passengers}</span>
                <button type="button" onClick={() => setPassengers(Math.min(tour.availableSeats, passengers + 1))} aria-label="Añadir un pasajero" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-[var(--primary)] shadow-sm transition hover:bg-teal-50 active:scale-95">+</button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-sm font-semibold text-slate-700">Datos del pasajero principal</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input type="text" aria-label="Nombres completos del pasajero principal" autoComplete="name" placeholder="Nombres completos" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-teal-100" />
                <input type="text" aria-label="Pasaporte o cédula del pasajero principal" placeholder="Pasaporte / Cédula" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-teal-100" />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-slate-900"><CreditCard className="h-5 w-5 text-[var(--primary)]" />Resumen financiero</h3>
            <div className="space-y-3 rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
              <div className="flex justify-between gap-4 text-sm text-slate-600"><span>Precio público ({passengers} × ${tour.price})</span><span className="font-semibold text-slate-800">${publicTotal.toFixed(2)}</span></div>
              <div className="flex justify-between gap-4 text-sm font-medium text-emerald-700"><span>Tu comisión (15%)</span><span>− ${commissionAmount.toFixed(2)}</span></div>
              <div className="flex items-center justify-between gap-4 border-t border-teal-200 pt-3"><span className="font-bold text-slate-900">Monto neto a pagar</span><span className="text-2xl font-black text-[var(--primary)]">${netTotal.toFixed(2)}</span></div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-slate-100 bg-white p-5 sm:grid-cols-2 sm:p-6">
          <button type="button" className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]"><Clock className="h-5 w-5" />Bloquear (24h)</button>
          <button type="button" className="flex items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition hover:bg-[var(--primary-strong)] active:scale-[0.98]">Confirmar reserva</button>
        </div>
      </div>
    </div>
  );
}
