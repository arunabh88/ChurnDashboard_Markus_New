'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import AICoPilotPanel from '@/components/AICoPilotPanel';

const pathToTab = (pathname: string) => {
  if (pathname.startsWith('/analyse')) return 'analyse';
  if (pathname.startsWith('/actions')) return 'action';
  return 'home';
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentTab = useMemo(
    () => pathToTab(pathname ?? '/home'),
    [pathname]
  );
  const [copilotOpen, setCopilotOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navigation
        activeTab={currentTab}
        onToggleCopilot={() => setCopilotOpen((prev) => !prev)}
        copilotOpen={copilotOpen}
      />

      <div className="relative flex">
        {copilotOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-slate-900/10 backdrop-blur-sm lg:hidden"
            aria-label="Hide AI Co-Pilot"
            onClick={() => setCopilotOpen(false)}
          />
        )}

        <main
          className={`mx-auto w-full max-w-6xl px-6 py-10 transition-[padding] duration-300 ${
            copilotOpen ? 'lg:pr-[30rem]' : 'lg:pr-0'
          }`}
        >
          {children}
        </main>

        <AICoPilotPanel
          open={copilotOpen}
          tab={currentTab}
          onClose={() => setCopilotOpen(false)}
        />
      </div>
    </div>
  );
}

