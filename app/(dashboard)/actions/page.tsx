import RecommendedPlaybooks from '@/components/actions/RecommendedPlaybooks';
import ActionWizard from '@/components/actions/ActionWizard';
import ActionHistoryTable from '@/components/actions/ActionHistoryTable';

export default function ActionsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Retain, Intervene, Measure
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Coordinate Sky TV retention playbooks
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Launch AI suggested interventions, configure new actions, and monitor outcomes. The
          co-pilot can draft, simulate, and trigger workflows instantly.
        </p>
      </header>

      <RecommendedPlaybooks />
      <ActionWizard />
      <ActionHistoryTable />
    </div>
  );
}

