'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const stages = [
  {
    id: 'trial',
    title: 'Trial Users',
    metric: '3,000 users',
    churn: '70% churn',
    accent: 'from-rose-200 via-rose-100 to-white',
    droplet: 'bg-rose-200 text-rose-600',
    leak: '70% leak',
  },
  {
    id: 'new',
    title: 'New Users',
    metric: '2,190 users',
    churn: '20% churn',
    accent: 'from-amber-200 via-amber-100 to-white',
    droplet: 'bg-amber-200 text-amber-600',
    leak: '20% leak',
  },
  {
    id: 'established',
    title: 'Established Users',
    metric: '1.29M users',
    churn: 'Target <0.57%',
    accent: 'from-emerald-200 via-emerald-100 to-white',
    droplet: 'bg-emerald-200 text-emerald-600',
    leak: '0.85% leak',
  },
];

export function JourneyFunnel() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
            Subscriber Journey
          </p>
          <h2 className="text-xl font-semibold text-slate-900">Funnel → Retention pond</h2>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-sky-100 bg-sky-50/80 px-4 py-2 text-sm text-sky-700">
          <Droplets size={16} />
          <span>Daily inflow 100 trials → 30 new → 19 established</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <motion.div
              className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b ${stage.accent} p-6 shadow-sm`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                {stage.title}
              </p>
              <p className="text-lg font-semibold text-slate-900">{stage.metric}</p>
              <p className="text-sm font-medium text-slate-600">{stage.churn}</p>
              <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${stage.droplet}`}>
                <Droplets size={14} />
                {stage.leak}
              </div>
            </motion.div>

            {index < stages.length - 1 ? (
              <motion.div
                className="hidden h-px bg-gradient-to-r from-sky-100 via-sky-200 to-sky-100 lg:block"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1 + 0.15 }}
              >
                <div className="relative -top-2 flex justify-center">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-sky-600 shadow-sm">
                    <ArrowRight size={12} className="inline" /> flow
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="hidden items-center justify-center lg:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.25 }}
              >
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm font-medium text-emerald-700">
                  <Target size={16} />
                  Established churn 0.85% vs target 0.57%
                </div>
              </motion.div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

import { Fragment } from 'react';

