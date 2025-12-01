'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Clock, TrendingUp, CheckCircle, AlertTriangle, X, Pause, Copy, Eye, ArrowRight, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';

interface ActionRecord {
  name: string;
  segment: string;
  duration: string;
  status: 'Completed' | 'Active' | 'Planned';
  statusLevel: 'on-track' | 'underperforming' | 'at-risk';
  statusNote: string;
  expectedLift: string;
  forecastLift: string;
  actualLift: string;
  expectedROI: string;
  actualROI: string;
  variance?: string;
  roi: string;
  owner: string;
}

interface ActionHistoryListProps {
  onReviewSegment?: (segment: string) => void;
  onPauseCampaign?: (actionName: string) => void;
  onCloneCampaign?: (actionName: string) => void;
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
    expectedROI: '3.4×',
    actualROI: '3.1×',
    variance: '-0.6%',
    roi: '3.1×',
    owner: 'Amelia Turner',
  },
  {
    name: 'Trial Concierge Outreach',
    segment: 'Trial 0-30 Days',
    duration: 'Apr 12 – Ongoing',
    status: 'Active',
    statusLevel: 'underperforming',
    statusNote: 'Slightly under target – extend concierge window',
    expectedLift: '+7.5%',
    forecastLift: '+6.2%',
    actualLift: '+4.8%',
    expectedROI: '3.4×',
    actualROI: '2.4×',
    variance: '-2.7%',
    roi: '2.4×',
    owner: 'Nina Brooks',
  },
  {
    name: 'Loyalty Discount Campaign',
    segment: 'High CLTV Established',
    duration: 'Apr 01 – Ongoing',
    status: 'Active',
    statusLevel: 'underperforming',
    statusNote: 'Expected +12%, Actual +4.2% - Review needed',
    expectedLift: '+12.0%',
    forecastLift: '+11.0%',
    actualLift: '+4.2%',
    expectedROI: '3.4×',
    actualROI: '2.1×',
    variance: '-7.8%',
    roi: '2.1×',
    owner: 'Marcus Chen',
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
    expectedROI: '2.6×',
    actualROI: '2.7×',
    variance: '+0.6%',
    roi: '2.7×',
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
    expectedROI: '2.1×',
    actualROI: '—',
    variance: '—',
    roi: '2.1×',
    owner: 'Priya Patel',
  },
];

const HEALTH_STYLES: Record<ActionRecord['statusLevel'], { dot: string; label: string; icon: React.ReactNode }> = {
  'on-track': { dot: 'bg-emerald-400', label: 'On track', icon: <CheckCircle size={16} className="text-emerald-400" /> },
  'underperforming': { dot: 'bg-red-500', label: 'Underperforming', icon: <X size={16} className="text-red-400" /> },
  'at-risk': { dot: 'bg-amber-400', label: 'At risk', icon: <AlertTriangle size={16} className="text-amber-400" /> },
};

const STATUS_FILTERS = ['All', 'On-Track', 'Underperforming', 'At-Risk'] as const;

