'use client';

import { actionHistory } from '@/lib/data/dashboard';
import { Card, CardContent } from '@/components/ui/Card';

export function ActionHistoryTable() {
  return (
    <Card className="border border-slate-200 bg-white dark:border-slate-600 dark:bg-navy-900/70">
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
              Action history & outcomes
            </p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Monitor retention impact across playbooks
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 focus:border-sky-200 focus:outline-none dark:border-slate-600 dark:bg-navy-900/80 dark:text-slate-200">
              <option>Status</option>
              <option>Completed</option>
              <option>Active</option>
              <option>Planned</option>
            </select>
            <select className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 focus:border-sky-200 focus:outline-none dark:border-slate-600 dark:bg-navy-900/80 dark:text-slate-200">
              <option>Owner</option>
              <option>Amelia Turner</option>
              <option>Nina Brooks</option>
              <option>Deepak Rao</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-600">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-600/70">
            <thead className="bg-slate-50 dark:bg-navy-900/70">
              <tr>
                {[
                  'Action Name',
                  'Segment',
                  'Duration',
                  'Status',
                  'Expected vs Actual Lift',
                  'ROI',
                  'Owner',
                ].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-600/70 dark:bg-navy-950/60">
              {actionHistory.map((action) => (
                <tr key={action.id}>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {action.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {action.segment}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {action.duration}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {action.status}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {action.expected} vs {action.actual}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {action.roi}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {action.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

