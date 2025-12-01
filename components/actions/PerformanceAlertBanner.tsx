'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, ArrowRight, TrendingDown, DollarSign, Target } from 'lucide-react';

interface PerformanceAlert {
  id: string;
  type: 'underperforming' | 'on-track' | 'at-risk';
  message: string;
  actionName?: string;
  expectedLift?: string;
  actualLift?: string;
  variance?: string;
}

interface PerformanceAlertBannerProps {
  alerts: PerformanceAlert[];
  onViewDetails?: (alertId: string) => void;
  onPauseUnderperforming?: () => void;
}

const DEFAULT_ALERTS: PerformanceAlert[] = [
  {
    id: '1',
    type: 'underperforming',
    message: 'Loyalty Discount Campaign: Expected +12%, Actual +4.2% - Review needed',
    actionName: 'Loyalty Discount Campaign',
    expectedLift: '+12%',
    actualLift: '+4.2%',
    variance: '-7.8%',
  },
  {
    id: '2',
    type: 'on-track',
    message: '6 campaigns meeting or exceeding targets',
  },
  {
    id: '3',
    type: 'at-risk',
    message: '2 campaigns approaching budget limit',
  },
];

export function PerformanceAlertBanner({
  alerts = DEFAULT_ALERTS,
  onViewDetails,
  onPauseUnderperforming,
}: PerformanceAlertBannerProps) {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'underperforming':
        return 'bg-red-500/20 border-red-500/40 text-red-300';
      case 'on-track':
        return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
      case 'at-risk':
        return 'bg-amber-500/20 border-amber-500/40 text-amber-300';
      default:
        return 'bg-sky-500/20 border-sky-500/40 text-sky-300';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'underperforming':
        return <AlertTriangle size={20} />;
      case 'on-track':
        return <CheckCircle size={20} />;
      case 'at-risk':
        return <Clock size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  const underperformingAlerts = alerts.filter((a) => a.type === 'underperforming');
  const onTrackAlerts = alerts.filter((a) => a.type === 'on-track');
  const atRiskAlerts = alerts.filter((a) => a.type === 'at-risk');

  return (
    <div className="space-y-3">
      {/* Underperforming Alerts */}
      {underperformingAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-xl border p-4 ${getAlertStyle('underperforming')}`}
        >
          <div className="flex items-start gap-3">
            {getIcon('underperforming')}
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">Underperforming Actions</p>
              {underperformingAlerts.map((alert) => (
                <div key={alert.id} className="mb-2 last:mb-0">
                  <p className="text-xs">{alert.message}</p>
                  {alert.expectedLift && alert.actualLift && (
                    <div className="mt-1 flex items-center gap-4 text-xs">
                      <span>Expected: {alert.expectedLift}</span>
                      <span>Actual: {alert.actualLift}</span>
                      <span className="font-semibold">Variance: {alert.variance}</span>
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onViewDetails?.(underperformingAlerts[0].id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/20 transition-colors"
                >
                  Review Details
                  <ArrowRight size={12} />
                </motion.button>
                {onPauseUnderperforming && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onPauseUnderperforming}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/20 transition-colors"
                  >
                    Pause Underperforming
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* On-Track Summary */}
      {onTrackAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-xl border p-4 ${getAlertStyle('on-track')}`}
        >
          <div className="flex items-center gap-3">
            {getIcon('on-track')}
            <p className="text-sm font-semibold">{onTrackAlerts[0].message}</p>
          </div>
        </motion.div>
      )}

      {/* At-Risk Alerts */}
      {atRiskAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl border p-4 ${getAlertStyle('at-risk')}`}
        >
          <div className="flex items-center gap-3">
            {getIcon('at-risk')}
            <p className="text-sm font-semibold">{atRiskAlerts[0].message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

