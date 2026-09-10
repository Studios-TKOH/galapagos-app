"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Calendar, MapPin, Users, Filter, Clock, Ship, CheckCircle2 } from "lucide-react";
import { BookingModal } from "@/components/agency/BookingModal";
import type { BookingTour } from "@/components/agency/BookingModal";

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
  const [selectedTour, setSelectedTour] = useState<BookingTour | null>(null);
  const [dateSearch, setDateSearch] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 1) {
      if (value.length === 1 && parseInt(value[0]) > 3) value = "0" + value;
      if (value.length >= 2 && parseInt(value.slice(0, 2)) > 31) value = "31" + value.slice(2);
    }

    if (value.length >= 3) {
      if (value.length === 3 && parseInt(value[2]) > 1) value = value.slice(0, 2) + "0" + value.slice(2);
      if (value.length >= 4 && parseInt(value.slice(2, 4)) > 12) value = value.slice(0, 2) + "12" + value.slice(4);
    }

    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setDateSearch(value);
  };

  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const [year, month, day] = e.target.value.split("-");
      setDateSearch(`${day}/${month}/${year}`);
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center justify-center px-4 pb-32 pt-16 text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop"
            alt="Paisaje de Galápagos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl space-y-6">
          <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-lg md:text-5xl">Encuentra la ruta perfecta.</h1>
          <p className="text-lg font-medium text-slate-200">Búsqueda de cupos y disponibilidad en tiempo real.</p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 rounded-3xl bg-white p-3 shadow-2xl md:flex-row">
            <div className="relative flex w-full flex-1 items-center rounded-2xl bg-slate-50 px-4 py-3">
              <MapPin className="mr-3 h-5 w-5 shrink-0 text-primary" />
              <input type="text" aria-label="Destino" placeholder="¿A dónde?" className="w-full border-none bg-transparent font-medium text-slate-900 outline-none placeholder:text-slate-500" />
            </div>

            <div className="group relative flex w-full items-center rounded-2xl bg-slate-50 px-4 py-3 md:w-48">
              <input type="date" aria-label="Abrir calendario de salida" className="absolute left-0 top-0 z-10 h-full w-12 cursor-pointer opacity-0" onChange={handleNativeDateChange} />
              <Calendar className="mr-3 h-5 w-5 shrink-0 text-primary transition-transform group-hover:scale-110" />
              <input type="text" aria-label="Fecha de salida en formato día, mes y año" value={dateSearch} onChange={handleDateChange} placeholder="DD/MM/AAAA" className="w-full border-none bg-transparent font-medium text-slate-900 outline-none placeholder:text-slate-500" />
            </div>

            <div className="flex w-full items-center rounded-2xl bg-slate-50 px-4 py-3 md:w-40">
              <Users className="mr-3 h-5 w-5 shrink-0 text-primary" />
              <input type="number" aria-label="Número de pasajeros" placeholder="2 Pasaj." min="1" className="w-full border-none bg-transparent font-medium text-slate-900 outline-none placeholder:text-slate-500" />
            </div>

            <button type="button" className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-primary-strong active:scale-95 md:w-auto">
              <Search className="h-5 w-5" />
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-medium text-slate-600"><span className="font-bold text-slate-900">2 salidas</span> encontradas</p>
          <button type="button" className="flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-slate-600 transition-all duration-300 ease-out hover:bg-slate-100 active:scale-95">
            <Filter className="h-4 w-4" />
            Filtros
          </button>
        </div>

        <div className="space-y-6">
          {mockResults.map((tour) => (
            <div key={tour.id} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl md:flex-row">
              <div className="relative h-56 w-full overflow-hidden md:h-auto md:w-72">
                <Image src={tour.image} alt={tour.routeName} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute left-4 top-4">
                  <span className="flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm backdrop-blur-md">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Confirmada
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary"><Ship className="h-4 w-4" />{tour.boatName}</div>
                <h3 className="mb-2 text-2xl font-black leading-tight text-slate-900">{tour.routeName}</h3>
                <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{tour.duration}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Salida: {tour.date}</span>
                </div>
                <div className="mt-auto flex items-center gap-3"><span className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">{tour.availableSeats} Cupos Libres</span></div>
              </div>

              <div className="flex w-full flex-col items-center justify-center border-t border-slate-100 bg-slate-50 p-6 text-center md:w-64 md:items-end md:border-l md:border-t-0 md:text-right">
                <p className="text-sm font-medium text-slate-500">Precio por persona (PVP)</p>
                <p className="my-2 text-3xl font-black text-slate-900">${tour.price}</p>
                <p className="mb-6 text-xs font-bold text-emerald-600">Comisión aplicable: 15%</p>
                <button type="button" onClick={() => setSelectedTour(tour)} className="w-full rounded-xl bg-slate-900 py-3.5 font-bold text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-slate-800 active:scale-95">Reservar / Bloquear</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal isOpen={!!selectedTour} onClose={() => setSelectedTour(null)} tour={selectedTour} />
    </div>
  );
}
