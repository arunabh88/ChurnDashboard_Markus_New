'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronRight,
  MessageCircle,
  Send,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { DashboardSection } from '@/lib/data/dashboard';
import { useMemo, useState } from 'react';

interface AICoPilotPanelProps {
  open: boolean;
  section: DashboardSection;
  onClose: () => void;
}

const sectionPrompts: Record<
  DashboardSection,
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
      'Trial churn increased 5% this week. Recommend focusing on onboarding accelerators and loyalty signals for high-value subscribers.',
    suggestions: [
      'Why is trial churn spiking?',
      'Compare churn by acquisition channel',
      'Show segments with biggest CLTV risk',
    ],
    quickLinks: [
      { label: 'Open Journey View', href: '/analyse?view=journey' },
      { label: 'Create Trial Rescue Action', href: '/actions?create=trial-rescue' },
    ],
  },
  analyse: {
    title: 'Explain drivers & segments',
    summary:
      'Live engagement decline and billing failures are the two largest signal weights this week. Segment-level retention gaps widening for premium sports packages.',
    suggestions: [
      'Which signal is growing fastest?',
      'Segment churn vs predicted churn',
      'Recommend a retention simulation',
    ],
    quickLinks: [
      { label: 'View Signal Matrix', href: '#signal-matrix' },
      { label: 'Launch What-If Scenario', href: '/actions?create=scenario' },
    ],
  },
  actions: {
    title: 'Optimise retention playbooks',
    summary:
      'Three playbooks exceeded ROI targets. Loyalty discount is ready for scale. Consider cloning the starter playlist campaign for mobile cohorts.',
    suggestions: [
      'Which playbook had best lift?',
      'Show underperforming actions',
      'Draft a new cross-sell workflow',
    ],
    quickLinks: [
      { label: 'View Action History', href: '#action-history' },
      { label: 'Create New Action Plan', href: '/actions?create=custom' },
    ],
  },
};

export default function AICoPilotPanel({
  open,
  section,
  onClose,
}: AICoPilotPanelProps) {
  const [message, setMessage] = useState('');
  const content = sectionPrompts[section];

  const placeholder =
    section === 'home'
      ? 'Ask about priorities, churn spikes, or opportunities...'
      : section === 'analyse'
      ? 'Ask the AI to investigate signals, cohorts, or drivers...'
      : 'Ask for recommended actions, ROI insights, or new playbooks...';

  const suggestionChips = useMemo(
    () =>
      content.suggestions.map((suggestion) => (
        <button
          key={suggestion}
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
          type="button"
          onClick={() => setMessage(suggestion)}
        >
          {suggestion}
        </button>
      )),
    [content.suggestions]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="fixed bottom-0 right-0 top-[72px] z-40 w-full border-l border-slate-200 bg-white shadow-xl lg:w-[28rem]"
        >
          <div className="flex h-full flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-600">
                  <Sparkles size={16} />
                  AI Co-Pilot
                </p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {content.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
              >
                Hide
              </button>
            </header>

            <div className="flex-1 overflow-y-auto space-y-6 px-6 py-6">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">{content.summary}</p>
              </section>

              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Quick suggestions
                </p>
                <div className="flex flex-wrap gap-2">{suggestionChips}</div>
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
                  <li>• Analyse churn drivers across any segment or signal</li>
                  <li>• Generate retention playbooks and workflows</li>
                  <li>• Simulate retention scenarios and forecast impact</li>
                  <li>• Launch or clone actions directly from chat</li>
                </ul>
              </section>
            </div>

            <footer className="border-t border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm transition hover:bg-sky-700"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </footer>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

