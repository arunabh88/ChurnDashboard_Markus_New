'use client';

import { motion } from 'framer-motion';
import { FlaskConical, TrendingUp, DollarSign, Lightbulb, CheckCircle, Clock } from 'lucide-react';

interface Experiment {
  name: string;
  retentionLift: number;
  roi: number;
  insight: string;
  status: 'completed' | 'running' | 'planned';
  participants: number;
}

export default function ABExperimentation() {
  const experiments: Experiment[] = [
    {
      name: 'Free Month Offer',
      retentionLift: 12,
      roi: 2.8,
      insight: 'Best for price-sensitive users in 30-60 day window',
      status: 'completed',
      participants: 8400,
    },
    {
      name: 'Personalized Playlist',
      retentionLift: 10,
      roi: 3.1,
      insight: 'Strong for content fatigue segment, esp. drama viewers',
      status: 'completed',
      participants: 6200,
    },
    {
      name: 'Loyalty Points Program',
      retentionLift: 8,
      roi: 2.5,
      insight: 'Moderate impact, works for established subscribers',
      status: 'running',
      participants: 4100,
    },
    {
      name: 'Early Renewal Discount',
      retentionLift: 0,
      roi: 0,
      insight: 'Testing on high-value loyalists segment',
      status: 'planned',
      participants: 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
            <CheckCircle size={12} />
            Completed
          </span>
        );
      case 'running':
        return (
          <span className="flex items-center gap-1 text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
            <Clock size={12} />
            Running
          </span>
        );
      case 'planned':
        return (
          <span className="text-xs bg-gray-600/20 text-gray-400 px-3 py-1 rounded-full border border-gray-600/30">
            Planned
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <FlaskConical size={28} className="text-sky-400" />
            A/B Experimentation
          </h2>
          <p className="text-gray-400">Test. Learn. Optimize retention strategies.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-glow"
        >
          + New Experiment
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiments.map((experiment, index) => (
          <motion.div
            key={experiment.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-navy-900/50 border border-sky-500/20 rounded-xl p-6 relative overflow-hidden"
          >
            {/* Background decoration */}
            {experiment.status === 'completed' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
            )}

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{experiment.name}</h3>
                  {getStatusBadge(experiment.status)}
                </div>
                {experiment.status !== 'planned' && (
                  <FlaskConical size={24} className="text-sky-400" />
                )}
              </div>

              {experiment.status !== 'planned' ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-green-400" />
                        <p className="text-gray-400 text-xs">Retention Lift</p>
                      </div>
                      <p className="text-2xl font-bold text-green-400">+{experiment.retentionLift}%</p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign size={16} className="text-blue-400" />
                        <p className="text-gray-400 text-xs">ROI</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-400">{experiment.roi}×</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mb-3">
                    <Lightbulb size={16} className="text-sky-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-300">{experiment.insight}</p>
                  </div>

                  <div className="pt-3 border-t border-sky-500/10">
                    <p className="text-xs text-gray-400">
                      {experiment.participants.toLocaleString()} participants
                      {experiment.status === 'running' && ' • 67% complete'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-400 mb-4">{experiment.insight}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-sky-500/20 border border-sky-500 text-sky-400 px-6 py-2 rounded-lg font-semibold"
                  >
                    Configure Test
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insight Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl"
      >
        <div className="flex items-center gap-3">
          <Lightbulb size={24} className="text-purple-400" />
          <div>
            <p className="text-white font-semibold">Experiment. Learn. Iterate.</p>
            <p className="text-gray-300 text-sm">
              Continuous testing has improved retention by <span className="text-purple-400 font-bold">+24%</span> over 6 months
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

