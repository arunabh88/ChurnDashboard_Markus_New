import { playbooks } from '@/lib/data/dashboard';

export default function RecommendedPlaybooks() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Recommended playbooks
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">Launch retention interventions</h2>
        <p className="mt-1 text-sm text-slate-600">
          AI-ranked playbooks ready to deploy. Tailored segments, expected lift, and ROI targets are
          surfaced below.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {playbooks.map((playbook) => (
          <div
            key={playbook.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-sky-50"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {playbook.segment}
              </p>
              <h3 className="text-lg font-bold text-slate-900">{playbook.title}</h3>
              <p className="text-sm text-slate-600">{playbook.description}</p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  Expected lift {playbook.lift}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                  Expected ROI {playbook.roi}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              Launch Playbook
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

