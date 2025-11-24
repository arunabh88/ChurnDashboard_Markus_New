'use client';

import { RecommendedPlaybooks } from '@/components/actions/RecommendedPlaybooks';
import { ActionWizard } from '@/components/actions/ActionWizard';
import { ActionHistoryTable } from '@/components/actions/ActionHistoryTable';

export default function ActionsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Retain, intervene, measure
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Operationalise retention strategy</h1>
        <p className="text-sm text-slate-600">
          Launch Einstein-recommended playbooks, configure interventions, and track outcomes across
          loyalty, onboarding, playlist re-engagement, and ad-supported downgrades.
        </p>
      </header>

      <RecommendedPlaybooks />
      <ActionWizard />
      <ActionHistoryTable />
    </div>
  );
}

