'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Rocket, Sparkles, ArrowRight } from 'lucide-react';
import ActionCenter from '@/components/ActionCenter';
import ABExperimentation from '@/components/ABExperimentation';
import ChurnValidation from '@/components/ChurnValidation';
import { ActionHistoryList } from '@/components/actions/ActionHistoryList';

interface ActionViewProps {
  onOpenNewAction: () => void;
}

export function ActionView({ onOpenNewAction }: ActionViewProps) {
  const actionListRef = useRef<HTMLDivElement | null>(null);

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
            Activate AI-recommended actions, configure interventions, and monitor performance across loyalty, onboarding,
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
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl border border-sky-500/20 bg-navy-900/40 p-6 shadow-[0_0_30px_rgba(56,189,248,0.18)]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">
                Active Retention Campaigns
              </p>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-4xl font-black text-white">8</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-green-300 bg-green-500/15 border border-green-500/30 rounded-full px-2 py-0.5">
                  Running
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Covering <span className="font-semibold text-white">3 priority segments</span> across{' '}
                <span className="font-semibold text-white">Entertainment, Sports, and Broadband</span>. Week-over-week uplift
                tracking at <span className="font-semibold text-green-300">+6.4%</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-sky-200/80">
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1">
              Loyalty rescue • High value
            </span>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1">
              Trial onboarding surge
            </span>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1">
              Content re-engagement
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => actionListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <Sparkles size={16} />
            Review Campaigns
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
        <ActionCenter />
      </motion.div>

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
        transition={{ delay: 0.18 }}
      >
        <ChurnValidation />
      </motion.div>

      <div ref={actionListRef}>
        <ActionHistoryList />
      </div>

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
          <p className="text-xs text-gray-500">Managed through Einstein Copilot automations</p>
        </div>
      </motion.div>
    </div>
  );
}

