'use client';

import { motion } from 'framer-motion';
import JourneyMap from '@/components/JourneyMap';

interface JourneyLensProps {
  onNavigateToPhase?: (phase: string) => void;
}

const phases = [
  {
    name: 'Trial',
    conversion: '32% → New',
    churn: '70%',
    triggers: ['Onboarding confusion', 'Low first-week engagement', 'Device activation issues'],
  },
  {
    name: 'New',
    conversion: '65% → Established',
    churn: '20%',
    triggers: ['Content discovery', 'Single-device usage', 'Billing retry friction'],
  },
  {
    name: 'Established',
    conversion: '99% retained',
    churn: '0.85%',
    triggers: ['Price sensitivity', 'Competitor offers', 'Life events'],
  },
];

export function JourneyLens({ onNavigateToPhase }: JourneyLensProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-sky-500/20 bg-navy-900/40 p-6 shadow-[0_0_32px_rgba(56,189,248,0.12)]">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">Journey Lens</p>
          <p className="text-xs text-gray-400 mt-1">
            Inspect handoffs and pressure points along the Trial → New → Established journey. Click a phase to drill into signals.
          </p>
        </div>
      </div>

      <JourneyMap
        onStageAction={(stage) => {
          onNavigateToPhase?.(stage);
        }}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-xl border border-sky-500/15 bg-sky-500/10 p-4"
          >
            <div className="flex items-center justify-between text-sm text-white">
              <span className="font-semibold">{phase.name}</span>
              <span className="text-xs text-sky-200">{phase.conversion}</span>
            </div>
            <p className="mt-1 text-xs text-sky-200/80">Churn: {phase.churn}</p>
            <div className="mt-3 space-y-1.5">
              {phase.triggers.map((trigger) => (
                <div key={trigger} className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-2 py-1 text-[11px] text-gray-200">
                  {trigger}
                </div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigateToPhase?.(phase.name)}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-100"
            >
              Analyse {phase.name} cohort
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

