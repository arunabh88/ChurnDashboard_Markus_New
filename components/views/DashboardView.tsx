'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import JourneyMap from '@/components/JourneyMap';
import DecisionLayer from '@/components/DecisionLayer';
import { TopSignalsHighlight } from '@/components/dashboard/TopSignalsHighlight';

const HeaderBar = dynamic(() => import('@/components/HeaderBar'), { ssr: false });

interface DashboardViewProps {
  onNavigate: (tab: 'analyse' | 'act') => void;
  onViewSegments: () => void;
  onStageAction: (stage: string) => void;
}

export function DashboardView({ onNavigate, onViewSegments, onStageAction }: DashboardViewProps) {
  return (
    <div className="space-y-10">
      <HeaderBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-xl p-6"
      >
        <JourneyMap onStageAction={onStageAction} />
      </motion.div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <TopSignalsHighlight onExploreAnalyse={() => onNavigate('analyse')} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="glass-card rounded-xl border border-sky-500/20 bg-navy-900/40 p-6 shadow-[0_0_30px_rgba(56,189,248,0.18)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">
                  Active Retention Campaigns
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-4xl font-black text-white">8</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-green-300 bg-green-500/15 border border-green-500/30 rounded-full px-2 py-0.5">
                    Running
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  Covering <span className="font-semibold text-white">3 priority segments</span> across{' '}
                  <span className="font-semibold text-white">Entertainment, Sports, and Broadband</span>. Week-over-week uplift
                  tracking at <span className="font-semibold text-green-300">+6.4%</span>.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-sky-200/80">
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1">
                Loyalty rescue • High value
              </span>
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1">
                Trial onboarding surge
              </span>
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1">
                Content re-engagement
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('act')}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
            >
              Review Campaigns
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DecisionLayer onViewSegments={onViewSegments} onSegmentAction={() => onNavigate('act')} />
        </motion.div>
      </div>
    </div>
  );
}

