'use client';

import { motion } from 'framer-motion';
import { TrendingDown, AlertTriangle, Calendar, DollarSign, Users, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChurnAnalysisPage() {
  const monthlyChurnData = [
    { month: 'Jan', churnRate: 12.5, churned: 2630, retained: 18370 },
    { month: 'Feb', churnRate: 11.8, churned: 2478, retained: 18522 },
    { month: 'Mar', churnRate: 13.2, churned: 2770, retained: 18230 },
    { month: 'Apr', churnRate: 14.5, churned: 3045, retained: 17955 },
    { month: 'May', churnRate: 15.1, churned: 3171, retained: 17829 },
    { month: 'Jun', churnRate: 16.2, churned: 3402, retained: 17598 },
  ];

  const churnReasons = [
    { reason: 'Price Too High', count: 4250, percentage: 35, color: '#ef4444' },
    { reason: 'Content Issues', count: 3060, percentage: 25, color: '#f97316' },
    { reason: 'Technical Problems', count: 2448, percentage: 20, color: '#eab308' },
    { reason: 'Competition', count: 1836, percentage: 15, color: '#3b82f6' },
    { reason: 'Other', count: 612, percentage: 5, color: '#6b7280' },
  ];

  const cohortChurn = [
    { cohort: '0-30 days', churnRate: 28.5, count: 1140 },
    { cohort: '31-60 days', churnRate: 22.3, count: 892 },
    { cohort: '61-90 days', churnRate: 18.7, count: 748 },
    { cohort: '3-6 months', churnRate: 15.2, count: 608 },
    { cohort: '6-12 months', churnRate: 12.8, count: 512 },
    { cohort: '12+ months', churnRate: 8.5, count: 340 },
  ];

  const riskSegments = [
    { segment: 'Critical Risk', count: 4200, percentage: 20, ltv: 180, color: '#ef4444' },
    { segment: 'High Risk', count: 6300, percentage: 30, ltv: 280, color: '#f97316' },
    { segment: 'Medium Risk', count: 5250, percentage: 25, ltv: 420, color: '#eab308' },
    { segment: 'Low Risk', count: 5250, percentage: 25, ltv: 580, color: '#22c55e' },
  ];

  const stats = [
    { 
      title: 'Current Churn Rate', 
      value: '16.2%', 
      change: '+12%', 
      icon: <TrendingDown size={24} />,
      trend: 'negative',
      gradient: 'from-red-500 to-orange-500'
    },
    { 
      title: 'At-Risk Subscribers', 
      value: '15,750', 
      change: '+18%', 
      icon: <AlertTriangle size={24} />,
      trend: 'negative',
      gradient: 'from-orange-500 to-yellow-500'
    },
    { 
      title: 'Avg Churn Age', 
      value: '4.2 months', 
      change: '-8%', 
      icon: <Calendar size={24} />,
      trend: 'positive',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Revenue at Risk', 
      value: '£4.2M', 
      change: '+15%', 
      icon: <DollarSign size={24} />,
      trend: 'negative',
      gradient: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
      <h1 className="text-2xl font-bold text-white mb-2">Churn Analysis</h1>
        <p className="text-gray-400">Deep dive into subscriber churn patterns and risk factors</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient} kpi-icon-wrapper`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold ${stat.trend === 'negative' ? 'text-red-400' : 'text-green-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Churn Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Monthly Churn Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyChurnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#ffffff' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="churnRate" stroke="#ef4444" strokeWidth={3} name="Churn Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Churn Reasons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Top Churn Reasons</h3>
          <div className="space-y-4">
            {churnReasons.map((reason) => (
              <div key={reason.reason}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">{reason.reason}</span>
                  <span className="text-white font-semibold">{reason.percentage}%</span>
                </div>
                <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${reason.percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: reason.color }}
                  />
                </div>
                <span className="text-xs text-gray-400">{reason.count.toLocaleString()} subscribers</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cohort Churn Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Churn by Customer Age</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cohortChurn}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="cohort" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#ffffff' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Bar dataKey="churnRate" fill="#f97316" name="Churn Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Segments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Risk Segmentation</h3>
          <div className="space-y-4">
            {riskSegments.map((segment) => (
              <div key={segment.segment} className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: segment.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{segment.segment}</span>
                    <span className="text-gray-400">{segment.count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{segment.percentage}% of at-risk</span>
                    <span className="text-sky-400">Avg LTV: £{segment.ltv}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="text-sky-400" />
          AI-Powered Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="text-red-400 font-semibold mb-2">Critical Finding</h4>
            <p className="text-gray-300 text-sm">Early-stage churn (0-30 days) has increased by 28.5%. Focus on onboarding improvements.</p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h4 className="text-orange-400 font-semibold mb-2">Price Sensitivity</h4>
            <p className="text-gray-300 text-sm">35% of churners cite pricing. Consider flexible plans and loyalty discounts.</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">Retention Opportunity</h4>
            <p className="text-gray-300 text-sm">5,250 medium-risk subscribers with £420 LTV could be saved with targeted campaigns.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

