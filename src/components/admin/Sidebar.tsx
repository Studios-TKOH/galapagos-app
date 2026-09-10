"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Ship,
  Building2,
  Settings,
  LogOut,
  X,
  History,
  Waves,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Rutas y Tours", href: "/admin/tours", icon: Map },
  { name: "Embarcaciones", href: "/admin/vessels", icon: Ship },
  { name: "Agencias", href: "/admin/agencies", icon: Building2 },
  { name: "Auditoría", href: "/admin/audit", icon: History },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`glass-sidebar fixed left-0 top-0 z-50 flex h-screen w-[272px] flex-col justify-between p-4 transition-transform duration-300 ease-out md:sticky ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Navegación principal"
      >
        <div>
          <div className="mb-7 flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-accent text-white shadow-lg shadow-primary/20">
                <Waves className="h-6 w-6" strokeWidth={2.2} />
                <span className="absolute -bottom-2 -right-1 h-5 w-5 rounded-full bg-white/15" />
              </div>
              <div>
                <span className="block text-[15px] font-extrabold tracking-tight text-slate-900">Galápagos</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">System</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú de navegación"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Gestión
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {isActive && <span className="absolute left-0 h-6 w-1 rounded-r-full bg-accent" />}
                  <item.icon
                    className={`h-[19px] w-[19px] transition-transform duration-200 ${
                      isActive ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />
                  <span className="text-sm font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-200/80 pt-4">
          <div className="mb-3 rounded-2xl bg-slate-50 px-3 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                GS
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-800">Galápagos System</p>
                <p className="text-[10px] text-slate-400">Panel administrativo</p>
              </div>
            </div>
          </div>
          <Link
            href="/"
            onClick={onClose}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-[19px] w-[19px]" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
