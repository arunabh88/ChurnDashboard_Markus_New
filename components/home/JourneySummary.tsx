'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Target } from 'lucide-react';
import { journeySnapshot } from '@/lib/data/dashboard';

const journeyItems = [
  {
    key: 'trial',
    accent: 'bg-rose-100 text-rose-600',
    ring: 'ring-rose-200',
  },
  {
    key: 'new',
    accent: 'bg-amber-100 text-amber-600',
    ring: 'ring-amber-200',
  },
  {
    key: 'established',
    accent: 'bg-emerald-100 text-emerald-600',
    ring: 'ring-emerald-200',
  },
] as const;

export default function JourneySummary() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/analyse?view=journey');
  };

  return (
    <section
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleNavigate();
        }
      }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Journey funnel + retention pond
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Where subscribers move — and where they churn
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            {journeySnapshot.insight}
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleNavigate();
          }}
        >
          Open journey view
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {journeyItems.map((item) => {
          const data = journeySnapshot[item.key];

          return (
            <div
              key={item.key}
              className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 ring-1 ${item.ring}`}
            >
              <div
                className={`mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.accent}`}
              >
                {data.label}
              </div>
              <p className="text-3xl font-bold text-slate-900">{data.value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                {data.churn}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700">
        <Target size={16} />
        <span>
          Clicking anywhere in this module opens the full journey deep dive in
          Analyse.
        </span>
      </div>
    </section>
  );
}

