'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  LabelList,
} from 'recharts';
import { overviewAnalytics } from '@/lib/data/dashboard';

export default function OverviewAnalytics() {
  const formatVolume = (volume: number) =>
    Intl.NumberFormat('en-GB', {
      notation: 'compact',
    }).format(volume);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Overview analytics
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Retention trends & lifecycle breakdown
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Compare actual monthly churn vs retention percentage and understand
            how each lifecycle phase contributes to attrition.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="h-72 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overviewAnalytics.trendSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#475569" />
              <YAxis
                stroke="#475569"
                tickFormatter={(value) => `${value.toFixed(2)}%`}
              />
              <Tooltip
                formatter={(value: number) => `${value.toFixed(2)}%`}
                labelStyle={{ color: '#0f172a', fontWeight: 600 }}
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                }}
              />
              <Line
                type="monotone"
                dataKey="churn"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ stroke: '#f97316', strokeWidth: 2, r: 4 }}
                name="Monthly churn"
              />
              <Line
                type="monotone"
                dataKey="retention"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ stroke: '#0ea5e9', strokeWidth: 2, r: 4 }}
                name="Retention rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={overviewAnalytics.breakdown}
              layout="vertical"
              barSize={24}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#475569" />
              <YAxis
                dataKey="phase"
                type="category"
                stroke="#475569"
                width={110}
              />
              <Tooltip
                formatter={(value: number) => `${value}%`}
                labelStyle={{ color: '#0f172a', fontWeight: 600 }}
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                }}
              />
              <Bar
                dataKey="churn"
                name="Churn %"
                fill="#f97316"
                radius={[4, 4, 4, 4]}
              >
                <LabelList
                  dataKey="churn"
                  content={(props: any) => {
                    if (
                      typeof props.index !== 'number' ||
                      props.index >= overviewAnalytics.breakdown.length
                    ) {
                      return null;
                    }

                    const entry = overviewAnalytics.breakdown[props.index];
                    const x = (props.x ?? 0) + 8;
                    const y = (props.y ?? 0) + 6;
                    const churnValue =
                      typeof props.value === 'number'
                        ? props.value.toFixed(1)
                        : props.value;

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#475569"
                        fontSize={11}
                        alignmentBaseline="middle"
                      >
                        {churnValue}% • {formatVolume(entry.volume)} subs
                      </text>
                    );
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

