"use client";

import { X } from "lucide-react";

export function VesselFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

      <div role="dialog" aria-modal="true" aria-labelledby="vessel-modal-title" className="relative w-full max-w-xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300 ease-out flex flex-col">
        <div className="flex items-center justify-between gap-4 p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 id="vessel-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Nueva Embarcación</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar formulario de embarcación" className="w-11 h-11 shrink-0 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          <div className="space-y-1.5">
            <label htmlFor="vessel-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre de la Embarcación</label>
            <input id="vessel-name" type="text" placeholder="Ej. Galaxy I" className="w-full min-h-11 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="vessel-capacity" className="text-sm font-medium text-slate-700 dark:text-slate-300">Capacidad Total (Pasajeros)</label>
              <input id="vessel-capacity" type="number" inputMode="numeric" placeholder="16" className="w-full min-h-11 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="vessel-status" className="text-sm font-medium text-slate-700 dark:text-slate-300">Estado Operativo</label>
              <select id="vessel-status" className="w-full min-h-11 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300">
                <option>Activa (En Operación)</option>
                <option>En Mantenimiento</option>
                <option>Fuera de Servicio</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="vessel-owner" className="text-sm font-medium text-slate-700 dark:text-slate-300">Dueño / Operador</label>
            <input id="vessel-owner" type="text" placeholder="Nombre de la empresa o propietario" className="w-full min-h-11 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300" />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button type="button" onClick={onClose} className="w-full sm:w-auto min-h-11 px-5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 ease-in-out active:scale-95">Cancelar</button>
          <button type="button" className="w-full sm:w-auto min-h-11 px-5 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-xl transition-all duration-300 ease-in-out active:scale-95 shadow-md shadow-primary/20">Guardar Embarcación</button>
        </div>
      </div>
    </div>
  );
}
