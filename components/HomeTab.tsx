'use client';

import { motion } from 'framer-motion';
import {
  Droplets,
  Users,
  ShieldCheck,
  Activity,
  Sparkles,
  TrendingUp,
  Target,
} from 'lucide-react';
import JourneyMap from '@/components/JourneyMap';

const stageMetrics = [
  {
    label: 'Trial',
    subscribers: '3,000',
    churn: '70% (30 days)',
    conversion: '→ 30 / day',
    tone: 'from-red-500/30 via-red-500/20 to-red-500/10',
    icon: Droplets,
    description: 'High-risk arrivals need stronger onboarding journeys.',
  },
  {
    label: 'New',
    subscribers: '2,190',
    churn: '20% / month',
    conversion: '→ 19 / day',
    tone: 'from-orange-500/30 via-orange-500/20 to-orange-500/10',
    icon: Activity,
    description: 'Focus on engagement drops within the first 90 days.',
  },
  {
    label: 'Established',
    subscribers: '1.29M',
    churn: '0.85% / month',
    conversion: 'Retention pond',
    tone: 'from-green-500/30 via-teal-500/20 to-sky-500/10',
    icon: ShieldCheck,
    description: 'Core base is stable. Target churn under 0.57%.',
  },
];

const healthHighlights = [
  {
    title: 'Total Subscriber Base',
    value: '1.30M',
    change: '+0.8% MoM',
    icon: Users,
    accent: 'bg-sky-500/15 border border-sky-500/30 text-sky-300',
  },
  {
    title: 'AI Conversion Insight',
    value: '30% Trial → New',
    change: '+10% uplift adds +120K annually',
    icon: Sparkles,
    accent: 'bg-purple-500/15 border border-purple-500/30 text-purple-300',
  },
  {
    title: 'Established Churn Target',
    value: '0.85% vs 0.57%',
    change: 'Prioritise loyalty and bundle offers',
    icon: Target,
    accent: 'bg-green-500/15 border border-green-500/30 text-green-300',
  },
];

const operationalFocus = [
  {
    header: 'Early Engagement',
    bullets: [
      'Launch onboarding concierge journeys within 24 hrs',
      'Surface personalised watchlists in the first 3 sessions',
    ],
  },
  {
    header: 'Campaign Momentum',
    bullets: [
      'Scale retention pond loyalty offers to sports fans',
      'Reinforce comms cadence for medium-risk New users',
    ],
  },
  {
    header: 'Service Health',
    bullets: [
      'Reduce streaming setup tickets by 18%',
      'Close loop on competitive win-back workflows',
    ],
  },
];

export default function HomeTab() {
  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {stageMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="glass-card rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    {metric.label} Stage
                  </p>
                  <h3 className="text-3xl font-bold text-white mt-1">
                    {metric.subscribers}
                  </h3>
                </div>
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.tone} flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={22} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300">Churn</span>
                <span className="text-base font-semibold text-white">
                  {metric.churn}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Flow</span>
                <span className="text-sm font-semibold text-sky-300">
                  {metric.conversion}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                {metric.description}
              </p>
            </div>
          );
        })}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl"
      >
        <JourneyMap />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {healthHighlights.map((highlight) => {
          const Icon = highlight.icon;
          return (
            <div
              key={highlight.title}
              className="glass-card rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${highlight.accent}`}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {highlight.title}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {highlight.value}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-300">{highlight.change}</p>
            </div>
          );
        })}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Retention Command Focus
            </h3>
            <p className="text-sm text-gray-400">
              Align squads around the funnel-to-pond priorities this sprint.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sky-300 text-sm">
            <TrendingUp size={16} />
            <span>Aligned to SLDS playbooks</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {operationalFocus.map((section) => (
            <div
              key={section.header}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="text-sky-300" size={16} />
                {section.header}
              </h4>
              <ul className="space-y-2">
                {section.bullets.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-300 leading-relaxed flex gap-2"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

