import Link from 'next/link';
import { AlertTriangle, PlusCircle } from 'lucide-react';
import { attentionAlerts } from '@/lib/data/dashboard';

export default function AttentionAlerts() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            AI prioritised alerts
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            What needs my attention?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Top three risks detected by Einstein across funnel, value, and
            experimentation.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {attentionAlerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-200 hover:bg-sky-50"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 text-sky-500" size={18} />
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-700">
                  {alert.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={alert.primaryHref}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700"
                  >
                    Go to Analyse
                  </Link>
                  <Link
                    href={alert.secondaryHref}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
                  >
                    <PlusCircle size={14} />
                    Create Action
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

