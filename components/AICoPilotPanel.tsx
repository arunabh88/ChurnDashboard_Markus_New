'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, MessageCircle, Send, Sparkles, Workflow } from 'lucide-react';
import { useMemo, useState } from 'react';

type DashboardTab = 'home' | 'analyse' | 'action';

interface PanelProps {
  open: boolean;
  tab: DashboardTab;
  onClose: () => void;
}

const tabContent: Record<
  DashboardTab,
  {
    title: string;
    summary: string;
    suggestions: string[];
    quickLinks: { label: string; href: string }[];
  }
> = {
  home: {
    title: 'Today’s retention priorities',
    summary:
      'Trial churn is trending +5%. Recommend activating onboarding concierge and loyalty journeys for at-risk high value subscribers.',
    suggestions: [
      'Explain why trial churn increased',
      'Which KPIs deviated most this week?',
      'Summarise growth opportunities',
    ],
    quickLinks: [
      { label: 'Open Journey View', href: '/analyse?view=journey' },
      { label: 'Create Trial Rescue Playbook', href: '/actions?playbook=onboarding' },
    ],
  },
  analyse: {
    title: 'Deep dive into churn drivers',
    summary:
      'Engagement and billing signals carry 42% of the weighted risk. Segment variance highest on Sports Premium customers acquired in Q1.',
    suggestions: [
      'Show segment level churn hotspots',
      'What is impacting CLTV trend?',
      'Recommend filters for billing issues',
    ],
    quickLinks: [
      { label: 'Review Signal Matrix', href: '#signal-matrix' },
      { label: 'Inspect Sports Premium Cohort', href: '/analyse?view=subscriber-drilldown&segment=sports' },
    ],
  },
  action: {
    title: 'Launch high-impact playbooks',
    summary:
      'Four playbooks exceed ROI threshold. Loyalty Discount ready for scale, while Trial Concierge requires additional creative testing.',
    suggestions: [
      'Which playbook has strongest ROI?',
      'Clone last successful campaign',
      'Draft new action for price sensitive users',
    ],
    quickLinks: [
      { label: 'View Action History', href: '#action-history' },
      { label: 'Open Playbook Wizard', href: '/actions?playbook=new' },
    ],
  },
};

export default function AICoPilotPanel({ open, tab, onClose }: PanelProps) {
  const [message, setMessage] = useState('');
  const content = tabContent[tab];

  const placeholder = useMemo(() => {
    switch (tab) {
      case 'home':
        return 'Ask about KPIs, churn spikes, or opportunities…';
      case 'analyse':
        return 'Ask to investigate signals, cohorts, or drivers…';
      default:
        return 'Ask for next best action, playbooks, or ROI insights…';
    }
  }, [tab]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="fixed bottom-0 right-0 top-[76px] z-30 w-full border-l border-slate-200 bg-white shadow-xl lg:w-[28rem]"
        >
          <div className="flex h-full flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-600">
                  <Sparkles size={16} />
                  AI Co-Pilot
                </p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">{content.title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                Hide
              </button>
            </header>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">{content.summary}</p>
              </section>

              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Quick suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {content.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setMessage(suggestion)}
                      className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Smart links
                </p>
                <div className="space-y-2">
                  {content.quickLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} />
                    </a>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Workflow size={14} />
                  Co-Pilot abilities
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Explain any KPI or trend variance</li>
                  <li>• Recommend next-best retention actions</li>
                  <li>• Generate playbooks and execution plans</li>
                  <li>• Analyse individual subscribers in context</li>
                  <li>• Run what-if simulations and forecasts</li>
                  <li>• Apply filters or launch workflows instantly</li>
                </ul>
              </section>
            </div>

            <footer className="border-t border-slate-200 bg-white px-6 py-4">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setMessage('');
                }}
                className="flex items-center gap-3"
              >
                <div className="flex grow items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                  <MessageCircle size={18} className="text-slate-400" />
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={placeholder}
                    className="w-full border-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm transition hover:bg-sky-700"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </form>
            </footer>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

