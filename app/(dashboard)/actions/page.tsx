'use client';

import { RecommendedPlaybooks } from '@/components/actions/RecommendedPlaybooks';
import { ActionWizard } from '@/components/actions/ActionWizard';
import { ActionHistoryTable } from '@/components/actions/ActionHistoryTable';

export default function ActionsPage() {
  return (
    <div className="space-y-6">
      <header className="glass-panel rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-xl shadow-emerald-500/20">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-200">
          Retain, intervene, measure
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          Operationalise retention strategy
          <span className="ml-3 rounded-full border border-white/10 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 px-3 py-1 text-xs font-medium text-emerald-100">
            Einstein Automation
          </span>
        </h1>
        <p className="mt-3 text-sm text-slate-200/80">
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

