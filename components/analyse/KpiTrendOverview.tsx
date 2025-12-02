'use client';

import { useMemo, useState } from 'react';
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

// Base data - will be filtered/transformed based on selected filters
const baseChurnTrend = [
  { month: 'Nov', churn: 1.9, target: 1.7 },
  { month: 'Dec', churn: 1.8, target: 1.65 },
  { month: 'Jan', churn: 1.7, target: 1.6 },
  { month: 'Feb', churn: 1.55, target: 1.55 },
  { month: 'Mar', churn: 1.52, target: 1.5 },
];

const baseSegmentTrend = [
  { segment: 'Trial', churn: 6.2 },
  { segment: 'New', churn: 2.1 },
  { segment: 'Established', churn: 0.9 },
  { segment: 'Save First', churn: 3.8 },
];

const baseCltvTrend = [
  { month: 'Nov', cltv: 422, cac: 128 },
  { month: 'Dec', cltv: 438, cac: 130 },
  { month: 'Jan', cltv: 452, cac: 132 },
  { month: 'Feb', cltv: 461, cac: 134 },
  { month: 'Mar', cltv: 468, cac: 136 },
];

const baseEngagementTrend = [
  { week: 'W1', drop: 11 },
  { week: 'W2', drop: 10 },
  { week: 'W3', drop: 13 },
  { week: 'W4', drop: 9 },
  { week: 'W5', drop: 8 },
];

// Filter multipliers to simulate different data based on filters
const getFilterMultiplier = (
  region: string,
  plan: string,
  device: string,
  acquisition: string,
  range: string
) => {
  let multiplier = 1;

  // Region adjustments
  if (region === 'EMEA') multiplier *= 1.1;
  if (region === 'Americas') multiplier *= 0.95;
  if (region === 'APAC') multiplier *= 1.15;

  // Plan adjustments
  if (plan === 'Sports') multiplier *= 1.2;
  if (plan === 'Entertainment') multiplier *= 0.9;
  if (plan === 'Broadband') multiplier *= 1.05;

  // Device adjustments
  if (device === 'Mobile') multiplier *= 1.1;
  if (device === 'CTV') multiplier *= 0.85;
  if (device === 'Web') multiplier *= 1.05;

  // Acquisition adjustments
  if (acquisition === 'Paid') multiplier *= 1.15;
  if (acquisition === 'Organic') multiplier *= 0.9;
  if (acquisition === 'Partner') multiplier *= 1.05;

  // Range adjustments (affects data points shown)
  if (range === '7 days') multiplier *= 1.3;
  if (range === '30 days') multiplier *= 1.15;
  if (range === '60 days') multiplier *= 1.05;

  return multiplier;
};

export function KpiTrendOverview({ onFilterChange }: KpiTrendOverviewProps) {
  const [selectedFilters, setSelectedFilters] = useState({
    region: 'Global',
    plan: 'All plans',
    device: 'All devices',
    acquisition: 'All sources',
    range: '90 days',
  });

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

  const handleChange = (key: keyof typeof selectedFilters, value: string) => {
    const newFilters = { ...selectedFilters, [key]: value };
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  // Calculate filtered data based on selected filters
  const filteredData = useMemo(() => {
    const multiplier = getFilterMultiplier(
      selectedFilters.region,
      selectedFilters.plan,
      selectedFilters.device,
      selectedFilters.acquisition,
      selectedFilters.range
    );

    // Determine how many data points to show based on range
    let dataPoints = 5;
    if (selectedFilters.range === '7 days') dataPoints = 2;
    else if (selectedFilters.range === '30 days') dataPoints = 3;
    else if (selectedFilters.range === '60 days') dataPoints = 4;

    // Filter churn trend data
    const churnTrend = baseChurnTrend
      .slice(-dataPoints)
      .map((item) => ({
        ...item,
        churn: Number((item.churn * multiplier).toFixed(2)),
        target: Number((item.target * (multiplier * 0.95)).toFixed(2)),
      }));

    // Filter segment trend data
    const segmentTrend = baseSegmentTrend.map((item) => ({
      ...item,
      churn: Number((item.churn * multiplier).toFixed(1)),
    }));

    // Filter CLTV trend data
    const cltvTrend = baseCltvTrend.slice(-dataPoints).map((item) => ({
      ...item,
      cltv: Number((item.cltv * multiplier).toFixed(0)),
      cac: Number((item.cac * (multiplier * 0.8)).toFixed(0)),
    }));

    // Filter engagement trend data
    const engagementTrend = baseEngagementTrend
      .slice(-dataPoints)
      .map((item) => ({
        ...item,
        drop: Number((item.drop * multiplier).toFixed(0)),
      }));

    return {
      churnTrend,
      segmentTrend,
      cltvTrend,
      engagementTrend,
    };
  }, [selectedFilters]);

  return (
    <div className="glass-card space-y-6 rounded-2xl border border-sky-500/30 p-6 shadow-[0_18px_40px_rgba(8,47,73,0.28)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">KPI & Trend Overview</h2>
          <p className="text-gray-400">
            Compare churn, segment health, and value trends with consistent filters before drilling into cohorts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedFilters.region}
            className="rounded-lg border border-sky-500/30 bg-navy-900/60 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('region', event.target.value)}
          >
            {filters.region.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={selectedFilters.plan}
            className="rounded-lg border border-sky-500/30 bg-navy-900/60 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('plan', event.target.value)}
          >
            {filters.plan.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={selectedFilters.device}
            className="rounded-lg border border-sky-500/30 bg-navy-900/60 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('device', event.target.value)}
          >
            {filters.device.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={selectedFilters.acquisition}
            className="rounded-lg border border-sky-500/30 bg-navy-900/60 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('acquisition', event.target.value)}
          >
            {filters.acquisition.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={selectedFilters.range}
            className="rounded-lg border border-sky-500/30 bg-navy-900/60 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            onChange={(event) => handleChange('range', event.target.value)}
          >
            {filters.range.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4 shadow-[0_10px_24px_rgba(15,118,210,0.18)]"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-200">Churn vs target</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData.churnTrend}>
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
          className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4 shadow-[0_10px_24px_rgba(15,118,210,0.18)]"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-200">Segment churn snapshot</p>
          <div className="space-y-3">
            {filteredData.segmentTrend.map((row) => (
              <div key={row.segment} className="rounded-lg border border-sky-500/20 bg-navy-900/70 px-3 py-2">
                <div className="flex items-center justify-between text-sm text-white">
                  <span>{row.segment}</span>
                  <span className="font-semibold">{row.churn.toFixed(1)}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-900/70">
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
          className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4 shadow-[0_10px_24px_rgba(15,118,210,0.18)]"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-200">CLTV vs CAC</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData.cltvTrend}>
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
          className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4 shadow-[0_10px_24px_rgba(15,118,210,0.18)]"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-200">Engagement drop (hours streamed)</p>
          <div className="space-y-2">
            {filteredData.engagementTrend.map((item) => (
              <div key={item.week} className="flex items-center justify-between text-xs text-gray-300">
                <span className="text-white font-semibold">{item.week}</span>
                <div className="relative h-1.5 w-3/4 rounded-full bg-slate-900/70">
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

