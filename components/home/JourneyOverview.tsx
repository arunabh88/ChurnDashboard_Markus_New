import { journeySnapshot } from '@/lib/data/dashboard';
import JourneyFunnel from '@/components/JourneyFunnel';

export default function JourneyOverview() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Journey overview
          </p>
          <h2 className="text-2xl font-bold text-slate-900">Trial → New → Retention pond</h2>
          <p className="mt-1 text-sm text-slate-600">
            {journeySnapshot.insight}
          </p>
        </div>
        <a
          href="/analyse?view=journey"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
        >
          Open Journey View
        </a>
      </header>

      <JourneyFunnel />
    </section>
  );
}

