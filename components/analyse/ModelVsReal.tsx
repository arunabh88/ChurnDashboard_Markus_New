'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { AlertTriangle, RotateCcw } from 'lucide-react';

const modelData = [
  { month: 'Nov', actual: 1.9, predicted: 1.95 },
  { month: 'Dec', actual: 1.8, predicted: 1.82 },
  { month: 'Jan', actual: 1.7, predicted: 1.68 },
  { month: 'Feb', actual: 1.55, predicted: 1.58 },
  { month: 'Mar', actual: 1.52, predicted: 1.5 },
];

const driftData = [
  { signal: 'Sentiment', drift: 0.21 },
  { signal: 'Engagement', drift: 0.12 },
  { signal: 'Billing', drift: 0.08 },
  { signal: 'Technical', drift: 0.05 },
  { signal: 'Competitor', drift: 0.03 },
];

export function ModelVsReal() {
  return (
    <div className="space-y-6 rounded-2xl border border-sky-500/20 bg-navy-900/40 p-6 shadow-[0_0_32px_rgba(56,189,248,0.12)]">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">Model vs Real</p>
          <p className="text-xs text-gray-400 mt-1">
            Validate model quality before triggering interventions. Check accuracy, drift, and drivers.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-100">
          <RotateCcw size={14} />
          Request retraining
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4"
        >
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span>Real vs predicted churn</span>
            <span className="text-sky-200 font-semibold">Accuracy: 94%</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={modelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(56,189,248,0.35)',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="predicted" name="Predicted" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4"
        >
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <AlertTriangle size={14} className="text-amber-300" />
            Drift detection (last 30 days)
          </div>
          <div className="h-40 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={driftData}>
                <defs>
                  <linearGradient id="driftGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="signal" stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip
                  formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(249,115,22,0.35)',
                    borderRadius: '12px',
                  }}
                />
                <Area type="monotone" dataKey="drift" stroke="#f97316" fill="url(#driftGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-[11px] text-gray-300">
            Sentiment signals show <span className="text-amber-300 font-semibold">21% drift</span>. Recalibrate NLP pipeline before
            the next prediction cycle to maintain confidence.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

