'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterBar } from '@/components/analyse/FilterBar';
import { AnalyticsOverview } from '@/components/analyse/AnalyticsOverview';
import { JourneyDeepDive } from '@/components/analyse/JourneyDeepDive';
import { SignalMatrix } from '@/components/analyse/SignalMatrix';
import { SubscriberDrilldown } from '@/components/analyse/SubscriberDrilldown';
import { ModelPerformance } from '@/components/analyse/ModelPerformance';
import { Card, CardContent } from '@/components/ui/Card';

const sections = [
  { id: 'overview', title: 'Analytics Overview', component: AnalyticsOverview },
  { id: 'journey', title: 'Customer Journey View', component: JourneyDeepDive },
  { id: 'signals', title: 'Signal Matrix', component: SignalMatrix },
  { id: 'subscribers', title: 'Subscriber Drilldown', component: SubscriberDrilldown },
  { id: 'model', title: 'Model Performance', component: ModelPerformance },
];

export function OverviewAnalytics() {
  const [openSection, setOpenSection] = useState('overview');

  return (
    <div className="space-y-6">
      <FilterBar />

      <div className="space-y-4">
        {sections.map((section) => {
          const SectionComponent = section.component;
          const expanded = openSection === section.id;

          return (
            <Card key={section.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenSection(expanded ? '' : section.id)}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {section.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {section.id === 'overview' && 'Trend charts, CLTV, engagement, billing'}
                    {section.id === 'journey' && 'Full journey funnel with pond view'}
                    {section.id === 'signals' && 'Einstein weighted churn drivers'}
                    {section.id === 'subscribers' && 'Two-pane drilldown with AI support'}
                    {section.id === 'model' && 'Performance metrics and drift detection'}
                  </p>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-slate-500 transition dark:text-slate-400 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expanded && (
                <CardContent className="space-y-6 pt-0">
                  <SectionComponent />
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

