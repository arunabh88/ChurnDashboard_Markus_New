'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import JourneyMap from '@/components/JourneyMap';
import { PriorityAlerts } from '@/components/dashboard/PriorityAlerts';

const HeaderBar = dynamic(() => import('@/components/HeaderBar'), { ssr: false });

interface DashboardViewProps {
  onNavigateAnalyse: (anchor?: string | null, mode?: 'overview' | 'segments' | 'trial-triggers' | 'new-users-triggers' | 'established-users-triggers') => void;
  onNavigateActions: (anchor?: string | null) => void;
  onNavigateSubscribers?: () => void;
}

export function DashboardView({ onNavigateAnalyse, onNavigateActions, onNavigateSubscribers }: DashboardViewProps) {
  return (
    <div className="space-y-10">
      <HeaderBar
        onNavigateAnalyse={(filterId) => {
          onNavigateAnalyse(filterId, 'overview');
        }}
        onNavigateSubscribers={onNavigateSubscribers}
      />

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl p-6"
        >
          <JourneyMap
            onStageAction={(stageName) => {
              if (stageName === 'Trial Users') {
                onNavigateAnalyse('trial-triggers', 'trial-triggers');
              } else if (stageName === 'New Users') {
                onNavigateAnalyse('new-users-triggers', 'new-users-triggers');
              } else if (stageName === 'Established Users') {
                onNavigateAnalyse('established-users-triggers', 'established-users-triggers');
              } else {
                onNavigateAnalyse('journey', 'segments');
              }
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

