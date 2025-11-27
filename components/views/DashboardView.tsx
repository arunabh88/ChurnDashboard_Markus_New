'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import JourneyMap from '@/components/JourneyMap';
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
        <TopSignalsHighlight onExploreAnalyse={() => onNavigate('analyse')} />
      </div>
    </div>
  );
}

