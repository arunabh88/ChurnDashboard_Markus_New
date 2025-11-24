'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  PlusCircle,
  Rocket,
  CheckCircle2,
  PauseCircle,
  LineChart as LineChartIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from 'recharts';

const actions = [
  {
    name: 'Sky Sports Fan Win-Back',
    segment: 'High-Risk New Users',
    status: 'In Progress',
    startDate: 'Oct 21, 2025',
    expectedImpact: '-0.18%',
  },
  {
    name: 'Premium Bundle Loyalty Credits',
    segment: 'Established – Sports Enthusiasts',
    status: 'Open',
    startDate: 'Nov 02, 2025',
    expectedImpact: '-0.12%',
  },
  {
    name: 'Onboarding Concierge Outreach',
    segment: 'Trial – Streaming Box Users',
    status: 'In Progress',
    startDate: 'Oct 28, 2025',
    expectedImpact: '+34% conversion',
  },
  {
    name: 'Competitor Offer Counter',
    segment: 'Established – Price Sensitive',
    status: 'Planned',
    startDate: 'Nov 18, 2025',
    expectedImpact: '-0.09%',
  },
];

const impactData = [
  { phase: 'T-6 weeks', churnRate: 1.24 },
  { phase: 'T-3 weeks', churnRate: 1.18 },
  { phase: 'Launch', churnRate: 1.12 },
  { phase: 'Week 2', churnRate: 0.98 },
  { phase: 'Week 4', churnRate: 0.87 },
];

const statusBadgeStyles: Record<
  string,
  { background: string; border: string; text: string }
> = {
  'In Progress': {
    background: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    text: 'text-sky-300',
  },
  Open: {
    background: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-300',
  },
  Planned: {
    background: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
  },
  Completed: {
    background: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-300',
  },
};

export default function ActTab() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-sky-300 font-semibold flex items-center gap-2">
              <Rocket size={16} />
              Retention Execution Desk
            </p>
            <h2 className="text-2xl font-bold text-white mt-2">
              Priority Action Plans
            </h2>
            <p className="text-sm text-gray-400">
              Track SLDS-aligned campaigns, expected impact, and progress.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
          >
            <PlusCircle size={18} />
            Create New Action
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-gray-400">
                <th className="py-3 pr-6">Action Name</th>
                <th className="py-3 pr-6">Target Segment</th>
                <th className="py-3 pr-6">Status</th>
                <th className="py-3 pr-6">Start Date</th>
                <th className="py-3 pr-6 text-right">Expected Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {actions.map((action) => {
                const styles =
                  statusBadgeStyles[action.status] ?? statusBadgeStyles.Open;
                const StatusIcon =
                  action.status === 'In Progress'
                    ? PauseCircle
                    : action.status === 'Completed'
                    ? CheckCircle2
                    : ClipboardList;

                return (
                  <tr key={action.name} className="hover:bg-white/5 transition">
                    <td className="py-4 pr-6">
                      <div className="flex flex-col">
                        <span className="text-white font-semibold text-sm">
                          {action.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          Journey owner: Retention Squad • SLA 7 days
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-300">
                      {action.segment}
                    </td>
                    <td className="py-4 pr-6">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full border ${styles.background} ${styles.border} ${styles.text}`}
                      >
                        <StatusIcon size={14} />
                        {action.status}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-300">
                      {action.startDate}
                    </td>
                    <td className="py-4 pr-6 text-sm text-right text-green-300">
                      {action.expectedImpact}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Campaign Impact Visualiser
            </h3>
            <p className="text-sm text-gray-400">
              Monitor churn-rate response before and after initiative launch.
            </p>
          </div>
          <LineChartIcon className="text-sky-300" size={20} />
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="phase" stroke="#94a3b8" />
            <YAxis domain={[0.6, 1.3]} stroke="#94a3b8" tickFormatter={(v) => `${v.toFixed(2)}%`} />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(2)}%`}
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                borderRadius: 12,
                color: '#fff',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="churnRate"
              name="Churn Rate"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ stroke: '#38bdf8', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.section>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card w-full max-w-lg rounded-xl p-6 relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-sm"
              >
                Close
              </button>
              <div className="flex items-center gap-3 mb-4">
                <PlusCircle className="text-sky-300" size={20} />
                <h3 className="text-xl font-bold text-white">
                  New Retention Initiative
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Placeholder form. Capture action name, owner, segment, goal, and
                Einstein guardrails before pushing to Salesforce Flow.
              </p>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="font-semibold text-white">Action Snapshot</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Title, journey owner, and SLDS campaign template.</li>
                    <li>• Target segment with AI Health score thresholds.</li>
                    <li>• Expected churn delta and measurement window.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="font-semibold text-white">Workflow Handoff</p>
                  <p>
                    Aligns with Salesforce Flow automation to trigger comms,
                    incentives, and case creation.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg text-sm font-semibold shadow"
                >
                  Save Draft
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

