'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, DollarSign, Sparkles, ArrowRight, Rocket } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { RETENTION_SEGMENTS, RetentionSegment } from '@/lib/data/segments';

interface DecisionLayerProps {
  onViewSegments?: () => void;
  onSegmentAction?: (segment: RetentionSegment) => void;
}

export default function DecisionLayer({ onViewSegments, onSegmentAction }: DecisionLayerProps = {}) {
  const segments = RETENTION_SEGMENTS;

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'save-first':
        return (
          <span className="flex items-center gap-1 text-xs bg-red-500 text-white px-3 py-1 rounded-full font-semibold priority-badge">
            <Sparkles size={12} className="text-white" />
            <span className="text-white">Save First</span>
          </span>
        );
      case 'low-roi':
        return (
          <span className="text-xs bg-gray-600 text-white px-3 py-1 rounded-full font-semibold priority-badge">
            <span className="text-white">Low ROI</span>
          </span>
        );
      case 'needs-attention':
        return (
          <span className="flex items-center gap-1 text-xs bg-orange-500 text-white px-3 py-1 rounded-full font-semibold priority-badge">
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Decision Layer</h2>
          <p className="text-gray-400">Prioritize retention efforts by segment</p>
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

      <div className="space-y-4">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' }}
            className="bg-navy-900/50 border border-sky-500/20 rounded-lg p-5 cursor-pointer"
          >
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              {/* Segment Name & Count */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${segment.iconColor} flex items-center justify-center text-white shadow-lg`}>
                    {(() => {
                      const Icon = segment.icon;
                      return <Icon size={24} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{segment.name}</h3>
                    <p className="text-gray-400 text-sm">{segment.count.toLocaleString()} subscribers</p>
                  </div>
                </div>
              </div>

              {/* Churn Risk */}
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Churn Risk</p>
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-navy-700"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${segment.churnRisk * 1.76} 176`}
                      className={getRiskColor(segment.churnRisk)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-lg font-bold ${getRiskColor(segment.churnRisk)}`}>
                      {segment.churnRisk}%
                    </span>
                  </div>
                </div>
              </div>

              {/* CLTV */}
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">CLTV</p>
                <p className="text-white font-bold text-xl">{formatCurrency(segment.cltv)}</p>
              </div>

              {/* ROI */}
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">ROI</p>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp size={16} className="text-green-400" />
                  <p className="text-white font-bold text-xl">{segment.roi}×</p>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="md:col-span-1">
                <div className="space-y-2">
                  {getPriorityBadge(segment.priority)}
                  <div className="flex items-start gap-2 text-sm">
                    <Sparkles size={14} className="text-sky-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300">{segment.aiSuggestion}</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="md:col-span-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSegmentAction?.(segment)}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25"
                  aria-label={`Activate playbook for ${segment.name}`}
                >
                  <Rocket size={16} />
                  Activate Playbook
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
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

