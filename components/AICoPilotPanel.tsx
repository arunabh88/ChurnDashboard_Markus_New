'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lightbulb, ListChecks, MessageSquare } from 'lucide-react';

interface AICoPilotPanelProps {
  open: boolean;
}

const suggestions = [
  'Explain why trial churn increased',
  'Which KPIs deviated most this week?',
  'Summarise growth opportunities',
];

const smartLinks = [
  { label: 'Open Journey View', href: '/analyse?view=journey' },
  { label: 'Create Trial Rescue Playbook', href: '/actions?playbook=onboarding' },
];

const capabilities = [
  'Explain any KPI or trend variance',
  'Recommend next-best retention actions',
  'Generate playbooks and execution plans',
  'Analyse individual subscribers in context',
  'Run what-if simulations and forecasts',
  'Apply filters or launch workflows instantly',
];

export function AICoPilotPanel({ open }: AICoPilotPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 140, damping: 20 }}
          className="fixed right-0 top-0 z-40 h-screen w-full max-w-[420px] border-l border-slate-200 bg-white shadow-xl transition-colors duration-300 dark:border-slate-700 dark:bg-navy-900/95"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700/70">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">AI Co-Pilot</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Sky TV Retention Intelligence Agent
                </p>
              </div>
              <div className="rounded-full bg-sky-100 p-2 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                <Sparkles size={20} />
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <section className="space-y-3 rounded-2xl border border-slate-200 bg-sky-50/60 p-5 dark:border-sky-500/30 dark:bg-sky-500/10">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-white p-2 text-sky-600 dark:bg-slate-900 dark:text-sky-300">
                    <Lightbulb size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Today’s retention priorities
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Trial churn is trending +5%. Recommend activating onboarding concierge and loyalty
                      journeys for at-risk high value subscribers.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-navy-800/60">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <MessageSquare size={18} className="text-sky-500 dark:text-sky-300" />
                  Quick suggestions
                </h3>
                <div className="space-y-2">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 dark:border-slate-700 dark:bg-navy-900/70 dark:text-slate-300 dark:hover:border-sky-500/40 dark:hover:bg-navy-800/70 dark:hover:text-sky-200"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-navy-800/60">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <ListChecks size={18} className="text-sky-500 dark:text-sky-300" />
                  Smart links
                </h3>
                <div className="space-y-2">
                  {smartLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-sky-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 dark:border-slate-700 dark:bg-navy-900/70 dark:text-sky-300 dark:hover:border-sky-500/40 dark:hover:bg-navy-800/70 dark:hover:text-sky-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>

              <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-navy-800/60">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Co-Pilot abilities
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-300" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

