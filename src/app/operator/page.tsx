"use client";

import Link from "next/link";
import { Users, Clock, AlertTriangle, ArrowRight, Anchor } from "lucide-react";

export default function OperatorDashboard() {
  return (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Saludo */}
      <div className="pt-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">¡Hola, Capitán! 👋</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Resumen operativo para el día de hoy.</p>
      </div>

      {/* Próximo Zarpe Destacado */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
        {/* Adorno visual */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 opacity-10">
          <Anchor className="w-32 h-32" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wide">
              Próximo Zarpe
            </span>
            <span className="text-sm font-bold flex items-center gap-1">
              <Clock className="w-4 h-4" /> En 2 horas
            </span>
          </div>

          <h3 className="text-2xl font-black mb-1">Isabela & Fernandina</h3>
          <p className="text-blue-100 text-sm mb-6">Salida: 08:00 AM • Pto. Ayora</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/10">
              <p className="text-xs text-blue-200 font-bold uppercase">Pasajeros</p>
              <p className="text-2xl font-black flex items-center gap-2">
                <Users className="w-5 h-5" /> 12<span className="text-sm text-blue-200">/16</span>
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/10">
              <p className="text-xs text-blue-200 font-bold uppercase">Cupos Libres</p>
              <p className="text-2xl font-black text-emerald-300">4</p>
            </div>
          </div>

          <Link 
            href="/operator/availability"
            className="w-full py-3 bg-white text-blue-700 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out"
          >
            Actualizar Cupos <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Alertas Operativas */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Alertas Recientes</h3>
        
        <div className="space-y-3">
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 p-4 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-orange-800 dark:text-orange-300">Reserva Bloqueada a punto de expirar</p>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">La agencia &lsquo;Galapagos Dreams&rsquo; tiene 4 cupos bloqueados que expiran en 30 minutos.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
