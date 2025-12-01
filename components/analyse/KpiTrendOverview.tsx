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

interface KpiTrendOverviewProps {
  onFilterChange?: (filters: { region: string; plan: string; device: string; acquisition: string; range: string }) => void;
}

type FilterKey = 'region' | 'plan' | 'device' | 'acquisition' | 'range';

const PLAN_CHURN_DELTA_MAP: Record<string, number> = {
  'All plans': 0,
  Sports: 0.15,
  Entertainment: -0.08,
  Broadband: 0.05,
};

const REGION_CHURN_DELTA_MAP: Record<string, number> = {
  Global: 0,
  EMEA: 0.04,
  Americas: 0.02,
  APAC: -0.03,
};

const RANGE_CHURN_DELTA_MAP: Record<string, number> = {
  '90 days': -0.06,
  '60 days': -0.02,
  '30 days': 0.04,
  '7 days': 0.08,
};

const ACQUISITION_CHURN_DELTA_MAP: Record<string, number> = {
  'All sources': 0,
  Paid: 0.06,
  Organic: -0.04,
  Partner: 0.02,
};

const DEVICE_CHURN_DELTA_MAP: Record<string, number> = {
  'All devices': 0,
  Mobile: 0.03,
  CTV: -0.02,
  Web: -0.01,
};

const PLAN_SEGMENT_DELTA_MAP: Record<string, Partial<Record<string, number>>> = {
  Sports: { Trial: 1, New: 0.4, Established: 0.1, 'Save First': 0.3 },
  Entertainment: { Trial: -0.3, New: -0.1 },
  Broadband: { Trial: 0.2, Established: -0.2 },
};

const REGION_SEGMENT_DELTA_MAP: Record<string, number> = {
  Global: 0,
  EMEA: 0.1,
  Americas: 0.05,
  APAC: -0.08,
};

const RANGE_SEGMENT_DELTA_MAP: Record<string, number> = {
  '90 days': -0.05,
  '60 days': -0.02,
  '30 days': 0.08,
  '7 days': 0.12,
};

const PLAN_CLTV_DELTA_MAP: Record<string, number> = {
  'All plans': 0,
  Sports: 18,
  Entertainment: 6,
  Broadband: 10,
};

const ACQUISITION_CLTV_DELTA_MAP: Record<string, number> = {
  'All sources': 0,
  Paid: 22,
  Organic: -14,
  Partner: 12,
};

const PLAN_CAC_DELTA_MAP: Record<string, number> = {
  'All plans': 0,
  Sports: 4,
  Entertainment: 2,
  Broadband: 3,
};

const ACQUISITION_CAC_DELTA_MAP: Record<string, number> = {
  'All sources': 0,
  Paid: 7,
  Organic: -5,
  Partner: 3,
};

const DEVICE_ENGAGEMENT_DELTA_MAP: Record<string, number> = {
  'All devices': 0,
  Mobile: 2,
  CTV: -1,
  Web: -0.5,
};

