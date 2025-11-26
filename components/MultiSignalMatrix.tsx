'use client';

import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { Database, Activity, MessageSquare, Zap, Target, Heart, Sparkles } from 'lucide-react';
import { CHURN_SIGNALS, CHURN_RADAR_DATA, type ChurnSignal } from '@/lib/data/churnSignals';
import { type ReactNode } from 'react';
import Link from 'next/link';

interface SignalWithIcon extends ChurnSignal {
  icon: ReactNode;
}

const dimensionIcon = (dimension: string) => {
  switch (dimension) {
    case 'Engagement':
      return <Activity size={20} />;
    case 'Billing':
      return <Database size={20} />;
    case 'Sentiment':
      return <MessageSquare size={20} />;
    case 'Experience':
      return <Zap size={20} />;
    case 'Competitor':
      return <Target size={20} />;
    case 'Loyalty':
      return <Heart size={20} />;
    default:
      return <Activity size={20} />;
  }
};

export default function MultiSignalMatrix() {
  const signals: SignalWithIcon[] = CHURN_SIGNALS.map((signal) => ({
    ...signal,
    icon: dimensionIcon(signal.dimension),
  }));

  const radarData = CHURN_RADAR_DATA;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Multi-Signal Churn Matrix</h2>
          <p className="text-gray-400">Understanding why subscribers leave</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/actions"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:from-sky-400 hover:to-blue-500 transition-colors"
            aria-label="Take action on churn signals"
          >
            <Sparkles size={16} />
            Take Action
          </Link>
        </motion.div>
      </div>

      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sky-500/30">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Dimension</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Key Signal</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Source</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold text-sm">Severity</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold text-sm">Weight %</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((signal, index) => (
                <motion.tr
                  key={signal.dimension}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(56, 189, 248, 0.05)' }}
                  className="border-b border-sky-500/10"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sky-400">{signal.icon}</span>
                      <span className="text-white font-medium">{signal.dimension}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{signal.keySignal}</td>
                  <td className="py-4 px-4">
                    <span className="text-xs bg-navy-800 text-sky-300 px-2 py-1 rounded source-tag">
                      {signal.source}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase ${getSeverityColor(signal.severity)}`}>
                      {signal.severity}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-white font-semibold">{signal.weight}%</td>
                  <td className="py-4 px-4 text-right">
                    {['critical', 'high', 'medium'].includes(signal.severity) ? (
                      <Link
                        href={{
                          pathname: '/actions',
                          query: { focus: signal.dimension.toLowerCase() },
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
                      >
                        <Sparkles size={14} />
                        Take Action
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-500">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-navy-900/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Churn Intent Profile</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#38bdf8" strokeOpacity={0.3} />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
              <Radar
                name="Risk Score"
                dataKey="value"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.6}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


