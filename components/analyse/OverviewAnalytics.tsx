'use client';

import { FilterBar } from '@/components/analyse/FilterBar';
import { AnalyticsOverview } from '@/components/analyse/AnalyticsOverview';
import { JourneyDeepDive } from '@/components/analyse/JourneyDeepDive';
import { SignalMatrix } from '@/components/analyse/SignalMatrix';
import { SubscriberDrilldown } from '@/components/analyse/SubscriberDrilldown';
import { ModelPerformance } from '@/components/analyse/ModelPerformance';
import { Card, CardContent } from '@/components/ui/Card';

const sections = [
  { id: 'overview', title: 'Analytics Overview', subtitle: 'Trend charts, CLTV, engagement, billing', component: AnalyticsOverview },
  { id: 'journey', title: 'Customer Journey View', subtitle: 'Full journey funnel with pond view', component: JourneyDeepDive },
  { id: 'signals', title: 'Signal Matrix', subtitle: 'Einstein weighted churn drivers', component: SignalMatrix },
  { id: 'subscribers', title: 'Subscriber Drilldown', subtitle: 'Two-pane drilldown with AI support', component: SubscriberDrilldown },
  { id: 'model', title: 'Model Performance', subtitle: 'Performance metrics and drift detection', component: ModelPerformance },
];

export function OverviewAnalytics() {
  return (
    <div className="space-y-6">
      <FilterBar />

      <div className="space-y-4">
        {sections.map((section) => {
          const SectionComponent = section.component;

          return (
            <Card key={section.id}>
              <div className="px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {section.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{section.subtitle}</p>
              </div>
              <CardContent className="space-y-6 pt-0">
                <SectionComponent />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

