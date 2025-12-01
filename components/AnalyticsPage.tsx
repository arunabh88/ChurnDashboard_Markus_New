'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Eye, Clock, Smartphone, Tv, Monitor, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const viewingData = [
    { day: 'Mon', liveTV: 4.2, onDemand: 2.8, sports: 1.5, cinema: 1.2 },
    { day: 'Tue', liveTV: 4.0, onDemand: 3.1, sports: 1.3, cinema: 1.4 },
    { day: 'Wed', liveTV: 3.9, onDemand: 3.3, sports: 1.4, cinema: 1.3 },
    { day: 'Thu', liveTV: 4.1, onDemand: 3.0, sports: 1.6, cinema: 1.5 },
    { day: 'Fri', liveTV: 4.5, onDemand: 3.5, sports: 2.1, cinema: 1.8 },
    { day: 'Sat', liveTV: 5.2, onDemand: 4.2, sports: 3.2, cinema: 2.4 },
    { day: 'Sun', liveTV: 5.8, onDemand: 4.5, sports: 2.8, cinema: 2.2 },
  ];

  const deviceUsage = [
    { device: 'Smart TV', percentage: 42, users: 882000, color: '#0ea5e9' },
    { device: 'Mobile', percentage: 28, users: 588000, color: '#8b5cf6' },
    { device: 'Tablet', percentage: 18, users: 378000, color: '#ec4899' },
    { device: 'Desktop', percentage: 12, users: 252000, color: '#f59e0b' },
  ];

  const contentPerformance = [
    { category: 'Live Sports', views: 12500000, avgTime: '2.4h', satisfaction: 94 },
    { category: 'Movies', views: 9800000, avgTime: '1.8h', satisfaction: 89 },
    { category: 'TV Shows', views: 15200000, avgTime: '1.2h', satisfaction: 91 },
    { category: 'News', views: 6400000, avgTime: '0.5h', satisfaction: 85 },
    { category: 'Documentaries', views: 4200000, avgTime: '1.5h', satisfaction: 92 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 52.4, arpu: 24.95 },
    { month: 'Feb', revenue: 53.1, arpu: 24.98 },
    { month: 'Mar', revenue: 54.8, arpu: 25.12 },
    { month: 'Apr', revenue: 55.2, arpu: 25.18 },
    { month: 'May', revenue: 56.7, arpu: 25.28 },
    { month: 'Jun', revenue: 58.3, arpu: 25.42 },
  ];

  const stats = [
    { title: 'Total Watch Time', value: '428M hrs', change: '+15%', icon: <Clock size={24} />, trend: 'positive', gradient: 'from-blue-500 to-cyan-500' },
    { title: 'Avg Session Duration', value: '2.4 hrs', change: '+8%', icon: <Eye size={24} />, trend: 'positive', gradient: 'from-purple-500 to-pink-500' },
    { title: 'Monthly Revenue', value: '£58.3M', change: '+11%', icon: <DollarSign size={24} />, trend: 'positive', gradient: 'from-green-500 to-emerald-500' },
    { title: 'ARPU', value: '£25.42', change: '+2%', icon: <TrendingUp size={24} />, trend: 'positive', gradient: 'from-orange-500 to-yellow-500' },
  ];

  const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
      <h1 className="text-2xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Comprehensive insights into viewing behavior and revenue metrics</p>
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
        {/* Weekly Viewing Patterns */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Weekly Viewing Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={viewingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#ffffff' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
              <Bar dataKey="liveTV" stackId="a" fill="#0ea5e9" name="Live TV" />
              <Bar dataKey="onDemand" stackId="a" fill="#8b5cf6" name="On Demand" />
              <Bar dataKey="sports" stackId="a" fill="#ec4899" name="Sports" />
              <Bar dataKey="cinema" stackId="a" fill="#f59e0b" name="Cinema" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Device Usage Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Device Usage Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ device, percentage }) => `${device}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {deviceUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#ffffff' }}
                  itemStyle={{ color: '#ffffff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {deviceUsage.map((device) => (
              <div key={device.device} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{device.device}</p>
                  <p className="text-gray-400 text-xs">{device.users.toLocaleString()} users</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Revenue & ARPU Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis yAxisId="left" stroke="#94a3b8" label={{ value: 'Revenue (£M)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" label={{ value: 'ARPU (£)', angle: 90, position: 'insideRight', fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#ffffff' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} name="Revenue (£M)" />
              <Line yAxisId="right" type="monotone" dataKey="arpu" stroke="#ec4899" strokeWidth={3} name="ARPU (£)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Content Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Content Performance</h3>
          <div className="space-y-4">
            {contentPerformance.map((content, index) => (
              <div key={content.category} className="border-b border-sky-500/10 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{content.category}</span>
                  <span className="text-sky-400 text-sm">{content.satisfaction}% satisfaction</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Total Views:</span>
                    <span className="text-white font-semibold ml-2">{(content.views / 1000000).toFixed(1)}M</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Time:</span>
                    <span className="text-white font-semibold ml-2">{content.avgTime}</span>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-navy-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${content.satisfaction}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-card rounded-xl p-6 border-l-4 border-sky-500">
          <BarChart3 className="text-sky-400 mb-3" size={32} />
          <h4 className="text-white font-bold mb-2">Peak Viewing</h4>
          <p className="text-gray-300 text-sm">Weekend viewership is 28% higher than weekdays. Consider weekend-exclusive content drops.</p>
        </div>
        <div className="glass-card rounded-xl p-6 border-l-4 border-purple-500">
          <Smartphone className="text-purple-400 mb-3" size={32} />
          <h4 className="text-white font-bold mb-2">Mobile Growth</h4>
          <p className="text-gray-300 text-sm">Mobile viewing increased 28% YoY. Optimize mobile experience and push notifications.</p>
        </div>
        <div className="glass-card rounded-xl p-6 border-l-4 border-pink-500">
          <TrendingUp className="text-pink-400 mb-3" size={32} />
          <h4 className="text-white font-bold mb-2">ARPU Improvement</h4>
          <p className="text-gray-300 text-sm">ARPU grew £0.47 in 6 months. Upselling premium packages showing strong results.</p>
        </div>
      </motion.div>
    </div>
  );
}

