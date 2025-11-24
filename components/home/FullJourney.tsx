import JourneyMap from '@/components/JourneyMap';

export default function FullJourney() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Subscriber Journey
        </p>
        <h2 className="text-2xl font-bold text-slate-900">
          From Funnel to Retention
        </h2>
        <p className="max-w-3xl text-sm text-slate-600">
          Visualise inflow, churn leaks, and the daily flow of subscribers
          across Trial, New, and Established segments. Hover to see Einstein’s
          guidance on where and why customers are churning.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <JourneyMap />
      </div>
    </section>
  );
}

