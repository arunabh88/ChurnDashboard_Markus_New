'use client';

import { OverviewAnalytics } from '@/components/analyse/OverviewAnalytics';

export default function AnalysePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Deep dive & diagnostics
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Analyse subscriber behaviour</h1>
        <p className="text-sm text-slate-600">
          Explore trends, journey hotspots, signal matrix insights, subscriber drilldowns, and model
          performance to identify churn drivers.
        </p>
      </header>

      <OverviewAnalytics />
    </div>
  );
}

