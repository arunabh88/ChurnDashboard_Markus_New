'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface StatItem {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

interface SummaryStatsBarProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4 | 5;
}

export function SummaryStatsBar({ stats, columns = 5 }: SummaryStatsBarProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`grid grid-cols-2 ${gridCols[columns]} gap-4`}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-xl p-4 border border-sky-500/20"
        >
          <div className="flex items-center gap-2 mb-2">
            {stat.icon && <div className="text-sky-400">{stat.icon}</div>}
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-bold ${stat.color || 'text-white'}`}>
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </p>
            {stat.trend && stat.trendValue && (
              <span
                className={`text-xs font-semibold ${
                  stat.trend === 'up'
                    ? 'text-red-400'
                    : stat.trend === 'down'
                      ? 'text-green-400'
                      : 'text-gray-400'
                }`}
              >
                {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'} {stat.trendValue}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

