'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { subscribers } from '@/lib/data/dashboard';

export function SubscriberDrilldown() {
  const [selectedSubscriber] = useState(subscribers[0]);

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">
              Subscriber drilldown
            </p>
            <h3 className="text-lg font-semibold text-white">
              Investigate churn signals and individual journeys
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-300/60 hover:text-sky-200"
            >
              <Filter size={16} />
              Filters
            </button>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Search size={16} className="text-slate-300" />
              <input
                placeholder="Search subscribers"
                className="w-36 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <div className="space-y-3">
            {subscribers.map((subscriber) => (
              <button
                key={subscriber.id}
                type="button"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-white"
              >
                <p className="font-semibold text-white">{subscriber.name}</p>
                <p className="text-xs text-slate-400">{subscriber.segment}</p>
              </button>
            ))}
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Profile & plan
              </p>
              <h4 className="text-lg font-semibold text-white">
                {selectedSubscriber.name} • {selectedSubscriber.id}
              </h4>
              <p className="text-sm text-slate-300">
                {selectedSubscriber.segment} • {selectedSubscriber.plan}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-200">
                  Churn signals
                </p>
                <ul className="mt-2 space-y-1 text-sm text-rose-100">
                  {selectedSubscriber.churnSignals.map((signal) => (
                    <li key={signal}>• {signal}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
                  Engagement timeline
                </p>
                <ul className="mt-2 space-y-1 text-sm text-emerald-100">
                  {selectedSubscriber.engagement.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Payment history
                </p>
                <p className="text-sm font-medium text-white">
                  Current method: {selectedSubscriber.payment}
                </p>
                <p className="text-xs text-slate-400">
                  No missed payments in last 90 days
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Previous interventions
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-200">
                  {selectedSubscriber.interventions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-sky-500/40 bg-sky-500/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">
                AI recommendations
              </p>
              <p className="mt-2 text-sm text-sky-100">
                Trigger loyalty bundle upgrade and personalised EPL content journey within 24 hours.
                Expected retention lift +5.6%.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

