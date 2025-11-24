'use client';

import { playbooks } from '@/lib/data/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { Rocket } from 'lucide-react';

export function RecommendedPlaybooks() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">
          Recommended playbooks
        </p>
        <h3 className="text-lg font-semibold text-white">
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {playbook.segment}
                  </p>
                  <h4 className="text-lg font-semibold text-white">
                    {playbook.title}
                  </h4>
                </div>
                <div className="rounded-full border border-sky-400/40 bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-100">
                  {playbook.lift} lift
                </div>
              </div>
              <p className="text-sm text-slate-300">{playbook.description}</p>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100">
                  ROI {playbook.roi}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-300/60 hover:text-white"
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

