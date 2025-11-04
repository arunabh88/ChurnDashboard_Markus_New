'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface JourneyPhase {
  name: string;
  days: string;
  riskLevel: 'low' | 'medium' | 'high';
  churnRate: number;
  triggers: string[];
}

export default function JourneyMap() {
  const phases: JourneyPhase[] = [
    {
      name: 'Trial / Activation',
      days: '0-30 days',
      riskLevel: 'high',
      churnRate: 28,
      triggers: ['No content consumed', 'Setup incomplete', 'Device not activated'],
    },
    {
      name: 'Engagement',
      days: '30-90 days',
      riskLevel: 'medium',
      churnRate: 15,
      triggers: ['Declining watch time', 'No favorite content', 'Single device usage'],
    },
    {
      name: 'Established',
      days: '90+ days',
      riskLevel: 'low',
      churnRate: 7,
      triggers: ['Price sensitivity', 'Competitor offers', 'Life events'],
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500/20 border-red-500 text-red-400';
      case 'medium': return 'bg-orange-500/20 border-orange-500 text-orange-400';
      case 'low': return 'bg-green-500/20 border-green-500 text-green-400';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-400';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <XCircle size={20} />;
      case 'medium': return <AlertCircle size={20} />;
      case 'low': return <CheckCircle size={20} />;
      default: return null;
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Subscriber Journey Map</h2>
          <p className="text-gray-400">Understanding when subscribers churn</p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 bg-sky-500/20 border border-sky-500 rounded-lg px-4 py-2"
        >
          <Lightbulb size={20} className="text-sky-400" />
          <div className="text-sm">
            <p className="text-sky-400 font-semibold">AI Insight</p>
            <p className="text-gray-300">80% of churners show inactivity in the first 6 weeks</p>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-green-500 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-navy-900 z-10 ${getRiskColor(phase.riskLevel).split(' ')[0]}`} />

              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className={`border-2 rounded-xl p-6 mt-16 ${getRiskColor(phase.riskLevel)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getRiskIcon(phase.riskLevel)}
                    <h3 className="text-xl font-bold">{phase.name}</h3>
                  </div>
                  <span className="text-2xl font-bold">{phase.churnRate}%</span>
                </div>

                <p className="text-sm mb-4 opacity-80">{phase.days}</p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase opacity-70">Key Triggers:</p>
                  {phase.triggers.map((trigger, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="mt-1">•</span>
                      <span>{trigger}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


