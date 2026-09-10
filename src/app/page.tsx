"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Ship, Mail, Key, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("Correo o contraseña incorrectos. Verifica tus datos e inténtalo nuevamente.");
      setLoading(false);
      return;
    }

    window.location.assign(searchParams.get("next") || "/admin");
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1549449830-4e3edce6c1a8?q=80&w=2072&auto=format&fit=crop"
          alt="Galápagos"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-500 ease-out">
        <div className="glass bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-black/50">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
              <Ship className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido</h1>
            <p className="text-slate-300">Plataforma de Gestión y Reservas</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium text-slate-200 ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@galapagos.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:bg-white/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label htmlFor="login-password" className="text-sm font-medium text-slate-200">Contraseña</label>
              </div>
              <div className="relative">
                <Key className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:bg-white/10 outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex items-center justify-center gap-2 w-full py-4 mt-8 bg-primary hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 ease-in-out shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">© 2026 Galapagos Booking System.</p>
      </div>
    </div>
  );
}
