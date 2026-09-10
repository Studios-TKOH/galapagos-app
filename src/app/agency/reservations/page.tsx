"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, CheckCircle2, ExternalLink, Anchor, Users, XCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Reservation = { id: string; status: string; total_price: number; passenger_count: number; lead_passenger_name: string; created_at: string; availability?: { date?: string; departure_time?: string; vessel?: { name?: string } | null; route?: { name?: string } | null } | null; vouchers?: { qr_code_token?: string }[] | null };

export default function AgencyReservationsPage() {
  const [rows, setRows] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data, error: queryError } = await supabase.from("reservations").select("id,status,total_price,passenger_count,lead_passenger_name,created_at,availability:availability(date,departure_time,vessel:vessels(name),route:routes(name)),vouchers: vouchers(qr_code_token)").order("created_at", { ascending: false });
      if (queryError) setError("No se pudieron cargar las reservas.");
      else setRows((data ?? []) as unknown as Reservation[]);
      setLoading(false);
    }
    load();
  }, []);

  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"><div><h1 className="text-3xl font-bold">Mis Reservas</h1><p className="text-slate-500">Historial real de reservas de tu agencia.</p></div><Link href="/agency" className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border rounded-xl font-medium"><Search className="w-5 h-5" />Nueva búsqueda</Link></div>
    {loading ? <div className="py-20 text-center"><Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" /></div> : error ? <div className="p-4 rounded-xl bg-red-50 text-red-700">{error}</div> : rows.length === 0 ? <div className="py-20 text-center text-slate-500">Todavía no tienes reservas.</div> : <div className="space-y-4">{rows.map(res => { const voucher = res.vouchers?.[0]?.qr_code_token; return <div key={res.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border shadow-sm flex flex-col lg:flex-row gap-6 lg:items-center"><div className="lg:w-48 shrink-0"><p className="text-xs font-bold text-slate-400 uppercase">Código</p><p className="font-mono font-bold truncate">{res.id}</p><span className={`inline-flex mt-3 items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${res.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>{res.status === "cancelled" ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}{res.status === "cancelled" ? "Cancelada" : "Confirmada"}</span></div><div className="flex-1 grid sm:grid-cols-2 gap-4"><div><p className="text-sm font-bold text-primary flex items-center gap-2"><Anchor className="w-4 h-4" />{res.availability?.vessel?.name || "Embarcación"}</p><p className="text-lg font-bold">{res.availability?.route?.name || "Ruta"}</p><p className="text-sm text-slate-500">Salida: {res.availability?.date || "—"} · {res.availability?.departure_time?.slice(0,5) || "—"}</p></div><div className="sm:border-l sm:pl-6"><p className="text-xs font-bold text-slate-400 uppercase">Titular & cupos</p><p className="font-bold flex items-center gap-2"><Users className="w-4 h-4" />{res.lead_passenger_name}</p><p className="text-sm text-slate-500">{res.passenger_count} pasajero(s)</p></div></div><div className="lg:w-52 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6"><p className="text-xs text-slate-400 uppercase">Total</p><p className="text-2xl font-black">${Number(res.total_price || 0).toFixed(2)}</p>{voucher && res.status !== "cancelled" && <Link href={`/verify/${encodeURIComponent(voucher)}`} target="_blank" className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-xl font-bold"><ExternalLink className="w-4 h-4" />Ver voucher</Link>}</div></div>; })}</div>}
  </div>;
}
