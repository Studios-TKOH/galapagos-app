import { CalendarDays, ChevronRight, Ship, Ticket, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Reservas activas", value: "1,248", change: "+12%", icon: Ticket, tone: "ocean" },
    { title: "Ingresos del mes", value: "$45,231", change: "+8.2%", icon: TrendingUp, tone: "green" },
    { title: "Agencias activas", value: "32", change: "+2", icon: Users, tone: "purple" },
    { title: "Embarcaciones", value: "14", change: "0", icon: Ship, tone: "orange" },
  ];

  const departures = [
    { day: "11", route: "San Cristóbal 360", vessel: "Sea Wolf", seats: "8/12 cupos", status: "Casi lleno" },
    { day: "12", route: "Santa Cruz → Isabela", vessel: "Ocean Spirit", seats: "4/20 cupos", status: "Disponible" },
    { day: "13", route: "San Cristóbal → Santa Cruz", vessel: "Blue Horizon", seats: "12/16 cupos", status: "Disponible" },
    { day: "14", route: "Isabela 360", vessel: "Sea Wolf", seats: "2/12 cupos", status: "Disponible" },
  ];

  const bars = [42, 58, 51, 68, 63, 76, 71, 84, 78, 91, 86, 96];
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  return (
    <div className="mx-auto max-w-7xl space-y-7 py-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Centro de control
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Resumen general de tu operación turística en Galápagos.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/80 px-3 py-2 text-sm text-slate-600 shadow-sm">
          <CalendarDays className="h-4 w-4 text-[var(--primary)]" />
          <span>Septiembre 2026</span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const tone = {
            ocean: "bg-[#e5f5f6] text-[#0b7f8c]",
            green: "bg-emerald-50 text-emerald-600",
            purple: "bg-violet-50 text-violet-600",
            orange: "bg-orange-50 text-orange-600",
          }[stat.tone];

          return (
            <article key={stat.title} className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_8px_30px_rgba(16,42,67,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(16,42,67,0.09)]">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#22b8a7]/5 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${stat.change === "0" ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-700"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="relative mt-5 text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="relative mt-1 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.65fr_1fr]">
        <article className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_8px_30px_rgba(16,42,67,0.05)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-slate-900">Ocupación mensual</h2>
              <p className="mt-1 text-xs text-slate-500">Promedio de cupos utilizados por salida</p>
            </div>
            <div className="rounded-lg bg-[#e5f5f6] px-2.5 py-1.5 text-xs font-bold text-[#0b7f8c]">+14.6%</div>
          </div>

          <div className="mt-7 flex h-64 items-end gap-2 border-b border-slate-100 px-1 sm:gap-3">
            {bars.map((height, index) => (
              <div key={months[index]} className="group flex h-full flex-1 flex-col justify-end gap-2">
                <div className="relative w-full rounded-t-lg bg-gradient-to-t from-[#0b7f8c] to-[#22b8a7] opacity-75 transition-all duration-200 group-hover:opacity-100" style={{ height: `${height}%` }}>
                  <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-white group-hover:block">{height}%</span>
                </div>
                <span className="text-center text-[10px] font-medium text-slate-400">{months[index]}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_8px_30px_rgba(16,42,67,0.05)] sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Próximas salidas</h2>
              <p className="mt-1 text-xs text-slate-500">Agenda operativa</p>
            </div>
            <button className="text-xs font-semibold text-[#0b7f8c] transition-colors hover:text-[#086874]">Ver todas</button>
          </div>

          <div className="mt-5 space-y-2">
            {departures.map((departure) => (
              <div key={`${departure.day}-${departure.route}`} className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-slate-100 hover:bg-slate-50">
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-[#e5f5f6] text-[#0b7f8c]">
                  <span className="text-sm font-bold leading-none">{departure.day}</span>
                  <span className="mt-0.5 text-[9px] font-semibold uppercase">Sep</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{departure.route}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">{departure.vessel} · {departure.seats}</p>
                </div>
                <span className={`hidden rounded-full px-2 py-1 text-[10px] font-semibold sm:inline-flex ${departure.status === "Casi lleno" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                  {departure.status}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5" />
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
