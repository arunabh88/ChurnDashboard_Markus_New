'use client';

import { motion } from 'framer-motion';
import { PlusCircle, Sparkles, Rocket } from 'lucide-react';
import ActionCenter from '@/components/ActionCenter';
import ABExperimentation from '@/components/ABExperimentation';
import ChurnValidation from '@/components/ChurnValidation';
import { ActionHistoryList } from '@/components/actions/ActionHistoryList';

interface ActionViewProps {
  onOpenNewAction: () => void;
  onAskCopilot: () => void;
}

export function ActionView({ onOpenNewAction, onAskCopilot }: ActionViewProps) {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Retain, Intervene & Measure</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Activate AI-recommended playbooks, configure interventions, and monitor performance across loyalty, onboarding,
            re-engagement, and pricing strategies.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenNewAction}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30"
          >
            <PlusCircle size={16} />
            Create New Action
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAskCopilot}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/10"
          >
            <Sparkles size={16} />
            Ask AI Co-Pilot
          </motion.button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <ActionCenter />
      </motion.div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <ABExperimentation />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChurnValidation />
        </motion.div>
      </div>

      <ActionHistoryList />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl border border-sky-500/25 bg-navy-900/40 p-6 shadow-[0_0_30px_rgba(56,189,248,0.25)]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Rocket size={18} className="text-sky-400" />
              Automate Retention Workflows
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              Schedule, simulate, and auto-scale interventions with Einstein Copilot orchestrations.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAskCopilot}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/10"
          >
            Launch Automation
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

