import Link from 'next/link';
import { actionHistory } from '@/lib/data/dashboard';
import { Copy, ExternalLink } from 'lucide-react';

const timeFilters = ['Last 30 days', 'Last 90 days', 'Year to date'];
const segmentFilters = ['All segments', 'High CLTV', 'Trial', 'Price Sensitive'];
const ownerFilters = ['All owners', 'Amelia Turner', 'Deepak Rao', 'Nina Brooks'];
const playbookFilters = ['All playbooks', 'Discount', 'Playlist', 'Downgrade'];

export default function ActionHistoryTable() {
  return (
    <section
      id="action-history"
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Action history & outcomes
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Track performance and learnings
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Monitor active and completed retention initiatives, compare expected
            versus actual lift, and jump back into Analyse for deeper context.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <FilterSelect label="Time range" options={timeFilters} />
        <FilterSelect label="Segment" options={segmentFilters} />
        <FilterSelect label="Owner" options={ownerFilters} />
        <FilterSelect label="Playbook type" options={playbookFilters} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Action name</th>
              <th className="px-4 py-3">Segment</th>
              <th className="px-4 py-3">Dates</th>
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
                <td className="px-4 py-4 font-semibold text-slate-700">
                  {action.name}
                </td>
                <td className="px-4 py-4 text-slate-600">{action.segment}</td>
                <td className="px-4 py-4 text-slate-500">
                  {action.start} → {action.end}
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {action.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {action.expectedLift} → {action.actualLift}
                </td>
                <td className="px-4 py-4 text-slate-600">{action.roi}</td>
                <td className="px-4 py-4 text-slate-600">{action.owner}</td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href="/analyse?view=segments"
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
                    >
                      <ExternalLink size={14} />
                      View Segment
                    </Link>
                    <Link
                      href={`/actions?clone=${action.id}`}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
                    >
                      <Copy size={14} />
                      Clone Action
                    </Link>
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

function FilterSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
      {label}
      <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

