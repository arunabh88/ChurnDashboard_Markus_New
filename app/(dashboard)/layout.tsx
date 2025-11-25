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
    <div className="relative min-h-screen px-3 pb-16 pt-[170px] text-slate-100 sm:px-5 sm:pt-[120px] md:px-6">
      <Navigation
        activeTab={activeTab}
        copilotOpen={copilotOpen}
        onToggleCopilot={() => setCopilotOpen((prev) => !prev)}
      />

      <main className="mx-auto flex w-full max-w-[min(1440px,100%)] flex-col gap-6 py-8 transition-all duration-300 lg:flex-row lg:gap-10 lg:py-10">
        <div className={`w-full lg:min-w-0 ${copilotOpen ? 'xl:pr-[320px]' : ''}`}>{children}</div>
      </main>

      <AICoPilotPanel open={copilotOpen} />
    </div>
  );
}

