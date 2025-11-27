'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Clock, Save } from 'lucide-react';

interface SavedView {
  id: string;
  name: string;
  description: string;
  lastViewed: string;
  filters: string[];
}

interface AnalyseControlsProps {
  riskThreshold: number;
  onRiskThresholdChange: (value: number) => void;
  savedViews: SavedView[];
  onLoadSavedView: (view: SavedView) => void;
  onLaunchPlaybook: () => void;
}

export function AnalyseControls({
  riskThreshold,
  onRiskThresholdChange,
  savedViews,
  onLoadSavedView,
  onLaunchPlaybook,
}: AnalyseControlsProps) {
  const riskLabel = useMemo(() => {
    if (riskThreshold >= 80) return 'Critical only';
    if (riskThreshold >= 60) return 'High & critical';
    if (riskThreshold >= 40) return 'Medium breadth';
    return 'Broader view';
  }, [riskThreshold]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 rounded-2xl border border-sky-500/25 bg-navy-900/50 p-6 shadow-[0_0_32px_rgba(56,189,248,0.15)] lg:flex-row"
    >
      <div className="flex-1 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-200 flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Decision Controls
        </p>
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Include segments with churn risk ≥</span>
            <span className="text-sky-200 font-semibold">{riskThreshold.toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={90}
            step={5}
            value={riskThreshold}
            onChange={(event) => onRiskThresholdChange(Number(event.target.value))}
            className="mt-3 w-full accent-sky-400"
          />
          <p className="mt-2 text-xs text-gray-400">
            Mode: <span className="text-sky-200 font-semibold">{riskLabel}</span>. Adjust to understand how widening the net
            impacts intervention volume and ROI expectations.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onLaunchPlaybook}
          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
        >
          Launch tailored playbook
        </motion.button>
      </div>

      <div className="flex-1 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-200 flex items-center gap-2">
          <Save size={16} />
          Saved Investigations
        </p>
        <div className="space-y-3">
          {savedViews.map((view) => (
            <motion.div
              key={view.id}
              whileHover={{ scale: 1.01 }}
              className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{view.name}</p>
                  <p className="text-xs text-gray-400">{view.description}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-sky-200">
                  <Clock size={14} />
                  {view.lastViewed}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-sky-200/80">
                {view.filters.map((filter) => (
                  <span key={filter} className="rounded-full border border-sky-500/30 bg-sky-500/20 px-2 py-0.5">
                    {filter}
                  </span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onLoadSavedView(view)}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-100"
              >
                Reopen investigation
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