const RANGE_ENGAGEMENT_DELTA_MAP: Record<string, number> = {
  '90 days': -1,
  '60 days': -0.5,
  '30 days': 0.6,
  '7 days': 1.1,
};

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

  const [selectedFilters, setSelectedFilters] = useState<Record<FilterKey, string>>(() => ({
    region: filters.region[0],
    plan: filters.plan[0],
    device: filters.device[0],
    acquisition: filters.acquisition[0],
    range: filters.range[0],
  }));

  const { region, plan, device, acquisition, range } = selectedFilters;

  const handleChange = (key: FilterKey, value: string) => {
    setSelectedFilters((prev) => {
      if (prev[key] === value) return prev;
      const next = { ...prev, [key]: value };
      onFilterChange?.({
        region: next.region,
        plan: next.plan,
        device: next.device,
        acquisition: next.acquisition,
        range: next.range,
      });
      return next;
    });
  };

  const summaryLabel = useMemo(
    () => `${region} · ${plan} · ${device} · ${acquisition} · ${range}`,
    [region, plan, device, acquisition, range]
  );

  const planChurnDeltaMap: Record<string, number> = {
    'All plans': 0,
    Sports: 0.15,
    Entertainment: -0.08,
    Broadband: 0.05,
  };

  const regionChurnDeltaMap: Record<string, number> = {
    Global: 0,
    EMEA: 0.04,
    Americas: 0.02,
    APAC: -0.03,
  };

  const rangeChurnDeltaMap: Record<string, number> = {
    '90 days': -0.06,
    '60 days': -0.02,
    '30 days': 0.04,
    '7 days': 0.08,
  };

  const acquisitionChurnDeltaMap: Record<string, number> = {
    'All sources': 0,
    Paid: 0.06,
    Organic: -0.04,
    Partner: 0.02,
  };

  const deviceChurnDeltaMap: Record<string, number> = {
    'All devices': 0,
    Mobile: 0.03,
    CTV: -0.02,
    Web: -0.01,
  };

  const adjustedChurnTrend = useMemo(() => {
    const totalDelta =
      (PLAN_CHURN_DELTA_MAP[plan] ?? 0) +
      (REGION_CHURN_DELTA_MAP[region] ?? 0) +
      (RANGE_CHURN_DELTA_MAP[range] ?? 0) +
      (ACQUISITION_CHURN_DELTA_MAP[acquisition] ?? 0);
    const deviceDelta = DEVICE_CHURN_DELTA_MAP[device] ?? 0;

    return churnTrend.map((point, index) => {
      const progressive = ((index + 1) / churnTrend.length) * deviceDelta;
      const churnValue = Number(Math.max(0, point.churn + totalDelta + progressive).toFixed(2));
      const targetValue = Number(Math.max(0, point.target + totalDelta * 0.6).toFixed(2));
      return {
        ...point,
        churn: churnValue,
        target: targetValue,
      };
    });
  }, [plan, region, range, acquisition, device]);

  const adjustedSegmentTrend = useMemo(() => {
    return segmentTrend.map((row) => {
      const planDelta = PLAN_SEGMENT_DELTA_MAP[plan]?.[row.segment] ?? 0;
      const regionDelta = REGION_SEGMENT_DELTA_MAP[region] ?? 0;
      const rangeDelta = RANGE_SEGMENT_DELTA_MAP[range] ?? 0;
      const value = Number(Math.max(0, row.churn + planDelta + regionDelta + rangeDelta).toFixed(1));
      return {
        ...row,
        churn: value,
      };
    });
  }, [plan, region, range]);

  const adjustedCltvTrend = useMemo(() => {
    const cltvDelta = (PLAN_CLTV_DELTA_MAP[plan] ?? 0) + (ACQUISITION_CLTV_DELTA_MAP[acquisition] ?? 0);
    const cacDelta = (PLAN_CAC_DELTA_MAP[plan] ?? 0) + (ACQUISITION_CAC_DELTA_MAP[acquisition] ?? 0);

    return cltvTrend.map((row, index) => {
      const cadence = index * 2;
      return {
        ...row,
        cltv: Math.max(0, Math.round(row.cltv + cltvDelta + cadence)),
        cac: Math.max(0, Math.round(row.cac + cacDelta + cadence * 0.4)),
      };
    });
  }, [plan, acquisition]);

  const adjustedEngagementTrend = useMemo(() => {
    const deviceDelta = DEVICE_ENGAGEMENT_DELTA_MAP[device] ?? 0;
    const rangeDelta = RANGE_ENGAGEMENT_DELTA_MAP[range] ?? 0;

    return engagementTrend.map((item, index) => {
      const seasonal = index % 2 === 0 ? 0.4 : -0.2;
      const dropValue = Math.max(0, Math.round((item.drop + deviceDelta + rangeDelta + seasonal) * 10) / 10);
      return {
        ...item,
        drop: dropValue,
      };
    });
  }, [device, range]);

  return (
    <div className="glass-card space-y-6 rounded-2xl border border-sky-500/30 p-6 shadow-[0_18px_40px_rgba(8,47,73,0.28)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">KPI & Trend Overview</p>
          <p className="mt-1 text-sm text-gray-400">
            Compare churn, segment health, and value trends with consistent filters before drilling into cohorts.
          </p>
          <p className="text-xs text-sky-200/80 mt-2">Viewing: {summaryLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={region}
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
            value={plan}
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
            value={device}
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
            value={acquisition}
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
            value={range}
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
              <AreaChart data={adjustedChurnTrend}>
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
            {adjustedSegmentTrend.map((row) => (
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
              <AreaChart data={adjustedCltvTrend}>
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
            {adjustedEngagementTrend.map((item) => (
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

