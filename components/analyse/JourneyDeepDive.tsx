import JourneyFunnel from '@/components/JourneyFunnel';

export default function JourneyDeepDive() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" id="journey-view">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Customer journey view
          </p>
          <h2 className="text-2xl font-bold text-slate-900">
            Funnel progression & retention pond
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Segment sizes, conversion rates, and churn hotspots across Trial → New → Established.
            Selecting a stage should reveal the segment profile.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
        >
          Export Journey Data
        </button>
      </header>

      <JourneyFunnel />
    </section>
  );
}

