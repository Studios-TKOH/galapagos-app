"use client";

import Link from "next/link";
import { Ship, Mail, Key, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Imagen de fondo a pantalla completa */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1549449830-4e3edce6c1a8?q=80&w=2072&auto=format&fit=crop"
          alt="Galapagos Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Tarjeta de Login (Glassmorphism) */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="glass bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-black/50">
          
          {/* Logo y Encabezado */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
              <Ship className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido</h1>
            <p className="text-slate-300">Plataforma de Gestión y Reservas</p>
          </div>

          {/* Formulario */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="admin@galapagos.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:bg-white/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-slate-200">Contraseña</label>
                <a href="#" className="text-xs text-primary hover:text-blue-400 transition-colors">¿Olvidaste tu clave?</a>
              </div>
              <div className="relative">
                <Key className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:bg-white/10 outline-none transition-all"
                />
              </div>
            </div>

            <Link 
              href="/admin"
              className="group flex items-center justify-center gap-2 w-full py-4 mt-8 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30"
            >
              Iniciar Sesión
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
        </div>
        
        {/* Footer info */}
        <p className="text-center text-sm text-slate-400 mt-8">
          © 2026 Galapagos Booking System.
        </p>
      </div>
    </div>
  );
}
