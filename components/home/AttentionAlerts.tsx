'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowRight, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { priorityAlerts } from '@/lib/data/dashboard';

export function AttentionAlerts() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {priorityAlerts.map((alert) => (
        <Card
          key={alert.id}
          className="relative overflow-hidden border border-amber-300/40 bg-gradient-to-br from-amber-500/25 via-amber-500/15 to-transparent p-[1px]"
        >
          <CardContent className="relative space-y-4 rounded-[24px] bg-slate-900/80 p-5 text-amber-100">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-2 text-white shadow-lg shadow-amber-500/50">
                <AlertTriangle size={18} />
              </div>
              <p className="text-sm font-semibold text-amber-50">{alert.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={alert.analyseHref}
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:border-sky-300/70 hover:text-white"
              >
                <Activity size={16} />
                Analyse
              </Link>
              <Link
                href={alert.actionHref}
                className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/5 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200/60 hover:text-white"
              >
                Take Action
                <ArrowRight size={16} />
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

