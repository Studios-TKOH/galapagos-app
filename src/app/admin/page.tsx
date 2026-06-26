import { Users, Ship, Ticket, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Reservas Activas", value: "1,248", icon: Ticket, change: "+12%", color: "from-blue-500 to-cyan-400" },
    { title: "Ingresos (Mes)", value: "$45,231", icon: TrendingUp, change: "+8.2%", color: "from-emerald-500 to-teal-400" },
    { title: "Agencias Activas", value: "32", icon: Users, change: "+2", color: "from-purple-500 to-pink-500" },
    { title: "Embarcaciones", value: "14", icon: Ship, change: "0", color: "from-orange-500 to-yellow-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Resumen general de tu plataforma Galápagos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 translate-x-10 -translate-y-10`}></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith("+") 
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-6 rounded-2xl min-h-[400px] flex flex-col">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-4">Ocupación Mensual</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            <p className="text-slate-400 text-sm">Gráfico de área próximamente</p>
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl min-h-[400px] flex flex-col">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-4">Próximas Salidas</h3>
          <div className="flex-1 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  {10 + i}
                </div>
                <div>
                  <p className="font-medium text-sm text-slate-900 dark:text-white">Tour San Cristóbal 360</p>
                  <p className="text-xs text-slate-500">Embarcación "Sea Wolf" • 8/12 cupos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
