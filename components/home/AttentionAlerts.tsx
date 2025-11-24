'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowRight, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { priorityAlerts } from '@/lib/data/dashboard';

export function AttentionAlerts() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {priorityAlerts.map((alert) => (
        <Card key={alert.id} className="border border-amber-100 bg-amber-50/50">
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                <AlertTriangle size={18} />
              </div>
              <p className="text-sm font-semibold text-amber-700">{alert.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={alert.analyseHref}
                className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 transition hover:border-sky-300 hover:text-sky-700"
              >
                <Activity size={16} />
                Analyse
              </Link>
              <Link
                href={alert.actionHref}
                className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-600 transition hover:border-amber-300 hover:text-amber-700"
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

