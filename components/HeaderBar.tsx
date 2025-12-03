'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, AlertTriangle, DollarSign, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/providers';
import { useState, useEffect } from 'react';
import { formatChange, type MetricType } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  metricType: MetricType;
  icon: React.ReactNode;
  hasAIInsight?: boolean;
  tooltip?: string;
  gradient: string;
  filterId: string;
  onNavigateAnalyse?: (filterId: string) => void;
  onNavigateSubscribers?: () => void;
  onNavigateChurnRate?: () => void;
  onNavigateHighRisk?: () => void;
  onNavigateEarlyLifecycle?: () => void;
  onNavigateCltvCac?: () => void;
}

const MetricCard = ({
  title,
  value,
  change,
  metricType,
  icon,
  hasAIInsight,
  tooltip,
  gradient,
  filterId,
  onNavigateAnalyse,
  onNavigateSubscribers,
  onNavigateChurnRate,
  onNavigateHighRisk,
  onNavigateEarlyLifecycle,
  onNavigateCltvCac,
}: MetricCardProps) => {
  const changeDisplay = formatChange(change, metricType);
  const TrendIcon = changeDisplay.icon === 'up' ? TrendingUp : changeDisplay.icon === 'down' ? TrendingDown : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(14, 165, 233, 0.4)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        if (filterId === 'total-subscribers' && onNavigateSubscribers) {
          onNavigateSubscribers();
        } else if (filterId === 'monthly-churn' && onNavigateChurnRate) {
          onNavigateChurnRate();
        } else if (filterId === 'high-risk' && onNavigateHighRisk) {
          onNavigateHighRisk();
        } else if (filterId === 'early-lifecycle' && onNavigateEarlyLifecycle) {
          onNavigateEarlyLifecycle();
        } else if (filterId === 'cltv-cac' && onNavigateCltvCac) {
          onNavigateCltvCac();
        } else {
          onNavigateAnalyse?.(filterId);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (filterId === 'total-subscribers' && onNavigateSubscribers) {
            onNavigateSubscribers();
          } else if (filterId === 'monthly-churn' && onNavigateChurnRate) {
            onNavigateChurnRate();
          } else if (filterId === 'high-risk' && onNavigateHighRisk) {
            onNavigateHighRisk();
          } else if (filterId === 'early-lifecycle' && onNavigateEarlyLifecycle) {
            onNavigateEarlyLifecycle();
          } else if (filterId === 'cltv-cac' && onNavigateCltvCac) {
            onNavigateCltvCac();
          } else {
            onNavigateAnalyse?.(filterId);
          }
        }
      }}
      role="button"
      tabIndex={0}
      className={`glass-card relative flex h-[210px] cursor-pointer flex-col overflow-hidden rounded-xl p-6 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 group ${
        filterId === 'monthly-churn' || filterId === 'high-risk' || filterId === 'early-lifecycle'
          ? 'border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
          : 'border border-sky-500/20'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} kpi-icon-wrapper`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 ${changeDisplay.color}`}>
          {TrendIcon && <TrendIcon size={16} />}
          <span className="text-sm font-semibold">{changeDisplay.value}</span>
        </div>
      </div>
      
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white mb-3">{value}</p>
      
      {/* AI Insight Badge - Fixed position */}
      <div className="mt-auto">
        {hasAIInsight && (
          <div className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-sky-400 to-blue-500 text-white px-2 py-1 rounded-full">
            <Sparkles size={12} />
            <span>AI Insight</span>
          </div>
        )}
      </div>
      
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: 'auto' }}
          className="absolute bottom-3 left-3 right-3 pt-3 border-t border-sky-500/30 text-xs text-white hidden group-hover:block bg-gray-900/95 backdrop-blur-sm rounded-b-lg px-2 pb-2"
        >
          💡 {tooltip}
        </motion.div>
      )}
    </motion.div>
  );
};

interface HeaderBarProps {
  onNavigateAnalyse?: (filterId: string) => void;
  onNavigateSubscribers?: () => void;
  onNavigateChurnRate?: () => void;
  onNavigateHighRisk?: () => void;
  onNavigateEarlyLifecycle?: () => void;
  onNavigateCltvCac?: () => void;
}

export default function HeaderBar({
  onNavigateAnalyse,
  onNavigateSubscribers,
  onNavigateChurnRate,
  onNavigateHighRisk,
  onNavigateEarlyLifecycle,
  onNavigateCltvCac,
}: HeaderBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const metrics = [
    {
      title: 'Total Subscribers',
      value: '2.1M',
      change: 3,
      metricType: 'subscribers' as MetricType,
      icon: <Users size={24} />,
      hasAIInsight: false,
      gradient: 'from-blue-500 to-cyan-500',
      filterId: 'total-subscribers',
    },
    {
      title: 'Monthly Churn Rate',
      value: '1.52%',
      change: 4,
      metricType: 'churn' as MetricType,
      icon: <TrendingDown size={24} />,
      hasAIInsight: true,
      tooltip: 'Target 1.45%. Monitor billing drop-offs in week 3.',
      gradient: 'from-indigo-500 to-blue-500',
      filterId: 'monthly-churn',
    },
    {
      title: 'High-Risk Subscribers',
      value: '32.4K',
      change: 5,
      metricType: 'risk' as MetricType,
      icon: <AlertTriangle size={24} />,
      hasAIInsight: true,
      tooltip: 'Churn rising in first 45 days. Personalize onboarding.',
      gradient: 'from-red-500 to-orange-500',
      filterId: 'high-risk',
    },
    {
      title: 'Early Lifecycle Churn',
      value: '16.3%',
      change: 3,
      metricType: 'churn' as MetricType,
      icon: <Sparkles size={24} />,
      hasAIInsight: true,
      tooltip: '80% of churners show inactivity in first 6 weeks.',
      gradient: 'from-purple-500 to-pink-500',
      filterId: 'early-lifecycle',
    },
    {
      title: 'Avg CLTV / CAC',
      value: '3.4×',
      change: 5,
      metricType: 'roi' as MetricType,
      icon: <DollarSign size={24} />,
      hasAIInsight: false,
      gradient: 'from-green-500 to-emerald-500',
      filterId: 'cltv-cac',
    },
  ];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-white mb-1">Overview Metrics</h2>
        <p className="text-gray-400">
          Real-time key performance indicators powered by Salesforce Einstein
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard
              {...metric}
              onNavigateAnalyse={onNavigateAnalyse}
              onNavigateSubscribers={onNavigateSubscribers}
              onNavigateChurnRate={onNavigateChurnRate}
              onNavigateHighRisk={onNavigateHighRisk}
              onNavigateEarlyLifecycle={onNavigateEarlyLifecycle}
              onNavigateCltvCac={onNavigateCltvCac}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


