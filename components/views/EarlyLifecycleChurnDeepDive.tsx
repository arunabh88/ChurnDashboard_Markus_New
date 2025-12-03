'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingDown, DollarSign, Clock, Users, PlayCircle, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  earlyLifecycleSubscribers,
  lifecycleTriggers,
  lifecycleSegments,
  filterEarlyLifecycleData,
  getEarlyLifecycleStats,
  getRegionFromCity,
  getTriggerDataByRegion,
  EarlyLifecycleFilters,
  EarlyLifecycleSubscriber,
} from '@/lib/data/earlyLifecycleData';
import { SummaryStatsBar } from '@/components/shared/SummaryStatsBar';
import { FilterPanel, FilterField } from '@/components/shared/FilterPanel';
import { SubscriberActionMenu } from '@/components/subscribers/SubscriberActionMenu';

interface EarlyLifecycleChurnDeepDiveProps {
  onBack: () => void;
  onNavigateToAction?: (action: string, context?: any) => void;
  onNavigateToDrilldown?: (mode: 'trial-triggers' | 'new-users-triggers') => void;
}

export function EarlyLifecycleChurnDeepDive({
  onBack,
  onNavigateToAction,
  onNavigateToDrilldown,
}: EarlyLifecycleChurnDeepDiveProps) {
  const [filters, setFilters] = useState<EarlyLifecycleFilters>({
    lifecycleStage: 'All',
    triggerType: 'All',
    plan: 'All',
    region: 'All',
    signUpDateRange: 'All',
    searchQuery: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSubscribers = useMemo(() => {
    return filterEarlyLifecycleData(earlyLifecycleSubscribers, filters);
  }, [filters]);

  const stats = useMemo(() => {
    return getEarlyLifecycleStats(filteredSubscribers);
  }, [filteredSubscribers]);

  const paginatedSubscribers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSubscribers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSubscribers, currentPage]);

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  // Calculate trigger data by region for chart
  const regionTriggerData = useMemo(() => {
    return getTriggerDataByRegion(filteredSubscribers);
  }, [filteredSubscribers]);

  const handleFilterChange = (key: keyof EarlyLifecycleFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleIndividualAction = (action: string, subscriber: EarlyLifecycleSubscriber) => {
    onNavigateToAction?.(action, { subscriber });
  };

  const timelineData = [
    { period: '0-30 days', churned: 21000, churnRate: 7.0 },
    { period: '31-60 days', churned: 13500, churnRate: 4.6 },
    { period: '61-90 days', churned: 9000, churnRate: 3.2 },
  ];

  const summaryStats = [
    { label: 'Early Churn Rate', value: `${stats.churnRate}%`, icon: <TrendingDown size={18} className="text-red-400" />, color: 'text-red-400' },
    { label: 'Total Affected', value: stats.total.toLocaleString(), icon: <Users size={18} className="text-sky-400" /> },
    { label: 'Revenue at Risk', value: `$${(stats.revenueAtRisk / 1000).toFixed(0)}K`, icon: <DollarSign size={18} className="text-yellow-400" />, color: 'text-yellow-400' },
    { label: 'Avg Days to Churn', value: `${stats.avgDaysToChurn.toFixed(0)} days`, icon: <Clock size={18} className="text-orange-400" />, color: 'text-orange-400' },
    { label: 'Trend', value: '↑ 8%', icon: <TrendingDown size={18} className="text-red-400" />, color: 'text-red-400', trend: 'up' as const },
  ];

  const filterFields: FilterField[] = [
    {
      key: 'lifecycleStage',
      label: 'Lifecycle Stage',
      type: 'select',
      options: [
        { value: 'All', label: 'All Stages' },
        { value: '0-30', label: '0-30 days' },
        { value: '31-60', label: '31-60 days' },
        { value: '61-90', label: '61-90 days' },
      ],
    },
    {
      key: 'triggerType',
      label: 'Trigger Type',
      type: 'select',
      options: [
        { value: 'All', label: 'All Triggers' },
        { value: 'Onboarding confusion', label: 'Onboarding confusion' },
        { value: 'Content misalignment', label: 'Content misalignment' },
        { value: 'Device setup issues', label: 'Device setup issues' },
        { value: 'Engagement drop', label: 'Engagement drop' },
        { value: 'Billing confusion', label: 'Billing confusion' },
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
      key: 'signUpDateRange',
      label: 'Sign-up Date',
      type: 'select',
      options: [
        { value: 'All', label: 'All Time' },
        { value: 'Last 7 days', label: 'Last 7 days' },
        { value: 'Last 30 days', label: 'Last 30 days' },
        { value: 'Last 60 days', label: 'Last 60 days' },
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
            <h1 className="text-2xl font-bold text-white mb-1">Early Lifecycle Churn Analysis (0-90 days)</h1>
            <p className="text-gray-400">Identify triggers and patterns in early subscriber churn</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToDrilldown?.('trial-triggers')}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <Sparkles size={16} />
            View Trial Triggers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToAction?.('onboarding-intervention', { segment: 'trial' })}
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
        {/* Churn Timeline Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl border border-sky-500/20 p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Churn Distribution by Days Active</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
                <XAxis dataKey="period" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(56,189,248,0.35)',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Bar dataKey="churned" name="Churned Subscribers" fill="#ef4444" />
                <Bar dataKey="churnRate" name="Churn Rate %" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Trigger Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl border border-sky-500/20 p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Top Churn Triggers</h3>
          <div className="space-y-3">
            {lifecycleTriggers.map((trigger, index) => (
              <div key={trigger.trigger} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{trigger.trigger}</span>
                  <span className="text-sky-200 font-semibold">{trigger.count.toLocaleString()} ({trigger.percentage}%)</span>
                </div>
                <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trigger.percentage}%` }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Churn Triggers by Region Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl border border-sky-500/20 p-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Churn Triggers by Region</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionTriggerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis dataKey="region" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid rgba(56,189,248,0.35)',
                  borderRadius: '12px',
                }}
              />
              <Legend />
              <Bar dataKey="Onboarding confusion" stackId="a" fill="#a855f7" name="Onboarding confusion" />
              <Bar dataKey="Content misalignment" stackId="a" fill="#ec4899" name="Content misalignment" />
              <Bar dataKey="Device setup issues" stackId="a" fill="#f97316" name="Device setup issues" />
              <Bar dataKey="Engagement drop" stackId="a" fill="#eab308" name="Engagement drop" />
              <Bar dataKey="Billing confusion" stackId="a" fill="#3b82f6" name="Billing confusion" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-xs text-gray-400 text-center">
          Shows distribution of churn triggers across regions. Stacked bars represent total trigger counts per region.
        </p>
      </motion.div>

      {/* Segment Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl border border-sky-500/20 p-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Churn by Segment</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {lifecycleSegments.map((segment) => (
            <div key={segment.segment} className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">{segment.segment} Users</span>
                <span className="text-lg font-bold text-red-400">{segment.churnRate}%</span>
              </div>
              <div className="text-xs text-gray-400 mb-2">
                {segment.count.toLocaleString()} churned • Avg {segment.avgDaysToChurn} days to churn
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (segment.segment === 'Trial') {
                      onNavigateToDrilldown?.('trial-triggers');
                    } else {
                      onNavigateToDrilldown?.('new-users-triggers');
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
                >
                  View Triggers
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filters and Search */}
      <FilterPanel
        filters={filters as unknown as Record<string, string>}
        filterFields={filterFields}
        onFilterChange={(key, value) => handleFilterChange(key as keyof EarlyLifecycleFilters, value)}
        onClearAll={() => {
          setFilters({
            lifecycleStage: 'All',
            triggerType: 'All',
            plan: 'All',
            region: 'All',
            signUpDateRange: 'All',
            searchQuery: '',
          });
        }}
        searchPlaceholder="Search by subscriber ID, email, or name..."
        searchValue={filters.searchQuery}
        onSearchChange={(value) => handleFilterChange('searchQuery', value)}
      />

      {/* Affected Subscribers Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-xl border border-sky-500/20 overflow-hidden"
      >
        {filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 text-lg">No subscribers found matching your filters</p>
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
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Region</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Days Active</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Churn Risk</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Triggers</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Sign-up Date</th>
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
                        <div className="text-gray-300 text-sm">{getRegionFromCity(sub.region)}</div>
                        <div className="text-gray-500 text-xs">{sub.region}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{sub.daysActive} days</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden min-w-[60px]">
                            <div
                              className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                              style={{ width: `${sub.churnRisk}%` }}
                            />
                          </div>
                          <span className="text-white text-xs font-medium w-10">{sub.churnRisk}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {sub.triggers.slice(0, 2).map((trigger) => (
                            <span key={trigger} className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30">
                              {trigger}
                            </span>
                          ))}
                          {sub.triggers.length > 2 && (
                            <span className="text-xs text-gray-400">+{sub.triggers.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{sub.signUpDate}</td>
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
                {Math.min(currentPage * itemsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length} subscribers
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

