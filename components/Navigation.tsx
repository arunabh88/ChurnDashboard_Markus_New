'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Bot, LayoutDashboard, LineChart, Rocket } from 'lucide-react';
import type { DashboardSection } from '@/lib/data/dashboard';

interface NavigationProps {
  currentSection: DashboardSection;
  onToggleCopilot: () => void;
  copilotOpen: boolean;
}

const navItems: {
  label: string;
  href: string;
  section: DashboardSection;
  description: string;
}[] = [
  {
    label: 'Home',
    href: '/home',
    section: 'home',
    description: 'Pulse & priorities',
  },
  {
    label: 'Analyse',
    href: '/analyse',
    section: 'analyse',
    description: 'Journey & signals',
  },
  {
    label: 'Actions',
    href: '/actions',
    section: 'actions',
    description: 'Playbooks & outcomes',
  },
];

export default function Navigation({
  currentSection,
  onToggleCopilot,
  copilotOpen,
}: NavigationProps) {
  const aiLabel = useMemo(
    () => (copilotOpen ? 'Hide AI Co-Pilot' : 'Show AI Co-Pilot'),
    [copilotOpen]
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sky-600">
            <LayoutDashboard size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Sky TV Retention Intelligence
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = currentSection === item.section;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center text-sm font-medium transition-colors ${
                  isActive ? 'text-sky-600' : 'text-slate-500 hover:text-sky-600'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[11px] font-normal text-slate-400">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleCopilot}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
            aria-label={aiLabel}
          >
            <Bot size={18} />
            <span className="hidden sm:inline">{aiLabel}</span>
          </button>

          <Link
            href="/analyse"
            className="hidden rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600 md:inline-flex md:items-center md:gap-1"
          >
            <LineChart size={14} />
            Open Analyse
          </Link>

          <Link
            href="/actions"
            className="hidden rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700 md:inline-flex md:items-center md:gap-1"
          >
            <Rocket size={14} />
            Launch Action
          </Link>
        </div>
      </div>
    </header>
  );
}

