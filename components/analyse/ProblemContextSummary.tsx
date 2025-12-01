'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, DollarSign, Clock, Target, ArrowRight, Sparkles, TrendingDown } from 'lucide-react';

interface ProblemContext {
  alertLevel: 'critical' | 'high' | 'medium';
  problem: string;
  rootCause: string;
  revenueImpact: string;
  timeSensitivity: string;
  recommendedPriority: string;
  readyPlaybooks: number;
}

interface ProblemContextSummaryProps {
  context?: ProblemContext;
  onTakeAction?: () => void;
  onViewDetails?: (section: string) => void;
}

const DEFAULT_CONTEXT: ProblemContext = {
  alertLevel: 'critical',
  problem: 'Trial churn up 5% - 2,100 users at risk',
  rootCause: '70% of trial churn driven by onboarding confusion + content misalignment',
  revenueImpact: '$420K at risk if no intervention',
  timeSensitivity: 'Peak churn window: Days 8-12 post sign-up',
  recommendedPriority: 'Focus: Trial Users → Onboarding triggers',
  readyPlaybooks: 3,
};

export function ProblemContextSummary({ context = DEFAULT_CONTEXT, onTakeAction, onViewDetails }: ProblemContextSummaryProps) {
  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/20 border-red-500/40 text-red-300';
      case 'high': return 'bg-orange-500/20 border-orange-500/40 text-orange-300';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300';
      default: return 'bg-sky-500/20 border-sky-500/40 text-sky-300';
    }
  };

  const contextCards = [
    {
      icon: <TrendingDown size={20} className="text-red-400" />,
      label: 'Root Cause',
      value: context.rootCause,
      section: 'signals',
    },
    {
      icon: <DollarSign size={20} className="text-emerald-400" />,
      label: 'Revenue Impact',
      value: context.revenueImpact,
      section: 'journey',
    },
    {
      icon: <Clock size={20} className="text-amber-400" />,
      label: 'Time Sensitivity',
      value: context.timeSensitivity,
      section: 'decision',
    },
    {
      icon: <Target size={20} className="text-sky-400" />,
      label: 'Priority Focus',
      value: context.recommendedPriority,
      section: 'decision',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Alert Banner */}
      <div className={`rounded-xl border p-4 ${getAlertColor(context.alertLevel)}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm">{context.problem}</p>
            <p className="text-xs mt-1 opacity-90">
              Immediate attention required. {context.readyPlaybooks} playbooks ready to deploy for this segment.
            </p>
          </div>
          {onTakeAction && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTakeAction}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/20 transition-colors"
            >
              <Sparkles size={14} />
              Take Action
            </motion.button>
          )}
        </div>
      </div>

      {/* Quick Context Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contextCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl border border-sky-500/20 p-4 cursor-pointer hover:border-sky-500/40 transition-colors"
            onClick={() => onViewDetails?.(card.section)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-sky-500/10">{card.icon}</div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">{card.label}</p>
            </div>
            <p className="text-sm text-white font-medium leading-relaxed">{card.value}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-sky-300">
              <span>View details</span>
              <ArrowRight size={12} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Preview */}
      <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-blue-500/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-sky-400" />
            <p className="text-sm font-semibold text-white">
              {context.readyPlaybooks} playbooks ready to deploy for this segment
            </p>
          </div>
          {onTakeAction && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTakeAction}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30"
            >
              Launch Playbook
              <ArrowRight size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

