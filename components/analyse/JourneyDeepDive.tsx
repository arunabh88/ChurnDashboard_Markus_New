import { journeyDetails } from '@/lib/data/dashboard';
import { ArrowRight } from 'lucide-react';

export default function JourneyDeepDive() {
  return (
    <section
      id="journey-view"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Journey view
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Full funnel + retention pond
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Hover across each phase to understand when churn happens, conversion
            rates, and the biggest driver clusters.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {journeyDetails.map((stage) => (
          <div
            key={stage.id}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-sky-50"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">
                {stage.label}
              </p>
              <ArrowRight
                size={16}
                className="text-slate-300 transition group-hover:text-sky-500"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-600">
              {stage.conversion}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
              {stage.avgDays}
            </p>
            <p className="mt-1 text-xs text-slate-500">{stage.churnWindow}</p>
            <div className="mt-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Top drivers
              </p>
              {stage.drivers.map((driver) => (
                <p key={driver} className="text-sm text-slate-600">
                  • {driver}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

