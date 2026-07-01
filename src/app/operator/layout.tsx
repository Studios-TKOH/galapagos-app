"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarCheck, User, Ship } from "lucide-react";

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Top Header - Sencillo para App */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Ship className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Mi Embarcación</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Galaxy I</p>
          </div>
        </div>
        <div aria-hidden="true" className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700">
          <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </div>
      </header>

      {/* Main Content Area - Con padding bottom para que no tape el menu inferior */}
      <main className="flex-1 overflow-y-auto pb-24 relative">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe max-w-md mx-auto">
        <div className="flex justify-around items-center h-16 px-2">
          
          <Link 
            href="/operator" 
            aria-current={pathname === '/operator' ? "page" : undefined}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              pathname === '/operator' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Home className={`w-6 h-6 ${pathname === '/operator' ? 'fill-blue-100 dark:fill-blue-900/50' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Inicio</span>
          </Link>

          <Link 
            href="/operator/availability" 
            aria-current={pathname === '/operator/availability' ? "page" : undefined}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              pathname === '/operator/availability' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <CalendarCheck className={`w-6 h-6 ${pathname === '/operator/availability' ? 'fill-blue-100 dark:fill-blue-900/50' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Cupos</span>
          </Link>

          <Link 
            href="/" 
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-400 hover:text-red-500 transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Salir</span>
          </Link>

        </div>
      </nav>
    </div>
  );
}
