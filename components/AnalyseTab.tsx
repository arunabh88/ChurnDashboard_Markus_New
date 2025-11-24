'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts';
import {
  FlaskConical,
  Layers3,
  Gauge,
  CalendarClock,
} from 'lucide-react';

type RangeKey = '30d' | '90d' | '1y';

const ranges: { id: RangeKey; label: string }[] = [
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: '1y', label: 'Last 1 Year' },
];

const churnDriversByRange: Record<
  RangeKey,
  { driver: string; trial: number; new: number; established: number }[]
> = {
  '30d': [
    { driver: 'Onboarding Confusion', trial: 36, new: 12, established: 4 },
    { driver: 'Drop in Engagement', trial: 18, new: 28, established: 9 },
    { driver: 'Content Gap', trial: 12, new: 20, established: 8 },
    { driver: 'Competitive Offer', trial: 6, new: 10, established: 18 },
    { driver: 'Technical Friction', trial: 28, new: 14, established: 6 },
  ],
  '90d': [
    { driver: 'Onboarding Confusion', trial: 32, new: 16, established: 6 },
    { driver: 'Drop in Engagement', trial: 20, new: 30, established: 10 },
    { driver: 'Content Gap', trial: 14, new: 24, established: 10 },
    { driver: 'Competitive Offer', trial: 8, new: 12, established: 22 },
    { driver: 'Technical Friction', trial: 22, new: 16, established: 8 },
  ],
  '1y': [
    { driver: 'Onboarding Confusion', trial: 28, new: 14, established: 8 },
    { driver: 'Drop in Engagement', trial: 18, new: 32, established: 12 },
    { driver: 'Content Gap', trial: 16, new: 26, established: 12 },
    { driver: 'Competitive Offer', trial: 10, new: 16, established: 24 },
    { driver: 'Technical Friction', trial: 20, new: 18, established: 10 },
  ],
};

const cohortSeriesByRange: Record<
  RangeKey,
  { month: string; q1Retention: number; q2Retention: number }[]
> = {
  '30d': Array.from({ length: 6 }).map((_, index) => {
    const month = index + 1;
    return {
      month: `M${month}`,
      q1Retention: 92 - month * 3,
      q2Retention: 94 - month * 2.5,
    };
  }),
  '90d': Array.from({ length: 9 }).map((_, index) => {
    const month = index + 1;
    return {
      month: `M${month}`,
      q1Retention: Math.max(70, 94 - month * 2.6),
      q2Retention: Math.max(74, 95 - month * 2.1),
    };
  }),
  '1y': Array.from({ length: 12 }).map((_, index) => {
    const month = index + 1;
    return {
      month: `M${month}`,
      q1Retention: Math.max(60, 95 - month * 2.2),
      q2Retention: Math.max(65, 96 - month * 1.8),
    };
  }),
};

const riskDistributionByRange: Record<
  RangeKey,
  { bucket: string; subscribers: number; health: number }[]
> = {
  '30d': [
    { bucket: 'High Risk', subscribers: 4200, health: 42 },
    { bucket: 'Medium Risk', subscribers: 7800, health: 68 },
    { bucket: 'Low Risk', subscribers: 15600, health: 88 },
  ],
  '90d': [
    { bucket: 'High Risk', subscribers: 5100, health: 45 },
    { bucket: 'Medium Risk', subscribers: 9100, health: 70 },
    { bucket: 'Low Risk', subscribers: 16400, health: 90 },
  ],
  '1y': [
    { bucket: 'High Risk', subscribers: 6300, health: 48 },
    { bucket: 'Medium Risk', subscribers: 10400, health: 72 },
    { bucket: 'Low Risk', subscribers: 17100, health: 91 },
  ],
};

const summaryByRange: Record<
  RangeKey,
  {
    insight: string;
    callout: string;
    readiness: string;
  }
