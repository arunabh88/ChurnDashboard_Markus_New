'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Lightbulb, Users, TrendingDown, Activity, ArrowRight, ChevronRight, Droplets, Target, Rocket } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { useState } from 'react';

interface FunnelStage {
  name: string;
  days: string;
  subscribers: number;
  churnRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  engagementScore: number;
  triggers: string[];
  retentionRate: number;
  actionLabel?: string;
}

interface JourneyMapProps {
  onStageAction?: (stageName: string) => void;
}

export default function JourneyMap(props: JourneyMapProps = {}) {
  const { onStageAction } = props;
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  
  const totalSubscribers = 3000000; // 3M
  const dailyInflow = {
    trials: 100,
    toNew: 30,
    toEstablished: 19,
  };
  
  const stages: FunnelStage[] = [
    {
      name: 'Trial Users',
      days: '30 days',
      subscribers: 3000, // 3K
      churnRate: 70,
      riskLevel: 'high',
      engagementScore: 45,
      triggers: ['Onboarding confusion', 'Content misalignment', 'Device setup issues'],
      retentionRate: 30,
      actionLabel: 'Analyze',
    },
    {
      name: 'New Users',
      days: '90 days',
      subscribers: 2190, // 2.19K
      churnRate: 20,
      riskLevel: 'medium',
      engagementScore: 69,
      triggers: ['Drop in engagement', 'No favorite content', 'Single device usage'],
      retentionRate: 65,
      actionLabel: 'Analyze',
    },
    {
      name: 'Established Users',
      days: 'Ongoing',
      subscribers: 1290000, // 1.29M
      churnRate: 0.85,
      riskLevel: 'low',
      engagementScore: 84,
      triggers: ['Price sensitivity', 'Competitor offers', 'Life events'],
      retentionRate: 99.15,
      actionLabel: 'Analyze',
    },
  ];

  const retainedSubscribers = Math.round(stages[2].subscribers * (stages[2].retentionRate / 100));
  const totalChurnedDisplay = formatSubscribers(totalSubscribers - retainedSubscribers);
  const highestRiskPhase = `${stages[0].name} (${stages[0].churnRate}% churn)`;
  const establishedRetentionDisplay = `${stages[2].retentionRate}%`;
  const targetChurn = 0.57;
  
  const churnInsights = {
    'Trial Users': 'High churn (70%) driven by onboarding confusion and content misalignment.',
    'New Users': 'Moderate churn (20%) due to drop in engagement after trial period.',
    'Established Users': 'Stable base with 0.85% monthly churn. Focus on loyalty program retention. Target: <0.57%',
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return { bg: 'from-red-500 to-red-600', text: 'text-red-400', border: 'border-red-500' };
      case 'medium': return { bg: 'from-orange-500 to-orange-600', text: 'text-orange-400', border: 'border-orange-500' };
      case 'low': return { bg: 'from-green-500 to-green-600', text: 'text-green-400', border: 'border-green-500' };
      default: return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-400', border: 'border-gray-500' };
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <XCircle size={18} />;
      case 'medium': return <AlertCircle size={18} />;
      case 'low': return <CheckCircle size={18} />;
      default: return null;
    }
  };

  function formatSubscribers(num: number) {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toString();
  }

  return (
    <div className="rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Subscriber Journey: From Funnel to Retention
          </h2>
          <p className="text-gray-400">Visualizing inflow, churn, and growth across the Sky TV lifecycle</p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 bg-sky-500/20 border border-sky-500 rounded-lg px-4 py-2"
        >
          <Lightbulb size={20} className="text-sky-400" />
          <div className="text-sm max-w-md">
            <p className="text-sky-400 font-semibold">AI Insight</p>
            <p className="text-gray-300 text-xs">Trial-to-New conversion at 30%. Improving early engagement by 10% could grow Established base by +120K annually.</p>
          </div>
        </motion.div>
      </div>
      
      {/* Daily Flow Stats */}
      <div className="mb-6 flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
          <Droplets size={16} className="text-sky-400" />
          <span className="text-gray-400">Daily Inflow:</span>
          <span className="text-white font-bold">{dailyInflow.trials} trials/day</span>
        </div>
        <ArrowRight size={16} className="text-gray-500" />
        <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
          <span className="text-orange-400 font-bold">{dailyInflow.toNew}</span>
          <span className="text-gray-400"> to New</span>
        </div>
        <ArrowRight size={16} className="text-gray-500" />
        <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
          <span className="text-green-400 font-bold">{dailyInflow.toEstablished}</span>
          <span className="text-gray-400"> to Established</span>
        </div>
      </div>

      {/* Funnel to Pond Visualization */}
      <div className="relative">
        <div className="relative">
          <svg viewBox="0 0 1400 340" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Gradients for each stage */}
              <linearGradient id="startGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9"/>
              </linearGradient>
              <linearGradient id="stage1Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
              </linearGradient>
              <linearGradient id="stage2Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9"/>
              </linearGradient>
              <linearGradient id="stage3Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#16a34a" stopOpacity="0.9"/>
              </linearGradient>
              <linearGradient id="finalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
              </linearGradient>
            </defs>

            {/* Trial Users - Funnel Stage 1 */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onMouseEnter={() => setHoveredStage('Trial Users')}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <path
                d="M 50 40 L 50 260 L 280 240 L 280 60 Z"
                fill="url(#stage1Gradient)"
                stroke="#ef4444"
                strokeWidth="3"
                className="transition-all duration-300 hover:opacity-90 cursor-pointer"
              />
              <text x="165" y="130" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Trial Users</text>
              <text x="165" y="165" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">{formatSubscribers(stages[0].subscribers)}</text>
              <text x="165" y="195" textAnchor="middle" fill="white" fontSize="11">30 days | 70% churn</text>
              
              {/* Churn Leak Arrow */}
              <motion.g
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M 165 270 L 165 305" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" opacity="0.6"/>
                <text x="165" y="320" textAnchor="middle" fill="#ef4444" fontSize="10">70% leak</text>
              </motion.g>
            </motion.g>

            {/* Flow Arrow 1 - Equal Length */}
            <motion.g
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M 280 140 L 540 140" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowBlue)"/>
              <text x="410" y="130" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">30%</text>
            </motion.g>

            {/* New Users - Funnel Stage 2 */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onMouseEnter={() => setHoveredStage('New Users')}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <path
                d="M 540 60 L 540 240 L 780 220 L 780 80 Z"
                fill="url(#stage2Gradient)"
                stroke="#f97316"
                strokeWidth="3"
                className="transition-all duration-300 hover:opacity-90 cursor-pointer"
              />
              <text x="660" y="130" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">New Users</text>
              <text x="660" y="165" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">{formatSubscribers(stages[1].subscribers)}</text>
              <text x="660" y="195" textAnchor="middle" fill="white" fontSize="11">90 days | 20% churn</text>
              
              {/* Churn Leak Arrow */}
              <motion.g
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <path d="M 660 250 L 660 295" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowOrange)" opacity="0.6"/>
                <text x="660" y="310" textAnchor="middle" fill="#f97316" fontSize="10">20% leak</text>
              </motion.g>
            </motion.g>

            {/* Flow Arrow 2 - Equal Length */}
            <motion.g
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              <path d="M 780 140 L 1040 140" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowBlue)"/>
              <text x="910" y="130" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">65%</text>
            </motion.g>

            {/* Established Users - Funnel Stage 3 */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onMouseEnter={() => setHoveredStage('Established Users')}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <path
                d="M 1040 80 L 1040 220 L 1280 200 L 1280 100 Z"
                fill="url(#stage3Gradient)"
                stroke="#22c55e"
                strokeWidth="3"
                className="transition-all duration-300 hover:opacity-90 cursor-pointer"
              />
              <text x="1160" y="130" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Established Users</text>
              <text x="1160" y="165" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">{formatSubscribers(stages[2].subscribers)}</text>
              <text x="1160" y="195" textAnchor="middle" fill="white" fontSize="11">Ongoing | 0.85% churn</text>
              
              {/* Churn Leak Arrow */}
              <motion.g
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <path d="M 1160 230 L 1160 285" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)" opacity="0.6"/>
                <text x="1160" y="300" textAnchor="middle" fill="#10b981" fontSize="10">0.85% leak</text>
              </motion.g>
            </motion.g>

            {/* Arrow Markers */}
            <defs>
              <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#38bdf8" />
              </marker>
              <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
              </marker>
              <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
              </marker>
              <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
          
          {/* Individual Tooltips for Each Section */}
          {/* Trial Users Tooltip */}
          {hoveredStage === 'Trial Users' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-[15%] left-[12%] transform -translate-x-1/2 bg-gray-900/95 border border-red-500/50 rounded-lg p-3 shadow-xl max-w-xs z-10"
            >
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-red-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-xs mb-1">Trial Users</h4>
                  <p className="text-gray-300 text-xs">{churnInsights['Trial Users']}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* New Users Tooltip */}
          {hoveredStage === 'New Users' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-[15%] left-[47%] transform -translate-x-1/2 bg-gray-900/95 border border-orange-500/50 rounded-lg p-3 shadow-xl max-w-xs z-10"
            >
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-orange-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-xs mb-1">New Users</h4>
                  <p className="text-gray-300 text-xs">{churnInsights['New Users']}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Established Users Tooltip */}
          {hoveredStage === 'Established Users' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-[15%] left-[82%] transform -translate-x-1/2 bg-gray-900/95 border border-green-500/50 rounded-lg p-3 shadow-xl max-w-xs z-10"
            >
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-green-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-xs mb-1">Established Users</h4>
                  <p className="text-gray-300 text-xs">{churnInsights['Established Users']}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Progress Indicator for Target Churn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-2 bg-white/5 rounded-lg p-4 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-sky-400" />
              <span className="text-gray-300 text-sm font-semibold">Established Churn Progress</span>
            </div>
            <span className="text-white text-sm">
              <span className="text-orange-400 font-bold">0.85%</span> / <span className="text-green-400 font-bold">{targetChurn}%</span>
            </span>
          </div>
          <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(targetChurn / 0.85) * 100}%` }}
              transition={{ duration: 1, delay: 1 }}
              className="h-full bg-gradient-to-r from-green-500 to-sky-500 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((0.85 - targetChurn) / 0.85) * 100}%` }}
              transition={{ duration: 1, delay: 1 }}
              className="h-full bg-orange-500/50 rounded-full absolute top-0"
              style={{ left: `${(targetChurn / 0.85) * 100}%` }}
            />
          </div>
          <p className="text-gray-400 text-xs mt-2">Goal: Keep Established churn below {targetChurn}% for sustainable growth</p>
        </motion.div>

        {/* Legend */}
        <div className="mt-2 flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-gray-300">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-sm text-gray-300">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-gray-300">Low Risk</span>
          </div>
        </div>

        {/* Secondary Metrics Below Funnel - Redesigned for Better Readability */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {stages.map((stage, index) => {
            const colors = getRiskColor(stage.riskLevel);
            const churned = index === 0 
              ? totalSubscribers - stage.subscribers * (stage.retentionRate / 100)
              : stages[index - 1].subscribers - stage.subscribers;
            
            // Get border color based on risk level
            const borderColor = stage.riskLevel === 'high' ? 'border-red-500' : 
                               stage.riskLevel === 'medium' ? 'border-orange-500' : 'border-green-500';
            const accentColor = stage.riskLevel === 'high' ? 'bg-red-500' : 
                               stage.riskLevel === 'medium' ? 'bg-orange-500' : 'bg-green-500';
            const textAccent = stage.riskLevel === 'high' ? 'text-red-400' : 
                              stage.riskLevel === 'medium' ? 'text-orange-400' : 'text-green-400';

            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1 }}
                className={`glass-card rounded-lg p-4 border-l-4 ${borderColor} relative overflow-hidden`}
              >
                {/* Risk Level Indicator Badge */}
                <div className="absolute top-2 right-2">
                  <div className={`${accentColor} rounded-full p-1.5`}>
                    {getRiskIcon(stage.riskLevel)}
                  </div>
                </div>

                {/* Header */}
                <div className="mb-3 pr-8">
                  <h3 className="text-white font-bold text-base mb-1">{stage.name}</h3>
                  <span className={`${textAccent} text-xs font-semibold`}>{stage.days}</span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <p className="text-gray-400 text-xs mb-1">Engagement</p>
                    <p className="text-white font-black text-xl">{stage.engagementScore}%</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <p className="text-gray-400 text-xs mb-1">Churned</p>
                    <p className="text-white font-black text-xl">{formatSubscribers(churned)}</p>
                  </div>
                </div>

                {index === 0 && (
                  <div className="mb-3 rounded-lg border border-red-500 bg-red-500/20 p-3 text-center min-h-[88px] flex flex-col justify-center">
                    <p className="text-red-400 text-xs font-semibold mb-1">Total Churned</p>
                    <p className="text-white text-lg font-bold">{totalChurnedDisplay}</p>
                  </div>
                )}

                {index === 1 && (
                  <div className="mb-3 rounded-lg border border-orange-500 bg-orange-500/20 p-3 text-center min-h-[88px] flex flex-col justify-center">
                    <p className="text-orange-400 text-xs font-semibold mb-2">Highest Risk Phase</p>
                    <p className="text-white text-sm font-bold leading-tight">{highestRiskPhase}</p>
                  </div>
                )}

                {index === 2 && (
                  <div className="mb-3 rounded-lg border border-green-500 bg-green-500/20 p-3 text-center min-h-[88px] flex flex-col justify-center">
                    <p className="text-green-400 text-xs font-semibold mb-1">Established Users Retention</p>
                    <p className="text-white text-lg font-bold">{establishedRetentionDisplay}</p>
                  </div>
                )}

                {/* Key Triggers */}
                <div className="border-t border-white/10 pt-2">
                  <p className="text-gray-300 text-xs font-semibold mb-2">Key Triggers:</p>
                  {stage.triggers.map((trigger, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-400 mb-1">
                      <span className={`${textAccent} mt-0.5`}>•</span>
                      <span className="line-clamp-1">{trigger}</span>
                    </div>
                  ))}
                </div>

                {stage.actionLabel && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onStageAction?.(stage.name)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                    aria-label={`Take action for ${stage.name}`}
                  >
                    <Rocket size={16} />
                    {stage.actionLabel}
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}


