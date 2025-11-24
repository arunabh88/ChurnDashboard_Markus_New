'use client';

import { signalMatrix } from '@/lib/data/dashboard';
import { Card, CardContent } from '@/components/ui/Card';

export function SignalMatrix() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
              Signal matrix
            </p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Drivers across engagement, billing, sentiment and more
            </h3>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
            Einstein weighted signals
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/70">
            <thead className="bg-slate-50 dark:bg-navy-900/70">
              <tr>
                {['Dimension', 'Key Signal', 'Severity', 'Frequency', 'AI Weight'].map((header) => (
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
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700/70 dark:bg-navy-950/60">
              {signalMatrix.map((signal) => (
                <tr key={signal.column}>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {signal.column}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {signal.signal}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {signal.severity}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {signal.frequency}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {signal.weight}
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

