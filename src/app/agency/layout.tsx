"use client";

import Link from "next/link";
import { Ship, Search, CalendarDays, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navClass = (active: boolean) =>
    `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      active
        ? "bg-teal-50 text-[var(--primary)]"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <div className="min-h-screen bg-[var(--background)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/agency" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-lg shadow-teal-900/10">
              <Ship className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold leading-none text-slate-900">Galápagos System</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Portal Agencia</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/agency" aria-current={pathname === "/agency" ? "page" : undefined} className={navClass(pathname === "/agency")}>
              <Search className="h-4 w-4" />Buscar cupos
            </Link>
            <Link href="/agency/reservations" aria-current={pathname === "/agency/reservations" ? "page" : undefined} className={navClass(pathname === "/agency/reservations")}>
              <CalendarDays className="h-4 w-4" />Mis reservas
            </Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"><User className="h-4 w-4" /></span>
              <span>
                <span className="block text-xs font-bold text-slate-900">Galapagos Dreams</span>
                <span className="block text-[11px] text-slate-500">Comisión: 15%</span>
              </span>
            </div>
            <Link href="/" aria-label="Cerrar sesión" className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>

          <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMobileMenuOpen} aria-controls="agency-mobile-menu" className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-50 md:hidden">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div id="agency-mobile-menu" className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
            <div className="space-y-1">
              <Link href="/agency" onClick={() => setIsMobileMenuOpen(false)} className={navClass(pathname === "/agency")}><Search className="h-5 w-5" />Buscar cupos</Link>
              <Link href="/agency/reservations" onClick={() => setIsMobileMenuOpen(false)} className={navClass(pathname === "/agency/reservations")}><CalendarDays className="h-5 w-5" />Mis reservas</Link>
            </div>
            <div className="my-3 border-t border-slate-100" />
            <div className="flex items-center gap-3 px-2 py-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500"><User className="h-5 w-5" /></span>
              <span><span className="block text-sm font-bold">Galapagos Dreams</span><span className="text-xs text-slate-500">Comisión: 15%</span></span>
            </div>
            <Link href="/" className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"><LogOut className="h-5 w-5" />Cerrar sesión</Link>
          </div>
        )}
      </header>
      <main className="w-full">{children}</main>
    </div>
  );
}
