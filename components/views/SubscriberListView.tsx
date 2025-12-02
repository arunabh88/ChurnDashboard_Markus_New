'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, ChevronDown, ChevronUp, Users, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { mockSubscribers, filterSubscribers, getSubscriberStats, SubscriberFilters, Subscriber } from '@/lib/data/subscribers';
import { SubscriberActionMenu } from '@/components/subscribers/SubscriberActionMenu';
import { BulkActionToolbar } from '@/components/subscribers/BulkActionToolbar';

interface SubscriberListViewProps {
  onBack: () => void;
  onNavigateToAction?: (action: string, subscribers: Subscriber[]) => void;
}

export function SubscriberListView({ onBack, onNavigateToAction }: SubscriberListViewProps) {
  const [filters, setFilters] = useState<SubscriberFilters>({
    riskLevel: 'All',
    plan: 'All',
    tenureRange: 'All',
    engagementRange: 'All',
    status: 'All',
    searchQuery: '',
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSubscribers, setSelectedSubscribers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSubscribers = useMemo(() => {
    return filterSubscribers(mockSubscribers, filters);
  }, [filters]);

  const stats = useMemo(() => {
    return getSubscriberStats(filteredSubscribers);
  }, [filteredSubscribers]);

  const paginatedSubscribers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSubscribers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSubscribers, currentPage]);

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const handleFilterChange = (key: keyof SubscriberFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
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

  const handleIndividualAction = (action: string, subscriber: Subscriber) => {
    console.log('Individual action:', action, subscriber);
    onNavigateToAction?.(action, [subscriber]);
  };

  const handleBulkAction = (action: string, subscribers: Subscriber[]) => {
    console.log('Bulk action:', action, subscribers);
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
      case 'Low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  };

  const selectedSubscriberObjects = useMemo(() => {
    return mockSubscribers.filter((s) => selectedSubscribers.has(s.id));
  }, [selectedSubscribers]);

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
            <h1 className="text-2xl font-bold text-white mb-1">Subscriber Management</h1>
            <p className="text-gray-400">View, filter, and take actions on your subscriber base</p>
          </div>
        </div>
      </motion.div>

      {/* Summary Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <div className="glass-card rounded-xl p-4 border border-sky-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} className="text-sky-400" />
            <span className="text-xs text-gray-400">Total</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.total.toLocaleString()}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-400" />
            <span className="text-xs text-gray-400">Critical</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-orange-400" />
            <span className="text-xs text-gray-400">High</span>
          </div>
          <p className="text-2xl font-bold text-orange-400">{stats.high}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-yellow-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-yellow-400" />
            <span className="text-xs text-gray-400">Medium</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">{stats.medium}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-green-400" />
            <span className="text-xs text-gray-400">Low</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{stats.low}</p>
        </div>
      </motion.div>

      {/* Bulk Action Toolbar */}
      <BulkActionToolbar
        selectedCount={selectedSubscribers.size}
        selectedSubscribers={selectedSubscriberObjects}
        onBulkAction={handleBulkAction}
        onClearSelection={handleClearSelection}
      />

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-xl p-6 border border-sky-500/20"
      >
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or subscriber ID..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full bg-navy-900/60 border border-sky-500/30 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </div>

          {/* Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center justify-between p-3 rounded-lg border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/15 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-sky-300" />
              <span className="text-sm font-semibold text-sky-200">Advanced Filters</span>
            </div>
            {filtersOpen ? <ChevronUp size={16} className="text-sky-300" /> : <ChevronDown size={16} className="text-sky-300" />}
          </motion.button>

          {/* Filter Panel */}
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t border-sky-500/20"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Risk Level</label>
                <select
                  value={filters.riskLevel}
                  onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                  className="w-full bg-navy-900/60 border border-sky-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  <option value="All">All</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Plan Type</label>
                <select
                  value={filters.plan}
                  onChange={(e) => handleFilterChange('plan', e.target.value)}
                  className="w-full bg-navy-900/60 border border-sky-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  <option value="All">All</option>
                  <option value="Sky Ultimate">Sky Ultimate</option>
                  <option value="Sky Entertainment">Sky Entertainment</option>
                  <option value="Sky Sports">Sky Sports</option>
                  <option value="Sky Cinema">Sky Cinema</option>
                  <option value="Sky Basic">Sky Basic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Tenure Range</label>
                <select
                  value={filters.tenureRange}
                  onChange={(e) => handleFilterChange('tenureRange', e.target.value)}
                  className="w-full bg-navy-900/60 border border-sky-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  <option value="All">All</option>
                  <option value="0-3">0-3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6-12">6-12 months</option>
                  <option value="12-24">12-24 months</option>
                  <option value="24+">24+ months</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Engagement</label>
                <select
                  value={filters.engagementRange}
                  onChange={(e) => handleFilterChange('engagementRange', e.target.value)}
                  className="w-full bg-navy-900/60 border border-sky-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  <option value="All">All</option>
                  <option value="0-25">0-25%</option>
                  <option value="25-50">25-50%</option>
                  <option value="50-75">50-75%</option>
                  <option value="75-100">75-100%</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full bg-navy-900/60 border border-sky-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="At Risk">At Risk</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Active Filter Badges */}
          {(filters.riskLevel !== 'All' ||
            filters.plan !== 'All' ||
            filters.tenureRange !== 'All' ||
            filters.engagementRange !== 'All' ||
            filters.status !== 'All' ||
            filters.searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-sky-500/20">
              <span className="text-xs text-gray-400">Active filters:</span>
              {filters.riskLevel !== 'All' && (
                <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs border border-sky-500/30">
                  Risk: {filters.riskLevel}
                  <button
                    onClick={() => handleFilterChange('riskLevel', 'All')}
                    className="ml-2 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.plan !== 'All' && (
                <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs border border-sky-500/30">
                  Plan: {filters.plan}
                  <button
                    onClick={() => handleFilterChange('plan', 'All')}
                    className="ml-2 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.tenureRange !== 'All' && (
                <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs border border-sky-500/30">
                  Tenure: {filters.tenureRange}
                  <button
                    onClick={() => handleFilterChange('tenureRange', 'All')}
                    className="ml-2 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.engagementRange !== 'All' && (
                <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs border border-sky-500/30">
                  Engagement: {filters.engagementRange}%
                  <button
                    onClick={() => handleFilterChange('engagementRange', 'All')}
                    className="ml-2 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.status !== 'All' && (
                <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs border border-sky-500/30">
                  Status: {filters.status}
                  <button
                    onClick={() => handleFilterChange('status', 'All')}
                    className="ml-2 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.searchQuery && (
                <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs border border-sky-500/30">
                  Search: {filters.searchQuery}
                  <button
                    onClick={() => handleFilterChange('searchQuery', '')}
                    className="ml-2 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setFilters({
                    riskLevel: 'All',
                    plan: 'All',
                    tenureRange: 'All',
                    engagementRange: 'All',
                    status: 'All',
                    searchQuery: '',
                  });
                }}
                className="px-2 py-1 rounded-full bg-red-500/20 text-red-200 text-xs border border-red-500/30 hover:bg-red-500/30"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Subscribers Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl border border-sky-500/20 overflow-hidden"
      >
        {filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 text-lg">No subscribers found matching your filters</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filter criteria</p>
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
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Status</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Tenure</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">LTV</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Risk Level</th>
                    <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Engagement</th>
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
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(sub.status)}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{sub.tenure} months</td>
                      <td className="py-4 px-4 text-white font-semibold text-sm">${sub.ltv.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(sub.risk)}`}>
                          {sub.risk}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden min-w-[60px]">
                            <div
                              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                              style={{ width: `${sub.engagement}%` }}
                            />
                          </div>
                          <span className="text-white text-xs font-medium w-10">{sub.engagement}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <SubscriberActionMenu
                          subscriber={sub}
                          onAction={handleIndividualAction}
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