export function ActionHistoryList({ onReviewSegment, onPauseCampaign, onCloneCampaign }: ActionHistoryListProps = {}) {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredActions = useMemo(() => {
    if (statusFilter === 'All') return ACTION_HISTORY;
    const filterMap: Record<string, ActionRecord['statusLevel']> = {
      'On-Track': 'on-track',
      'Underperforming': 'underperforming',
      'At-Risk': 'at-risk',
    };
    return ACTION_HISTORY.filter((action) => action.statusLevel === filterMap[statusFilter]);
  }, [statusFilter]);

  const calculateVariance = (expected: string, actual: string): string => {
    if (actual === '—') return '—';
    const expectedNum = parseFloat(expected.replace('%', '').replace('+', ''));
    const actualNum = parseFloat(actual.replace('%', '').replace('+', ''));
    const variance = actualNum - expectedNum;
    return variance >= 0 ? `+${variance.toFixed(1)}%` : `${variance.toFixed(1)}%`;
  };

  const isUnderperforming = (action: ActionRecord): boolean => {
    if (action.actualLift === '—') return false;
    const expectedNum = parseFloat(action.expectedLift.replace('%', '').replace('+', ''));
    const actualNum = parseFloat(action.actualLift.replace('%', '').replace('+', ''));
    return actualNum < expectedNum * 0.7; // 70% threshold
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Action History & Performance</h2>
          <p className="text-gray-400 text-sm mt-1">
            Track intervention results against expected lift, ROI, and ownership. Monitor underperforming campaigns and optimize.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-sky-300">
            <BadgeCheck size={18} />
            92% of completed actions met expected lift ±2%
          </div>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-sky-500/30 bg-sky-500/10 pl-10 pr-4 py-2 text-sm font-semibold text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              {STATUS_FILTERS.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sky-500/20 text-left text-xs uppercase tracking-wide text-gray-400">
              <th className="py-3 px-4">Action Name</th>
              <th className="py-3 px-4">Segment</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Performance</th>
              <th className="py-3 px-4 text-right">Expected Lift</th>
              <th className="py-3 px-4 text-right">Actual Lift</th>
              <th className="py-3 px-4 text-right">Variance</th>
              <th className="py-3 px-4 text-right">Expected ROI</th>
              <th className="py-3 px-4 text-right">Actual ROI</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredActions.map((entry, index) => {
              const underperforming = isUnderperforming(entry);
              const variance = entry.variance || calculateVariance(entry.expectedLift, entry.actualLift);
              const isNegativeVariance = variance !== '—' && variance.startsWith('-');

              return (
                <motion.tr
                  key={entry.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`border-b border-sky-500/10 text-sm text-gray-200 hover:bg-white/5 transition-colors ${
                    underperforming ? 'bg-red-500/5 border-red-500/20' : ''
                  }`}
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
                    <div className="flex items-center gap-2 text-xs">
                      {HEALTH_STYLES[entry.statusLevel].icon}
                      <span className={`font-semibold ${
                        entry.statusLevel === 'on-track' ? 'text-emerald-400' :
                        entry.statusLevel === 'underperforming' ? 'text-red-400' :
                        'text-amber-400'
                      }`}>
                        {HEALTH_STYLES[entry.statusLevel].label}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-gray-500">{entry.statusNote}</p>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-200">{entry.expectedLift}</td>
                  <td className={`py-4 px-4 text-right font-semibold ${
                    underperforming ? 'text-red-400' : 'text-sky-200'
                  }`}>
                    {entry.actualLift}
                  </td>
                  <td className={`py-4 px-4 text-right font-semibold ${
                    isNegativeVariance ? 'text-red-400' : variance.startsWith('+') ? 'text-emerald-400' : 'text-gray-400'
                  }`}>
                    {variance}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-200">{entry.expectedROI}</td>
                  <td className={`py-4 px-4 text-right font-semibold ${
                    entry.actualROI !== '—' && parseFloat(entry.actualROI.replace('×', '')) < parseFloat(entry.expectedROI.replace('×', ''))
                      ? 'text-red-400' : 'text-emerald-300'
                  }`}>
                    {entry.actualROI}
                  </td>
                  <td className="py-4 px-4 text-gray-300">{entry.owner}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Review Performance"
                      >
                        <Eye size={14} />
                      </motion.button>
                      {entry.status === 'Active' && underperforming && onPauseCampaign && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onPauseCampaign(entry.name)}
                          className="p-1.5 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                          title="Pause Campaign"
                        >
                          <Pause size={14} />
                        </motion.button>
                      )}
                      {onCloneCampaign && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onCloneCampaign(entry.name)}
                          className="p-1.5 rounded hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 transition-colors"
                          title="Clone & Optimize"
                        >
                          <Copy size={14} />
                        </motion.button>
                      )}
                      {onReviewSegment && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onReviewSegment(entry.segment)}
                          className="p-1.5 rounded hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 transition-colors"
                          title="View in Analyse"
                        >
                          <ArrowRight size={14} />
                        </motion.button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
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

