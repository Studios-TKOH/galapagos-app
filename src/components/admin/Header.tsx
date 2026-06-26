"use client";

import { Bell, Search, Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="glass sticky top-0 z-10 flex h-16 items-center justify-between px-4 md:px-6 mb-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 w-64 rounded-full bg-slate-100/50 dark:bg-slate-800/50 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 outline-none text-sm transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 border-2 border-white dark:border-slate-800 shadow-md"></div>
      </div>
    </header>
  );
}
