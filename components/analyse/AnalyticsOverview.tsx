'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { analyticsTrend, segmentBreakdown } from '@/lib/data/dashboard';
import { Card, CardContent } from '@/components/ui/Card';

export function AnalyticsOverview() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
              Trendline
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              Churn, CLTV, Engagement, Billing issues
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #bae6fd' }} />
                <Legend />
                <Line type="monotone" dataKey="churn" stroke="#0284c7" strokeWidth={2} />
                <Line type="monotone" dataKey="cltv" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="engagement" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="billing" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
              Segment breakdown
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              Trial vs New vs Established cohorts
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="segment" stroke="#94a3b8" />
                <YAxis yAxisId="left" orientation="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #bae6fd' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="volume" fill="#38bdf8" name="Volume" radius={12} />
                <Bar yAxisId="right" dataKey="churn" fill="#fb7185" name="Churn %" radius={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

