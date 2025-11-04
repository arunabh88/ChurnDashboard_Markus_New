'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export default function ChurnValidation() {
  const data = [
    { month: 'Jan', actual: 14.2, predicted: 14.8 },
    { month: 'Feb', actual: 13.8, predicted: 13.5 },
    { month: 'Mar', actual: 15.1, predicted: 15.3 },
    { month: 'Apr', actual: 14.5, predicted: 14.2 },
    { month: 'May', actual: 16.2, predicted: 16.7 },
    { month: 'Jun', actual: 15.8, predicted: 15.5 },
  ];

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Model Performance</h2>
          <p className="text-gray-400">Real vs. Predicted Churn Rates</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/20 border border-green-500 rounded-lg px-4 py-2">
          <CheckCircle size={20} className="text-green-400" />
          <div>
            <p className="text-xs text-gray-400">Model Accuracy</p>
            <p className="text-xl font-bold text-green-400">96%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-navy-900/50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: 'Churn %', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #38bdf8',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Bar dataKey="actual" fill="#ef4444" name="Actual Churn" radius={[8, 8, 0, 0]} />
              <Bar dataKey="predicted" fill="#0ea5e9" name="Predicted Churn" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-green-400" />
              <p className="text-gray-400 text-sm">Precision</p>
            </div>
            <p className="text-3xl font-bold text-green-400">94%</p>
            <p className="text-xs text-gray-400 mt-1">True positive rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-blue-400" />
              <p className="text-gray-400 text-sm">Recall</p>
            </div>
            <p className="text-3xl font-bold text-blue-400">92%</p>
            <p className="text-xs text-gray-400 mt-1">Coverage of churners</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-purple-400" />
              <p className="text-gray-400 text-sm">F1 Score</p>
            </div>
            <p className="text-3xl font-bold text-purple-400">93%</p>
            <p className="text-xs text-gray-400 mt-1">Balanced performance</p>
          </motion.div>
        </div>
      </div>

      {/* AI Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-orange-400 mt-0.5" />
          <div>
            <p className="text-white font-semibold mb-1">AI Alert: Model Drift Detected</p>
            <p className="text-gray-300 text-sm mb-3">
              Sentiment data accuracy decreased by 3% over the past 30 days. Retraining recommended to maintain prediction quality.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
            >
              Schedule Retraining
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

