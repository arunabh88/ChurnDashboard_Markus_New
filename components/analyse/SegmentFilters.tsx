'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Filter } from 'lucide-react';

type SegmentFilterKey = 'lifecycle' | 'plan' | 'region' | 'revenue' | 'engagement';

interface SegmentFiltersProps {
  onChange?: (filters: Record<SegmentFilterKey, string>) => void;
}

const OPTIONS: Record<SegmentFilterKey, string[]> = {
  lifecycle: ['All stages', 'Trial', 'New', 'Established', 'Loyalty'],
  plan: ['All plans', 'Sports', 'Entertainment', 'Broadband', 'Premium'],
  region: ['Global', 'EMEA', 'Americas', 'APAC'],
  revenue: ['All tiers', 'High CLTV', 'Mid value', 'Emerging'],
  engagement: ['All bands', 'Highly engaged', 'Moderate', 'Low', 'Dormant'],
};

export function SegmentFilters({ onChange }: SegmentFiltersProps) {
  const [filters, setFilters] = useState<Record<SegmentFilterKey, string>>({
    lifecycle: OPTIONS.lifecycle[0],
    plan: OPTIONS.plan[0],
    region: OPTIONS.region[0],
    revenue: OPTIONS.revenue[0],
    engagement: OPTIONS.engagement[0],
  });

  const handleChange = (key: SegmentFilterKey, value: string) => {
    setFilters((prev) => {
      if (prev[key] === value) return prev;
      const next = { ...prev, [key]: value };
      onChange?.(next);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl border border-sky-500/25 p-5 shadow-[0_18px_32px_rgba(8,47,73,0.28)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-200 flex items-center gap-2">
            <Filter size={14} />
            Segment drill-down filters
          </p>
          <p className="text-sm text-gray-400">
            Focus the subscriber table and decision layer by lifecycle, value, and engagement profiles.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-5">
        {(Object.keys(OPTIONS) as SegmentFilterKey[]).map((key) => (
          <label key={key} className="space-y-1 text-xs font-semibold uppercase tracking-wide text-sky-200/80">
            {key}
            <select
              value={filters[key]}
              onChange={(event) => handleChange(key, event.target.value)}
              className="w-full rounded-lg border border-sky-500/25 bg-navy-900/60 px-3 py-2 text-xs font-semibold text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              {OPTIONS[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </motion.div>
  );
}


