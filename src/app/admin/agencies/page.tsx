"use client";

import { useState } from "react";
import { Plus, Mail, MessageCircle, Edit2, ShieldBan, CheckCircle2 } from "lucide-react";
import { AgencyFormModal } from "@/components/admin/AgencyFormModal";

const mockAgencies = [
  { id: 1, name: "Galapagos Dreams", email: "reservas@galapagosdreams.com", phone: "+593 98 123 4567", commission: 15, status: "active", reservationsThisMonth: 24 },
  { id: 2, name: "Blue Water Tours", email: "info@bluewatertours.ec", phone: "+593 99 765 4321", commission: 20, status: "active", reservationsThisMonth: 12 },
  { id: 3, name: "Ecuador Travel & Co.", email: "booking@ecuadortravel.com", phone: "+593 97 111 2222", commission: 10, status: "suspended", reservationsThisMonth: 0 },
  { id: 4, name: "Nature Expeditions", email: "hello@nature-expeditions.com", phone: "+593 99 888 7777", commission: 15, status: "active", reservationsThisMonth: 8 }
];

export default function AgenciesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Directorio de Agencias</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestiona los permisos y comisiones de tus aliados comerciales (B2B).</p>
        </div>
        <button type="button" onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto min-h-11 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white font-medium rounded-xl hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95">
          <Plus className="w-5 h-5" /> Nueva Agencia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
        {mockAgencies.map((agency) => (
          <div key={agency.id} className="glass rounded-2xl flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-primary/5 border border-slate-200/60 dark:border-slate-800/60 overflow-hidden relative">
            <div className={`p-6 border-b border-slate-100 dark:border-slate-800/60 ${agency.status === 'suspended' ? 'bg-slate-50/50 dark:bg-slate-900/20' : 'bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50'}`}>
              <div className="flex justify-between items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm shrink-0 ${agency.status === 'active' ? 'bg-gradient-to-tr from-blue-500 to-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                  {agency.name.charAt(0)}
                </div>
                <span className={`max-w-[60%] px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1 ${agency.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}`}>
                  {agency.status === 'active' ? <><CheckCircle2 className="w-3 h-3 shrink-0" /> Activa</> : <><ShieldBan className="w-3 h-3 shrink-0" /> Suspendida</>}
                </span>
              </div>
              <h3 className={`text-xl font-bold truncate ${agency.status === 'active' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>{agency.name}</h3>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-4 min-w-0">
              <div className="flex flex-col gap-3 min-w-0">
                <a href={`mailto:${agency.email}`} className="min-w-0 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-primary transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 shrink-0"><Mail className="w-4 h-4" /></div>
                  <span className="truncate">{agency.email}</span>
                </a>
                <a href={`https://wa.me/${agency.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="min-w-0 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 shrink-0"><MessageCircle className="w-4 h-4" /></div>
                  <span className="truncate">{agency.phone}</span>
                </a>
              </div>

              <div className="mt-auto pt-4 grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800/60">
                <div><p className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1">Comisión</p><p className="text-lg font-bold text-slate-900 dark:text-white">{agency.commission}%</p></div>
                <div><p className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1">Mes Actual</p><p className="text-lg font-bold text-slate-900 dark:text-white">{agency.reservationsThisMonth} res.</p></div>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
              <button type="button" aria-label={`Editar ${agency.name}`} className="min-h-11 flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all duration-300 ease-in-out active:scale-95"><Edit2 className="w-4 h-4" /> Editar</button>
              <button type="button" aria-label={agency.status === 'active' ? `Suspender ${agency.name}` : `Reactivar ${agency.name}`} className={`min-h-11 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-300 ease-in-out active:scale-95 ${agency.status === 'active' ? 'text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20' : 'text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}><ShieldBan className="w-4 h-4" />{agency.status === 'active' ? 'Suspender' : 'Reactivar'}</button>
            </div>
          </div>
        ))}
      </div>

      <AgencyFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
