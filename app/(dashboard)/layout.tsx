'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import ThemeStyles from '@/components/ThemeStyles';
import AICoPilotPanel from '@/components/AICoPilotPanel';
import type { DashboardSection } from '@/lib/data/dashboard';

const pathToSection = (pathname: string): DashboardSection => {
  if (pathname.startsWith('/analyse')) return 'analyse';
  if (pathname.startsWith('/actions')) return 'actions';
  return 'home';
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const currentSection = useMemo(
    () => pathToSection(pathname ?? '/home'),
    [pathname]
  );
  const [copilotOpen, setCopilotOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ThemeStyles />
      <Navigation
        currentSection={currentSection}
        onToggleCopilot={() => setCopilotOpen((prev) => !prev)}
        copilotOpen={copilotOpen}
      />

      <div className="relative flex">
        {copilotOpen && (
          <button
            className="fixed inset-0 z-20 bg-slate-900/10 backdrop-blur-sm lg:hidden"
            aria-label="Hide AI Co-Pilot"
            onClick={() => setCopilotOpen(false)}
          />
        )}

        <div
          className={`relative w-full transition-[padding] duration-300 ${
            copilotOpen ? 'lg:pr-[28rem]' : 'lg:pr-0'
          }`}
        >
          <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        </div>

        <AICoPilotPanel
          open={copilotOpen}
          section={currentSection}
          onClose={() => setCopilotOpen(false)}
        />
      </div>
    </div>
  );
}

