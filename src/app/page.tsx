"use client";

import Link from "next/link";
import { Ship, Mail, Key, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-6">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[38rem] w-[38rem] rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(14,165,233,0.14),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.12),transparent_38%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-[30px] border border-white/20 bg-white/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-xl shadow-teal-900/20">
              <Ship className="h-8 w-8" />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Galápagos System</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Bienvenido</h1>
            <p className="mt-2 text-sm text-slate-500">Plataforma de gestión y reservas</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="login-email" className="ml-1 text-sm font-semibold text-slate-700">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input id="login-email" type="email" autoComplete="email" placeholder="admin@galapagos.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-teal-100" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="login-password" className="ml-1 text-sm font-semibold text-slate-700">Contraseña</label>
                <a href="#" className="inline-flex min-h-11 items-center text-xs font-semibold text-[var(--primary)] transition hover:text-[var(--primary-strong)]">¿Olvidaste tu clave?</a>
              </div>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input id="login-password" type="password" autoComplete="current-password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-teal-100" />
              </div>
            </div>

            <Link href="/admin" className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] py-4 font-bold text-white shadow-lg shadow-teal-900/15 transition hover:-translate-y-0.5 hover:bg-[var(--primary-strong)] active:scale-[0.98]">
              Iniciar sesión <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs font-medium text-white/75">© 2026 Galápagos System · Gestión y reservas</p>
      </div>
    </div>
  );
}
