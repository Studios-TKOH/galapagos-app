"use client";

import { X, Users, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type BookingTour = { id: string; boatName: string; routeName: string; price: number; availableSeats: number };
export function BookingModal({ isOpen, onClose, tour, initialPassengers = 1 }: { isOpen: boolean; onClose: () => void; tour: BookingTour | null; initialPassengers?: number }) {
  const [passengers, setPassengers] = useState(() => Math.max(1, Math.min(tour?.availableSeats ?? 1, initialPassengers)));
  const [leadPassenger, setLeadPassenger] = useState("");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ id: string; token: string } | null>(null);
  const supabase = createClient();

  if (!isOpen || !tour) return null;
  const selectedTour = tour;
  const publicTotal = selectedTour.price * passengers;
  const commissionAmount = publicTotal * 0.15;
  const netTotal = publicTotal - commissionAmount;

  async function confirmReservation() {
    setError("");
    if (!leadPassenger.trim() || leadPassenger.trim().length < 2) {
      setError("Ingresa el nombre completo del pasajero principal.");
      return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Tu sesión expiró. Inicia sesión nuevamente.");
      setLoading(false);
      return;
    }

    const { data: membership, error: membershipError } = await supabase
      .from("agencies_users")
      .select("agency_id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (membershipError || !membership?.agency_id) {
      setError("Tu usuario no está vinculado a una agencia.");
      setLoading(false);
      return;
    }

    const { data, error: reservationError } = await supabase.rpc("create_reservation", {
      p_availability_id: selectedTour.id,
      p_agency_id: membership.agency_id,
      p_passenger_count: passengers,
      p_lead_passenger_name: leadPassenger.trim(),
      p_lead_passenger_document: document.trim(),
    });

    if (reservationError) {
      const message = reservationError.message;
      setError(message.includes("INSUFFICIENT_SEATS") ? "Ya no hay suficientes cupos disponibles." : "No se pudo confirmar la reserva. Inténtalo nuevamente.");
      setLoading(false);
      return;
    }

    const result = Array.isArray(data) ? data[0] : data;
    if (!result?.reservation_id || !result?.voucher_token) {
      setError("La reserva fue procesada, pero no se recibió el voucher. Contacta al administrador.");
      setLoading(false);
      return;
    }

    setSuccess({ id: result.reservation_id, token: result.voucher_token });
    setLoading(false);
  }

  return <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
    <div role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
        <div><h2 id="booking-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">Confirmar reserva</h2><p className="text-sm text-slate-500 mt-1">{selectedTour.boatName} · {selectedTour.routeName}</p></div>
        <button type="button" onClick={onClose} aria-label="Cerrar" className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-6 overflow-y-auto space-y-6">
        {success ? <div className="text-center py-8"><CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500 mb-4" /><h3 className="text-2xl font-black text-slate-900 dark:text-white">Reserva confirmada</h3><p className="text-slate-500 mt-2">Código: <span className="font-mono font-bold">{success.id}</span></p><a href={`/verify/${encodeURIComponent(success.token)}`} target="_blank" rel="noreferrer" className="inline-flex mt-6 px-5 py-3 bg-primary text-white font-bold rounded-xl">Abrir voucher</a></div> : <>
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700"><Users className="w-5 h-5 text-primary" /><div className="flex-1"><p className="font-bold">Pasajeros</p><p className="text-sm text-slate-500">Disponibles: {selectedTour.availableSeats}</p></div><div className="flex items-center gap-3"><button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))} className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">−</button><span className="w-6 text-center font-bold">{passengers}</span><button type="button" onClick={() => setPassengers(Math.min(selectedTour.availableSeats, passengers + 1))} className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">+</button></div></div>
          <div className="grid sm:grid-cols-2 gap-4"><input value={leadPassenger} onChange={e => setLeadPassenger(e.target.value)} placeholder="Nombre completo del titular" className="px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800" /><input value={document} onChange={e => setDocument(e.target.value)} placeholder="Pasaporte / Cédula" className="px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800" /></div>
          <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 space-y-3"><div className="flex justify-between"><span>Precio público</span><span>${publicTotal.toFixed(2)}</span></div><div className="flex justify-between text-emerald-600"><span>Comisión (15%)</span><span>- ${commissionAmount.toFixed(2)}</span></div><div className="pt-3 border-t flex justify-between font-black"><span>Neto</span><span className="text-2xl text-primary">${netTotal.toFixed(2)}</span></div></div>
          {error && <div role="alert" className="p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}
        </>}
      </div>
      {!success && <div className="p-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4"><button type="button" onClick={onClose} className="px-6 py-3.5 font-bold bg-slate-100 dark:bg-slate-800 rounded-xl">Cancelar</button><button type="button" disabled={loading} onClick={confirmReservation} className="px-6 py-3.5 font-bold text-white bg-primary rounded-xl disabled:opacity-60 flex items-center justify-center gap-2">{loading && <Loader2 className="w-5 h-5 animate-spin" />}<CreditCard className="w-5 h-5" />Confirmar reserva</button></div>}
    </div>
  </div>;
}
