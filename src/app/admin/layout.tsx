"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setIsMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 pb-8 pt-1 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
