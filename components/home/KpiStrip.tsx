'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, BarChart3, ShieldAlert, Sparkles, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { kpiCards } from '@/lib/data/dashboard';

const iconMap: Record<string, JSX.Element> = {
  'total-subscribers': <Users size={18} />,
  'high-risk': <ShieldAlert size={18} />,
  'monthly-churn': <Activity size={18} />,
  'early-churn': <Sparkles size={18} />,
  'cltv-cac': <BarChart3 size={18} />,
};

const gradientMap: Record<string, string> = {
  'total-subscribers': 'from-sky-500/80 via-blue-500/70 to-indigo-600/70',
  'high-risk': 'from-rose-500/80 via-rose-600/70 to-orange-500/70',
  'monthly-churn': 'from-amber-400/80 via-orange-500/70 to-amber-600/70',
  'early-churn': 'from-fuchsia-500/80 via-purple-600/70 to-indigo-600/70',
  'cltv-cac': 'from-emerald-500/80 via-teal-500/70 to-sky-500/70',
};

export function KpiStrip() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {kpiCards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 + 0.1, type: 'spring', stiffness: 180, damping: 18 }}
        >
          <Link href={card.href} className="group focus:outline-none">
            <Card className="h-full overflow-hidden border border-white/10 bg-gradient-to-br p-[1px]">
              <div
                className={`relative h-full rounded-[26px] bg-gradient-to-br ${gradientMap[card.id] ?? 'from-slate-800 via-slate-900 to-slate-950'} p-[1px]`}
              >
                <CardContent className="relative flex h-full flex-col justify-between rounded-[24px] bg-slate-900/70 p-5 transition group-hover:bg-slate-900/80">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-300">
                        {card.label}
                      </p>
                      <p className="text-3xl font-semibold text-white drop-shadow-lg">{card.value}</p>
                    </div>
                    <span className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sky-100 shadow-sky-500/40 transition group-hover:border-white/30">
                      {iconMap[card.id]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-sky-200">
                    <span>{card.change}</span>
                    <span className="inline-flex items-center gap-1 text-slate-200">
                      Open Analyse
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}

