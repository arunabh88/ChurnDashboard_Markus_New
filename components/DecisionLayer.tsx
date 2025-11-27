'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, DollarSign, Sparkles, ArrowRight, Rocket } from 'lucide-react';
import { SegmentIcon } from '@/components/SegmentIcon';
import { formatCurrency } from '@/lib/utils';
import { RETENTION_SEGMENTS, RetentionSegment } from '@/lib/data/segments';

const SORT_OPTIONS = [
  { value: 'churn', label: 'Churn Risk (High → Low)' },
  { value: 'cltv', label: 'CLTV (High → Low)' },
  { value: 'roi', label: 'ROI (High → Low)' },
  { value: 'name', label: 'Segment Name (A → Z)' },
] as const;

interface DecisionLayerProps {
  onViewSegments?: () => void;
  onSegmentAction?: (segment: RetentionSegment) => void;
  riskThreshold?: number;
}

export default function DecisionLayer({ onViewSegments, onSegmentAction, riskThreshold }: DecisionLayerProps = {}) {
  const [sortKey, setSortKey] = useState<(typeof SORT_OPTIONS)[number]['value']>('churn');

  const segments = useMemo(() => {
    const copy = [...RETENTION_SEGMENTS];
    switch (sortKey) {
      case 'cltv':
        return copy.sort((a, b) => b.cltv - a.cltv);
      case 'roi':
        return copy.sort((a, b) => b.roi - a.roi);
      case 'name':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'churn':
      default:
        return copy.sort((a, b) => b.churnRisk - a.churnRisk);
    }
  }, [sortKey]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'save-first':
        return (
          <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs bg-red-500 text-white px-3 py-1 rounded-full font-semibold priority-badge">
            <Sparkles size={12} className="text-white" />
            <span className="text-white">Save First</span>
          </span>
        );
      case 'low-roi':
        return (
          <span className="inline-flex items-center whitespace-nowrap text-xs bg-gray-600 text-white px-3 py-1 rounded-full font-semibold priority-badge">
            <span className="text-white">Low ROI</span>
          </span>
        );
      case 'needs-attention':
        return (
          <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs bg-orange-500 text-white px-3 py-1 rounded-full font-semibold priority-badge">
            <AlertCircle size={12} className="text-white" />
            <span className="text-white">Needs Attention</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'text-red-400';
    if (risk >= 70) return 'text-orange-400';
    return 'text-yellow-400';
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Decision Layer</h2>
          <p className="text-gray-400">
            Prioritize retention efforts by segment
            {typeof riskThreshold === 'number' && (
              <span className="ml-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-xs text-sky-200">
                Risk threshold: {riskThreshold.toFixed(0)}%
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <label htmlFor="decision-sort" className="sr-only">
              Sort segments
            </label>
            <select
              id="decision-sort"
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as (typeof SORT_OPTIONS)[number]['value'])}
              className="appearance-none rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200 pr-10 shadow-[0_0_18px_rgba(56,189,248,0.15)] focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sky-300">
              ▼
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-glow decision-layer-button"
            type="button"
            onClick={onViewSegments}
          >
            <Sparkles size={20} className="text-white" />
            <span className="text-white">View All Segments</span>
            <ArrowRight size={20} className="text-white" />
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-separate border-spacing-y-2">
          <thead className="text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 pb-2">Segment</th>
              <th className="px-4 pb-2 text-center">Churn Risk</th>
              <th className="px-4 pb-2 text-center">CLTV</th>
              <th className="px-4 pb-2 text-center">ROI</th>
              <th className="px-4 pb-2">AI Recommendation</th>
              <th className="px-4 pb-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
        {segments.map((segment, index) => (
              <motion.tr
            key={segment.name}
                initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-navy-900/50 border border-sky-500/20 rounded-xl"
          >
                <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <SegmentIcon icon={segment.icon} gradient={segment.iconGradient} />
                    <div>
                      <h3 className="text-white font-semibold text-sm md:text-base">{segment.name}</h3>
                      <p className="text-gray-400 text-xs md:text-sm">{segment.count.toLocaleString()} subscribers</p>
                  </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className={`text-lg font-bold ${getRiskColor(segment.churnRisk)}`}>{segment.churnRisk}%</span>
                    <span className="text-xs text-gray-500">risk</span>
                  </div>
                </td>

                <td className="px-4 py-4 text-center">
                  <p className="text-white font-semibold">{formatCurrency(segment.cltv)}</p>
                </td>

                <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp size={16} className="text-green-400" />
                    <p className="text-white font-semibold">{segment.roi}×</p>
                </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                  {getPriorityBadge(segment.priority)}
                  <div className="flex items-start gap-2 text-sm">
                    <Sparkles size={14} className="text-sky-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-300 max-w-xl">{segment.aiSuggestion}</p>
                  </div>
                </div>
              </div>
                </td>

                <td className="px-4 py-4 text-right">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSegmentAction?.(segment)}
                    className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25"
                    aria-label={`Activate action for ${segment.name}`}
                >
                  <Rocket size={16} />
                    Activate Action
                </motion.button>
                </td>
              </motion.tr>
        ))}
          </tbody>
        </table>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-sky-500/10 border border-sky-500/30 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <DollarSign size={24} className="text-sky-400" />
          <div>
            <p className="text-white font-semibold">Projected Revenue Impact</p>
            <p className="text-gray-300 text-sm">
              Implementing these recommendations could save <span className="text-sky-400 font-bold">£1.2M</span> in annual revenue
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

