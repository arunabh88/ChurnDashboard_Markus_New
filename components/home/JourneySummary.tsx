'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Waves } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { journeySnapshot } from '@/lib/data/dashboard';

const stageStyle = [
  'from-rose-500/50 via-rose-500/30 to-transparent text-rose-100 border-rose-400/60',
  'from-amber-400/50 via-amber-400/30 to-transparent text-amber-100 border-amber-300/60',
  'from-emerald-400/50 via-emerald-400/25 to-transparent text-emerald-100 border-emerald-300/60',
];

export function JourneySummary() {
  const router = useRouter();

  return (
    <Card className="relative overflow-hidden border-white/10 p-[1px]">
      <div className="rounded-[24px] bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/90">
        <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">
              Journey overview
            </p>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
              Trial → New → Retention pond
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sky-200">
                Real time
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => router.push('/analyse?view=journey')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100 shadow-lg shadow-sky-500/30 transition hover:border-sky-300/60 hover:text-white"
          >
            Open Journey View
            <ArrowRight size={16} />
          </button>
        </div>

        <motion.div
          className="grid gap-4 md:grid-cols-3"
          whileHover={{ scale: 1.01 }}
          onClick={() => router.push('/analyse?view=journey')}
        >
          {journeySnapshot.stages.map((stage, index) => (
            <div
              key={stage.label}
              className={`glass-panel cursor-pointer rounded-2xl border px-4 py-5 transition hover:border-white/30 hover:shadow-[0_20px_45px_rgba(14,165,233,0.35)] bg-gradient-to-br ${stageStyle[index]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide">{stage.label}</p>
              <p className="text-sm font-medium">{stage.description}</p>
            </div>
          ))}
        </motion.div>

        <div className="flex items-center gap-3 rounded-2xl border border-sky-400/50 bg-sky-500/10 px-4 py-4 text-sm text-sky-200 shadow-[0_18px_38px_rgba(56,189,248,0.25)]">
          <div className="rounded-full bg-gradient-to-br from-sky-400 to-sky-600 p-2 text-white shadow-lg shadow-sky-400/60">
            <Waves size={18} />
          </div>
          <p className="font-medium">{journeySnapshot.insight}</p>
        </div>
        </CardContent>
      </div>
    </Card>
  );
}

