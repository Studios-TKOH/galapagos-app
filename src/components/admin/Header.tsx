"use client";

import { Bell, Search, Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 mb-5 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-xl md:px-7">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          type="button"
          aria-label="Abrir menú de navegación"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
          <span>Panel</span>
          <span>/</span>
          <span className="text-slate-700">Gestión</span>
        </div>

        <div className="group relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            aria-label="Buscar en el panel"
            placeholder="Buscar en el sistema..."
            className="h-10 w-72 rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10 lg:w-80"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Ver notificaciones"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell className="h-[19px] w-[19px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        </button>
        <div className="ml-1 flex items-center gap-2.5 border-l border-slate-200 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-bold text-white shadow-sm">
            GS
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-bold text-slate-800">Administrador</p>
            <p className="text-[10px] text-slate-400">Sistema</p>
          </div>
        </div>
      </div>
    </header>
  );
}
