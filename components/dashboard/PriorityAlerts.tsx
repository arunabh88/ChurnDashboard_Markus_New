'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, FlaskConical, TrendingDown } from 'lucide-react';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  primaryCtaLabel: string;
  primaryAction: () => void;
  secondaryCtaLabel?: string;
  secondaryAction?: () => void;
}

interface PriorityAlertsProps {
  onNavigateAnalyse: (anchor?: string) => void;
  onNavigateActions: (anchor?: string) => void;
}

export function PriorityAlerts({ onNavigateAnalyse, onNavigateActions }: PriorityAlertsProps) {
  const alerts: AlertItem[] = [
    {
      id: 'trial-spike',
      title: 'Trial churn up +5% — 2,100 trial users at High Risk',
      description: 'Churn pressure is highest in Trial & New — focus onboarding + reactivation.',
      icon: <TrendingDown size={18} />,
      primaryCtaLabel: 'Analyse',
      primaryAction: () => onNavigateAnalyse('trial'),
      secondaryCtaLabel: 'Create Action',
      secondaryAction: () => onNavigateActions('trial-intervention'),
    },
    {
      id: 'cltv-loss',
      title: 'High CLTV churn spike — potential loss $1.2M',
      description: 'Premium loyalty cohort signalling competitor switching; review pricing assurances.',
      icon: <AlertTriangle size={18} />,
      primaryCtaLabel: 'Analyse',
      primaryAction: () => onNavigateAnalyse('cltv'),
    },
    {
      id: 'ab-test',
      title: 'A/B Test Winner — discount outperforming email 3.1× ROI',
      description: 'Roll out the winning variant to price-sensitive segments and monitor uplift weekly.',
      icon: <FlaskConical size={18} />,
      primaryCtaLabel: 'View in Actions',
      primaryAction: () => onNavigateActions('ab-test'),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
        <AlertTriangle size={16} />
        Priority Alerts
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card rounded-2xl border border-sky-500/30 p-5 shadow-[0_12px_32px_rgba(8,47,73,0.2)]"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-full border border-sky-500/40 bg-sky-500/15 p-2 text-sky-200">
                {alert.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-white leading-snug">{alert.title}</h4>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">{alert.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={alert.primaryAction}
                    className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-100 hover:bg-sky-500/25 transition-colors"
                  >
                    {alert.primaryCtaLabel}
                  </button>
                  {alert.secondaryCtaLabel && alert.secondaryAction && (
                    <button
                      type="button"
                      onClick={alert.secondaryAction}
                      className="inline-flex items-center gap-2 rounded-lg border border-sky-500/20 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/10 transition-colors"
                    >
                      {alert.secondaryCtaLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

