'use client';

import { KpiStrip } from '@/components/home/KpiStrip';
import { JourneySummary } from '@/components/home/JourneySummary';
import { AttentionAlerts } from '@/components/home/AttentionAlerts';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <KpiStrip />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <JourneySummary />
        <div className="space-y-6">
          <AttentionAlerts />
        </div>
      </div>
    </div>
  );
}

