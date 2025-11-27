'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Users, ShieldAlert, Sparkles, Target } from 'lucide-react';
import type { ReactNode } from 'react';

type PulseMetric = {
  id: string;
  label: string;
  value: string;
  sublabel: string;
  icon: ReactNode;
  onClick: () => void;
};

interface KpiPulseBarProps {
  onNavigateAnalyse: (filterId: string) => void;
}

export function KpiPulseBar({ onNavigateAnalyse }: KpiPulseBarProps) {
  const metrics: PulseMetric[] = [
    {
      id: 'total-subs',
      label: 'Total Subscribers',
      value: '2.31M',
      sublabel: '+1.8% vs last month',
      icon: <Users size={18} />,
      onClick: () => onNavigateAnalyse('total-subscribers'),
    },
    {
      id: 'monthly-churn',
      label: 'Monthly Churn Rate',
      value: '1.52%',
      sublabel: 'Target 1.45%',
      icon: <TrendingDown size={18} />,
      onClick: () => onNavigateAnalyse('monthly-churn'),
    },
    {
      id: 'high-risk',
      label: 'High-Risk Subscribers',
      value: '32,400',
      sublabel: '+5% week on week',
      icon: <ShieldAlert size={18} />,
      onClick: () => onNavigateAnalyse('high-risk'),
    },
    {
      id: 'early-churn',
      label: 'Early Lifecycle Churn',
      value: '16.3%',
      sublabel: '0-90 day window',
      icon: <Sparkles size={18} />,
      onClick: () => onNavigateAnalyse('early-lifecycle'),
    },
    {
      id: 'cltv-cac',
      label: 'Avg CLTV / CAC',
      value: '3.4×',
      sublabel: 'Stable vs prior month',
      icon: <Target size={18} />,
      onClick: () => onNavigateAnalyse('cltv-cac'),
    },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric, index) => (
        <motion.button
          key={metric.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={metric.onClick}
          className="group rounded-xl border border-sky-500/25 bg-sky-500/10 p-4 text-left shadow-[0_0_20px_rgba(56,189,248,0.12)] transition-colors hover:border-sky-400/50 hover:bg-sky-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
            <span className="text-sky-300">{metric.icon}</span>
            {metric.label}
          </div>
          <div className="mt-3 text-2xl font-bold text-white">{metric.value}</div>
          <div className="mt-1 text-[11px] text-sky-100/80">{metric.sublabel}</div>
          <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-200/80">
            Jump to Analyse
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="text-sky-100"
            >
              →
            </motion.span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}

