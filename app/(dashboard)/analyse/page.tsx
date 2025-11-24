import FilterBar from '@/components/analyse/FilterBar';
import AnalyticsOverview from '@/components/analyse/AnalyticsOverview';
import JourneyDeepDive from '@/components/analyse/JourneyDeepDive';
import SignalMatrix from '@/components/analyse/SignalMatrix';
import SubscriberDrilldown from '@/components/analyse/SubscriberDrilldown';
import ModelPerformance from '@/components/analyse/ModelPerformance';

export default function AnalysePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Deep Dive & Diagnostics
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Analyse churn drivers across the Sky TV lifecycle
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Drill into journey stages, signals, segments, and individual subscribers. Apply filters,
          compare metrics, and leverage the AI Co-Pilot to uncover insights faster.
        </p>
      </header>

      <FilterBar />
      <AnalyticsOverview />
      <JourneyDeepDive />
      <SignalMatrix />
      <SubscriberDrilldown />
      <ModelPerformance />
    </div>
  );
}

