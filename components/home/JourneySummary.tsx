'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Waves } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { journeySnapshot } from '@/lib/data/dashboard';

const stageStyle = [
  'text-rose-500 bg-rose-50',
  'text-amber-500 bg-amber-50',
  'text-emerald-500 bg-emerald-50',
];

export function JourneySummary() {
  const router = useRouter();

  return (
    <Card className="relative overflow-hidden border border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
              Journey overview
            </p>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-slate-800">
              Trial → New → Retention pond
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-600">
                Real time
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => router.push('/analyse?view=journey')}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 transition hover:border-sky-300 hover:bg-sky-50"
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
              className={`cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 transition hover:border-sky-300 hover:bg-sky-50 ${stageStyle[index]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stage.label}</p>
              <p className="text-sm font-medium text-slate-700">{stage.description}</p>
            </div>
          ))}
        </motion.div>

        <div className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm text-sky-700">
          <div className="rounded-full bg-sky-500/10 p-2 text-sky-600">
            <Waves size={18} />
          </div>
          <p className="font-medium">{journeySnapshot.insight}</p>
        </div>
      </CardContent>
    </Card>
  );
}

