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
          className="border border-amber-100 bg-amber-50/50 dark:border-amber-500/30 dark:bg-amber-500/10"
        >
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300">
                <AlertTriangle size={18} />
              </div>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-200">{alert.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={alert.analyseHref}
                className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-sky-500/30 dark:bg-navy-900/70 dark:text-sky-300 dark:hover:border-sky-400/50"
              >
                <Activity size={16} />
                Analyse
              </Link>
              <Link
                href={alert.actionHref}
                className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-600 transition hover:border-amber-300 hover:text-amber-700 dark:border-amber-500/30 dark:bg-navy-900/70 dark:text-amber-200 dark:hover:border-amber-400/50"
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

