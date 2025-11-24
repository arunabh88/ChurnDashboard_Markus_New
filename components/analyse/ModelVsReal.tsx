import Link from 'next/link';
import { BrainCircuit, RefreshCw } from 'lucide-react';
import { modelPerformance } from '@/lib/data/dashboard';

export default function ModelVsReal() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Model vs real churn
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Compare predicted churn performance
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Evaluate how Einstein predictions track against realised churn and
            trigger retraining when drift currents are detected.
          </p>
        </div>
        <Link
          href="/actions?create=model-retrain"
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
        >
          <RefreshCw size={16} />
          Create Retention Action
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modelPerformance.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {metric.label}
            </p>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
        <BrainCircuit size={18} className="mt-1" />
        <p>{modelPerformance.message}</p>
      </div>
    </section>
  );
}

