'use client';

import { motion } from 'framer-motion';
import { Baby, PersonStanding, TrendingUp, Rocket } from 'lucide-react';

interface Stage {
  name: string;
  description: string;
  completion: number;
  icon: React.ReactNode;
  color: string;
}

export default function MaturityTracker() {
  const stages: Stage[] = [
    {
      name: 'Crawl',
      description: 'Basic churn tracking, manual analysis',
      completion: 100,
      icon: <Baby size={24} />,
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: 'Walk',
      description: 'Segmentation, automated reporting',
      completion: 100,
      icon: <PersonStanding size={24} />,
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Run',
      description: 'Predictive AI live, A/B testing active',
      completion: 75,
      icon: <TrendingUp size={24} />,
      color: 'from-sky-400 to-cyan-600',
    },
    {
      name: 'Fly',
      description: 'Fully autonomous retention engine',
      completion: 30,
      icon: <Rocket size={24} />,
      color: 'from-purple-400 to-pink-600',
    },
  ];

  const currentStage = stages.findIndex(s => s.completion < 100);
  const overallProgress = stages.reduce((sum, s) => sum + s.completion, 0) / stages.length;

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Retention Maturity</h2>
          <p className="text-gray-400">Your journey to retention excellence</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-1">Overall Progress</p>
          <p className="text-3xl font-bold text-gradient">{Math.round(overallProgress)}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative h-3 bg-navy-900 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 rounded-full"
          />
        </div>
      </div>

      {/* Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Connector Line */}
            {index < stages.length - 1 && (
              <div className="hidden md:block absolute top-12 left-full w-full h-1 -ml-2 z-0">
                <div className="h-full bg-navy-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: stage.completion === 100 ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className={`h-full bg-gradient-to-r ${stage.color}`}
                  />
                </div>
              </div>
            )}

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative bg-navy-900/50 border-2 rounded-xl p-6 transition-all ${
                stage.completion === 100
                  ? 'border-green-500/50'
                  : index === currentStage
                  ? 'border-sky-400 shadow-glow'
                  : 'border-sky-500/20'
              }`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4 mx-auto`}>
                {stage.icon}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white text-center mb-2">{stage.name}</h3>

              {/* Description */}
              <p className="text-sm text-gray-400 text-center mb-4">{stage.description}</p>

              {/* Progress Circle */}
              <div className="relative w-20 h-20 mx-auto">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-navy-700"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${stage.completion * 2.26} 226`}
                    initial={{ strokeDasharray: '0 226' }}
                    animate={{ strokeDasharray: `${stage.completion * 2.26} 226` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={stage.completion === 100 ? 'text-green-400' : 'text-sky-400'}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{stage.completion}%</span>
                </div>
              </div>

              {/* Status Badge */}
              {stage.completion === 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}

              {index === currentStage && stage.completion < 100 && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-sky-400 rounded-full"
                >
                  <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Current Focus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-sky-500/10 border border-sky-500/30 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
            {stages[currentStage]?.icon}
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">Currently in &quot;{stages[currentStage]?.name}&quot; phase</p>
            <p className="text-gray-300 text-sm">{stages[currentStage]?.description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            View Roadmap
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

