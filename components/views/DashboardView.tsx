'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import JourneyMap from '@/components/JourneyMap';
import DecisionLayer from '@/components/DecisionLayer';
import ActionCenter from '@/components/ActionCenter';
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
        className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-navy-900/80 to-navy-950/60 p-1 shadow-[0_0_40px_rgba(15,118,210,0.25)]"
      >
        <JourneyMap onStageAction={onStageAction} />
      </motion.div>

      <div className="space-y-8">
        <TopSignalsHighlight onExploreAnalyse={() => onNavigate('analyse')} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DecisionLayer onViewSegments={onViewSegments} onSegmentAction={() => onNavigate('act')} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <ActionCenter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-sky-500/25 bg-navy-900/40 p-6 shadow-[0_0_30px_rgba(56,189,248,0.25)]"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200">AI Co-Pilot</h3>
          <p className="text-xl font-bold text-white mt-2">Ask for a strategy</p>
          <p className="text-gray-300 text-sm mt-2">
            &ldquo;Where should I focus this week?&rdquo; or &ldquo;Launch a loyalty rescue for high-value sports fans.&rdquo;
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('act')}
            className="mt-5 inline-flex items-center justify-center rounded-lg border border-sky-500/40 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/10"
          >
            Jump to Actions
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

