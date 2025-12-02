'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, LineChart, PlusCircle, Rocket, ShieldCheck, Sparkles, Target } from 'lucide-react';
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
    () => [
      {
        id: 'trial-churn',
        challenge: 'Trial churn spike: 2,100 users at risk',
        strategy: 'Focus: Onboarding playbooks for Trial segment',
      },
      {
        id: 'price-sensitivity',
        challenge: 'Price sensitivity affecting 28,500 established users',
        strategy: 'Next: Loyalty programs for Established segment',
      },
      {
        id: 'competitor-offers',
        challenge: 'Competitor offers impacting 18,900 subscribers',
        strategy: 'Monitor: Competitor response campaigns',
      },
    ],
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
        className="space-y-4"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-sky-200">Problem Context & Tackling Strategy</h2>
        <div className="space-y-3">
          {problemContext.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
              className="group glass-card rounded-xl border border-sky-500/20 p-4 lg:p-5 hover:border-sky-500/40 hover:shadow-[0_8px_24px_rgba(14,165,233,0.2)] transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-4">
                {/* Challenge Section */}
                <div className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 p-3 lg:p-4">
                  <div className="flex items-start gap-2.5 lg:gap-3">
                    <div className="rounded-lg border border-red-500/40 bg-red-500/20 p-1.5 lg:p-2 flex-shrink-0">
                      <AlertTriangle size={16} className="lg:w-[18px] lg:h-[18px] text-red-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-red-300 mb-1">Challenge</p>
                      <p className="text-sm text-white leading-relaxed">{item.challenge}</p>
                    </div>
                  </div>
                </div>

                {/* Connector Arrow */}
                <div className="flex items-center justify-center flex-shrink-0 px-2">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.3 }}
                    className="hidden lg:flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-red-500/20 to-sky-500/20 border border-sky-500/30"
                    aria-label="Connects challenge to strategy"
                  >
                    <ArrowRight size={18} className="lg:w-5 lg:h-5 text-sky-400" aria-hidden="true" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.3 }}
                    className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-red-500/20 to-sky-500/20 border border-sky-500/30"
                    aria-label="Connects challenge to strategy"
                  >
                    <ArrowRight size={14} className="text-sky-400 rotate-90" aria-hidden="true" />
                  </motion.div>
                </div>

                {/* Strategy Section */}
                <div className="flex-1 rounded-lg border border-sky-500/30 bg-sky-500/10 p-3 lg:p-4">
                  <div className="flex items-start gap-2.5 lg:gap-3">
                    <div className="rounded-lg border border-sky-500/40 bg-sky-500/20 p-1.5 lg:p-2 flex-shrink-0">
                      <Target size={16} className="lg:w-[18px] lg:h-[18px] text-sky-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-sky-300 mb-1">Strategy</p>
                      <p className="text-sm text-white leading-relaxed">{item.strategy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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

      {/* Section 2: Recommended Playbooks */}
      <motion.div id="actions-playbooks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
        <ActionCenter />
      </motion.div>

      {/* Section 3: A/B Experimentation */}
      <motion.div
        id="actions-experiments"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <ABExperimentation />
      </motion.div>

      {/* Section 4: Model Performance */}
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

