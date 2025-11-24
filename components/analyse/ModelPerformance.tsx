'use client';

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { analyticsTrend, modelPerformance } from '@/lib/data/dashboard';

export default function ModelPerformance() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Model performance
          </p>
          <h2 className="text-2xl font-bold text-slate-900">Real vs predicted churn</h2>
          <p className="mt-1 text-sm text-slate-600">
            Compare actual churn against the Einstein predictions. Monitor drift to trigger
            re-training.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
        >
          Retrain Model
        </button>
      </header>

      <div className="h-72 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#475569" />
            <YAxis stroke="#475569" />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                backgroundColor: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="churn"
              name="Real churn"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ stroke: '#f97316', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey={(entry) => entry.churn * 0.95}
              name="Predicted churn"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ stroke: '#38bdf8', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {modelPerformance.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {metric.label}
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
        <span className="font-semibold">AI Alert:</span>
        <p>{modelPerformance.message}</p>
      </div>
    </section>
  );
}

