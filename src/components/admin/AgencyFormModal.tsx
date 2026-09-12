"use client";

import { X } from "lucide-react";

export function AgencyFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div role="dialog" aria-modal="true" aria-labelledby="agency-modal-title" className="relative w-full max-w-xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300 ease-out flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 id="agency-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">Nueva Agencia Aliada</h2>
          <button 
            type="button"
            onClick={onClose}
            aria-label="Cerrar formulario de agencia"
            className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="space-y-1.5">
            <label htmlFor="agency-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre de la Agencia</label>
            <input 
              id="agency-name"
              type="text" 
              placeholder="Ej. Galápagos Dreams"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="agency-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Correo de Acceso (Login)</label>
              <input 
                id="agency-email"
                type="email" 
                placeholder="contacto@agencia.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="agency-phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">Número de WhatsApp</label>
              <input 
                id="agency-phone"
                type="tel" 
                placeholder="+593 9..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="agency-commission" className="text-sm font-medium text-slate-700 dark:text-slate-300">Comisión Base (%)</label>
              <input 
                id="agency-commission"
                type="number" 
                placeholder="15"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="agency-status" className="text-sm font-medium text-slate-700 dark:text-slate-300">Estado de Cuenta</label>
              <select id="agency-status" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                <option>Activa (Puede Reservar)</option>
                <option>Suspendida</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button 
            type="button"
            onClick={onClose}
            className="min-h-11 px-5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 ease-in-out active:scale-95"
          >
            Cancelar
          </button>
          <button type="button" className="min-h-11 px-5 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-xl transition-all duration-300 ease-in-out active:scale-95 shadow-md shadow-primary/20">
            Crear Agencia
          </button>
        </div>
      </div>
    </div>
  );
}
