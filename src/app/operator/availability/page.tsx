"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Calendar, Save, CheckCircle2, Loader2, Ship } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Departure = { id: string; routeName: string; vesselName: string; date: string; departureTime: string; maxCapacity: number; availableSeats: number; status: string };

function formatDate(value: string) { return new Intl.DateTimeFormat("es-EC", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`)); }

export default function OperatorAvailabilityPage() {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const supabase = createClient();

  async function load() {
    setLoading(true); setError("");
    const { data, error: queryError } = await supabase.from("availability").select("id,date,departure_time,total_seats,available_seats,status,vessel:vessels(name),route:routes(name)").gte("date", new Date().toISOString().slice(0,10)).order("date", { ascending: true }).order("departure_time", { ascending: true }).limit(50);
    if (queryError) setError("No se pudo cargar la disponibilidad.");
    else setDepartures(((data ?? []) as unknown as Array<{id:string;date:string;departure_time:string;total_seats:number;available_seats:number;status:string;vessel?:{name?:string}|null;route?:{name?:string}|null}>).map(x => ({ id:x.id, routeName:x.route?.name || "Ruta", vesselName:x.vessel?.name || "Embarcación", date:x.date, departureTime:x.departure_time, maxCapacity:x.total_seats, availableSeats:x.available_seats, status:x.status })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const changeSeats = (id: string, delta: number) => setDepartures(current => current.map(dep => dep.id === id ? { ...dep, availableSeats: Math.max(0, Math.min(dep.maxCapacity, dep.availableSeats + delta)) } : dep));

  async function save(dep: Departure) {
    setSavingId(dep.id); setError(""); setSaved(null);
    const { error: rpcError } = await supabase.rpc("update_availability_seats", { p_availability_id: dep.id, p_available_seats: dep.availableSeats });
    if (rpcError) setError(rpcError.message.includes("SEAT_CAPACITY_CONFLICT") ? "No puedes reducir los cupos por debajo de los pasajeros ya reservados." : "No se pudieron guardar los cupos.");
    else { setSaved(dep.id); setTimeout(() => setSaved(current => current === dep.id ? null : current), 2500); }
    setSavingId(null);
  }

  return <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-24">
    <div><h1 className="text-2xl font-black text-slate-900 dark:text-white">Gestor de Cupos</h1><p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Actualiza la disponibilidad real de tus salidas.</p></div>
    {error && <div role="alert" className="p-4 rounded-2xl bg-red-50 text-red-700 border border-red-100">{error}</div>}
    {loading ? <div className="py-20 text-center"><Loader2 className="w-10 h-10 mx-auto animate-spin text-primary" /></div> : departures.length === 0 ? <div className="py-20 text-center text-slate-500"><Ship className="w-10 h-10 mx-auto text-slate-300" /><p className="mt-3 font-bold">No hay salidas próximas.</p></div> : <div className="space-y-4">{departures.map(dep => <div key={dep.id} className="rounded-3xl p-5 border-2 bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/30 shadow-sm">
      <div className="flex justify-between items-start mb-4"><div><h3 className="text-lg font-bold leading-tight mb-1">{dep.routeName}</h3><p className="text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5"><Ship className="w-4 h-4" />{dep.vesselName}</p><p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1"><Calendar className="w-4 h-4" />{formatDate(dep.date)} · {dep.departureTime.slice(0,5)}</p></div>{dep.availableSeats === 0 && <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-black uppercase rounded-lg">Lleno</span>}</div>
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl"><div className="px-2"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Cupos Libres</p><p className="text-3xl font-black text-primary">{dep.availableSeats}<span className="text-sm text-slate-400"> / {dep.maxCapacity}</span></p></div><div className="flex items-center gap-2"><button type="button" onClick={() => changeSeats(dep.id,-1)} disabled={dep.availableSeats===0 || savingId===dep.id} aria-label={`Quitar un cupo de ${dep.routeName}`} className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border flex items-center justify-center disabled:opacity-50 active:scale-95"><Minus className="w-6 h-6" /></button><button type="button" onClick={() => changeSeats(dep.id,1)} disabled={dep.availableSeats===dep.maxCapacity || savingId===dep.id} aria-label={`Añadir un cupo de ${dep.routeName}`} className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border flex items-center justify-center disabled:opacity-50 active:scale-95"><Plus className="w-6 h-6" /></button></div></div>
      <button type="button" onClick={() => save(dep)} disabled={savingId===dep.id} className={`mt-4 w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 ${saved===dep.id ? "bg-emerald-500" : "bg-primary hover:bg-blue-600"}`}>{savingId===dep.id ? <Loader2 className="w-5 h-5 animate-spin" /> : saved===dep.id ? <><CheckCircle2 className="w-5 h-5" />Actualizado</> : <><Save className="w-5 h-5" />Guardar {dep.availableSeats} cupos</>}</button>
    </div>)}</div>}
  </div>;
}
