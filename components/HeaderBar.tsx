'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, AlertTriangle, DollarSign, Activity, Sparkles, Sun, Moon } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { useTheme } from '@/app/providers';
import { useState, useEffect } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  hasAIInsight?: boolean;
  tooltip?: string;
  gradient: string;
}

const MetricCard = ({ title, value, change, icon, hasAIInsight, tooltip, gradient }: MetricCardProps) => {
  const isPositive = change > 0;
  const isNegativeMetric = title.includes('Risk') || title.includes('Churn');
  const trendColor = isNegativeMetric ? (isPositive ? 'text-red-400' : 'text-green-400') : (isPositive ? 'text-green-400' : 'text-red-400');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(14, 165, 233, 0.4)' }}
      className="glass-card rounded-xl p-6 relative overflow-hidden group cursor-pointer h-[200px] flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} kpi-icon-wrapper`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          {isNegativeMetric ? (isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />) : (isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />)}
          <span className="text-sm font-semibold">{Math.abs(change)}%</span>
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

export default function HeaderBar() {
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
      icon: <Users size={24} />,
      hasAIInsight: false,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'High-Risk Segment',
      value: '42K',
      change: 9,
      icon: <AlertTriangle size={24} />,
      hasAIInsight: true,
      tooltip: 'Churn rising in first 45 days. Personalize onboarding.',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      title: 'CLTV/CAC Ratio',
      value: '3.4',
      change: 5,
      icon: <DollarSign size={24} />,
      hasAIInsight: false,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Engagement Score',
      value: '69%',
      change: -2,
      icon: <Activity size={24} />,
      hasAIInsight: true,
      tooltip: 'Drop in live TV viewing hours detected.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Early Lifecycle Churn',
      value: '16%',
      change: 4,
      icon: <TrendingDown size={24} />,
      hasAIInsight: true,
      tooltip: '80% of churners show inactivity in first 6 weeks.',
      gradient: 'from-orange-500 to-yellow-500',
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
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


