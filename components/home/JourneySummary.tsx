'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Waves } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { journeySnapshot } from '@/lib/data/dashboard';

const stageStyle = [
  'border border-rose-100 bg-rose-50 text-rose-600',
  'border border-amber-100 bg-amber-50 text-amber-600',
  'border border-emerald-100 bg-emerald-50 text-emerald-600',
];

export function JourneySummary() {
  const router = useRouter();

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
              Journey overview
            </p>
            <h2 className="text-xl font-semibold text-slate-900">
              Trial → New → Retention pond
            </h2>
          </div>
          <button
            type="button"
            onClick={() => router.push('/analyse?view=journey')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
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
              className={`cursor-pointer rounded-2xl px-4 py-5 transition hover:shadow-md ${stageStyle[index]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide">{stage.label}</p>
              <p className="text-sm font-medium">{stage.description}</p>
            </div>
          ))}
        </motion.div>

        <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-4 text-sm text-sky-700">
          <div className="rounded-full bg-white p-2 text-sky-500 shadow-sm">
            <Waves size={18} />
          </div>
          <p className="font-medium">{journeySnapshot.insight}</p>
        </div>
      </CardContent>
    </Card>
  );
}

