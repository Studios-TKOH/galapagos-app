"use client";

import { useState } from "react";
import { Clock, Minus, Plus, Calendar, Save, CheckCircle2 } from "lucide-react";

// Mock data de próximas salidas
const initialDepartures = [
  { id: 1, routeName: "Isabela & Fernandina", date: "Hoy, 08:00 AM", maxCapacity: 16, availableSeats: 4, status: 'active' },
  { id: 2, routeName: "San Cristóbal", date: "Mañana, 07:30 AM", maxCapacity: 16, availableSeats: 16, status: 'active' },
  { id: 3, routeName: "Santa Cruz (Bahía)", date: "Jue 17 Oct, 09:00 AM", maxCapacity: 16, availableSeats: 0, status: 'full' },
];

export default function OperatorAvailabilityPage() {
  const [departures, setDepartures] = useState(initialDepartures);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Función para modificar cupos (Táctil)
  const handleUpdateSeats = (id: number, delta: number) => {
    setDepartures(departures.map(dep => {
      if (dep.id === id) {
        const newSeats = Math.max(0, Math.min(dep.maxCapacity, dep.availableSeats + delta));
        return { 
          ...dep, 
          availableSeats: newSeats,
          status: newSeats === 0 ? 'full' : 'active'
        };
      }
      return dep;
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simular llamada a API
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-24">
      
      {/* Cabecera */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Gestor de Cupos</h2>
        <p className="text-slate-500 text-sm mt-1">Toca los botones para actualizar tu disponibilidad en tiempo real.</p>
      </div>

      {/* Lista de Salidas */}
      <div className="space-y-4">
        {departures.map((dep) => (
          <div 
            key={dep.id} 
            className={`rounded-3xl p-5 border-2 transition-all ${
              dep.status === 'full' 
                ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-75' 
                : 'bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/30 shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">{dep.routeName}</h3>
                <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {dep.date}
                </p>
              </div>
              {dep.status === 'full' && (
                <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-black uppercase tracking-wider rounded-lg">
                  Lleno
                </span>
              )}
            </div>

            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
              <div className="px-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Cupos Libres</p>
                <p className={`text-3xl font-black ${dep.availableSeats > 0 ? 'text-primary' : 'text-slate-400'}`}>
                  {dep.availableSeats}
                </p>
              </div>
              
              {/* Botones Grandes Táctiles */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleUpdateSeats(dep.id, -1)}
                  disabled={dep.availableSeats === 0}
                  className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-50 active:scale-95 transition-transform"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleUpdateSeats(dep.id, 1)}
                  disabled={dep.availableSeats === dep.maxCapacity}
                  className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-50 active:scale-95 transition-transform"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Flotante para Guardar (Solo visible si hay cambios, simulado aquí siempre por UX) */}
      <div className="fixed bottom-20 left-0 right-0 px-4 max-w-md mx-auto z-40">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-95 ${
            showSuccess ? 'bg-emerald-500' : 'bg-primary hover:bg-blue-600'
          }`}
        >
          {isSaving ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : showSuccess ? (
            <>
              <CheckCircle2 className="w-6 h-6" /> ¡Actualizado!
            </>
          ) : (
            <>
              <Save className="w-6 h-6" /> Guardar Cambios
            </>
          )}
        </button>
      </div>

    </div>
  );
}
