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
    case "success": return { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", icon: <CheckCircle2 className="w-5 h-5" /> };
    case "error": return { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", icon: <XCircle className="w-5 h-5" /> };
    case "warning": return { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", icon: <AlertCircle className="w-5 h-5" /> };
    default: return { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", icon: <RefreshCw className="w-5 h-5" /> };
  }
};

export default function AuditLogPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center gap-2"><History className="w-8 h-8 text-primary shrink-0" /> Historial de Auditoría</h1><p className="text-slate-500 dark:text-slate-400 mt-1">Registro inmutable de todas las acciones del sistema.</p></div></div>

      <div className="glass rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full flex items-center px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/30 transition-all"><Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" /><input type="search" aria-label="Buscar en el historial de auditoría" placeholder="Buscar por usuario, acción o detalle..." className="w-full min-h-7 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400" /></div>
        <div className="flex gap-2 w-full md:w-auto"><button type="button" className="min-h-11 flex-1 md:flex-none flex items-center justify-center gap-2 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out active:scale-95"><Filter className="w-4 h-4" /> Filtros</button><button type="button" className="min-h-11 flex-1 md:flex-none flex items-center justify-center gap-2 px-4 bg-slate-900 text-white dark:bg-primary rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out active:scale-95">Exportar CSV</button></div>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left border-collapse" aria-label="Registro de acciones del sistema"><thead><tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800"><th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">Acción</th><th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Detalles</th><th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">Usuario</th><th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Fecha y Hora</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{mockAuditLogs.map((log) => { const styles = getTypeStyles(log.type); return <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"><td className="p-4 whitespace-nowrap"><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${styles.bg} ${styles.text}`}>{styles.icon}</div><span className="font-bold text-slate-900 dark:text-white">{log.action}</span></div></td><td className="p-4 min-w-[300px]"><p className="text-sm text-slate-600 dark:text-slate-300">{log.details}</p></td><td className="p-4 whitespace-nowrap"><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">{log.user.includes("Admin") && <ShieldAlert className="w-3.5 h-3.5" />}{log.user}</span></td><td className="p-4 whitespace-nowrap text-right"><p className="text-xs font-medium text-slate-500 dark:text-slate-400">{log.timestamp}</p></td></tr>; })}</tbody></table></div></div>
    </div>
  );
}
