import GlobalFilters from '@/components/analyse/GlobalFilters';
import OverviewAnalytics from '@/components/analyse/OverviewAnalytics';
import JourneyDeepDive from '@/components/analyse/JourneyDeepDive';
import SignalMatrix from '@/components/analyse/SignalMatrix';
import ModelVsReal from '@/components/analyse/ModelVsReal';

export default function AnalysePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Analyse
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Deep dive into churn journey, signals, and models
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Explore how Sky TV subscribers progress from trial to retention pond,
          inspect multi-signal drivers, and monitor Einstein model accuracy
          against realised churn.
        </p>
      </header>

      <GlobalFilters />
      <OverviewAnalytics />
      <JourneyDeepDive />
      <SignalMatrix />
      <ModelVsReal />
    </div>
  );
}

