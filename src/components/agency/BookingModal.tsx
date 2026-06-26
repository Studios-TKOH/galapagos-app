"use client";

import { X, Users, CreditCard, Clock } from "lucide-react";
import { useState } from "react";

export function BookingModal({ isOpen, onClose, tour }: { isOpen: boolean; onClose: () => void; tour: any }) {
  const [passengers, setPassengers] = useState(2);
  const commissionRate = 0.15; // 15%
  
  if (!isOpen || !tour) return null;

  const publicTotal = tour.price * passengers;
  const commissionAmount = publicTotal * commissionRate;
  const netTotal = publicTotal - commissionAmount;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resumen de la Reserva</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{tour.boatName} - {tour.routeName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors bg-slate-100 dark:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* Detalles de Reserva */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Selección de Pasajeros
            </h3>
            
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-white">Cantidad de Pasajeros</p>
                <p className="text-sm text-slate-500">Cupos disponibles: {tour.availableSeats}</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-100 dark:border-slate-700">
                <button 
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold text-lg hover:bg-slate-100 transition-colors"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-lg text-slate-900 dark:text-white">{passengers}</span>
                <button 
                  onClick={() => setPassengers(Math.min(tour.availableSeats, passengers + 1))}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold text-lg hover:bg-slate-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Formulario rápido de pasajero principal */}
            <div className="space-y-3 pt-4">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Datos del Pasajero Principal</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombres completos" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" />
                <input type="text" placeholder="Pasaporte / Cédula" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" />
              </div>
            </div>
          </div>

          {/* Resumen Financiero */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Resumen Financiero
            </h3>
            
            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 space-y-3">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Precio Público ({passengers}x ${tour.price})</span>
                <span>${publicTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Tu Comisión (15%)</span>
                <span>- ${commissionAmount.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-blue-200 dark:border-blue-800/50 flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white">Monto Neto a Pagar</span>
                <span className="text-2xl font-black text-primary">${netTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <Clock className="w-5 h-5" />
            Bloquear (24h)
          </button>
          <button 
            className="flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-primary hover:bg-blue-600 rounded-xl transition-all shadow-lg shadow-primary/30"
          >
            Confirmar Reserva
          </button>
        </div>

      </div>
    </div>
  );
}
