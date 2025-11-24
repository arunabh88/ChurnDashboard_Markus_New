import KpiStrip from '@/components/home/KpiStrip';
import JourneyOverview from '@/components/home/JourneyOverview';
import PriorityAlerts from '@/components/home/PriorityAlerts';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Pulse & Priorities
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Sky TV Subscriber Retention Dashboard
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Monitor critical KPIs, understand journey signals, and take action on the highest-risk
          cohorts. Every card links directly into Analyse with Einstein filters applied.
        </p>
      </header>

      <KpiStrip />
      <JourneyOverview />
      <PriorityAlerts />
    </div>
  );
}

