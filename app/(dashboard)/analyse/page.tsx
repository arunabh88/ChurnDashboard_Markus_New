'use client';

import { OverviewAnalytics } from '@/components/analyse/OverviewAnalytics';

export default function AnalysePage() {
  return (
    <div className="space-y-6">
      <header className="glass-panel rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-xl shadow-violet-500/20">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-sky-200">
          Deep dive & diagnostics
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          Analyse subscriber behaviour
          <span className="ml-3 rounded-full border border-white/10 bg-gradient-to-r from-sky-500/40 to-indigo-500/40 px-3 py-1 text-xs font-medium text-sky-100">
            Einstein Studio
          </span>
        </h1>
        <p className="mt-3 text-sm text-slate-200/80">
          Explore trends, journey hotspots, signal matrix insights, subscriber drilldowns, and model
          performance to identify churn drivers.
        </p>
      </header>

      <OverviewAnalytics />
    </div>
  );
}

