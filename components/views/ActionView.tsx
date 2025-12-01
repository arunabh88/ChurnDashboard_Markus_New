'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BellRing, Lightbulb, LineChart, PlusCircle, Rocket, ShieldCheck, Sparkles, Target } from 'lucide-react';
import ActionCenter from '@/components/ActionCenter';
import ABExperimentation from '@/components/ABExperimentation';
import ChurnValidation from '@/components/ChurnValidation';
import { ActionHistoryList } from '@/components/actions/ActionHistoryList';
import { CreateActionPlanWizard } from '@/components/actions/CreateActionPlanWizard';
import { PerformanceAlertBanner } from '@/components/actions/PerformanceAlertBanner';
import { ActionPerformanceDashboard } from '@/components/actions/ActionPerformanceDashboard';

interface ActionViewProps {
  onOpenNewAction: () => void;
  focus?: string | null;
  onReviewSegment?: (segment: string) => void;
}

export function ActionView({ onOpenNewAction, focus, onReviewSegment }: ActionViewProps) {
  const actionListRef = useRef<HTMLDivElement | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardDefaultSegment, setWizardDefaultSegment] = useState<string | null>(null);
  const kpiTiles = useMemo(
    () => [
      { label: 'At-risk value protected', value: '$1.2M', delta: '+18% vs last 30 days', icon: <ShieldCheck size={18} className="text-emerald-300" /> },
      { label: 'Projected churn this month', value: '1.52%', delta: 'Target 1.45%', icon: <Target size={18} className="text-sky-300" /> },
      { label: 'Avg campaign ROI', value: '2.9×', delta: '+0.3 vs forecast', icon: <LineChart size={18} className="text-amber-300" /> },
    ],
    []
  );

  const nextBestActions = useMemo(
    () => [
      {
        title: 'Extend concierge outreach',
        impact: '+2.1% lift',
        detail: 'Trials with low engagement between day 7-14 respond best to personalised welcome calls.',
      },
      {
        title: 'Price reassurance nudge',
        impact: '+1.4% lift',
        detail: 'Push messaging to price-sensitive cohort ahead of competitor launch next week.',
      },
      {
        title: 'Sports highlights reel',
        impact: '+0.9% lift',
        detail: 'Use AI-curated recap for high engagement sports fans who skipped last live event.',
      },
    ],
    []
  );

  const workflowReminders = useMemo(
    () => [
      { title: 'Creative approval: “Sports Fan Exclusive Week”', due: 'Due in 2 days', owner: 'Marketing Ops' },
      { title: 'Data quality check: Sentiment feed drift', due: 'Due tomorrow', owner: 'Data Science' },
      { title: 'Budget uplift request: Loyalty credits', due: 'Awaiting Finance sign-off', owner: 'Finance' },
    ],
    []
  );

  useEffect(() => {
    if (!focus) return;
    const focusMap: Record<
      string,
      { anchor: string; wizardSegment?: string; autoOpenWizard?: boolean }
    > = {
      'trial-intervention': { anchor: 'actions-playbooks', wizardSegment: 'trial', autoOpenWizard: true },
      'ab-test': { anchor: 'actions-experiments' },
      campaigns: { anchor: 'actions-campaigns' },
    };
    const target = focusMap[focus] ?? { anchor: focus };
    if (target.wizardSegment) {
      setWizardDefaultSegment(target.wizardSegment);
    }
    if (target.autoOpenWizard && !wizardOpen) {
      setWizardOpen(true);
    }
    const node = document.getElementById(target.anchor);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [focus, wizardOpen]);

  const problemContext = useMemo(
    () => ({
      challenges: [
        'Trial churn spike: 2,100 users at risk',
        'Price sensitivity affecting 28,500 established users',
        'Competitor offers impacting 18,900 subscribers',
      ],
      strategy: [
        'Focus: Onboarding playbooks for Trial segment',
        'Next: Loyalty programs for Established segment',
        'Monitor: Competitor response campaigns',
      ],
    }),
    []
  );

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Retain, Intervene & Measure</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Activate AI-recommended actions, configure interventions, and monitor performance across loyalty, onboarding,
            re-engagement, and pricing strategies.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setWizardOpen(true);
              onOpenNewAction();
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30"
          >
            <PlusCircle size={16} />
            Create New Action
          </motion.button>
        </div>
      </motion.div>

      {/* Performance Alert Banner - First Priority */}
      <PerformanceAlertBanner
        onViewDetails={(alertId) => {
          actionListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onPauseUnderperforming={() => {
          // Handle pause underperforming campaigns
          actionListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      {/* Action Performance Dashboard */}
      <ActionPerformanceDashboard
        onViewAll={() => {
          actionListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onPauseUnderperforming={() => {
          actionListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onCloneWinning={() => {
          setWizardOpen(true);
          onOpenNewAction();
        }}
      />

      {/* Problem Context Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="glass-card rounded-xl border border-sky-500/20 p-6"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Problem Context & Tackling Strategy</p>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2">Current Challenges</p>
            <ul className="space-y-2">
              {problemContext.challenges.map((challenge, index) => (
                <li key={index} className="text-sm text-white flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2">Tackling Strategy</p>
            <ul className="space-y-2">
              {problemContext.strategy.map((item, index) => (
                <li key={index} className="text-sm text-white flex items-start gap-2">
                  <span className="text-sky-400 mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="actions-kpis"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {kpiTiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4 shadow-[0_0_24px_rgba(56,189,248,0.12)]"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-sky-500/40 bg-sky-500/15 p-2">{tile.icon}</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">{tile.label}</p>
                <p className="text-lg font-bold text-white">{tile.value}</p>
                <p className="text-[11px] text-sky-200/70 mt-1">{tile.delta}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Section 1: Action History & Performance - Highest Priority */}
      <div ref={actionListRef} id="actions-history">
        <ActionHistoryList
          onReviewSegment={onReviewSegment}
          onPauseCampaign={(actionName) => {
            console.log('Pause campaign:', actionName);
            // Handle pause campaign
          }}
          onCloneCampaign={(actionName) => {
            setWizardOpen(true);
            onOpenNewAction();
            console.log('Clone campaign:', actionName);
          }}
        />
      </div>

      {/* Section 2: AI-Recommended Next Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="grid gap-4 lg:grid-cols-2"
      >
        <div className="rounded-2xl border border-sky-500/20 bg-navy-900/60 p-5 shadow-[0_10px_24px_rgba(15,118,210,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-200 flex items-center gap-2">
            <Lightbulb size={16} />
            Next-best actions (AI)
          </p>
          <div className="mt-4 space-y-4">
            {nextBestActions.map((action) => (
              <div key={action.title} className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white text-sm font-semibold">{action.title}</h4>
                  <span className="text-xs text-emerald-300 font-semibold">{action.impact}</span>
                </div>
                <p className="mt-2 text-xs text-gray-300 leading-relaxed">{action.detail}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setWizardOpen(true);
                    onOpenNewAction();
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-100"
                >
                  Create Action
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-sky-500/20 bg-navy-900/60 p-5 shadow-[0_10px_24px_rgba(15,118,210,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-200 flex items-center gap-2">
            <BellRing size={16} />
            Workflow reminders
          </p>
          <div className="mt-4 space-y-4">
            {workflowReminders.map((reminder) => (
              <div key={reminder.title} className="rounded-xl border border-sky-500/25 bg-navy-900/70 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white text-sm font-semibold">{reminder.title}</h4>
                  <span className="text-xs text-sky-200">{reminder.due}</span>
                </div>
                <p className="mt-2 text-xs text-sky-100/80">Owner: {reminder.owner}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-100"
                >
                  Open task
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 3: Recommended Playbooks */}
      <motion.div id="actions-playbooks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
        <ActionCenter />
      </motion.div>

      {/* Section 4: A/B Experimentation */}
      <motion.div
        id="actions-experiments"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <ABExperimentation />
      </motion.div>

      {/* Section 5: Model Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        <ChurnValidation />
      </motion.div>


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

      <CreateActionPlanWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        defaultSegment={wizardDefaultSegment}
        onComplete={() => {
          actionListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
    </div>
  );
}

