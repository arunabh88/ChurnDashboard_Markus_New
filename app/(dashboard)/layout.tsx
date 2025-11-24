'use client';

import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { AICoPilotPanel } from '@/components/AICoPilotPanel';

const tabMap: Record<string, string> = {
  '/home': 'home',
  '/analyse': 'analyse',
  '/actions': 'action',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [copilotOpen, setCopilotOpen] = useState(true);

  const activeTab = useMemo(() => {
    return tabMap[pathname as keyof typeof tabMap] ?? 'home';
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-navy-950">
      <Navigation
        activeTab={activeTab}
        copilotOpen={copilotOpen}
        onToggleCopilot={() => setCopilotOpen((prev) => !prev)}
      />

      <main className="mx-auto flex max-w-6xl gap-8 px-6 py-8 text-slate-900 transition-colors duration-300 dark:text-slate-100">
        <div className={`w-full transition-all ${copilotOpen ? 'lg:pr-[320px]' : ''}`}>
          {children}
        </div>
      </main>

      <AICoPilotPanel open={copilotOpen} />
    </div>
  );
}

