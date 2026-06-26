"use client";

import { useState } from "react";
import { Plus, Clock, DollarSign, MapPin, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { TourFormModal } from "@/components/admin/TourFormModal";

// Mock data para las rutas
const mockTours = [
  {
    id: 1,
    name: "San Cristóbal 360",
    description: "Vuelta completa a la isla visitando León Dormido, Cerro Brujo y Bahía Sardina.",
    duration: "Full Day (8 hrs)",
    price: 150.00,
    active: true,
    image: "https://images.unsplash.com/photo-1596409890119-86927a4d4679?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Tour Isla Isabela",
    description: "Visita a Las Tintoreras, snorkel con tortugas marinas y pinguinos.",
    duration: "Full Day (7 hrs)",
    price: 120.00,
    active: true,
    image: "https://images.unsplash.com/photo-1570535978434-6cb60d70dafc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Bahía Tour",
    description: "Recorrido cercano en Puerto Ayora, Lobería y Canal del Amor.",
    duration: "Half Day (4 hrs)",
    price: 60.00,
    active: false,
    image: null
  }
];

export default function ToursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Rutas y Tours</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestiona el catálogo de viajes disponibles.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-primary/30"
        >
          <Plus className="w-5 h-5" />
          Nueva Ruta
        </button>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {mockTours.map((tour) => (
          <div key={tour.id} className="glass rounded-2xl overflow-hidden group flex flex-col transition-all hover:shadow-xl dark:hover:shadow-primary/5 hover:-translate-y-1">
            
            {/* Imagen del Tour */}
            <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              {tour.image ? (
                <img 
                  src={tour.image} 
                  alt={tour.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-12 h-12 opacity-50" />
                </div>
              )}
              
              {/* Badge Estado */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${
                  tour.active 
                    ? "bg-emerald-500/90 text-white" 
                    : "bg-slate-500/90 text-white"
                }`}>
                  {tour.active ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tour.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
                {tour.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold">${tour.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TourFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
