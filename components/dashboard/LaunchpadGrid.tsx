'use client';

import { motion } from 'framer-motion';
import { LineChart, Rocket, Sparkles } from 'lucide-react';

interface LaunchpadGridProps {
  onNavigateAnalyse: () => void;
  onNavigateAction: () => void;
}

const CARDS = [
  {
    id: 'analyse',
    title: 'Deep dive into churn drivers',
    description: 'Inspect trends, journey leakages, and segment signals before they escalate.',
    icon: <LineChart size={20} />,
    cta: 'Open Analyse Workspace',
    accent: 'from-sky-500 to-blue-500',
  },
  {
    id: 'action',
    title: 'Launch retention interventions',
    description: 'Activate AI-suggested playbooks or configure a custom rescue plan.',
    icon: <Rocket size={20} />,
    cta: 'Go to Action Center',
    accent: 'from-violet-500 to-fuchsia-500',
  },
];

export function LaunchpadGrid({ onNavigateAnalyse, onNavigateAction }: LaunchpadGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
        <Sparkles size={14} />
        Launchpads
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {CARDS.map((card, index) => {
          const handleClick = card.id === 'analyse' ? onNavigateAnalyse : onNavigateAction;
          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={handleClick}
              className="group glass-card flex h-full flex-col justify-between rounded-xl border border-sky-500/25 p-5 text-left shadow-[0_12px_32px_rgba(8,47,73,0.28)] transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
            >
              <div>
                <div className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${card.accent} px-3 py-1 text-xs font-semibold text-white shadow-[0_8px_16px_rgba(59,130,246,0.3)]`}>
                  {card.icon}
                  Quick Path
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">{card.description}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                {card.cta}
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                  →
                </motion.span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}


