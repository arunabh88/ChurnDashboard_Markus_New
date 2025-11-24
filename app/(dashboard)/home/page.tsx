'use client';

import { motion } from 'framer-motion';
import { KpiStrip } from '@/components/home/KpiStrip';
import { JourneySummary } from '@/components/home/JourneySummary';
import { AttentionAlerts } from '@/components/home/AttentionAlerts';
import { JourneyFunnel } from '@/components/JourneyFunnel';

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

      <div className="grid auto-rows-min gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.25fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1.3fr)_minmax(0,1.05fr)]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 22 }}
          className="flex w-full flex-col gap-6"
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em] text-slate-300">
            <span>Overview</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold text-sky-200">
              Live KPI feed
            </span>
          </div>
          <KpiStrip />
          <JourneyFunnel />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, type: 'spring', stiffness: 160, damping: 22 }}
          className="flex w-full flex-col gap-6"
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em] text-slate-300">
            <span>Insights</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold text-sky-200">
              AI prioritised
            </span>
          </div>
          <JourneySummary />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 160, damping: 22 }}
          className="flex w-full flex-col gap-6"
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em] text-slate-300">
            <span>Actions</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold text-sky-200">
              Immediate focus
            </span>
          </div>
          <AttentionAlerts />
        </motion.section>
      </div>
    </div>
  );
}

