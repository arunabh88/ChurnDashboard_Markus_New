'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Filter, PlayCircle, Sparkles, Lightbulb } from 'lucide-react';
import ChurnAnalysisPage from '@/components/ChurnAnalysisPage';
import MultiSignalMatrix from '@/components/MultiSignalMatrix';
import SubscribersPage from '@/components/SubscribersPage';
import AnalyticsPage from '@/components/AnalyticsPage';
import { DecisionSegmentsView } from '@/components/views/DecisionSegmentsView';
import DecisionLayer from '@/components/DecisionLayer';
import { AnalyseControls } from '@/components/analyse/AnalyseControls';

interface AnalyseViewProps {
  mode: 'overview' | 'segments';
  onLaunchPlaybook: () => void;
  onShowSegments: () => void;
  onBackToOverview: () => void;
  focus?: string | null;
}

export function AnalyseView({
  mode,
  onLaunchPlaybook,
  onShowSegments,
  onBackToOverview,
  focus,
}: AnalyseViewProps) {
  const [riskThreshold, setRiskThreshold] = useState<number>(70);

  const savedViews = useMemo(
    () => [
      {
        id: 'sports-trialists',
        name: 'Sports trialists – week 0-4',
        description: 'Focus on high-value sports audiences during onboarding.',
        lastViewed: '2h ago',
        filters: ['Sports bundle', 'Trial', 'UK', 'Mobile'],
      },
      {
        id: 'loyalty-stable',
        name: 'Loyalty renewals – price push',
        description: 'Established subscribers reacting to price test in EMEA.',
        lastViewed: 'Yesterday',
        filters: ['Established', 'EMEA', 'Price action'],
      },
    ],
    []
  );

  const insightCallouts = useMemo(
    () => [
      'Churn intent is still clustering in the first 45 days post sign-up – onboarding content remains the biggest lever.',
      'Billing friction incidents fell 18% week-on-week after retry automation – maintain momentum before the next campaign cycle.',
      `If interventions trigger for segments ≥${riskThreshold}% risk, coverage extends to 41% of at-risk revenue with projected ROI of 3.1×.`,
    ],
    [riskThreshold]
  );

  const handleLoadView = (view: (typeof savedViews)[number]) => {
    // Placeholder callback; in production we’d hydrate filters/query state.
    setRiskThreshold(view.id === 'sports-trialists' ? 75 : 60);
  };

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

      <AnalyseControls
        riskThreshold={riskThreshold}
        onRiskThresholdChange={setRiskThreshold}
        savedViews={savedViews}
        onLoadSavedView={handleLoadView}
        onLaunchPlaybook={onLaunchPlaybook}
      />

      <motion.div
        id="analyse-kpis"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <ChurnAnalysisPage />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-5"
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

      <motion.div id="analyse-matrix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <MultiSignalMatrix />
      </motion.div>

      <motion.div id="analyse-journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
        <DecisionLayer
          onViewSegments={onShowSegments}
          onSegmentAction={() => onLaunchPlaybook()}
          riskThreshold={riskThreshold}
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
        <SubscribersPage />
      </motion.div>

      <motion.div id="analyse-model" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}>
        <AnalyticsPage />
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
    </div>
  );
}

