'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import { analyticsTrend, segmentBreakdown } from '@/lib/data/dashboard';

export default function AnalyticsOverview() {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Analytics overview
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">Churn, value, and engagement</h2>
        <p className="mt-1 text-sm text-slate-600">
          Trend lines highlight churn vs CLTV while the breakdown compares segment volume and churn
          rate.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
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
                name="Churn %"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ stroke: '#f97316', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="cltv"
                name="CLTV (£)"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ stroke: '#0ea5e9', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segmentBreakdown} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#475569" />
              <YAxis dataKey="segment" type="category" stroke="#475569" width={110} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#fff',
                }}
              />
              <Bar dataKey="volume" name="Volume" fill="#38bdf8" radius={[4, 4, 4, 4]} />
              <Bar dataKey="churn" name="Churn %" fill="#f97316" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

