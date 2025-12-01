'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Clock, TrendingUp } from 'lucide-react';

interface ActionRecord {
  name: string;
  segment: string;
  duration: string;
  status: 'Completed' | 'Active' | 'Planned';
  statusLevel: 'on-track' | 'monitor' | 'at-risk';
  statusNote: string;
  expectedLift: string;
  forecastLift: string;
  actualLift: string;
  roi: string;
  revenueSaved: string;
  owner: string;
}

const STATUS_STYLES: Record<ActionRecord['status'], string> = {
  Completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  Active: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
  Planned: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
};

const ACTION_HISTORY: ActionRecord[] = [
  {
    name: 'High CLTV Loyalty Upgrade',
    segment: 'High CLTV Established',
    duration: 'Mar 01 – Mar 31',
    status: 'Completed',
    statusLevel: 'on-track',
    statusNote: 'Delivered +0.6% over forecast',
    expectedLift: '+6.0%',
    forecastLift: '+5.0%',
    actualLift: '+5.4%',
    roi: '3.1×',
    revenueSaved: '£320K',
    owner: 'Amelia Turner',
  },
  {
    name: 'Trial Concierge Outreach',
    segment: 'Trial 0-30 Days',
    duration: 'Apr 12 – Ongoing',
    status: 'Active',
    statusLevel: 'monitor',
    statusNote: 'Slightly under target – extend concierge window',
    expectedLift: '+7.5%',
    forecastLift: '+6.2%',
    actualLift: '+4.8%',
    roi: '2.4×',
    revenueSaved: '£180K',
    owner: 'Nina Brooks',
  },
  {
    name: 'Ad-supported Downgrade Offer',
    segment: 'Price Sensitive',
    duration: 'Feb 03 – Feb 20',
    status: 'Completed',
    statusLevel: 'on-track',
    statusNote: 'Exceeded forecast after mid-campaign tweak',
    expectedLift: '+4.0%',
    forecastLift: '+3.8%',
    actualLift: '+4.6%',
    roi: '2.7×',
    revenueSaved: '£210K',
    owner: 'Deepak Rao',
  },
  {
    name: 'Sports Fan Exclusive Week',
    segment: 'High Engagement Sports',
    duration: 'Planned · May 05',
    status: 'Planned',
    statusLevel: 'at-risk',
    statusNote: 'Creative dependencies outstanding',
    expectedLift: '+5.2%',
    forecastLift: '+5.2%',
    actualLift: '—',
    roi: '2.1×',
    revenueSaved: '—',
    owner: 'Priya Patel',
  },
];

const HEALTH_STYLES: Record<ActionRecord['statusLevel'], { dot: string; label: string }> = {
  'on-track': { dot: 'bg-emerald-400', label: 'On track' },
  monitor: { dot: 'bg-amber-400', label: 'Watch' },
  'at-risk': { dot: 'bg-red-500', label: 'At risk' },
};

interface ActionHistoryListProps {
  onReviewSegment?: (segment: string) => void;
}

export function ActionHistoryList({ onReviewSegment }: ActionHistoryListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Action History & Outcomes</h2>
          <p className="text-gray-400 text-sm mt-1">
            Track intervention results against expected lift, ROI, and ownership to scale what works.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-sky-300">
          <BadgeCheck size={18} />
          92% of completed actions met expected lift ±2%
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sky-500/20 text-left text-xs uppercase tracking-wide text-gray-400">
              <th className="py-3 px-4">Action Name</th>
              <th className="py-3 px-4">Segment</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Health</th>
              <th className="py-3 px-4 text-right">Forecast</th>
              <th className="py-3 px-4 text-right">Expected</th>
              <th className="py-3 px-4 text-right">Actual</th>
              <th className="py-3 px-4 text-right">ROI</th>
              <th className="py-3 px-4 text-right">Revenue Saved</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4 text-right">Analyse</th>
            </tr>
          </thead>
          <tbody>
            {ACTION_HISTORY.map((entry, index) => (
              <motion.tr
                key={entry.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="border-b border-sky-500/10 text-sm text-gray-200 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="font-semibold text-white">{entry.name}</div>
                  <div className="text-xs text-sky-300/80 flex items-center gap-2">
                    <Clock size={14} />
                    {entry.duration}
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">{entry.segment}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[entry.status]}`}>
                    {entry.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${HEALTH_STYLES[entry.statusLevel].dot}`} />
                    <span className="text-white font-semibold">{HEALTH_STYLES[entry.statusLevel].label}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">{entry.statusNote}</p>
                </td>
                <td className="py-4 px-4 text-right text-gray-200">{entry.forecastLift}</td>
                <td className="py-4 px-4 text-right text-gray-200">{entry.expectedLift}</td>
                <td className="py-4 px-4 text-right text-sky-200">{entry.actualLift}</td>
                <td className="py-4 px-4 text-right text-emerald-300 font-semibold">{entry.roi}</td>
                <td className="py-4 px-4 text-right text-emerald-200">{entry.revenueSaved}</td>
                <td className="py-4 px-4 text-gray-300">{entry.owner}</td>
                <td className="py-4 px-4 text-right">
                  <button
                    className="inline-flex items-center gap-1 rounded-lg border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-100 hover:bg-sky-500/25 transition-colors"
                    onClick={() => onReviewSegment?.(entry.segment)}
                  >
                    Review in Analyse
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sky-300">
          <TrendingUp size={16} />
          Auto-surfacing underperformers for playbook optimisation
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-sky-500/30 px-4 py-2 text-sky-200 hover:bg-sky-500/10 transition-colors">
          Export history
        </button>
      </div>
    </motion.div>
  );
}

