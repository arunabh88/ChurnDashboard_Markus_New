'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Filter, PlayCircle, Sparkles, Lightbulb } from 'lucide-react';
import { KpiTrendOverview } from '@/components/analyse/KpiTrendOverview';
import { JourneyDrilldownView } from '@/components/analyse/JourneyDrilldownView';
import { CreateInterventionFlow } from '@/components/analyse/CreateInterventionFlow';
import MultiSignalMatrix from '@/components/MultiSignalMatrix';
import { DecisionSegmentsView } from '@/components/views/DecisionSegmentsView';
import DecisionLayer from '@/components/DecisionLayer';
import { ModelVsReal } from '@/components/analyse/ModelVsReal';
import { TrialTriggersDrilldown } from '@/components/analyse/TrialTriggersDrilldown';
import { NewUsersTriggersDrilldown } from '@/components/analyse/NewUsersTriggersDrilldown';
import { EstablishedUsersTriggersDrilldown } from '@/components/analyse/EstablishedUsersTriggersDrilldown';
import { ProblemContextSummary } from '@/components/analyse/ProblemContextSummary';

interface AnalyseViewProps {
  mode: 'overview' | 'segments' | 'trial-triggers' | 'new-users-triggers' | 'established-users-triggers';
  navigationSource?: 'dashboard' | 'analyse' | null;
  onLaunchPlaybook: () => void;
  onShowSegments: () => void;
  onBackToOverview: () => void;
  onNavigateToDrilldown?: (mode: 'trial-triggers' | 'new-users-triggers' | 'established-users-triggers') => void;
  onNavigateToDashboard?: () => void;
  focus?: string | null;
}

