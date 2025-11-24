'use client';

import { KpiStrip } from '@/components/home/KpiStrip';
import { JourneySummary } from '@/components/home/JourneySummary';
import { AttentionAlerts } from '@/components/home/AttentionAlerts';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="glass-panel rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-xl shadow-sky-500/20">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-200">Pulse & priorities</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          Sky TV Subscriber Retention Dashboard
          <span className="ml-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-sky-200">
            Einstein Insights
          </span>
        </h1>
        <p className="mt-3 text-sm text-slate-200/80">
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

