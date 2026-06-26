"use client";

import { CheckCircle, ShieldCheck, Users, Calendar, Ship, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function VerifyVoucherPage() {
  const params = useParams();
  const [isValidating, setIsValidating] = useState(true);

  // Simulación de carga desde el servidor criptográfico
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsValidating(false);
    }, 1500); // 1.5s de loading para dar sensación de verificación
    return () => clearTimeout(timer);
  }, []);

  if (isValidating) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-white text-center">Verificando firma criptográfica...</h2>
        <p className="text-slate-400 mt-2 text-center text-sm">Validando QR con Galapagos System</p>
      </div>
    );
  }

  // Mock de datos del voucher verificado
  const voucher = {
    id: params?.id || "RES-2026-8942",
    leadPassenger: "Juan Pérez García",
    passport: "0928374615",
    passengers: 2,
    boatName: "Galaxy I",
    routeName: "Isabela & Fernandina",
    date: "15 Octubre 2026",
    time: "08:00 AM",
    agency: "Galapagos Dreams",
    image: "https://images.unsplash.com/photo-1544558661-3444458448ec?q=80&w=800&auto=format&fit=crop"
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Tarjeta Principal */}
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden relative border border-slate-200">
        
        {/* Banner de Estado (VERDE: Éxito) */}
        <div className="bg-emerald-500 p-8 text-center relative overflow-hidden flex flex-col items-center justify-center">
          {/* Círculos decorativos de fondo */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/10 mb-4 animate-in zoom-in duration-500">
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Válido</h1>
            <p className="text-emerald-50 font-medium mt-1 uppercase tracking-widest text-sm">Reserva Confirmada</p>
          </div>
        </div>

        {/* Detalles del Pasajero (Alto Contraste) */}
        <div className="p-6 pb-2 text-center border-b border-slate-100 border-dashed">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pasajero Titular</p>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">{voucher.leadPassenger}</h2>
          <p className="text-slate-500 font-medium mt-1">Pasaporte: {voucher.passport}</p>
        </div>

        {/* Detalles del Tour (Grid) */}
        <div className="p-6 bg-slate-50">
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
              <Image src={voucher.image} alt={voucher.boatName} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-0.5">{voucher.boatName}</p>
              <p className="font-bold text-slate-900 leading-tight">{voucher.routeName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <Calendar className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha y Hora</p>
              <p className="font-bold text-slate-900 leading-tight mt-0.5">{voucher.date}</p>
              <p className="text-xs font-bold text-primary">{voucher.time}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <Users className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Personas</p>
              <p className="text-3xl font-black text-slate-900 leading-none mt-1">{voucher.passengers}</p>
            </div>
          </div>
        </div>

        {/* Info Operativa de Agencia */}
        <div className="px-6 py-4 bg-white text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Código de Reserva</p>
          <p className="font-mono font-bold text-slate-800 tracking-wider">{voucher.id}</p>
          <p className="text-xs text-slate-500 mt-2">Agencia Emisora: <span className="font-bold">{voucher.agency}</span></p>
        </div>
      </div>

      {/* Sello Criptográfico de Seguridad */}
      <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
        <ShieldCheck className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-widest">Verificado Criptográficamente</span>
      </div>
      <p className="text-[10px] text-slate-400 mt-1 font-mono text-center opacity-50">
        UID: 0x8f2d...9a1b • Emisión: SECURE_QR
      </p>

    </div>
  );
}
