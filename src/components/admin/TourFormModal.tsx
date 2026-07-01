"use client";

import { X } from "lucide-react";

export function TourFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div role="dialog" aria-modal="true" aria-labelledby="tour-modal-title" className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300 ease-out flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 id="tour-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">Nueva Ruta / Tour</h2>
          <button 
            type="button"
            onClick={onClose}
            aria-label="Cerrar formulario de ruta"
            className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="tour-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre de la Ruta</label>
              <input 
                id="tour-name"
                type="text" 
                placeholder="Ej. San Cristóbal 360"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="tour-price" className="text-sm font-medium text-slate-700 dark:text-slate-300">Precio Base ($)</label>
              <input 
                id="tour-price"
                type="number" 
                placeholder="150.00"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="tour-description" className="text-sm font-medium text-slate-700 dark:text-slate-300">Descripción Corta</label>
            <textarea 
              id="tour-description"
              rows={3}
              placeholder="Describe los puntos principales del tour..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="tour-duration" className="text-sm font-medium text-slate-700 dark:text-slate-300">Duración</label>
              <select id="tour-duration" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                <option>Medio Día (4 hrs)</option>
                <option>Día Completo (8 hrs)</option>
                <option>Múltiples Días</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="tour-image" className="text-sm font-medium text-slate-700 dark:text-slate-300">URL Imagen (Opcional)</label>
              <input 
                id="tour-image"
                type="text" 
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
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
            Guardar Ruta
          </button>
        </div>
      </div>
    </div>
  );
}
