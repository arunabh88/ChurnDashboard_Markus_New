'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Bell, Bot, LayoutDashboard, LineChart, Moon, Sparkles, Sun, Target, UserCircle } from 'lucide-react';
import { useTheme } from '@/app/providers';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'home', label: 'Home', description: 'Pulse & priorities', href: '/home', icon: Sparkles },
  { id: 'analyse', label: 'Analyse', description: 'Journey & signals', href: '/analyse', icon: LineChart },
  { id: 'action', label: 'Action', description: 'Playbooks & outcomes', href: '/actions', icon: Target },
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
  const ActiveIcon = useMemo(() => tabs.find((tab) => tab.id === activeTab)?.icon ?? Sparkles, [activeTab]);

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex w/full flex-col items-center justify-center bg-white/95 px-2 pt-3 text-[13px] text-slate-600 shadow-[0_6px_18px_rgba(15,23,42,0.08)] backdrop-blur sm:px-4 sm:text-sm">
      <div className="mx-auto flex w/full max-w-[min(1440px,100%)] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-2 overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4">
            <LayoutDashboard size={18} className="hidden text-sky-500 sm:block" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
              Sky TV Retention Intelligence
            </span>
            <span className="absolute inset-0 rounded-xl border border-white/60" aria-hidden />
          </div>
        </div>

        <nav className="hidden items-center gap-3 lg:flex">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <motion.div
                key={tab.id}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="group relative"
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/20 via-cyan-400/15 to-indigo-400/15"
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  />
                )}
                <Link
                  href={tab.href}
                  className={`relative flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? 'text-sky-600'
                      : 'text-slate-500 hover:text-sky-600'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white transition group-hover:border-sky-400/40 group-hover:text-sky-500 ${
                      active ? 'text-sky-500 shadow-[0_10px_24px_rgba(56,189,248,0.25)]' : 'text-slate-400'
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <div className="flex flex-col">
                    <span>{tab.label}</span>
                    <span className="text-[11px] font-normal text-slate-400">{tab.description}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-sky-300/60 hover:text-sky-500 xl:inline-flex"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={onToggleCopilot}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition ${
              copilotOpen
                ? 'border-sky-400/80 bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 text-white shadow-[0_12px_24px_rgba(56,189,248,0.35)]'
                : 'border-slate-200 bg-white text-sky-600 hover:border-sky-300/80 hover:text-sky-700'
            }`}
            aria-label={copilotOpen ? 'Hide AI Co-Pilot' : 'Show AI Co-Pilot'}
          >
            <Bot size={18} />
            <span className="hidden sm:inline">
              {copilotOpen ? 'Hide AI Co-Pilot' : 'Show AI Co-Pilot'}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-sky-300/60 hover:text-sky-500"
              aria-label="Alerts"
            >
              <Bell size={18} />
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-300/60 hover:text-sky-600"
            >
              <UserCircle size={18} />
              <span className="hidden sm:inline">Retention Ops</span>
            </button>
          </div>
        </div>
      </div>
      <nav className="mx-auto mt-2 flex w/full max-w-[min(1440px,100%)] items-center justify-between px-3 pb-3 text-xs text-slate-400 sm:hidden">
        <div className="flex flex-1 items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex min-w-[110px] flex-col items-center rounded-full px-3 py-2 font-semibold transition ${
                  active ? 'bg-sky-500/10 text-sky-600 border border-sky-200' : 'border border-transparent text-slate-400'
                }`}
              >
                <Icon size={16} className="mb-1" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
