'use client';

import { JourneyFunnel } from '@/components/JourneyFunnel';
import { Card, CardContent } from '@/components/ui/Card';

export function JourneyDeepDive() {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
              Customer journey view
            </p>
            <h3 className="text-lg font-semibold text-slate-800">
              Segment sizes, conversions, and churn hotspots
            </h3>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-300/60 hover:text-sky-600"
          >
            View segment profile
          </button>
        </div>

        <JourneyFunnel />
      </CardContent>
    </Card>
  );
}

