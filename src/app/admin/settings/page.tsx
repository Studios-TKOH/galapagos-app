"use client";

import { useState } from "react";
import { Settings, BellRing, Shield, Save, MessageSquare, Key, HelpCircle } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notificaciones", icon: BellRing },
    { id: "security", label: "Seguridad", icon: Shield },
  ];

  const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/10";
  const labelClass = "text-sm font-semibold text-slate-700";

  return (
    <div className="mx-auto max-w-7xl space-y-7 py-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Sistema · Preferencias</p><h1 className="text-3xl font-bold tracking-tight text-slate-900">Configuración</h1><p className="mt-1 text-sm text-slate-500">Administra los ajustes globales de la plataforma.</p></div>
        <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-[var(--primary-strong)] hover:-translate-y-0.5"><Save className="h-4 w-4" />Guardar cambios</button>
      </div>

      <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Secciones de configuración" className="glass rounded-2xl p-2 md:h-fit">
          <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Preferencias</p>
          <div className="grid grid-cols-3 gap-1 md:flex md:flex-col">
            {tabs.map((tab) => { const isActive = activeTab === tab.id; return <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} aria-pressed={isActive} className={`min-h-11 flex items-center justify-center gap-2 rounded-xl px-3 text-xs font-semibold transition md:justify-start md:text-sm ${isActive ? "bg-teal-50 text-[var(--primary)] shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}><tab.icon className="h-4 w-4" />{tab.label}</button>; })}
          </div>
        </nav>

        <div>
          {activeTab === "general" && <div className="glass rounded-2xl p-6 sm:p-8 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-7"><h2 className="text-lg font-bold text-slate-900">Información de la empresa</h2><p className="mt-1 text-sm text-slate-500">Datos que se mostrarán en los vouchers y comunicaciones.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2"><label htmlFor="business-name" className={labelClass}>Nombre comercial</label><input id="business-name" type="text" defaultValue="Galápagos Platform" className={inputClass} /></div>
                <div className="space-y-2"><label htmlFor="business-email" className={labelClass}>Correo principal</label><input id="business-email" type="email" defaultValue="contacto@empresa.com" className={inputClass} /></div>
                <div className="space-y-2 sm:col-span-2"><label htmlFor="business-address" className={labelClass}>Dirección</label><input id="business-address" type="text" defaultValue="Puerto Ayora, Isla Santa Cruz, Galápagos" className={inputClass} /></div>
              </div>
            </div>
            <div className="pt-7"><h2 className="text-lg font-bold text-slate-900">Preferencias regionales</h2><p className="mt-1 text-sm text-slate-500">Define la zona horaria y moneda de operación.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2"><div className="space-y-2"><label htmlFor="timezone" className={labelClass}>Zona horaria</label><select id="timezone" className={inputClass}><option>(GMT-06:00) Galápagos</option><option>(GMT-05:00) Ecuador Continental</option></select></div><div className="space-y-2"><label htmlFor="currency" className={labelClass}>Moneda base</label><select id="currency" className={inputClass}><option>USD ($) - Dólar Estadounidense</option></select></div></div>
            </div>
          </div>}

          {activeTab === "notifications" && <div className="glass rounded-2xl p-6 sm:p-8 space-y-7 animate-in fade-in duration-300">
            <div><h2 className="text-lg font-bold text-slate-900">Automatización con WhatsApp</h2><p className="mt-1 text-sm text-slate-500">Gestiona el envío automático de vouchers y alertas.</p></div>
            <div className="flex flex-col gap-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:flex-row sm:items-center"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"><MessageSquare className="h-5 w-5" /></div><div className="flex-1"><h3 className="font-bold text-slate-900">Servicio de WhatsApp</h3><p className="mt-1 text-sm leading-5 text-slate-600">El servidor simulará una sesión web para enviar mensajes. Requiere escanear un código QR la primera vez.</p></div><label className="relative inline-flex cursor-pointer items-center"><input type="checkbox" aria-label="Activar servicio de WhatsApp" className="peer sr-only" defaultChecked /><span className="h-7 w-12 rounded-full bg-slate-200 transition peer-checked:bg-emerald-500 after:absolute after:left-[3px] after:top-[3px] after:h-[22px] after:w-[22px] after:rounded-full after:bg-white after:shadow-sm after:transition peer-checked:after:translate-x-5" /></label></div>
            <div className="space-y-3 border-t border-slate-100 pt-7"><h3 className="font-bold text-slate-900">Eventos notificables</h3><div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white"><label className="flex items-center justify-between gap-4 p-4"><span><span className="block text-sm font-semibold text-slate-900">Nueva reserva confirmada</span><span className="text-xs text-slate-500">Envía el voucher en PDF a la agencia.</span></span><input type="checkbox" aria-label="Notificar nueva reserva confirmada" className="h-5 w-5 accent-[var(--primary)]" defaultChecked /></label><label className="flex items-center justify-between gap-4 p-4"><span><span className="block text-sm font-semibold text-slate-900">Alerta a embarcación</span><span className="text-xs text-slate-500">Avisa al dueño cuando un cupo ha sido tomado.</span></span><input type="checkbox" aria-label="Notificar alerta a embarcación" className="h-5 w-5 accent-[var(--primary)]" defaultChecked /></label></div></div>
          </div>}

          {activeTab === "security" && <div className="glass rounded-2xl p-6 sm:p-8 animate-in fade-in duration-300"><div><h2 className="text-lg font-bold text-slate-900">Seguridad de la cuenta</h2><p className="mt-1 text-sm text-slate-500">Actualiza tu contraseña de administrador.</p></div><div className="mt-7 max-w-md space-y-5"><div className="space-y-2"><label htmlFor="current-password" className={labelClass}>Contraseña actual</label><div className="relative"><Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="current-password" type="password" autoComplete="current-password" placeholder="••••••••" className={`${inputClass} pl-10`} /></div></div><div className="space-y-2"><label htmlFor="new-password" className={labelClass}>Nueva contraseña</label><div className="relative"><Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="new-password" type="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" className={`${inputClass} pl-10`} /></div></div><button type="button" className="min-h-11 w-full rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800">Actualizar contraseña</button></div><div className="mt-8 flex gap-4 rounded-2xl border border-sky-200 bg-sky-50 p-4"><HelpCircle className="h-5 w-5 shrink-0 text-sky-600" /><div><h3 className="text-sm font-bold text-sky-900">Respaldo de base de datos</h3><p className="mt-1 text-xs leading-5 text-sky-700">Los respaldos deben realizarse manualmente desde la consola del servidor de PostgreSQL.</p></div></div></div>}
        </div>
      </div>
    </div>
  );
}
