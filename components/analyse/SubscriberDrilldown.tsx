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
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
              Subscriber drilldown
            </p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Investigate churn signals and individual journeys
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-600 dark:bg-navy-900/80 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-sky-300"
            >
              <Filter size={16} />
              Filters
            </button>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-slate-600 dark:bg-navy-900/80">
              <Search size={16} className="text-slate-400 dark:text-slate-500" />
              <input
                placeholder="Search subscribers"
                className="w-36 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
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
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 dark:border-slate-600 dark:bg-navy-900/70 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-navy-800/70"
              >
                <p className="font-semibold text-slate-800 dark:text-slate-100">{subscriber.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{subscriber.segment}</p>
              </button>
            ))}
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-600 dark:bg-navy-900/60">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Profile & plan
              </p>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {selectedSubscriber.name} • {selectedSubscriber.id}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {selectedSubscriber.segment} • {selectedSubscriber.plan}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-500/40 dark:bg-rose-500/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-300">
                  Churn signals
                </p>
                <ul className="mt-2 space-y-1 text-sm text-rose-700 dark:text-rose-200">
                  {selectedSubscriber.churnSignals.map((signal) => (
                    <li key={signal}>• {signal}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/40 dark:bg-emerald-500/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                  Engagement timeline
                </p>
                <ul className="mt-2 space-y-1 text-sm text-emerald-700 dark:text-emerald-200">
                  {selectedSubscriber.engagement.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-navy-900/70">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Payment history
                </p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Current method: {selectedSubscriber.payment}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No missed payments in last 90 days
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-navy-900/70">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Previous interventions
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  {selectedSubscriber.interventions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4 dark:border-sky-500/40 dark:bg-sky-500/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                AI recommendations
              </p>
              <p className="mt-2 text-sm text-sky-700 dark:text-sky-200">
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

