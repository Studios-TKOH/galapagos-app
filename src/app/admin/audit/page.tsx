"use client";

import { Search, Filter, History, ShieldAlert, CheckCircle2, XCircle, AlertCircle, RefreshCw } from "lucide-react";

const mockAuditLogs = [
  { id: 1, action: "Reserva Bloqueada", details: "La agencia 'Galapagos Dreams' bloqueó 4 cupos en Galaxy I.", user: "Agencia (Galapagos Dreams)", type: "warning", timestamp: "Hoy, 14:30 PM" },
  { id: 2, action: "Voucher Emitido", details: "Se confirmó la reserva RES-2026-8942 y se generó el Voucher PDF.", user: "Sistema (Auto)", type: "success", timestamp: "Hoy, 10:15 AM" },
  { id: 3, action: "Cupos Modificados", details: "El capitán del Sea Wolf redujo la capacidad máxima de 16 a 12.", user: "Operador (Sea Wolf)", type: "info", timestamp: "Ayer, 18:45 PM" },
  { id: 4, action: "Reserva Cancelada", details: "Reserva RES-2026-8800 expiró sin pago y fue cancelada automáticamente.", user: "Sistema (Auto)", type: "error", timestamp: "Ayer, 09:00 AM" },
  { id: 5, action: "Configuración Actualizada", details: "El administrador activó el envío de vouchers por WhatsApp.", user: "Admin (Root)", type: "info", timestamp: "12 Oct 2026, 11:20 AM" },
];

const getTypeStyles = (type: string) => {
  switch (type) {
    case "success": return { bg: "bg-emerald-50", text: "text-emerald-600", icon: <CheckCircle2 className="h-5 w-5" />, line: "bg-emerald-200" };
    case "error": return { bg: "bg-rose-50", text: "text-rose-600", icon: <XCircle className="h-5 w-5" />, line: "bg-rose-200" };
    case "warning": return { bg: "bg-amber-50", text: "text-amber-600", icon: <AlertCircle className="h-5 w-5" />, line: "bg-amber-200" };
    default: return { bg: "bg-sky-50", text: "text-sky-600", icon: <RefreshCw className="h-5 w-5" />, line: "bg-sky-200" };
  }
};

export default function AuditLogPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-7 py-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Seguridad · Trazabilidad</p>
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[var(--primary)]"><History className="h-5 w-5" /></span>Historial de Auditoría</h1>
        <p className="mt-1 text-sm text-slate-500">Registro de las acciones relevantes ejecutadas dentro del sistema.</p>
      </div>

      <div className="glass rounded-2xl p-3 sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex min-h-11 flex-1 items-center rounded-xl border border-slate-200 bg-white px-4">
            <Search className="mr-3 h-4 w-4 text-slate-400" />
            <input type="search" aria-label="Buscar en el historial de auditoría" placeholder="Buscar por usuario, acción o detalle..." className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" />
          </div>
          <div className="flex gap-2">
            <button type="button" className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 md:flex-none"><Filter className="mr-2 inline h-4 w-4" />Filtros</button>
            <button type="button" className="min-h-11 flex-1 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 md:flex-none">Exportar CSV</button>
          </div>
        </div>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4"><p className="text-sm font-bold text-slate-800">Actividad reciente <span className="ml-1 text-xs font-medium text-slate-400">{mockAuditLogs.length} eventos</span></p></div>
        <div className="divide-y divide-slate-100">
          {mockAuditLogs.map((log) => {
            const styles = getTypeStyles(log.type);
            return (
              <div key={log.id} className="group grid gap-4 px-5 py-5 transition-colors hover:bg-slate-50/70 md:grid-cols-[auto_minmax(0,1fr)_180px] md:items-center">
                <div className="relative flex items-center gap-3 md:items-start">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.bg} ${styles.text}`}>{styles.icon}</div>
                  <div className="min-w-0 md:hidden"><p className="font-bold text-slate-900">{log.action}</p><p className="mt-0.5 text-xs text-slate-500">{log.timestamp}</p></div>
                </div>
                <div className="min-w-0">
                  <div className="hidden md:flex md:items-center md:gap-3"><h2 className="font-bold text-slate-900">{log.action}</h2><span className="text-xs text-slate-400">{log.timestamp}</span></div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{log.details}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{log.user.includes("Admin") && <ShieldAlert className="h-3 w-3" />}{log.user}</span>
                </div>
                <div className="hidden justify-end md:flex"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles.bg} ${styles.text}`}>{log.type === "success" ? "Éxito" : log.type === "error" ? "Error" : log.type === "warning" ? "Atención" : "Información"}</span></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
