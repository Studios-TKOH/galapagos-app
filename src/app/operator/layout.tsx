"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarCheck, User, Ship } from "lucide-react";

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeClass = (active: boolean) =>
    active ? "text-[var(--primary)]" : "text-slate-400 hover:text-slate-600";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[var(--background)] text-slate-900 shadow-2xl">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <Link href="/operator" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-lg shadow-teal-900/10">
              <Ship className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold leading-none text-slate-900">Mi Embarcación</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Galaxy I</span>
            </span>
          </Link>
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
            <User className="h-4 w-4" />
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-slate-200/90 bg-white/95 pb-safe shadow-[0_-8px_30px_rgba(16,42,67,0.08)] backdrop-blur-xl">
        <div className="flex h-16 items-center px-2">
          <Link href="/operator" aria-current={pathname === "/operator" ? "page" : undefined} className={`flex h-full w-full flex-col items-center justify-center gap-1 transition ${activeClass(pathname === "/operator")}`}>
            <Home className={`h-5 w-5 ${pathname === "/operator" ? "fill-teal-100" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Inicio</span>
          </Link>
          <Link href="/operator/availability" aria-current={pathname === "/operator/availability" ? "page" : undefined} className={`flex h-full w-full flex-col items-center justify-center gap-1 transition ${activeClass(pathname === "/operator/availability")}`}>
            <CalendarCheck className={`h-5 w-5 ${pathname === "/operator/availability" ? "fill-teal-100" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Cupos</span>
          </Link>
          <Link href="/" className="flex h-full w-full flex-col items-center justify-center gap-1 text-slate-400 transition hover:text-rose-500">
            <User className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Salir</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
