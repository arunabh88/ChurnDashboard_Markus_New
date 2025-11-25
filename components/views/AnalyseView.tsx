'use client';

import { motion } from 'framer-motion';
import { Filter, PlayCircle, Sparkles } from 'lucide-react';
import ChurnAnalysisPage from '@/components/ChurnAnalysisPage';
import MultiSignalMatrix from '@/components/MultiSignalMatrix';
import SubscribersPage from '@/components/SubscribersPage';
import AnalyticsPage from '@/components/AnalyticsPage';

interface AnalyseViewProps {
  onLaunchPlaybook: () => void;
  onAskCopilot: () => void;
}

export function AnalyseView({ onLaunchPlaybook, onAskCopilot }: AnalyseViewProps) {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Analyse Retention Signals</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Dive into churn trends, signal drivers, and subscriber-level detail. Apply filters to isolate segments and send
            high-value cohorts directly into playbooks.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200"
          >
            <Filter size={16} />
            Advanced Filters
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAskCopilot}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/10"
          >
            <Sparkles size={16} />
            Ask AI Co-Pilot
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLaunchPlaybook}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30"
          >
            <PlayCircle size={16} />
            Launch Playbook
          </motion.button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <ChurnAnalysisPage />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <MultiSignalMatrix />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <SubscribersPage />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <AnalyticsPage />
      </motion.div>
    </div>
  );
}

