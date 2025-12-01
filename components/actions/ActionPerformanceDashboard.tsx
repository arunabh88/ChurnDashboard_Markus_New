'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Clock, TrendingUp, Filter } from 'lucide-react';
import { useState } from 'react';

interface PerformanceSummary {
  totalActions: number;
  onTrack: number;
  underperforming: number;
  atRisk: number;
  totalRevenueProtected: string;
  averageROI: string;
}

interface ActionPerformanceDashboardProps {
  summary: PerformanceSummary;
  onFilterChange?: (filter: string) => void;
  onViewAll?: () => void;
  onPauseUnderperforming?: () => void;
  onCloneWinning?: () => void;
}

const DEFAULT_SUMMARY: PerformanceSummary = {
  totalActions: 24,
  onTrack: 18,
  underperforming: 4,
  atRisk: 2,
  totalRevenueProtected: '£1.2M',
  averageROI: '2.9×',
};

export function ActionPerformanceDashboard({
  summary = DEFAULT_SUMMARY,
  onFilterChange,
  onViewAll,
  onPauseUnderperforming,
  onCloneWinning,
}: ActionPerformanceDashboardProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  const summaryCards = [
    {
      label: 'Total Actions',
      value: summary.totalActions.toString(),
      icon: <TrendingUp size={20} className="text-sky-400" />,
      bg: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'On-Track',
      value: `${summary.onTrack} (${Math.round((summary.onTrack / summary.totalActions) * 100)}%)`,
      icon: <CheckCircle size={20} className="text-emerald-400" />,
      bg: 'from-emerald-500 to-green-500',
      highlight: summary.onTrack,
    },
    {
      label: 'Underperforming',
      value: `${summary.underperforming} (${Math.round((summary.underperforming / summary.totalActions) * 100)}%)`,
      icon: <AlertTriangle size={20} className="text-red-400" />,
      bg: 'from-red-500 to-orange-500',
      highlight: summary.underperforming,
      isWarning: true,
    },
    {
      label: 'At-Risk',
      value: `${summary.atRisk} (${Math.round((summary.atRisk / summary.totalActions) * 100)}%)`,
      icon: <Clock size={20} className="text-amber-400" />,
      bg: 'from-amber-500 to-yellow-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card rounded-xl border p-4 ${
              card.isWarning ? 'border-red-500/40 bg-red-500/10' : 'border-sky-500/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.bg}`}>{card.icon}</div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.isWarning ? 'text-red-400' : 'text-white'}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="glass-card rounded-xl border border-sky-500/20 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-3">Active Campaigns Summary</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Revenue Protected</p>
                <p className="text-2xl font-bold text-white">{summary.totalRevenueProtected}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Average ROI</p>
                <p className="text-2xl font-bold text-emerald-300">{summary.averageROI}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              <span className="font-semibold text-white">Campaigns On-Track: {summary.onTrack}/{summary.totalActions} (75%)</span>
              {summary.underperforming > 0 && (
                <span className="ml-2 text-red-400">
                  • Underperforming: {summary.underperforming}/{summary.totalActions} (highlighted)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAll}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <Filter size={16} />
            View All Campaigns
          </motion.button>
          {summary.underperforming > 0 && onPauseUnderperforming && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPauseUnderperforming}
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/25 transition-colors"
            >
              Pause Underperforming
            </motion.button>
          )}
          {onCloneWinning && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCloneWinning}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/25 transition-colors"
            >
              Clone Winning Campaign
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

