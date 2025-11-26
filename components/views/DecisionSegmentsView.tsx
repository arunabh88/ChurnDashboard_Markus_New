'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Layers, Rocket, Sparkles, Target } from 'lucide-react';
import { RETENTION_SEGMENTS } from '@/lib/data/segments';
import { SegmentIcon } from '@/components/SegmentIcon';
import { formatCurrency } from '@/lib/utils';

interface DecisionSegmentsViewProps {
  onBack: () => void;
  onLaunchPlaybook: () => void;
}

export function DecisionSegmentsView({ onBack, onLaunchPlaybook }: DecisionSegmentsViewProps) {
  const segments = RETENTION_SEGMENTS;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/10 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Analyse overview
          </button>
          <h1 className="mt-3 text-3xl font-bold text-white">Segment Portfolio Intelligence</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Drill into segment personas, retention levers, and predicted lift. Activate AI-powered actions straight from this
            workspace or return to the overview to continue diagnostics.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200"
          >
            <Filter size={16} />
            Segment Filters
          </button>
          <button
            type="button"
            onClick={onLaunchPlaybook}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30"
          >
            <Rocket size={16} />
            Launch Action
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-navy-900/70 to-navy-950/50 p-6 shadow-[0_0_40px_rgba(56,189,248,0.2)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Portfolio at a glance</h3>
            <p className="text-4xl font-bold text-white">
              {segments.reduce((acc, item) => acc + item.count, 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-2">total subscribers represented across AI prioritised segments</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Revenue at stake</h3>
            <p className="text-4xl font-bold text-sky-300">
              {formatCurrency(segments.reduce((acc, item) => acc + item.cltv * item.count, 0))}
            </p>
            <p className="text-xs text-gray-400 mt-2">estimated CLTV protected by executing next-best actions</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">AI recommendation score</h3>
            <p className="text-4xl font-bold text-emerald-300">92%</p>
            <p className="text-xs text-gray-400 mt-2">confidence that current actions deliver target lift per segment</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="glass-card rounded-2xl border border-sky-500/25 p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <SegmentIcon icon={segment.icon} gradient={segment.iconGradient} size="lg" />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-semibold text-white">{segment.name}</h2>
                    <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200">
                      <Sparkles size={14} />
                      {segment.priority === 'save-first'
                        ? 'Save first'
                        : segment.priority === 'needs-attention'
                        ? 'Needs attention'
                        : 'Low ROI'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{segment.persona}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-200">
                <Layers size={16} />
                {segment.count.toLocaleString()} subscribers in segment
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-400">Churn risk</p>
                <p className="mt-2 text-2xl font-bold text-red-300">{segment.churnRisk}%</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-400">CLTV</p>
                <p className="mt-2 text-2xl font-bold text-sky-200">{formatCurrency(segment.cltv)}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-400">ROI potential</p>
                <p className="mt-2 text-2xl font-bold text-emerald-300">{segment.roi}×</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-400">Expected lift</p>
                <p className="mt-2 text-lg font-semibold text-purple-300">{segment.expectedLift}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4">
                <p className="text-xs uppercase tracking-wide text-sky-300 mb-2">AI Recommended Action</p>
                <p className="text-sm text-sky-100">{segment.recommendedAction}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-3">
                <Target size={20} className="text-sky-300" />
                <p className="text-xs text-gray-300">
                  {segment.aiSuggestion}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-gray-400">
                Einstein Copilot can launch this action automatically, or you can customise audience rules before
                activating.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLaunchPlaybook}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                >
                  <Rocket size={16} />
                  Activate Action
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

