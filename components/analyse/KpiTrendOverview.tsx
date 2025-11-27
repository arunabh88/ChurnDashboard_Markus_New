'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
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

interface KpiTrendOverviewProps {
  onFilterChange?: (filters: { region: string; plan: string; device: string; acquisition: string; range: string }) => void;
}

const churnTrend = [
  { month: 'Nov', churn: 1.9, target: 1.7 },
  { month: 'Dec', churn: 1.8, target: 1.65 },
  { month: 'Jan', churn: 1.7, target: 1.6 },
  { month: 'Feb', churn: 1.55, target: 1.55 },
  { month: 'Mar', churn: 1.52, target: 1.5 },
];

const segmentTrend = [
  { segment: 'Trial', churn: 6.2 },
  { segment: 'New', churn: 2.1 },
  { segment: 'Established', churn: 0.9 },
  { segment: 'Save First', churn: 3.8 },
];

const cltvTrend = [
  { month: 'Nov', cltv: 422, cac: 128 },
  { month: 'Dec', cltv: 438, cac: 130 },
  { month: 'Jan', cltv: 452, cac: 132 },
  { month: 'Feb', cltv: 461, cac: 134 },
  { month: 'Mar', cltv: 468, cac: 136 },
];

const engagementTrend = [
  { week: 'W1', drop: 11 },
  { week: 'W2', drop: 10 },
  { week: 'W3', drop: 13 },
  { week: 'W4', drop: 9 },
  { week: 'W5', drop: 8 },
];

export function KpiTrendOverview({ onFilterChange }: KpiTrendOverviewProps) {
  const filters = useMemo(
    () => ({
      region: ['Global', 'EMEA', 'Americas', 'APAC'],
      plan: ['All plans', 'Sports', 'Entertainment', 'Broadband'],
      device: ['All devices', 'Mobile', 'CTV', 'Web'],
      acquisition: ['All sources', 'Paid', 'Organic', 'Partner'],
      range: ['90 days', '60 days', '30 days', '7 days'],
    }),
    []
  );

  const handleChange = (key: keyof typeof filters, value: string) => {
    onFilterChange?.({
      region: key === 'region' ? value : filters.region[0],
      plan: key === 'plan' ? value : filters.plan[0],
      device: key === 'device' ? value : filters.device[0],
      acquisition: key === 'acquisition' ? value : filters.acquisition[0],
      range: key === 'range' ? value : filters.range[0],
    });
  };

  return (
    <div className="space-y-6 rounded-2xl border border-sky-500/20 bg-navy-900/40 p-6 shadow-[0_0_32px_rgba(56,189,248,0.12)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">KPI & Trend Overview</p>
          <p className="text-xs text-gray-400 mt-1">
            Compare churn, segment health, and value trends with consistent filters before drilling into cohorts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('region', event.target.value)}
          >
            {filters.region.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('plan', event.target.value)}
          >
            {filters.plan.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('device', event.target.value)}
          >
            {filters.device.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('acquisition', event.target.value)}
          >
            {filters.acquisition.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('range', event.target.value)}
          >
            {filters.range.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-sky-500/15 bg-sky-500/10 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-200 mb-3">Churn vs target</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={churnTrend}>
                <defs>
                  <linearGradient id="churnActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="churnTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(56,189,248,0.35)',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="churn" name="Actual" stroke="#38bdf8" fill="url(#churnActual)" strokeWidth={2} />
                <Area type="monotone" dataKey="target" name="Target" stroke="#22c55e" fill="url(#churnTarget)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-sky-500/15 bg-sky-500/10 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-200 mb-3">Segment churn snapshot</p>
          <div className="space-y-3">
            {segmentTrend.map((row) => (
              <div key={row.segment} className="rounded-lg border border-sky-500/15 bg-sky-500/10 px-3 py-2">
                <div className="flex items-center justify-between text-sm text-white">
                  <span>{row.segment}</span>
                  <span className="font-semibold">{row.churn.toFixed(1)}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-sky-950">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-500"
                    style={{ width: `${Math.min(100, row.churn * 12)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-sky-500/15 bg-sky-500/10 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-200 mb-3">CLTV vs CAC</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cltvTrend}>
                <defs>
                  <linearGradient id="cltvLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cacLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(59,130,246,0.35)',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="cltv" name="CLTV" stroke="#f97316" fill="url(#cltvLine)" strokeWidth={2} />
                <Area type="monotone" dataKey="cac" name="CAC" stroke="#38bdf8" fill="url(#cacLine)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-sky-500/15 bg-sky-500/10 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-200 mb-3">Engagement drop (hours streamed)</p>
          <div className="space-y-2">
            {engagementTrend.map((item) => (
              <div key={item.week} className="flex items-center justify-between text-xs text-gray-300">
                <span className="text-white font-semibold">{item.week}</span>
                <div className="relative w-3/4 rounded-full bg-sky-950 h-1.5">
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-sky-500"
                    style={{ width: `${item.drop * 4}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sky-200">{item.drop}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

