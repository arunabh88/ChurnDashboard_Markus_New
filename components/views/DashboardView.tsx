'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import JourneyMap from '@/components/JourneyMap';
import { KpiPulseBar } from '@/components/dashboard/KpiPulseBar';
import { PriorityAlerts } from '@/components/dashboard/PriorityAlerts';

const HeaderBar = dynamic(() => import('@/components/HeaderBar'), { ssr: false });

interface DashboardViewProps {
  onNavigateAnalyse: (anchor?: string | null, mode?: 'overview' | 'segments') => void;
  onNavigateActions: (anchor?: string | null) => void;
}

export function DashboardView({ onNavigateAnalyse, onNavigateActions }: DashboardViewProps) {
  return (
    <div className="space-y-10">
      <HeaderBar />

      <div className="space-y-8">
        <KpiPulseBar
          onNavigateAnalyse={(filterId) => {
            onNavigateAnalyse(filterId, 'overview');
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl p-6"
        >
          <JourneyMap
            onStageAction={() => {
              onNavigateAnalyse('journey', 'segments');
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PriorityAlerts
            onNavigateAnalyse={(anchor) => onNavigateAnalyse(anchor, 'overview')}
            onNavigateActions={onNavigateActions}
          />
        </motion.div>
      </div>
    </div>
  );
}

