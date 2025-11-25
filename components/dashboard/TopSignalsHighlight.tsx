'use client';

import { motion } from 'framer-motion';
import { ArrowRightCircle, Flame } from 'lucide-react';
import { CHURN_SIGNALS } from '@/lib/data/churnSignals';

interface TopSignalsHighlightProps {
  onExploreAnalyse?: () => void;
}

const severityStyles: Record<string, string> = {
  critical: 'text-red-300 bg-red-500/10 border-red-500/40',
  high: 'text-orange-300 bg-orange-500/10 border-orange-500/40',
  medium: 'text-yellow-200 bg-yellow-500/10 border-yellow-500/30',
  low: 'text-green-200 bg-green-500/10 border-green-500/30',
};

export function TopSignalsHighlight({ onExploreAnalyse }: TopSignalsHighlightProps) {
  const topSignals = [...CHURN_SIGNALS]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-300">
            <Flame size={16} />
            Hot Churn Signals
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">What’s driving churn right now</h2>
          <p className="text-gray-400 text-sm mt-2">
            Top weighted risks across the lifecycle. Investigate segments and trigger mitigations.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExploreAnalyse}
          className="hidden sm:flex items-center gap-2 text-sm font-semibold text-sky-300 border border-sky-500/40 px-4 py-2 rounded-lg hover:bg-sky-500/10 transition-colors"
        >
          Explore in Analyse
          <ArrowRightCircle size={18} />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topSignals.map((signal, index) => (
          <motion.div
            key={signal.dimension}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="rounded-xl border border-sky-500/15 bg-navy-900/40 p-5 shadow-[0_0_20px_rgba(15,118,210,0.15)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full border ${severityStyles[signal.severity] ?? severityStyles.medium}`}>
                {signal.severity}
              </span>
              <span className="text-sm font-semibold text-sky-300">{signal.weight}% weight</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{signal.dimension}</h3>
            <p className="text-sm text-gray-300 mt-2 leading-relaxed">{signal.keySignal}</p>
            <p className="mt-4 text-xs text-sky-200/80 uppercase tracking-wide">
              Source: <span className="text-sky-300 font-semibold">{signal.source}</span>
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onExploreAnalyse}
        className="sm:hidden mt-6 w-full flex items-center justify-center gap-2 text-sm font-semibold text-sky-200 bg-sky-500/20 border border-sky-500/40 px-4 py-3 rounded-lg"
      >
        Explore in Analyse
        <ArrowRightCircle size={18} />
      </motion.button>
    </motion.div>
  );
}

