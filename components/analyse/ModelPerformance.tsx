'use client';

import { modelPerformance } from '@/lib/data/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const chartData = [
  { month: 'Jan', actual: 1.08, predicted: 1.12 },
  { month: 'Feb', actual: 1.04, predicted: 1.06 },
  { month: 'Mar', actual: 0.99, predicted: 1.01 },
  { month: 'Apr', actual: 0.93, predicted: 0.95 },
  { month: 'May', actual: 0.91, predicted: 0.92 },
  { month: 'Jun', actual: 0.89, predicted: 0.9 },
];

export function ModelPerformance() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
              Model performance
            </p>
            <h3 className="text-lg font-semibold text-slate-900">Real vs predicted churn</h3>
          </div>
          <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Drift Monitor • Sentiment signals flagged
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {modelPerformance.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {metric.label}
              </p>
              <p className="text-xl font-semibold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="actual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #bae6fd' }} />
              <Legend />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#22c55e"
                fill="url(#actual)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#0ea5e9"
                fill="url(#predicted)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm font-medium text-amber-700">
          {modelPerformance.message}
        </div>
      </CardContent>
    </Card>
  );
}