> = {
  '30d': {
    insight: 'Onboarding confusion is the top churn driver for Trial users.',
    callout: 'Medium-risk New segment crept up +4 pts. Activate nurture cadences.',
    readiness: 'AI health score highlights 4.2K subscribers needing interventions today.',
  },
  '90d': {
    insight: 'Engagement drop now primary driver across Trial and New stages.',
    callout: 'Competitive offers erode Established loyalty. Reinforce bundle messaging.',
    readiness: 'Target journey refresh for 9.1K medium-risk subscribers this quarter.',
  },
  '1y': {
    insight: 'Long-term defection tied to competitive offers and content gaps.',
    callout: 'Retention pond maintains 91% healthy score after loyalty programme rollout.',
    readiness: 'Prioritise value comms to 6.3K high-risk accounts before contract renewal.',
  },
};

export default function AnalyseTab() {
  const [range, setRange] = useState<RangeKey>('30d');

  const driverData = useMemo(() => churnDriversByRange[range], [range]);
  const cohortData = useMemo(() => cohortSeriesByRange[range], [range]);
  const riskData = useMemo(() => riskDistributionByRange[range], [range]);
  const summary = summaryByRange[range];

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-sky-300 font-semibold flex items-center gap-2">
              <FlaskConical size={16} />
              Analysis Control Centre
            </p>
            <h2 className="text-2xl font-bold text-white mt-2">
              Deep Dive Diagnostics
            </h2>
            <p className="text-sm text-gray-400">
              Toggle the Einstein insights across key lookback windows.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1">
            {ranges.map((item) => (
              <button
                key={item.id}
                onClick={() => setRange(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  range === item.id
                    ? 'bg-sky-500/90 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Signal Spotlight
            </p>
            <p className="text-sm text-white leading-relaxed">{summary.insight}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Segment Alert
            </p>
            <p className="text-sm text-white leading-relaxed">{summary.callout}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Action Readiness
            </p>
            <p className="text-sm text-white leading-relaxed">{summary.readiness}</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-8"
      >
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                Top 5 Churn Drivers
              </h3>
              <p className="text-sm text-gray-400">
                Segment view across Trial, New, and Established journeys.
              </p>
            </div>
            <Layers3 className="text-sky-300" size={20} />
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={driverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="driver" stroke="#94a3b8" angle={-15} textAnchor="end" height={70} />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                  borderRadius: 12,
                  color: '#fff',
                }}
              />
              <Legend />
              <Bar dataKey="trial" fill="#ef4444" name="Trial" radius={[8, 8, 0, 0]} />
              <Bar dataKey="new" fill="#f97316" name="New" radius={[8, 8, 0, 0]} />
              <Bar dataKey="established" fill="#22c55e" name="Established" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                Cohort Retention Trajectory
              </h3>
              <p className="text-sm text-gray-400">
                Comparing Q1 2025 vs Q2 2025 subscriber retention.
              </p>
            </div>
            <CalendarClock className="text-sky-300" size={20} />
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                  borderRadius: 12,
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="q1Retention"
                stroke="#818cf8"
                strokeWidth={3}
                dot={{ stroke: '#818cf8', strokeWidth: 2, r: 4 }}
                name="Q1 2025 Cohort"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="q2Retention"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ stroke: '#22d3ee', strokeWidth: 2, r: 4 }}
                name="Q2 2025 Cohort"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Predictive Risk Distribution
            </h3>
            <p className="text-sm text-gray-400">
              Einstein health score across High, Medium, and Low risk buckets.
            </p>
          </div>
          <Gauge className="text-sky-300" size={20} />
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="bucket" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                borderRadius: 12,
                color: '#fff',
              }}
            />
            <Legend />
            <Bar dataKey="subscribers" name="Subscribers" fill="#38bdf8" radius={[8, 8, 0, 0]} />
            <Bar dataKey="health" name="AI Health Score" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.section>
    </div>
  );
}

