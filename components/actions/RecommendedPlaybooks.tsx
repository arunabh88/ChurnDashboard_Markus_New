'use client';

import { playbooks } from '@/lib/data/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { Rocket } from 'lucide-react';

export function RecommendedPlaybooks() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
          Recommended playbooks
        </p>
        <h3 className="text-lg font-semibold text-slate-900">
          Loyalty discount, onboarding, re-engagement, downgrade-to-ad-supported
        </h3>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {playbooks.map((playbook) => (
          <Card key={playbook.id} className="border border-slate-200 bg-white">
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {playbook.segment}
                  </p>
                  <h4 className="text-lg font-semibold text-slate-900">{playbook.title}</h4>
                </div>
                <div className="rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1 text-xs font-semibold text-sky-600">
                  {playbook.lift} lift
                </div>
              </div>
              <p className="text-sm text-slate-600">{playbook.description}</p>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  ROI {playbook.roi}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 transition hover:border-sky-300 hover:text-sky-700"
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

