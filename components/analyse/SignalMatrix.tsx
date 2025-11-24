import { signalMatrix } from '@/lib/data/dashboard';

export default function SignalMatrix() {
  return (
    <section
      id="signal-matrix"
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Signal matrix
        </p>
        <h2 className="text-2xl font-bold text-slate-900">AI-weighted churn drivers</h2>
        <p className="mt-1 text-sm text-slate-600">
          Columns highlight signal severity, frequency, and Einstein weights. Focus on high severity
          and high frequency intersections.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Signal Column</th>
              <th className="px-4 py-3">Key Signal</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Frequency</th>
              <th className="px-4 py-3 text-right">AI Weight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {signalMatrix.map((row) => (
              <tr key={row.column} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-semibold text-slate-700">{row.column}</td>
                <td className="px-4 py-4 text-slate-600">{row.signal}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {row.severity}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-600">{row.frequency}</td>
                <td className="px-4 py-4 text-right text-slate-600">{row.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

