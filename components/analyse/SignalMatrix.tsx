import { signalMatrix } from '@/lib/data/dashboard';

export default function SignalMatrix() {
  return (
    <section
      id="signal-matrix"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Multi-signal matrix
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Understand the drivers behind churn
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Einstein weights signals daily. Prioritise columns with high severity
          and weight to design interventions.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Signal Column</th>
              <th className="px-4 py-3">Key Signal</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Weight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {signalMatrix.map((signal) => (
              <tr key={signal.column} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-semibold text-slate-700">
                  {signal.column}
                </td>
                <td className="px-4 py-4 text-slate-600">{signal.signal}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {signal.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-slate-600">
                  {signal.weight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

