'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Users,
  TrendingDown,
  DollarSign,
  ArrowLeft,
  Download,
  Sparkles,
  PlayCircle,
} from 'lucide-react';
import {
  establishedUsersSubscribers,
  establishedUsersTriggerMetrics,
  establishedUsersOverlapData,
  establishedUsersSummaryMetrics,
  establishedUsersAiRecommendations,
  ESTABLISHED_USERS_TRIGGERS,
  type EstablishedUsersSubscriber,
} from '@/lib/data/establishedUsersTriggers';

interface EstablishedUsersTriggersDrilldownProps {
  onBack: () => void;
  onCreatePlaybook: (triggers: string[]) => void;
}

export function EstablishedUsersTriggersDrilldown({ onBack, onCreatePlaybook }: EstablishedUsersTriggersDrilldownProps) {
  const [expandedTriggers, setExpandedTriggers] = useState<Set<string>>(new Set([ESTABLISHED_USERS_TRIGGERS.PRICE]));

  const toggleTrigger = (trigger: string) => {
    setExpandedTriggers((prev) => {
      const next = new Set(prev);
      if (next.has(trigger)) {
        next.delete(trigger);
      } else {
        next.add(trigger);
      }
      return next;
    });
  };

  const getSubscribersByTrigger = (trigger: string): EstablishedUsersSubscriber[] => {
    return establishedUsersSubscribers.filter((sub) => sub.triggers.includes(trigger));
  };

  const getRiskBadge = (risk: number) => {
    if (risk >= 25) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (risk >= 18) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (risk >= 12) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <button
              type="button"
              onClick={onBack}
              className="hover:text-sky-300 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              Dashboard
            </button>
            <span>→</span>
            <span>Analyse</span>
            <span>→</span>
            <span className="text-sky-300">Established Users Triggers</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Established Users: Trigger Analysis</h1>
          <p className="text-gray-400 max-w-2xl">
            Drilling into: Price sensitivity, Competitor offers, Life events
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.values(ESTABLISHED_USERS_TRIGGERS).map((trigger) => (
              <span
                key={trigger}
                className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-100"
              >
                {trigger}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCreatePlaybook(Object.values(ESTABLISHED_USERS_TRIGGERS))}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30"
          >
            <PlayCircle size={16} />
            Create Playbook
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/20 transition-colors"
          >
            <Download size={16} />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="glass-card rounded-xl p-6 border border-sky-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Users size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Affected</h3>
          <p className="text-3xl font-bold text-white">{establishedUsersSummaryMetrics.totalAffected.toLocaleString()}</p>
          <p className="text-xs text-sky-200/70 mt-2">Subscribers with at least one trigger</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-sky-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <TrendingDown size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Churn Risk</h3>
          <p className="text-3xl font-bold text-white">{establishedUsersSummaryMetrics.avgChurnRisk}%</p>
          <p className="text-xs text-sky-200/70 mt-2">Average churn probability</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-sky-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Revenue at Risk</h3>
          <p className="text-3xl font-bold text-white">{establishedUsersSummaryMetrics.revenueAtRisk}</p>
          <p className="text-xs text-sky-200/70 mt-2">Estimated value if churned</p>
        </div>
      </motion.div>

      {/* Trigger Breakdown Cards */}
      <div className="space-y-4">
        {establishedUsersTriggerMetrics.map((metric, index) => {
          const isExpanded = expandedTriggers.has(metric.trigger);
          const subscribers = getSubscribersByTrigger(metric.trigger);

          return (
            <motion.div
              key={metric.trigger}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className="glass-card rounded-xl border border-sky-500/20 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleTrigger(metric.trigger)}
                className="w-full p-6 flex items-center justify-between hover:bg-sky-500/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-sky-300" />
                  ) : (
                    <ChevronDown size={20} className="text-sky-300" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white text-left">{metric.trigger}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {metric.affectedCount.toLocaleString()} subscribers ({((metric.affectedCount / establishedUsersSummaryMetrics.totalAffected) * 100).toFixed(0)}%)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Churn Rate</p>
                    <p className="text-lg font-bold text-red-400">{metric.churnRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Avg Days</p>
                    <p className="text-lg font-bold text-orange-400">{metric.avgDaysToChurn}</p>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-sky-500/20"
                >
                  <div className="p-6 space-y-6">
                    {/* Key Indicators */}
                    <div>
                      <h4 className="text-sm font-semibold text-sky-200 mb-3">Key Indicators</h4>
                      <div className="grid gap-3 md:grid-cols-3">
                        {metric.keyIndicators.map((indicator, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-3"
                          >
                            <p className="text-xs text-gray-400 mb-1">{indicator.label}</p>
                            <p className="text-lg font-bold text-white">{indicator.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subscriber Table */}
                    <div>
                      <h4 className="text-sm font-semibold text-sky-200 mb-3">Affected Subscribers</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-sky-500/20">
                              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">ID</th>
                              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">Name</th>
                              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">Sign-up</th>
                              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">Days Active</th>
                              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">Engagement</th>
                              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">Risk</th>
                              <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subscribers.map((sub, idx) => (
                              <motion.tr
                                key={sub.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="border-b border-sky-500/10 hover:bg-white/5 transition-colors"
                              >
                                <td className="py-3 px-4 text-sky-400 font-mono text-xs">{sub.id}</td>
                                <td className="py-3 px-4">
                                  <div>
                                    <div className="text-white font-medium text-sm">{sub.name}</div>
                                    <div className="text-gray-400 text-xs">{sub.email}</div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-gray-300 text-sm">{sub.signUpDate}</td>
                                <td className="py-3 px-4 text-gray-300 text-sm">{sub.daysActive} days</td>
                                <td className="py-3 px-4 text-gray-300 text-sm">{sub.engagementScore}%</td>
                                <td className="py-3 px-4">
                                  <span className={`text-xs px-2 py-1 rounded-full border ${getRiskBadge(sub.churnRisk)}`}>
                                    {sub.churnRisk}%
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  {sub.churnRisk >= 18 ? (
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="inline-flex items-center gap-1 rounded-lg border border-sky-500/40 bg-sky-500/15 px-2 py-1 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
                                    >
                                      <Sparkles size={12} />
                                      Action
                                    </motion.button>
                                  ) : (
                                    <span className="text-xs text-gray-500">—</span>
                                  )}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Overlap Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl border border-sky-500/20 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Overlap Analysis</h3>
        <p className="text-sm text-gray-400 mb-4">
          Subscribers affected by multiple triggers show higher churn risk. Focus interventions on overlapping segments.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sky-500/20">
                <th className="text-left text-gray-400 font-medium py-3 px-4 text-xs">Trigger Combination</th>
                <th className="text-right text-gray-400 font-medium py-3 px-4 text-xs">Count</th>
                <th className="text-right text-gray-400 font-medium py-3 px-4 text-xs">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {establishedUsersOverlapData.map((item, idx) => (
                <motion.tr
                  key={item.combination}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + idx * 0.05 }}
                  className="border-b border-sky-500/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium text-sm">{item.combination}</td>
                  <td className="py-3 px-4 text-right text-white font-semibold">{item.count.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-sky-300 font-semibold">{item.percentage.toFixed(1)}%</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-blue-500/10 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-sky-400" />
          <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
        </div>
        <div className="space-y-4">
          {establishedUsersAiRecommendations.map((rec, idx) => (
            <motion.div
              key={rec.action}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + idx * 0.1 }}
              className="rounded-lg border border-sky-500/30 bg-navy-900/60 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-300">
                    Target: <span className="text-sky-300 font-semibold">{rec.targetCount.toLocaleString()} users</span> • Expected lift:{' '}
                    <span className="text-emerald-300 font-semibold">{rec.expectedLift}</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCreatePlaybook([rec.action])}
                  className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
                >
                  <PlayCircle size={14} />
                  Create
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCreatePlaybook(Object.values(ESTABLISHED_USERS_TRIGGERS))}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30"
          >
            <PlayCircle size={16} />
            Create Combined Playbook
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/20 transition-colors"
          >
            <Download size={16} />
            Export Cohort
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

