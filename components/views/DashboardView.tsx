'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { JourneySnapshot } from '@/components/dashboard/JourneySnapshot';
import { LaunchpadGrid } from '@/components/dashboard/LaunchpadGrid';
import { PriorityAlerts } from '@/components/dashboard/PriorityAlerts';

const HeaderBar = dynamic(() => import('@/components/HeaderBar'), { ssr: false });

interface DashboardViewProps {
  onNavigateAnalyse: (anchor?: string | null, mode?: 'overview' | 'segments') => void;
  onNavigateActions: (anchor?: string | null) => void;
}

export function DashboardView({ onNavigateAnalyse, onNavigateActions }: DashboardViewProps) {
  return (
    <div className="space-y-10">
      <HeaderBar
        onNavigateAnalyse={(filterId) => {
          onNavigateAnalyse(filterId, 'overview');
        }}
      />

      <div className="space-y-8">
        <JourneySnapshot
          onNavigate={() => {
            onNavigateAnalyse('journey', 'segments');
          }}
        />

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

        <LaunchpadGrid
          onNavigateAnalyse={() => onNavigateAnalyse(undefined, 'overview')}
          onNavigateAction={() => onNavigateActions('playbooks')}
        />
      </div>
    </div>
  );
}

