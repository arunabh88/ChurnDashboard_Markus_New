'use client';

import { playbooks } from '@/lib/data/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { Rocket } from 'lucide-react';

export function RecommendedPlaybooks() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
          Recommended playbooks
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Loyalty discount, onboarding, re-engagement, downgrade-to-ad-supported
        </h3>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {playbooks.map((playbook) => (
          <Card
            key={playbook.id}
            className="border border-slate-200 bg-white dark:border-slate-600 dark:bg-navy-900/70"
          >
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {playbook.segment}
                  </p>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {playbook.title}
                  </h4>
                </div>
                <div className="rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1 text-xs font-semibold text-sky-600 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-300">
                  {playbook.lift} lift
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{playbook.description}</p>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
                  ROI {playbook.roi}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-600 dark:bg-navy-900/80 dark:text-sky-300 dark:hover:border-slate-500"
                >
                  <Rocket size={16} />
                  Launch Playbook
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

