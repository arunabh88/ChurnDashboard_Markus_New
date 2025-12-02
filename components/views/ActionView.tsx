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
      { label: 'At-risk value protected', value: '$1.2M', delta: '+18% vs last 30 days', icon: <ShieldCheck size={18} className="text-white" /> },
      { label: 'Projected churn this month', value: '1.52%', delta: 'Target 1.45%', icon: <Target size={18} className="text-white" /> },
      { label: 'Avg campaign ROI', value: '2.9×', delta: '+0.3 vs forecast', icon: <LineChart size={18} className="text-white" /> },
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

      {/* Problem Context Summary - Tabular View */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-white mb-1">Problem Context & Tackling Strategy</h2>
        <div className="glass-card rounded-xl border border-sky-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy-900/50 border-b border-sky-500/20">
                <tr>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Challenge</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Strategy</th>
                </tr>
              </thead>
              <tbody>
                {problemContext.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="border-b border-sky-500/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg border border-red-500/40 bg-red-500/20 p-2 flex-shrink-0">
                          <AlertTriangle size={16} className="text-red-400" />
                        </div>
                        <p className="text-sm text-white leading-relaxed">{item.challenge}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg border border-sky-500/40 bg-sky-500/20 p-2 flex-shrink-0">
                          <Target size={16} className="text-sky-400" />
                        </div>
                        <p className="text-sm text-white leading-relaxed">{item.strategy}</p>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
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

