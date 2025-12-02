'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, TrendingUp, DollarSign, Users, PlayCircle, Shield } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  highRiskSubscribers,
  riskSignals,
  filterHighRiskData,
  getHighRiskStats,
  HighRiskFilters,
  HighRiskSubscriber,
} from '@/lib/data/highRiskData';
import { SummaryStatsBar } from '@/components/shared/SummaryStatsBar';
import { FilterPanel, FilterField } from '@/components/shared/FilterPanel';
import { BulkActionToolbar } from '@/components/subscribers/BulkActionToolbar';
import { SubscriberActionMenu } from '@/components/subscribers/SubscriberActionMenu';

interface HighRiskSubscribersDeepDiveProps {
  onBack: () => void;
  onNavigateToAction?: (action: string, subscribers: HighRiskSubscriber[]) => void;
}

export function HighRiskSubscribersDeepDive({ onBack, onNavigateToAction }: HighRiskSubscribersDeepDiveProps) {
  const [filters, setFilters] = useState<HighRiskFilters>({
    riskLevel: 'All',
    plan: 'All',
    tenureRange: 'All',
    engagementRange: 'All',
    riskSignal: 'All',
    region: 'All',
    searchQuery: '',
  });
  const [selectedSubscribers, setSelectedSubscribers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSubscribers = useMemo(() => {
    return filterHighRiskData(highRiskSubscribers, filters);
  }, [filters]);

  const stats = useMemo(() => {
    return getHighRiskStats(filteredSubscribers);
  }, [filteredSubscribers]);

  const paginatedSubscribers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSubscribers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSubscribers, currentPage]);

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const handleFilterChange = (key: keyof HighRiskFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    if (selectedSubscribers.size === paginatedSubscribers.length) {
      setSelectedSubscribers(new Set());
    } else {
      setSelectedSubscribers(new Set(paginatedSubscribers.map((s) => s.id)));
    }
  };

  const handleSelectSubscriber = (id: string) => {
    const newSelected = new Set(selectedSubscribers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSubscribers(newSelected);
  };

  const handleClearSelection = () => {
    setSelectedSubscribers(new Set());
  };

  const handleIndividualAction = (action: string, subscriber: HighRiskSubscriber) => {
    onNavigateToAction?.(action, [subscriber]);
  };

  const handleBulkAction = (action: string, subscribers: HighRiskSubscriber[]) => {
    onNavigateToAction?.(action, subscribers);
    handleClearSelection();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const selectedSubscriberObjects = useMemo(() => {
    return highRiskSubscribers.filter((s) => selectedSubscribers.has(s.id));
  }, [selectedSubscribers]);

  const riskDistributionData = [
    { name: 'Critical', value: stats.critical, color: '#ef4444' },
    { name: 'High', value: stats.high, color: '#f97316' },
    { name: 'Medium', value: stats.medium, color: '#eab308' },
  ];

  const summaryStats = [
    { label: 'Total High-Risk', value: stats.total.toLocaleString(), icon: <AlertTriangle size={18} className="text-red-400" />, color: 'text-red-400' },
    { label: 'Critical Risk', value: stats.critical, icon: <AlertTriangle size={18} className="text-red-400" />, color: 'text-red-400' },
    { label: 'High Risk', value: stats.high, icon: <TrendingUp size={18} className="text-orange-400" />, color: 'text-orange-400' },
    { label: 'Revenue at Risk', value: `$${(stats.revenueAtRisk / 1000).toFixed(0)}K`, icon: <DollarSign size={18} className="text-yellow-400" />, color: 'text-yellow-400' },
    { label: 'Avg Churn Probability', value: `${stats.avgChurnProbability.toFixed(0)}%`, icon: <Shield size={18} className="text-sky-400" /> },
  ];

  const filterFields: FilterField[] = [
    {
      key: 'riskLevel',
      label: 'Risk Level',
      type: 'select',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Critical', label: 'Critical' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
      ],
    },
    {
      key: 'plan',
      label: 'Plan Type',
      type: 'select',
      options: [
        { value: 'All', label: 'All Plans' },
        { value: 'Sky Ultimate', label: 'Sky Ultimate' },
        { value: 'Sky Entertainment', label: 'Sky Entertainment' },
        { value: 'Sky Sports', label: 'Sky Sports' },
        { value: 'Sky Cinema', label: 'Sky Cinema' },
        { value: 'Sky Basic', label: 'Sky Basic' },
      ],
    },
    {
      key: 'tenureRange',
      label: 'Tenure Range',
      type: 'select',
      options: [
        { value: 'All', label: 'All' },
        { value: '0-3', label: '0-3 months' },
        { value: '3-6', label: '3-6 months' },
        { value: '6-12', label: '6-12 months' },
        { value: '12-24', label: '12-24 months' },
        { value: '24+', label: '24+ months' },
      ],
    },
    {
      key: 'engagementRange',
      label: 'Engagement',
      type: 'select',
      options: [
        { value: 'All', label: 'All' },
        { value: '0-25', label: '0-25%' },
        { value: '25-50', label: '25-50%' },
        { value: '50-75', label: '50-75%' },
        { value: '75-100', label: '75-100%' },
      ],
    },
    {
      key: 'riskSignal',
      label: 'Risk Signal',
      type: 'select',
      options: [
        { value: 'All', label: 'All Signals' },
        { value: 'Engagement Drop', label: 'Engagement Drop' },
        { value: 'Billing Issues', label: 'Billing Issues' },
        { value: 'Sentiment Negative', label: 'Sentiment Negative' },
        { value: 'Experience Issues', label: 'Experience Issues' },
        { value: 'Competitor Activity', label: 'Competitor Activity' },
        { value: 'Loyalty Decline', label: 'Loyalty Decline' },
      ],
    },
    {
      key: 'region',
      label: 'Region',
      type: 'select',
      options: [
        { value: 'All', label: 'All Regions' },
        { value: 'Global', label: 'Global' },
        { value: 'EMEA', label: 'EMEA' },
        { value: 'Americas', label: 'Americas' },
        { value: 'APAC', label: 'APAC' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">High-Risk Subscriber Analysis</h1>
            <p className="text-gray-400">Identify and take action on subscribers at risk of churning</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFilters((prev) => ({ ...prev, riskLevel: 'Critical' }));
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/25 transition-colors"
          >
            <AlertTriangle size={16} />
            Critical Risk Only
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToAction?.('campaign', { segment: 'high-risk' })}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <PlayCircle size={16} />
            Create Intervention
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Stats Bar */}
      <SummaryStatsBar stats={summaryStats} columns={5} />

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Risk Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl border border-sky-500/20 p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(56,189,248,0.35)',
                    borderRadius: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Risk Drivers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl border border-sky-500/20 p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Top Risk Signals</h3>
          <div className="space-y-3">
            {riskSignals.map((signal, index) => {
              const severityColor =
                signal.severity === 'Critical'
                  ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : signal.severity === 'High'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
              return (
                <div key={signal.signal} className="flex items-center justify-between p-3 rounded-lg border border-sky-500/20 bg-navy-900/50">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full border ${severityColor}`}>{signal.severity}</span>
                    <span className="text-sm text-white">{signal.signal}</span>
                  </div>
                  <span className="text-sm font-semibold text-sky-200">{signal.count.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bulk Action Toolbar */}
      <BulkActionToolbar
        selectedCount={selectedSubscribers.size}
        selectedSubscribers={selectedSubscriberObjects as any}
        onBulkAction={handleBulkAction as any}
        onClearSelection={handleClearSelection}
      />

      {/* Filters and Search */}
      <FilterPanel
        filters={filters}
        filterFields={filterFields}
        onFilterChange={(key, value) => handleFilterChange(key as keyof HighRiskFilters, value)}
        onClearAll={() => {
          setFilters({
            riskLevel: 'All',
            plan: 'All',
            tenureRange: 'All',
            engagementRange: 'All',
            riskSignal: 'All',
            region: 'All',
            searchQuery: '',
          });
        }}
        searchPlaceholder="Search by subscriber ID, email, or name..."
        searchValue={filters.searchQuery}
        onSearchChange={(value) => handleFilterChange('searchQuery', value)}
      />

      {/* High-Risk Subscribers Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl border border-sky-500/20 overflow-hidden"
      >
        {filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 text-lg">No high-risk subscribers found matching your filters</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-900/50 border-b border-sky-500/20">
                  <tr>
                    <th className="text-left py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.size === paginatedSubscribers.length && paginatedSubscribers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-sky-500/30 bg-navy-900/60 text-sky-500 focus:ring-2 focus:ring-sky-500/50"
                      />
                    </th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Subscriber ID</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Name & Email</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Plan</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Risk Level</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Churn Probability</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Top Risk Signals</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">LTV</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSubscribers.map((sub, index) => (
                    <motion.tr
                      key={sub.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-sky-500/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.has(sub.id)}
                          onChange={() => handleSelectSubscriber(sub.id)}
                          className="rounded border-sky-500/30 bg-navy-900/60 text-sky-500 focus:ring-2 focus:ring-sky-500/50"
                        />
                      </td>
                      <td className="py-4 px-4 text-sky-400 font-mono text-sm">{sub.id}</td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-white font-medium text-sm">{sub.name}</div>
                          <div className="text-gray-400 text-xs">{sub.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{sub.plan}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(sub.riskLevel)}`}>
                          {sub.riskLevel}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden min-w-[60px]">
                            <div
                              className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                              style={{ width: `${sub.churnProbability}%` }}
                            />
                          </div>
                          <span className="text-white text-xs font-medium w-10">{sub.churnProbability}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {sub.topRiskSignals.slice(0, 2).map((signal) => (
                            <span key={signal} className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-500/30">
                              {signal}
                            </span>
                          ))}
                          {sub.topRiskSignals.length > 2 && (
                            <span className="text-xs text-gray-400">+{sub.topRiskSignals.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white font-semibold text-sm">${sub.ltv.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <SubscriberActionMenu
                          subscriber={sub as any}
                          onAction={handleIndividualAction as any}
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-sky-500/20">
              <p className="text-gray-400 text-sm">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredSubscribers.length)} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length} high-risk subscribers
              </p>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-500/20 transition-colors"
                >
                  Previous
                </motion.button>
                <span className="px-3 py-1.5 text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-500/20 transition-colors"
                >
                  Next
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

