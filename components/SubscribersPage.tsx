'use client';

import { motion } from 'framer-motion';
import { Users, UserPlus, UserMinus, Activity, Search, Filter, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SubscribersPage() {
  const subscriberData = [
    { month: 'Jan', total: 2100000, new: 52000, churned: 25000 },
    { month: 'Feb', total: 2127000, new: 48000, churned: 21000 },
    { month: 'Mar', total: 2154000, new: 51000, churned: 24000 },
    { month: 'Apr', total: 2181000, new: 49000, churned: 22000 },
    { month: 'May', total: 2208000, new: 53000, churned: 26000 },
    { month: 'Jun', total: 2235000, new: 55000, churned: 28000 },
  ];

  const subscribers = [
    {
      id: 'SUB-10254',
      name: 'Emma Thompson',
      email: 'emma.t@email.com',
      plan: 'Sky Ultimate',
      status: 'Active',
      tenure: '24 months',
      ltv: '£680',
      risk: 'Low',
      engagement: 92,
    },
    {
      id: 'SUB-10255',
      name: 'James Wilson',
      email: 'j.wilson@email.com',
      plan: 'Sky Entertainment',
      status: 'At Risk',
      tenure: '3 months',
      ltv: '£145',
      risk: 'High',
      engagement: 34,
    },
    {
      id: 'SUB-10256',
      name: 'Sarah Martinez',
      email: 'sarah.m@email.com',
      plan: 'Sky Sports',
      status: 'Active',
      tenure: '18 months',
      ltv: '£520',
      risk: 'Medium',
      engagement: 78,
    },
    {
      id: 'SUB-10257',
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      plan: 'Sky Cinema',
      status: 'Active',
      tenure: '36 months',
      ltv: '£890',
      risk: 'Low',
      engagement: 95,
    },
    {
      id: 'SUB-10258',
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      plan: 'Sky Basic',
      status: 'At Risk',
      tenure: '1 month',
      ltv: '£45',
      risk: 'Critical',
      engagement: 18,
    },
    {
      id: 'SUB-10259',
      name: 'David Brown',
      email: 'd.brown@email.com',
      plan: 'Sky Ultimate',
      status: 'Active',
      tenure: '12 months',
      ltv: '£380',
      risk: 'Low',
      engagement: 88,
    },
  ];

  const stats = [
    { title: 'Total Subscribers', value: '2.1M', change: '+3%', icon: <Users size={24} />, trend: 'positive', gradient: 'from-blue-500 to-cyan-500' },
    { title: 'New This Month', value: '55K', change: '+12%', icon: <UserPlus size={24} />, trend: 'positive', gradient: 'from-green-500 to-emerald-500' },
    { title: 'Churned This Month', value: '28K', change: '+18%', icon: <UserMinus size={24} />, trend: 'negative', gradient: 'from-red-500 to-orange-500' },
    { title: 'Avg Engagement', value: '69%', change: '-5%', icon: <Activity size={24} />, trend: 'negative', gradient: 'from-purple-500 to-pink-500' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Subscribers</h1>
          <p className="text-gray-400">Manage and monitor your subscriber base</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass-card rounded-lg px-4 py-2 text-white hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter size={18} />
            Filter
          </button>
          <button className="glass-card rounded-lg px-4 py-2 text-white hover:bg-white/5 transition-colors flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
        </div>
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

      {/* Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Subscriber Growth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={subscriberData}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#ffffff' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Area type="monotone" dataKey="total" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorTotal)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Subscribers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Subscribers</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search subscribers..."
              className="bg-navy-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sky-500/20">
                <th className="text-left text-gray-400 font-medium py-3 px-4">Subscriber ID</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Name</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Plan</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Tenure</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">LTV</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Risk Level</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, index) => (
                <motion.tr
                  key={sub.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-sky-500/10 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-4 text-sky-400 font-mono text-sm">{sub.id}</td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-white font-medium">{sub.name}</div>
                      <div className="text-gray-400 text-sm">{sub.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{sub.plan}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{sub.tenure}</td>
                  <td className="py-4 px-4 text-white font-semibold">{sub.ltv}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-3 py-1 rounded-full border ${getRiskColor(sub.risk)}`}>
                      {sub.risk}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                          style={{ width: `${sub.engagement}%` }}
                        />
                      </div>
                      <span className="text-white text-sm font-medium w-10">{sub.engagement}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-gray-400 text-sm">Showing 6 of 2,100,000 subscribers</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 glass-card rounded text-gray-400 hover:text-white transition-colors">Previous</button>
            <button className="px-3 py-1 bg-sky-500/20 text-sky-400 rounded">1</button>
            <button className="px-3 py-1 glass-card rounded text-gray-400 hover:text-white transition-colors">2</button>
            <button className="px-3 py-1 glass-card rounded text-gray-400 hover:text-white transition-colors">3</button>
            <button className="px-3 py-1 glass-card rounded text-gray-400 hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

