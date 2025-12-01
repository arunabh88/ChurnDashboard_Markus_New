'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, DollarSign, Users, ArrowRight, Eye, Sparkles, ChevronRight } from 'lucide-react';
import { triggerMetrics, summaryMetrics as trialSummary } from '@/lib/data/trialTriggers';
import { newUsersTriggerMetrics, newUsersSummaryMetrics } from '@/lib/data/newUsersTriggers';
import { establishedUsersTriggerMetrics, establishedUsersSummaryMetrics } from '@/lib/data/establishedUsersTriggers';

interface JourneyDrilldownViewProps {
  onNavigateToDrilldown: (stage: 'trial' | 'new' | 'established') => void;
  onCreateIntervention: (stage: string, triggers: string[]) => void;
}

interface StageData {
  name: string;
  riskLevel: 'high' | 'medium' | 'low';
  atRiskCount: number;
  revenueAtRisk: string;
  topTriggers: Array<{
    name: string;
    count: number;
  }>;
  stageKey: 'trial' | 'new' | 'established';
}

export function JourneyDrilldownView({ onNavigateToDrilldown, onCreateIntervention }: JourneyDrilldownViewProps) {
  const stages: StageData[] = [
    {
      name: 'Trial Users',
      riskLevel: 'high',
      atRiskCount: trialSummary.totalAffected,
      revenueAtRisk: trialSummary.revenueAtRisk,
      topTriggers: triggerMetrics
        .sort((a, b) => b.affectedCount - a.affectedCount)
        .slice(0, 3)
        .map((t) => ({ name: t.trigger, count: t.affectedCount })),
      stageKey: 'trial',
    },
    {
      name: 'New Users',
      riskLevel: 'medium',
      atRiskCount: newUsersSummaryMetrics.totalAffected,
      revenueAtRisk: newUsersSummaryMetrics.revenueAtRisk,
      topTriggers: newUsersTriggerMetrics
        .sort((a, b) => b.affectedCount - a.affectedCount)
        .slice(0, 3)
        .map((t) => ({ name: t.trigger, count: t.affectedCount })),
      stageKey: 'new',
    },
    {
      name: 'Established Users',
      riskLevel: 'low',
      atRiskCount: establishedUsersSummaryMetrics.totalAffected,
      revenueAtRisk: establishedUsersSummaryMetrics.revenueAtRisk,
      topTriggers: establishedUsersTriggerMetrics
        .sort((a, b) => b.affectedCount - a.affectedCount)
        .slice(0, 3)
        .map((t) => ({ name: t.trigger, count: t.affectedCount })),
      stageKey: 'established',
    },
  ];

  const totalAtRisk = stages.reduce((sum, stage) => sum + stage.atRiskCount, 0);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return {
          bg: 'from-red-500/20 to-red-600/20',
          border: 'border-red-500/40',
          text: 'text-red-400',
          badge: 'bg-red-500/20 text-red-300 border-red-500/40',
        };
      case 'medium':
        return {
          bg: 'from-orange-500/20 to-orange-600/20',
          border: 'border-orange-500/40',
          text: 'text-orange-400',
          badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        };
      case 'low':
        return {
          bg: 'from-amber-500/20 to-amber-600/20',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      default:
        return {
          bg: 'from-gray-500/20 to-gray-600/20',
          border: 'border-gray-500/40',
          text: 'text-gray-400',
          badge: 'bg-gray-500/20 text-gray-300 border-gray-500/40',
        };
    }
  };

  return (
    <div className="glass-card space-y-6 rounded-2xl border border-sky-500/30 p-6 shadow-[0_18px_40px_rgba(8,47,73,0.28)]">
      {/* Header Section */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">Journey Friction Analysis</p>
          <p className="mt-1 text-sm text-gray-400">
            Drill into specific stages to identify churn triggers and create targeted interventions
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-sky-500/20 bg-sky-500/10 px-4 py-2">
          <Users size={18} className="text-sky-400" />
          <div>
            <p className="text-xs text-gray-400">Total At-Risk</p>
            <p className="text-lg font-bold text-white">{totalAtRisk.toLocaleString()} subscribers</p>
          </div>
        </div>
      </div>

      {/* Stage Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stages.map((stage, index) => {
          const colors = getRiskColor(stage.riskLevel);
          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-5 shadow-[0_10px_24px_rgba(15,118,210,0.18)]`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{stage.name}</h3>
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${colors.badge} mt-1`}>
                    <AlertTriangle size={12} />
                    {stage.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
              </div>

              {/* At-Risk Count */}
              <div className="mb-4 flex items-center gap-2">
                <TrendingDown size={18} className={colors.text} />
                <div>
                  <p className="text-2xl font-bold text-white">{stage.atRiskCount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">subscribers at risk</p>
                </div>
              </div>

              {/* Revenue at Risk */}
              <div className="mb-4 flex items-center gap-2">
                <DollarSign size={18} className="text-emerald-400" />
                <div>
                  <p className="text-lg font-bold text-emerald-300">{stage.revenueAtRisk}</p>
                  <p className="text-xs text-gray-400">revenue at risk</p>
                </div>
              </div>

              {/* Top 3 Triggers */}
              <div className="mb-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Top Triggers</p>
                {stage.topTriggers.map((trigger, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-sky-500/20 bg-navy-900/70 px-3 py-2"
                  >
                    <span className="text-sm text-gray-200">{trigger.name}</span>
                    <span className="text-xs font-semibold text-sky-300">{trigger.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigateToDrilldown(stage.stageKey)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2.5 text-sm font-semibold text-sky-100 hover:bg-sky-500/25 transition-colors"
                >
                  <Eye size={16} />
                  View Trigger Breakdown
                  <ChevronRight size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onCreateIntervention(stage.name, stage.topTriggers.map((t) => t.name))}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-100 hover:bg-emerald-500/25 transition-colors"
                >
                  <Sparkles size={16} />
                  Create Intervention
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

