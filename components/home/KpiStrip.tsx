'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { kpiCards } from '@/lib/data/dashboard';

export function KpiStrip() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {kpiCards.map((card) => (
        <Link key={card.id} href={card.href} className="group focus:outline-none">
          <Card className="h-full transform border border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-200 dark:border-slate-700 dark:hover:border-sky-500/60">
            <CardContent className="space-y-2 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {card.label}
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</p>
              <p className="text-xs font-medium text-sky-600 dark:text-sky-300">{card.change}</p>
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Tap to open Analyse
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}

