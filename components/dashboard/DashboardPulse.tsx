'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { AlertTriangle, Filter, LineChart, ShieldCheck, Sparkles } from 'lucide-react';

type FilterOption = 'all' | 'sports' | 'entertainment' | 'broadband';
type RegionOption = 'global' | 'emea' | 'amer' | 'apac';
type PeriodOption = '30' | '60' | '90';

const churnSeries = [
  { week: 'W1', churn: 1.8 },
  { week: 'W2', churn: 1.9 },
  { week: 'W3', churn: 1.7 },
  { week: 'W4', churn: 1.6 },
  { week: 'W5', churn: 1.55 },
  { week: 'W6', churn: 1.48 },
];

const heatmapData = [
  { segment: 'Trial', risk: 92, status: 'Critical' },
  { segment: 'New', risk: 74, status: 'High' },
  { segment: 'Established', risk: 38, status: 'Low' },
  { segment: 'Save First', risk: 81, status: 'High' },
  { segment: 'Loyal', risk: 24, status: 'Guarded' },
];

const statusStyles: Record<string, { bg: string; text: string }> = {
  Critical: { bg: 'bg-red-500/15 border-red-500/40', text: 'text-red-300' },
  High: { bg: 'bg-orange-500/15 border-orange-500/40', text: 'text-orange-300' },
  Guarded: { bg: 'bg-sky-500/15 border-sky-500/30', text: 'text-sky-300' },
  Low: { bg: 'bg-emerald-500/15 border-emerald-500/30', text: 'text-emerald-300' },
};

export function DashboardPulse() {
  const [plan, setPlan] = useState<FilterOption>('all');
  const [region, setRegion] = useState<RegionOption>('global');
  const [period, setPeriod] = useState<PeriodOption>('30');

  const projectedChurn = useMemo(() => {
    // lightweight placeholder logic for demo purposes
    const base = 1.52;
    const adjustments =
      (plan !== 'all' ? 0.05 : 0) +
      (region !== 'global' ? 0.03 : 0) +
      (period === '60' ? -0.04 : period === '90' ? -0.09 : 0);
    return {
      target: 1.45,
      projected: Number((base + adjustments).toFixed(2)),
    };
  }, [plan, region, period]);

  const activeCampaigns = useMemo(() => {
    return plan === 'all' ? 8 : 3;
  }, [plan]);

  return (
    <div className="space-y-5 rounded-2xl border border-sky-500/20 bg-navy-900/40 p-6 shadow-[0_0_30px_rgba(15,118,210,0.18)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-300 flex items-center gap-2">
            <Filter size={16} />
            Pulse Filters
          </p>
          <h3 className="text-xl font-bold text-white">Tune the view for your remit</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Narrow the dashboard to your remit before diving deeper into Analyse or Act.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={plan}
            onChange={(event) => setPlan(event.target.value as FilterOption)}
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            <option value="all">All products</option>
            <option value="sports">Sports bundle</option>
            <option value="entertainment">Entertainment</option>
            <option value="broadband">Broadband</option>
          </select>

          <select
            value={region}
            onChange={(event) => setRegion(event.target.value as RegionOption)}
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            <option value="global">Global</option>
            <option value="emea">EMEA</option>
            <option value="amer">Americas</option>
            <option value="apac">APAC</option>
          </select>

          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value as PeriodOption)}
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            <option value="30">Last 30 days</option>
            <option value="60">Last 60 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)_minmax(0,1.25fr)]">
        {/* Projected churn */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-sky-500/25 bg-gradient-to-br from-sky-950/80 via-navy-900 to-navy-950/90 p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-200 flex items-center gap-2">
                <LineChart size={16} />
                Projected churn vs. target
              </p>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-4xl font-black text-white">{projectedChurn.projected}%</span>
                <span className="text-sm text-sky-300">
                  Target <span className="font-semibold text-white">{projectedChurn.target}%</span>
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-2 text-xs text-sky-200">
              {(projectedChurn.projected - projectedChurn.target).toFixed(2)}%
              <span className="ml-1 text-gray-400">vs target</span>
            </div>
          </div>

          <div className="mt-4 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={churnSeries}>
                <defs>
                  <linearGradient id="churnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" axisLine={false} tickLine={false} stroke="#38bdf8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(56,189,248,0.4)',
                    borderRadius: '12px',
                  }}
                  cursor={{ stroke: 'rgba(56,189,248,0.3)', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="churn" stroke="#38bdf8" fill="url(#churnGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            Targeting <span className="text-sky-200 font-semibold">1.45%</span> churn by end of period. Keep campaign lift
            above <span className="text-sky-200 font-semibold">+5%</span> to stay on track.
          </p>
        </motion.div>

        {/* Segment risk grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-orange-500/25 bg-orange-950/30 p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-200 flex items-center gap-2">
              <AlertTriangle size={16} />
              Segment risk heatmap
            </p>
            <span className="rounded-full border border-orange-500/40 bg-orange-500/20 px-3 py-1 text-xs text-orange-200">
              Updated hourly
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {heatmapData.map((item) => {
              const styles = statusStyles[item.status] ?? statusStyles.Low;
              return (
                <div
                  key={item.segment}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${styles.bg} ${
                    styles.text
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide">{item.segment}</span>
                    <span className="rounded-full border border-white/30 px-2 py-0.5 text-[11px] text-white/80">
                      {item.status}
                    </span>
                  </div>
                  <span className="text-base font-semibold text-white">{item.risk}%</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Campaign summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200 flex items-center gap-2">
              <ShieldCheck size={16} />
              Campaign performance
            </p>
            <span className="text-xs text-emerald-200/80">{period}-day lookback</span>
          </div>
          <div className="mt-4 space-y-3 text-sm text-gray-200">
            <div className="flex items-baseline justify-between">
              <span className="text-gray-400">Active campaigns</span>
              <span className="text-lg font-bold text-white">{activeCampaigns}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-gray-400">At-risk value defended</span>
              <span className="text-base font-semibold text-emerald-200">$1.2M</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-gray-400">Average lift vs forecast</span>
              <span className="text-base font-semibold text-emerald-200">+7.4%</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-500/25 transition-colors"
          >
            <Sparkles size={16} />
            View impact drilldown
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

