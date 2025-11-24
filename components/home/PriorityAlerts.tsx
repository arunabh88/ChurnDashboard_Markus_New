import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { priorityAlerts } from '@/lib/data/dashboard';

export default function PriorityAlerts() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          AI prioritised alerts
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">What needs my attention?</h2>
        <p className="mt-1 text-sm text-slate-600">
          Top three risks detected across funnel, value, and experimentation.
        </p>
      </header>

      <div className="space-y-3">
        {priorityAlerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-200 hover:bg-sky-50"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 shrink-0 text-sky-600" size={18} />
              <div className="flex w-full flex-col gap-3">
                <p className="text-sm font-semibold text-slate-700">{alert.title}</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={alert.analyseHref}
                    className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700"
                  >
                    Analyse
                  </Link>
                  <Link
                    href={alert.actionHref}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
                  >
                    Take Action
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

