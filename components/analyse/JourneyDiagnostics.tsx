'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Filter, Layers, Radar, Sparkles } from 'lucide-react';

interface JourneyDiagnosticsProps {
  onNavigateAction?: () => void;
}

type FilterKey = 'lifecycle' | 'plan' | 'region' | 'acquisition' | 'device';

const FILTER_OPTIONS: Record<FilterKey, string[]> = {
  lifecycle: ['All stages', 'Trial', 'New', 'Established'],
  plan: ['All plans', 'Sports', 'Entertainment', 'Broadband'],
  region: ['Global', 'EMEA', 'Americas', 'APAC'],
  acquisition: ['All sources', 'Paid', 'Organic', 'Partner'],
  device: ['All devices', 'Mobile', 'CTV', 'Web'],
};

const BASE_STAGES = [
  {
    id: 'trial',
    label: 'Trial',
    population: 52000,
    conversion: 32,
    survival: 24,
    leakage: 44,
    notes: 'Major drop during day 7-14 onboarding gap.',
  },
  {
    id: 'new',
    label: 'New',
    population: 31400,
    conversion: 68,
    survival: 51,
    leakage: 19,
    notes: 'Billing retries and low 2nd-device adoption.',
  },
  {
    id: 'established',
    label: 'Established',
    population: 1290000,
    conversion: 96,
    survival: 92,
    leakage: 6,
    notes: 'Churn concentrated around contract renewal windows.',
  },
];

const STAGE_ADJUSTMENTS: Record<string, Partial<Record<string, number>>> = {
  Sports: { trial: -4, new: 3, established: 1.5 },
  Entertainment: { trial: 2, new: 1, established: -0.8 },
  Paid: { trial: -6, new: -2 },
  Organic: { trial: 3, new: 2 },
  APAC: { trial: -2, new: 1, established: 2 },
  CTV: { trial: 1, new: -1.4, established: 0.5 },
};

const COHORT_INSIGHTS = [
  {
    title: 'Sports bundle (EMEA)',
    highlight: '21% churn in first 14 days',
    detail: 'Lack of localized onboarding content. Action: concierge callback & curated highlights.',
  },
  {
    title: 'Partner acquisitions',
    highlight: 'Leakage +12% at billing stage',
    detail: 'Payment credentials missing on initial signup. Action: secure payments prompt after trial.',
  },
  {
    title: 'Broadband + Streaming bundle',
    highlight: 'Survival up 8% after retention credits',
    detail: 'Retention credit automation rolled out on 5 May.',
  },
];

export function JourneyDiagnostics({ onNavigateAction }: JourneyDiagnosticsProps) {
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    lifecycle: FILTER_OPTIONS.lifecycle[0],
    plan: FILTER_OPTIONS.plan[0],
    region: FILTER_OPTIONS.region[0],
    acquisition: FILTER_OPTIONS.acquisition[0],
    device: FILTER_OPTIONS.device[0],
  });

  const handleFilterChange = (key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const stageMetrics = useMemo(() => {
    return BASE_STAGES.map((stage) => {
      const deltas = [
        STAGE_ADJUSTMENTS[filters.plan]?.[stage.id] ?? 0,
        STAGE_ADJUSTMENTS[filters.region]?.[stage.id] ?? 0,
        STAGE_ADJUSTMENTS[filters.acquisition]?.[stage.id] ?? 0,
        STAGE_ADJUSTMENTS[filters.device]?.[stage.id] ?? 0,
      ];

      const multiplier =
        1 +
        deltas.reduce((sum, delta) => sum + delta, 0) / 100 +
        (filters.lifecycle !== 'All stages' && filters.lifecycle.toLowerCase() === stage.id ? 0.1 : 0);

      return {
        ...stage,
        population: Math.round(stage.population * multiplier),
        conversion: Math.max(0, Math.min(100, stage.conversion + deltas[0] * 0.4)),
        survival: Math.max(0, Math.min(100, stage.survival + deltas[1] * 0.6)),
        leakage: Math.max(0, Math.min(100, stage.leakage + deltas[2] * 0.5)),
      };
    });
  }, [filters]);

  const summary = useMemo(() => {
    return `${filters.plan} · ${filters.region} · ${filters.acquisition} · ${filters.device}`;
  }, [filters.plan, filters.region, filters.acquisition, filters.device]);

  return (
    <motion.div
      id="analyse-journey"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-200 flex items-center gap-2">
            <Layers size={14} />
            Journey diagnostics
          </p>
          <h2 className="text-xl font-semibold text-white">Where and why customers leak through the lifecycle</h2>
          <p className="text-sm text-sky-200/80 mt-1">Filtered view: {summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(FILTER_OPTIONS) as FilterKey[]).map((key) => (
            <select
              key={key}
              value={filters[key]}
              onChange={(event) => handleFilterChange(key, event.target.value)}
              className="rounded-lg border border-sky-500/30 bg-navy-900/60 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              {FILTER_OPTIONS[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {stageMetrics.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card rounded-xl border border-sky-500/25 p-5 shadow-[0_18px_32px_rgba(8,47,73,0.28)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">{stage.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{stage.population.toLocaleString()} subscribers</p>
              </div>
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[11px] text-sky-200">
                Survival {stage.survival.toFixed(0)}%
              </span>
            </div>

            <div className="mt-4 grid gap-2 text-xs text-gray-300">
              <div className="flex items-center justify-between rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-2">
                <span>Conversion to next stage</span>
                <span className="text-sky-200 font-semibold">{stage.conversion.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2">
                <span>Leakage rate</span>
                <span className="text-rose-300 font-semibold">{stage.leakage.toFixed(1)}%</span>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">{stage.notes}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl border border-sky-500/25 p-5 shadow-[0_18px_32px_rgba(8,47,73,0.28)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-200 flex items-center gap-2">
                <BarChart3 size={14} />
                Cohort comparisons
              </p>
              <p className="text-sm text-gray-300 mt-1">
                High-velocity cohorts vs last month. Focus on trial experience to reduce leakage.
              </p>
            </div>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
              Updated 6h ago
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {COHORT_INSIGHTS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-sky-500/20 bg-navy-900/60 px-4 py-3 text-sm text-gray-300"
              >
                <p className="text-white font-semibold">{item.title}</p>
                <p className="text-sky-200 text-xs mt-1 uppercase tracking-wide">{item.highlight}</p>
                <p className="mt-1 text-xs text-gray-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card flex flex-col justify-between rounded-xl border border-sky-500/25 p-5 shadow-[0_18px_32px_rgba(8,47,73,0.28)]"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-200 flex items-center gap-2">
              <Radar size={14} />
              AI stage insights
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>
                <span className="text-sky-200 font-semibold">Trial:</span> 62% of churners show zero second-screen
                activation. Recommend guided device setup intervention.
              </li>
              <li>
                <span className="text-sky-200 font-semibold">New:</span> Billing retries drop churn by 11% when resolved
                within 24 hours. Queue automation workflows.
              </li>
              <li>
                <span className="text-sky-200 font-semibold">Established:</span> Loyalty credits prevented £640K revenue
                leakage this month.
              </li>
            </ul>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNavigateAction}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-500/25 transition-colors"
          >
            Trigger targeted action
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}


