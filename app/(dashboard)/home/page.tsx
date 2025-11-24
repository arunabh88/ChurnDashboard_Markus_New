'use client';

import { KpiStrip } from '@/components/home/KpiStrip';
import { JourneySummary } from '@/components/home/JourneySummary';
import { AttentionAlerts } from '@/components/home/AttentionAlerts';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Pulse & priorities
        </p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Sky TV Subscriber Retention Dashboard
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Monitor critical KPIs, understand journey signals, and take action on the highest-risk
          cohorts. Every card links directly into Analyse with Einstein filters applied.
        </p>
      </header>

      <KpiStrip />
      <JourneySummary />
      <AttentionAlerts />
    </div>
  );
}

