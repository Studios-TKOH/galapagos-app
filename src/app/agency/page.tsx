"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Calendar, MapPin, Users, Filter, Clock, Ship, CheckCircle2 } from "lucide-react";
import { BookingModal } from "@/components/agency/BookingModal";

// Mock data para los resultados de búsqueda
const mockResults = [
  {
    id: 1,
    boatName: "Galaxy I",
    routeName: "Isla Isabela & Fernandina",
    duration: "4 Días / 3 Noches",
    date: "15 Oct 2026",
    price: 1250,
    availableSeats: 4,
    image: "https://images.unsplash.com/photo-1544558661-3444458448ec?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    boatName: "Sea Wolf",
    routeName: "San Cristóbal & Española",
    duration: "5 Días / 4 Noches",
    date: "16 Oct 2026",
    price: 1500,
    availableSeats: 8,
    image: "https://images.unsplash.com/photo-1605649487212-47bb54ce267c?q=80&w=800&auto=format&fit=crop"
  }
];

export default function AgencySearchPage() {
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [dateSearch, setDateSearch] = useState("");

  // Máscara inteligente con validación básica de Día (max 31) y Mes (max 12)
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Solo números
    
    // Validar Día
    if (value.length >= 1) {
      if (value.length === 1 && parseInt(value[0]) > 3) value = "0" + value; // Si empieza con 4-9, poner 0 antes
      if (value.length >= 2 && parseInt(value.slice(0, 2)) > 31) value = "31" + value.slice(2);
    }
    
    // Validar Mes
    if (value.length >= 3) {
      if (value.length === 3 && parseInt(value[2]) > 1) value = value.slice(0, 2) + "0" + value.slice(2); // Si mes empieza con 2-9
      if (value.length >= 4 && parseInt(value.slice(2, 4)) > 12) value = value.slice(0, 2) + "12" + value.slice(4);
    }

    if (value.length > 8) value = value.slice(0, 8);
    
    // Formatear con barras
    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    
    setDateSearch(value);
  };

  // Cuando el usuario usa el calendario nativo del navegador
  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      // El navegador devuelve YYYY-MM-DD
      const [year, month, day] = e.target.value.split("-");
      setDateSearch(`${day}/${month}/${year}`);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Header con Buscador */}
      <div className="relative pt-16 pb-32 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Galapagos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
            Encuentra la ruta perfecta.
          </h1>
          <p className="text-lg text-slate-200 font-medium">Búsqueda de cupos y disponibilidad en tiempo real.</p>
          
          {/* Barra de Búsqueda Flotante */}
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl p-3 shadow-2xl flex flex-col md:flex-row items-center gap-3 w-full">
            <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl relative">
              <MapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
              <input type="text" placeholder="¿A dónde?" className="bg-transparent border-none outline-none w-full text-slate-900 dark:text-white font-medium placeholder:text-slate-500" />
            </div>
            
            <div className="w-full md:w-48 flex items-center px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-x border-transparent md:border-slate-100 dark:md:border-slate-700 relative group">
              {/* Truco: Input nativo de fecha invisible encima del ícono para invocar el calendario */}
              <input 
                type="date" 
                className="absolute left-0 top-0 w-12 h-full opacity-0 cursor-pointer z-10"
                onChange={handleNativeDateChange}
              />
              <Calendar className="w-5 h-5 text-primary mr-3 shrink-0 group-hover:scale-110 transition-transform" />
              <input 
                type="text" 
                value={dateSearch}
                onChange={handleDateChange}
                placeholder="DD/MM/AAAA" 
                className="bg-transparent border-none outline-none w-full text-slate-900 dark:text-white font-medium placeholder:text-slate-500" 
              />
            </div>

            <div className="w-full md:w-40 flex items-center px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <Users className="w-5 h-5 text-primary mr-3 shrink-0" />
              <input type="number" placeholder="2 Pasaj." min="1" className="bg-transparent border-none outline-none w-full text-slate-900 dark:text-white font-medium placeholder:text-slate-500" />
            </div>

            <button className="w-full md:w-auto h-full px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Resultados Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
        
        {/* Controles de Filtros */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8">
          <p className="font-medium text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-900 dark:text-white">2 salidas</span> encontradas
          </p>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Tarjetas de Resultados (Lista Desktop / Grid Mobile) */}
        <div className="space-y-6">
          {mockResults.map((tour) => (
            <div key={tour.id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-all border border-slate-200/60 dark:border-slate-800/60">
              
              {/* Imagen */}
              <div className="relative w-full md:w-72 h-56 md:h-auto overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.routeName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Confirmada
                  </span>
                </div>
              </div>

              {/* Contenido Central */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2 uppercase tracking-wide">
                  <Ship className="w-4 h-4" />
                  {tour.boatName}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                  {tour.routeName}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium mb-6">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {tour.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Salida: {tour.date}</span>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold border border-emerald-100 dark:border-emerald-800/30">
                    {tour.availableSeats} Cupos Libres
                  </span>
                </div>
              </div>

              {/* Bloque Precio y CTA */}
              <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col justify-center items-center md:items-end text-center md:text-right border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Precio por persona (PVP)</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white my-2">${tour.price}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-6">Comisión aplicable: 15%</p>
                
                <button 
                  onClick={() => setSelectedTour(tour)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-md"
                >
                  Reservar / Bloquear
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={!!selectedTour} 
        onClose={() => setSelectedTour(null)} 
        tour={selectedTour} 
      />
    </div>
  );
}
