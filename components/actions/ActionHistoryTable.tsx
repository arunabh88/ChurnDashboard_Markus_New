import { actionHistory } from '@/lib/data/dashboard';

export default function ActionHistoryTable() {
  return (
    <section
      id="action-history"
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Action history & outcomes
          </p>
          <h2 className="text-2xl font-bold text-slate-900">Measure impact and iterate</h2>
          <p className="mt-1 text-sm text-slate-600">
            Track planned and active campaigns, compare expected vs actual retention lift, and jump
            into Analyse for cohort context.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
          >
            Filters
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
          >
            Export CSV
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Action Name</th>
              <th className="px-4 py-3">Segment</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Expected vs Actual Lift</th>
              <th className="px-4 py-3">ROI</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {actionHistory.map((action) => (
              <tr key={action.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-semibold text-slate-700">{action.name}</td>
                <td className="px-4 py-4 text-slate-600">{action.segment}</td>
                <td className="px-4 py-4 text-slate-500">{action.duration}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {action.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {action.expected} → {action.actual}
                </td>
                <td className="px-4 py-4 text-slate-600">{action.roi}</td>
                <td className="px-4 py-4 text-slate-600">{action.owner}</td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
                    >
                      View in Analyse
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
                    >
                      Clone Action
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

