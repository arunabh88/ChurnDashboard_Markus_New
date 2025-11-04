'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, AlertTriangle, DollarSign, Activity, Sparkles } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  hasAIInsight?: boolean;
  tooltip?: string;
}

const MetricCard = ({ title, value, change, icon, hasAIInsight, tooltip }: MetricCardProps) => {
  const isPositive = change > 0;
  const isNegativeMetric = title.includes('Risk') || title.includes('Churn');
  const trendColor = isNegativeMetric ? (isPositive ? 'text-red-400' : 'text-green-400') : (isPositive ? 'text-green-400' : 'text-red-400');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(14, 165, 233, 0.4)' }}
      className="glass-card rounded-xl p-6 relative overflow-hidden group cursor-pointer"
    >
      {hasAIInsight && (
        <div className="absolute top-3 right-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1 text-xs bg-gradient-to-r from-sky-400 to-blue-500 text-white px-2 py-1 rounded-full"
          >
            <Sparkles size={12} />
            <span>AI Insight</span>
          </motion.div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
          {icon}
        </div>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          {isNegativeMetric ? (isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />) : (isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />)}
          <span className="text-sm font-semibold">{Math.abs(change)}%</span>
        </div>
      </div>
      
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
      
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-sky-500/20 text-xs text-sky-300 hidden group-hover:block"
        >
          💡 {tooltip}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function HeaderBar() {
  const metrics = [
    {
      title: 'Total Subscribers',
      value: '2.1M',
      change: 3,
      icon: <Users size={24} />,
      hasAIInsight: false,
    },
    {
      title: 'High-Risk Segment',
      value: '42K',
      change: 9,
      icon: <AlertTriangle size={24} />,
      hasAIInsight: true,
      tooltip: 'Churn rising in first 45 days. Personalize onboarding.',
    },
    {
      title: 'CLTV/CAC Ratio',
      value: '3.4',
      change: 5,
      icon: <DollarSign size={24} />,
      hasAIInsight: false,
    },
    {
      title: 'Engagement Score',
      value: '69%',
      change: -2,
      icon: <Activity size={24} />,
      hasAIInsight: true,
      tooltip: 'Drop in live TV viewing hours detected.',
    },
    {
      title: 'Early Lifecycle Churn',
      value: '16%',
      change: 4,
      icon: <TrendingDown size={24} />,
      hasAIInsight: true,
      tooltip: '80% of churners show inactivity in first 6 weeks.',
    },
  ];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-bold text-gradient mb-2">
          Sky TV Retention Intelligence
        </h1>
        <p className="text-gray-400 text-lg">
          Powered by Salesforce Einstein · Real-time predictive analytics
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


