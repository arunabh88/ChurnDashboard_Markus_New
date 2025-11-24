'use client';

import Link from 'next/link';
import { Bell, Bot, LayoutDashboard, Moon, Sun, UserCircle } from 'lucide-react';
import { useTheme } from '@/app/providers';

const tabs = [
  { id: 'home', label: 'Home', description: 'Pulse & priorities', href: '/home' },
  { id: 'analyse', label: 'Analyse', description: 'Journey & signals', href: '/analyse' },
  { id: 'action', label: 'Action', description: 'Playbooks & outcomes', href: '/actions' },
];

interface NavigationProps {
  activeTab: string;
  copilotOpen: boolean;
  onToggleCopilot: () => void;
}

export default function Navigation({
  activeTab,
  copilotOpen,
  onToggleCopilot,
}: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors duration-300 dark:border-slate-700/60 dark:bg-navy-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
            <LayoutDashboard size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Sky TV Retention Intelligence
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex flex-col items-center text-sm font-semibold transition-colors ${
                  active
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">
                  {tab.description}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-700 dark:bg-navy-800/80 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-sky-300 md:inline-flex"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={onToggleCopilot}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              copilotOpen
                ? 'border-sky-600 bg-sky-600 text-white shadow-sm dark:border-sky-500 dark:bg-sky-500'
                : 'border-sky-200 bg-white text-sky-600 shadow-sm hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-navy-800/80 dark:text-sky-300 dark:hover:border-slate-600'
            }`}
            aria-label={copilotOpen ? 'Hide AI Co-Pilot' : 'Show AI Co-Pilot'}
          >
            <Bot size={18} />
            <span className="hidden sm:inline">
              {copilotOpen ? 'Hide AI Co-Pilot' : 'Show AI Co-Pilot'}
            </span>
          </button>

          <button
            type="button"
            className="hidden rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-700 dark:bg-navy-800/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-sky-300 md:inline-flex"
            aria-label="Alerts"
          >
            <Bell size={18} />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-700 dark:bg-navy-800/80 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-sky-300"
          >
            <UserCircle size={18} />
            <span className="hidden sm:inline">Retention Ops</span>
          </button>
        </div>
      </div>
    </header>
  );
}
