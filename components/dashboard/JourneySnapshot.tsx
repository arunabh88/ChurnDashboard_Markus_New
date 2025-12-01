'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';

type JourneyStage = {
  id: 'trial' | 'new' | 'established';
  label: string;
  subscribers: string;
  churn: string;
  trend: number;
  trendLabel: string;
};

interface JourneySnapshotProps {
  onNavigate?: () => void;
}

const STAGES: JourneyStage[] = [
  {
    id: 'trial',
    label: 'Trial Users',
    subscribers: '52,000',
    churn: '68%',
    trend: -5.2,
    trendLabel: 'vs last week',
  },
  {
    id: 'new',
    label: 'New Users',
    subscribers: '31,400',
    churn: '21%',
    trend: -2.1,
    trendLabel: 'stabilising',
  },
  {
    id: 'established',
    label: 'Established Pond',
    subscribers: '1.29M',
    churn: '0.8%',
    trend: 0.3,
    trendLabel: 'above target',
  },
];

export function JourneySnapshot({ onNavigate }: JourneySnapshotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-200">Journey Snapshot</h3>
          <p className="text-sm text-gray-400">Funnel health at a glance – click to investigate</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNavigate}
          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-100 hover:bg-sky-500/25 transition-colors"
        >
          Explore in Analyse
          <ArrowRight size={14} />
        </motion.button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {STAGES.map((stage, index) => {
          const isDown = stage.trend < 0;
          const TrendIcon = isDown ? TrendingDown : TrendingUp;
          const trendColor = isDown ? 'text-emerald-300' : 'text-orange-300';

          return (
            <motion.button
              key={stage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={onNavigate}
              className="group rounded-xl border border-sky-500/25 bg-navy-900/60 p-5 text-left shadow-[0_12px_24px_rgba(8,47,73,0.25)] transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-200">{stage.label}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{stage.subscribers}</span>
                <span className="text-xs text-gray-400">subscribers</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Churn rate</p>
                  <p className="text-lg font-semibold text-white">{stage.churn}</p>
                </div>
                <div className={`inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[11px] ${trendColor}`}>
                  <TrendIcon size={14} />
                  {Math.abs(stage.trend).toFixed(1)}%
                  <span className="text-sky-200/70"> {stage.trendLabel}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}


