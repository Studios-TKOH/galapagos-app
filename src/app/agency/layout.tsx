"use client";

import Link from "next/link";
import { Ship, Search, CalendarDays, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white leading-none">Galapagos System</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Portal Agencia</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/agency" aria-current={pathname === "/agency" ? "page" : undefined} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out ${pathname === "/agency" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                <Search className="w-4 h-4" />
                Buscar Cupos
              </Link>
              <Link href="/agency/reservations" aria-current={pathname === "/agency/reservations" ? "page" : undefined} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out ${pathname === "/agency/reservations" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                <CalendarDays className="w-4 h-4" />
                Mis Reservas
              </Link>
            </nav>

            {/* User Profile & Logout (Desktop) */}
            <div className="hidden md:flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900 dark:text-white leading-none">Galapagos Dreams</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Comisión: 15%</p>
                </div>
              </div>
              <Link href="/" aria-label="Cerrar sesión" className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 ease-in-out active:scale-95">
                <LogOut className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="agency-mobile-menu"
                className="w-11 h-11 flex items-center justify-center text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out active:scale-95"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div id="agency-mobile-menu" className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 ease-out">
            <Link href="/agency" aria-current={pathname === "/agency" ? "page" : undefined} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${pathname === "/agency" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
              <Search className="w-5 h-5" />
              Buscar Cupos
            </Link>
            <Link href="/agency/reservations" aria-current={pathname === "/agency/reservations" ? "page" : undefined} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${pathname === "/agency/reservations" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
              <CalendarDays className="w-5 h-5" />
              Mis Reservas
            </Link>
            <div className="border-t border-slate-100 dark:border-slate-800 my-2 pt-2"></div>
            <div className="px-4 py-2 flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Galapagos Dreams</p>
                <p className="text-slate-500 text-sm">Comisión: 15%</p>
              </div>
            </div>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium">
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </Link>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {children}
      </main>
    </div>
  );
}
