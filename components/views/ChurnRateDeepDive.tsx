'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingDown, Target, DollarSign, Users, Download, PlayCircle, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import {
  churnTrendData,
  rootCauses,
  segmentChurnData,
  churnedSubscribers,
  filterChurnData,
  ChurnFilters,
} from '@/lib/data/churnRateData';
import { SummaryStatsBar } from '@/components/shared/SummaryStatsBar';
import { FilterPanel, FilterField } from '@/components/shared/FilterPanel';

interface ChurnRateDeepDiveProps {
  onBack: () => void;
  onNavigateToAction?: (action: string, context?: any) => void;
  onNavigateToAnalyse?: () => void;
}

export function ChurnRateDeepDive({ onBack, onNavigateToAction, onNavigateToAnalyse }: ChurnRateDeepDiveProps) {
  const [filters, setFilters] = useState<ChurnFilters>({
    dateRange: 'all',
    plan: 'All',
    region: 'All',
    segment: 'All',
    searchQuery: '',
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSubscribers = useMemo(() => {
    return filterChurnData(churnedSubscribers, filters);
  }, [filters]);

  const paginatedSubscribers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSubscribers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSubscribers, currentPage]);

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const handleFilterChange = (key: keyof ChurnFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const currentChurnRate = 1.52;
  const targetChurnRate = 1.45;
  const gap = currentChurnRate - targetChurnRate;
  const monthlyChurned = 32160;
  const gapValue = gap >= 0 ? `+${gap.toFixed(2)}%` : `${gap.toFixed(2)}%`; // Explicit sign
  const gapColor = gap > 0 ? 'text-red-400' : gap < 0 ? 'text-green-400' : 'text-gray-400'; // Red if above target (bad), green if below (good)

  const stats = [
    { label: 'Current Churn Rate', value: `${currentChurnRate}%`, icon: <TrendingDown size={18} className="text-red-400" />, color: 'text-red-400' },
    { label: 'Target Churn Rate', value: `${targetChurnRate}%`, icon: <Target size={18} className="text-green-400" />, color: 'text-green-400' },
    { label: 'Gap from Target', value: gapValue, icon: <BarChart3 size={18} className={gapColor} />, color: gapColor, trend: gap > 0 ? 'up' as const : 'down' as const, trendValue: gap > 0 ? 'Above target' : gap < 0 ? 'Below target' : 'On target' },
    { label: 'Monthly Churned', value: monthlyChurned.toLocaleString(), icon: <Users size={18} className="text-sky-400" /> },
    { label: 'Trend', value: '+4%', icon: <TrendingDown size={18} className="text-red-400" />, color: 'text-red-400', trend: 'up' as const },
  ];

  const filterFields: FilterField[] = [
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'select',
      options: [
        { value: 'all', label: 'All Time' },
        { value: '30', label: 'Last 30 days' },
        { value: '60', label: 'Last 60 days' },
        { value: '90', label: 'Last 90 days' },
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
    {
      key: 'segment',
      label: 'Segment',
      type: 'select',
      options: [
        { value: 'All', label: 'All Segments' },
        { value: 'Trial', label: 'Trial' },
        { value: 'New', label: 'New' },
        { value: 'Established', label: 'Established' },
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
            <h1 className="text-2xl font-bold text-white mb-1">Monthly Churn Analysis</h1>
            <p className="text-gray-400">Deep dive into churn trends, root causes, and affected subscribers</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToAction?.('campaign', { segment: 'high-churn' })}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <PlayCircle size={16} />
            Create Campaign
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToAnalyse?.()}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <BarChart3 size={16} />
            Analyze Root Causes
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Stats Bar */}
      <SummaryStatsBar stats={stats} columns={5} />

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Churn Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl border border-sky-500/20 p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Churn Rate vs Target</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churnTrendData}>
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
                <Line type="monotone" dataKey="churnRate" name="Actual" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Root Cause Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl border border-sky-500/20 p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Top Churn Drivers</h3>
          <div className="space-y-3">
            {rootCauses.map((cause, index) => (
              <div key={cause.reason} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{cause.reason}</span>
                  <span className="text-sky-200 font-semibold">{cause.percentage}%</span>
                </div>
                <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cause.percentage}%` }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cause.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Segment Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl border border-sky-500/20 p-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Churn by Segment</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segmentChurnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis dataKey="segment" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid rgba(56,189,248,0.35)',
                  borderRadius: '12px',
                }}
              />
              <Legend />
              <Bar dataKey="churnRate" name="Churn Rate %" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <FilterPanel
        filters={filters as unknown as Record<string, string>}
        filterFields={filterFields}
        onFilterChange={(key, value) => handleFilterChange(key as keyof ChurnFilters, value)}
        onClearAll={() => {
          setFilters({
            dateRange: 'all',
            plan: 'All',
            region: 'All',
            segment: 'All',
            searchQuery: '',
          });
        }}
        searchPlaceholder="Search by subscriber ID, email, or name..."
        searchValue={filters.searchQuery}
        onSearchChange={(value) => handleFilterChange('searchQuery', value)}
      />

      {/* Churned Subscribers Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-xl border border-sky-500/20 overflow-hidden"
      >
        {filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 text-lg">No churned subscribers found matching your filters</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-900/50 border-b border-sky-500/20">
                  <tr>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Subscriber ID</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Name & Email</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Plan</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Segment</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Churn Date</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Reason</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">LTV Lost</th>
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
                      <td className="py-4 px-4 text-sky-400 font-mono text-sm">{sub.id}</td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-white font-medium text-sm">{sub.name}</div>
                          <div className="text-gray-400 text-xs">{sub.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{sub.plan}</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-2 py-1 rounded-full border bg-sky-500/20 text-sky-200 border-sky-500/30">
                          {sub.segment}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{sub.churnDate}</td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{sub.reason}</td>
                      <td className="py-4 px-4 text-white font-semibold text-sm">${sub.ltvLost.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onNavigateToAction?.('view-similar', { subscriber: sub })}
                          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
                        >
                          View Similar
                        </motion.button>
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
                {Math.min(currentPage * itemsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length} churned subscribers
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

