import KpiStrip from '@/components/home/KpiStrip';
import AttentionAlerts from '@/components/home/AttentionAlerts';
import JourneySummary from '@/components/home/JourneySummary';
import FullJourney from '@/components/home/FullJourney';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Pulse & Priorities
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Sky TV Subscriber Retention Dashboard
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Monitor critical KPIs, understand the fast-moving journey signals, and
          take action on the riskiest segments. Every tile links into the Analyse
          workspace with Einstein filters pre-applied.
        </p>
      </header>

      <KpiStrip />
      <JourneySummary />
      <FullJourney />
      <AttentionAlerts />
    </div>
  );
}

