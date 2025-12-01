'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { PlayCircle, Sparkles } from 'lucide-react';
import { KpiTrendOverview } from '@/components/analyse/KpiTrendOverview';
import MultiSignalMatrix from '@/components/MultiSignalMatrix';
import { DecisionSegmentsView } from '@/components/views/DecisionSegmentsView';
import DecisionLayer from '@/components/DecisionLayer';
import { ModelVsReal } from '@/components/analyse/ModelVsReal';
import { JourneyDiagnostics } from '@/components/analyse/JourneyDiagnostics';
import { SegmentFilters } from '@/components/analyse/SegmentFilters';
import SubscribersPage from '@/components/SubscribersPage';

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
      signals: 'analyse-matrix',
      model: 'analyse-model',
      segments: 'analyse-segments',
    };
    const targetId = sectionMap[focus] ?? focus;
    const node = targetId ? document.getElementById(targetId) : null;
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
          <h1 className="text-2xl font-bold text-white">Analyse Retention Signals</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Understand where churn is emerging, diagnose drivers across the journey, and prioritise segments ready for
            intervention.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
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

      <motion.div id="analyse-kpis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <KpiTrendOverview />
      </motion.div>

      <JourneyDiagnostics onNavigateAction={onLaunchPlaybook} />

      <motion.div id="analyse-matrix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <MultiSignalMatrix />
      </motion.div>

      <motion.div id="analyse-model" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
        <ModelVsReal onRequestAction={onLaunchPlaybook} />
      </motion.div>

      <motion.div id="analyse-segments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <SegmentFilters />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
        <DecisionLayer
          onViewSegments={onShowSegments}
          onSegmentAction={() => onLaunchPlaybook()}
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
        <SubscribersPage />
      </motion.div>
    </div>
  );
}