export function AnalyseView({
  mode,
  navigationSource,
  onLaunchPlaybook,
  onShowSegments,
  onBackToOverview,
  onNavigateToDrilldown,
  onNavigateToDashboard,
  focus,
}: AnalyseViewProps) {
  const [riskThreshold] = useState<number>(70);
  const [interventionFlowOpen, setInterventionFlowOpen] = useState(false);
  const [interventionStage, setInterventionStage] = useState<string>('');
  const [interventionTriggers, setInterventionTriggers] = useState<string[]>([]);

  const insightCallouts = useMemo(
    () => [
      'Churn intent is still clustering in the first 45 days post sign-up – onboarding content remains the biggest lever.',
      'Billing friction incidents fell 18% week-on-week after retry automation – maintain momentum before the next campaign cycle.',
      `If interventions trigger for segments ≥${riskThreshold}% risk, coverage extends to 41% of at-risk revenue with projected ROI of 3.1×.`,
    ],
    [riskThreshold]
  );

  useEffect(() => {
    if (!focus) return;
    const sectionMap: Record<string, string> = {
      'total-subscribers': 'analyse-kpis',
      'monthly-churn': 'analyse-kpis',
      'high-risk': 'analyse-matrix',
      'early-lifecycle': 'analyse-journey',
      'cltv-cac': 'analyse-kpis',
      trial: 'analyse-journey',
      cltv: 'analyse-kpis',
      journey: 'analyse-journey',
    };
    const targetId = sectionMap[focus] ?? focus;
    const node = document.getElementById(targetId);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [focus]);

  if (mode === 'segments') {
    return (
      <DecisionSegmentsView
        onBack={onBackToOverview}
        onLaunchPlaybook={onLaunchPlaybook}
      />
    );
  }

  const handleBackToJourneySection = () => {
    // Scroll to Journey Friction Analysis section
    const journeySection = document.getElementById('analyse-journey');
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Reset to overview mode to show Journey Friction Analysis
    onBackToOverview();
  };

  if (mode === 'trial-triggers') {
    return (
      <TrialTriggersDrilldown
        onBack={navigationSource === 'dashboard' ? onBackToOverview : handleBackToJourneySection}
        navigationSource={navigationSource}
        onNavigateToDashboard={onNavigateToDashboard}
        onCreatePlaybook={() => onLaunchPlaybook()}
      />
    );
  }

  if (mode === 'new-users-triggers') {
    return (
      <NewUsersTriggersDrilldown
        onBack={navigationSource === 'dashboard' ? onBackToOverview : handleBackToJourneySection}
        navigationSource={navigationSource}
        onNavigateToDashboard={onNavigateToDashboard}
        onCreatePlaybook={() => onLaunchPlaybook()}
      />
    );
  }

  if (mode === 'established-users-triggers') {
    return (
      <EstablishedUsersTriggersDrilldown
        onBack={navigationSource === 'dashboard' ? onBackToOverview : handleBackToJourneySection}
        navigationSource={navigationSource}
        onNavigateToDashboard={onNavigateToDashboard}
        onCreatePlaybook={() => onLaunchPlaybook()}
      />
    );
  }

  const handleViewDetails = (section: string) => {
    const sectionMap: Record<string, string> = {
      signals: 'analyse-matrix',
      journey: 'analyse-journey',
      decision: 'analyse-decision',
      kpis: 'analyse-kpis',
    };
    const targetId = sectionMap[section];
    if (targetId) {
      const node = document.getElementById(targetId);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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
            Dive into churn trends, signal drivers, and subscriber-level detail. Apply filters to
            isolate segments and send high-value cohorts directly into actions.
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
            onClick={onShowSegments}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/10"
          >
            <Sparkles size={16} />
            View Segment Portfolio
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLaunchPlaybook}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30"
          >
            <PlayCircle size={16} />
            Launch Action
          </motion.button>
        </div>
      </motion.div>

      {/* Problem Context Summary - First Priority */}
      <ProblemContextSummary
        onTakeAction={onLaunchPlaybook}
        onViewDetails={handleViewDetails}
      />

      {/* Section 1: Churn Signal Matrix - Highest Priority */}
      <motion.div id="analyse-matrix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <MultiSignalMatrix onNavigate={onLaunchPlaybook} />
      </motion.div>

      {/* Section 2: Journey Friction Points */}
      {/* Section 2: Journey Friction Points - Drill-Down View */}
      <motion.div id="analyse-journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }}>
        <JourneyDrilldownView
          onNavigateToDrilldown={(stage) => {
            if (onNavigateToDrilldown) {
              if (stage === 'trial') {
                onNavigateToDrilldown('trial-triggers');
              } else if (stage === 'new') {
                onNavigateToDrilldown('new-users-triggers');
              } else if (stage === 'established') {
                onNavigateToDrilldown('established-users-triggers');
              }
            }
          }}
          onCreateIntervention={(stage, triggers) => {
            setInterventionStage(stage);
            setInterventionTriggers(triggers);
            setInterventionFlowOpen(true);
          }}
        />
      </motion.div>

      {/* Section 3: Decision Layer (Segment Prioritization) */}
      <motion.div id="analyse-decision" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
        <DecisionLayer
          onViewSegments={onShowSegments}
          onSegmentAction={() => onLaunchPlaybook()}
          riskThreshold={riskThreshold}
        />
      </motion.div>

      {/* Section 4: KPI Trends & Model Performance */}
      <motion.div id="analyse-kpis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
        <KpiTrendOverview />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="rounded-2xl border border-sky-500/20 bg-navy-900/60 p-5 shadow-[0_12px_28px_rgba(15,118,210,0.2)]"
      >
        <div className="flex gap-3">
          <Lightbulb size={18} className="text-sky-200 mt-1" />
          <div className="space-y-2">
            {insightCallouts.map((callout) => (
              <p key={callout} className="text-sm text-sky-100 leading-relaxed">
                {callout}
              </p>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div id="analyse-model" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}>
        <ModelVsReal onTakeAction={onLaunchPlaybook} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="rounded-2xl border border-sky-500/20 bg-navy-900/60 p-5"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200">What-if summary</h3>
        <p className="mt-2 text-sm text-gray-300 leading-relaxed">
          At the current threshold of{' '}
          <span className="text-sky-200 font-semibold">{riskThreshold.toFixed(0)}%</span>, activating the top two segments delivers
          an estimated <span className="text-emerald-300 font-semibold">£540K</span> revenue save with <span className="text-emerald-300 font-semibold">3.1×</span>{' '}
          ROI. Dropping the threshold by 10 points increases coverage by <span className="text-sky-200 font-semibold">+18%</span>{' '}
          but dilutes ROI to <span className="text-orange-300 font-semibold">2.4×</span>. Use saved investigations to review
          alternate cohort focus before pushing changes to Act.
        </p>
      </motion.div>

      {/* Create Intervention Flow Modal */}
      <CreateInterventionFlow
        open={interventionFlowOpen}
        onClose={() => {
          setInterventionFlowOpen(false);
          setInterventionStage('');
          setInterventionTriggers([]);
        }}
        stage={interventionStage}
        triggers={interventionTriggers}
        onLaunchAction={() => {
          // Navigate to Act tab with pre-filled context
          onLaunchPlaybook();
        }}
      />
    </div>
  );
}

