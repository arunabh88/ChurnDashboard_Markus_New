import RecommendedPlaybooks from '@/components/actions/RecommendedPlaybooks';
import ActionHistoryTable from '@/components/actions/ActionHistoryTable';

export default function ActionsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Actions
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Orchestrate retention playbooks and workflows
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Launch AI-suggested playbooks, track in-flight campaigns, and learn
          from historical outcomes. Every action can deep-link into Analyse for
          segment context.
        </p>
      </header>

      <RecommendedPlaybooks />
      <ActionHistoryTable />
    </div>
  );
}

