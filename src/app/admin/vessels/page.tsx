"use client";

import { useState } from "react";
import { Plus, Ship, Edit2, Trash2, Users, Wrench, XCircle } from "lucide-react";
import { VesselFormModal } from "@/components/admin/VesselFormModal";

// Mock data para las embarcaciones (con los 3 estados)
const mockVessels = [
  {
    id: 1,
    name: "Galaxy I",
    capacity: 16,
    owner: "Galapagos EcoTours S.A.",
    status: "active",
  },
  {
    id: 2,
    name: "Sea Wolf",
    capacity: 12,
    owner: "Wolf Expeditions",
    status: "active",
  },
  {
    id: 3,
    name: "Santa Cruz II",
    capacity: 90,
    owner: "Metropolitan Touring",
    status: "maintenance",
  },
  {
    id: 4,
    name: "La Pinta",
    capacity: 48,
    owner: "Metropolitan Touring",
    status: "out_of_service",
  }
];

export default function VesselsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Embarcaciones</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestiona la flota y la capacidad operativa.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white font-medium rounded-xl hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Nueva Embarcación
        </button>
      </div>

      {/* Lista Horizontal de Tarjetas */}
      <div className="space-y-4 pt-4">
        {mockVessels.map((vessel) => {
          // Determinar estilos y textos según estado
          let StatusIcon = Ship;
          let statusColor = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
          let badgeColor = "bg-slate-100 text-slate-700 dark:bg-slate-800/40 dark:text-slate-400";
          let statusText = "Desconocido";

          if (vessel.status === 'active') {
            StatusIcon = Ship;
            statusColor = "bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400";
            badgeColor = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400";
            statusText = "Activa";
          } else if (vessel.status === 'maintenance') {
            StatusIcon = Wrench;
            statusColor = "bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400";
            badgeColor = "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400";
            statusText = "Mantenimiento";
          } else if (vessel.status === 'out_of_service') {
            StatusIcon = XCircle;
            statusColor = "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400";
            badgeColor = "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
            statusText = "Fuera de Servicio";
          }

          return (
            <div 
              key={vessel.id} 
              className="glass p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center transition-all hover:shadow-lg dark:hover:shadow-primary/5 hover:-translate-y-0.5 border border-slate-200/60 dark:border-slate-800/60"
            >
              {/* Bloque 1: Icono y Nombre (Ocupa 5 columnas en desktop) */}
              <div className="sm:col-span-6 md:col-span-5 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${statusColor}`}>
                  <StatusIcon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                      {vessel.name}
                    </h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${badgeColor}`}>
                      {statusText}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    Operada por: <span className="font-medium text-slate-700 dark:text-slate-300">{vessel.owner}</span>
                  </p>
                </div>
              </div>

              {/* Bloque 2: Capacidad (Ocupa 3 columnas en desktop) */}
              <div className="sm:col-span-3 md:col-span-4 flex sm:justify-center items-center gap-3 px-4 sm:border-l border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-900 dark:text-white leading-none">{vessel.capacity}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">pasajeros máx.</div>
                </div>
              </div>

              {/* Bloque 3: Acciones (Ocupa 3 columnas en desktop) */}
              <div className="sm:col-span-3 md:col-span-3 flex items-center justify-end gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <button type="button" aria-label={`Editar ${vessel.name}`} className="min-h-11 flex-1 sm:flex-none flex items-center justify-center px-4 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 ease-in-out active:scale-95">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar
                </button>
                <button type="button" aria-label={`Eliminar ${vessel.name}`} className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all duration-300 ease-in-out active:scale-95">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <VesselFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
