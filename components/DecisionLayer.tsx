'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, DollarSign, Sparkles, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Segment {
  name: string;
  churnRisk: number;
  cltv: number;
  roi: number;
  aiSuggestion: string;
  priority: 'save-first' | 'low-roi' | 'needs-attention';
  count: number;
}

export default function DecisionLayer() {
  const segments: Segment[] = [
    {
      name: 'High-value loyalists',
      churnRisk: 76,
      cltv: 620,
      roi: 3.2,
      aiSuggestion: 'Loyalty discount + exclusive content',
      priority: 'save-first',
      count: 8400,
    },
    {
      name: 'Price-sensitive',
      churnRisk: 83,
      cltv: 180,
      roi: 2.5,
      aiSuggestion: 'Flexible plan + ad-supported tier',
      priority: 'needs-attention',
      count: 15200,
    },
    {
      name: 'Content-fatigued',
      churnRisk: 69,
      cltv: 240,
      roi: 3.1,
      aiSuggestion: 'Recommend new series + personalized playlists',
      priority: 'save-first',
      count: 6800,
    },
    {
      name: 'Tech-frustrated',
      churnRisk: 71,
      cltv: 210,
      roi: 2.8,
      aiSuggestion: 'Proactive support + device upgrade offer',
      priority: 'needs-attention',
      count: 4200,
    },
    {
      name: 'Competitive shoppers',
      churnRisk: 88,
      cltv: 150,
      roi: 2.1,
      aiSuggestion: 'Price match + bundle discount',
      priority: 'low-roi',
      count: 9600,
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'save-first':
        return (
          <span className="flex items-center gap-1 text-xs bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
            <Sparkles size={12} />
            Save First
          </span>
        );
      case 'low-roi':
        return (
          <span className="text-xs bg-gray-600 text-gray-300 px-3 py-1 rounded-full font-semibold">
            Low ROI
          </span>
        );
      case 'needs-attention':
        return (
          <span className="flex items-center gap-1 text-xs bg-orange-500 text-white px-3 py-1 rounded-full font-semibold">
            <AlertCircle size={12} />
            Needs Attention
          </span>
        );
      default:
        return null;
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'text-red-400';
    if (risk >= 70) return 'text-orange-400';
    return 'text-yellow-400';
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Decision Layer</h2>
          <p className="text-gray-400">Prioritize retention efforts by segment</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-glow"
        >
          <Sparkles size={20} />
          View All Segments
          <ArrowRight size={20} />
        </motion.button>
      </div>

      <div className="space-y-4">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' }}
            className="bg-navy-900/50 border border-sky-500/20 rounded-lg p-5 cursor-pointer"
          >
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              {/* Segment Name & Count */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    {segment.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{segment.name}</h3>
                    <p className="text-gray-400 text-sm">{segment.count.toLocaleString()} subscribers</p>
                  </div>
                </div>
              </div>

              {/* Churn Risk */}
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Churn Risk</p>
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-navy-700"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${segment.churnRisk * 1.76} 176`}
                      className={getRiskColor(segment.churnRisk)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-lg font-bold ${getRiskColor(segment.churnRisk)}`}>
                      {segment.churnRisk}%
                    </span>
                  </div>
                </div>
              </div>

              {/* CLTV */}
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">CLTV</p>
                <p className="text-white font-bold text-xl">{formatCurrency(segment.cltv)}</p>
              </div>

              {/* ROI */}
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">ROI</p>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp size={16} className="text-green-400" />
                  <p className="text-white font-bold text-xl">{segment.roi}×</p>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="md:col-span-1">
                <div className="space-y-2">
                  {getPriorityBadge(segment.priority)}
                  <div className="flex items-start gap-2 text-sm">
                    <Sparkles size={14} className="text-sky-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300">{segment.aiSuggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-sky-500/10 border border-sky-500/30 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <DollarSign size={24} className="text-sky-400" />
          <div>
            <p className="text-white font-semibold">Projected Revenue Impact</p>
            <p className="text-gray-300 text-sm">
              Implementing these recommendations could save <span className="text-sky-400 font-bold">£1.2M</span> in annual revenue
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

