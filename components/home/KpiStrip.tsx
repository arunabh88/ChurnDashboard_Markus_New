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
          transition={{ delay: index * 0.06 + 0.05, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Link href={card.href} className="group focus:outline-none">
            <Card className="h-full overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="flex h-full flex-col justify-between gap-4 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                      {card.label}
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-slate-800">{card.value}</p>
                  </div>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sky-500 shadow-inner ${
                    card.id === 'high-risk' ? 'text-rose-500 bg-rose-100/70' : ''
                  }`}>
                    {iconMap[card.id]}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>{card.change}</span>
                  <span className="inline-flex items-center gap-1 text-sky-600 group-hover:text-sky-700">
                    View details
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}

