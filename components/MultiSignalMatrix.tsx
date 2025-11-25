'use client';

import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { Database, Activity, MessageSquare, Zap, Target, Heart } from 'lucide-react';

interface Signal {
  dimension: string;
  keySignal: string;
  source: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  weight: number;
  icon: React.ReactNode;
}

export default function MultiSignalMatrix() {
  const signals: Signal[] = [
    {
      dimension: 'Engagement',
      keySignal: 'Drop in live TV hours',
      source: 'Usage Logs',
      severity: 'critical',
      weight: 24,
      icon: <Activity size={20} />,
    },
    {
      dimension: 'Billing',
      keySignal: 'Payment method expired',
      source: 'Payment API',
      severity: 'high',
      weight: 18,
      icon: <Database size={20} />,
    },
    {
      dimension: 'Sentiment',
      keySignal: 'Negative support interactions',
      source: 'NLP Analysis',
      severity: 'high',
      weight: 16,
      icon: <MessageSquare size={20} />,
    },
    {
      dimension: 'Experience',
      keySignal: 'Buffering incidents increased',
      source: 'Quality Metrics',
      severity: 'medium',
      weight: 14,
      icon: <Zap size={20} />,
    },
    {
      dimension: 'Competitor',
      keySignal: 'Price comparison searches',
      source: 'Web Analytics',
      severity: 'medium',
      weight: 13,
      icon: <Target size={20} />,
    },
    {
      dimension: 'Loyalty',
      keySignal: 'Reduced referral activity',
      source: 'CRM Data',
      severity: 'low',
      weight: 15,
      icon: <Heart size={20} />,
    },
  ];

  const radarData = [
    { dimension: 'Engagement', value: 85 },
    { dimension: 'Billing', value: 70 },
    { dimension: 'Sentiment', value: 65 },
    { dimension: 'Experience', value: 60 },
    { dimension: 'Competitor', value: 55 },
    { dimension: 'Loyalty', value: 75 },
  ];

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Multi-Signal Churn Matrix</h2>
        <p className="text-gray-400">Understanding why subscribers leave</p>
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


