'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign, TrendingUp, Target, BarChart3, PlayCircle, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  cltvCacTrendData,
  segmentPerformanceData,
  filterCltvCacData,
  getCltvCacStats,
  CltvCacFilters,
  SegmentPerformance,
} from '@/lib/data/cltvCacData';
import { SummaryStatsBar } from '@/components/shared/SummaryStatsBar';
import { FilterPanel, FilterField } from '@/components/shared/FilterPanel';

interface CltvCacDeepDiveProps {
  onBack: () => void;
  onNavigateToAction?: (action: string, context?: any) => void;
}

export function CltvCacDeepDive({ onBack, onNavigateToAction }: CltvCacDeepDiveProps) {
  const [filters, setFilters] = useState<CltvCacFilters>({
    segment: 'All',
    plan: 'All',
    acquisitionSource: 'All',
    region: 'All',
    dateRange: 'All',
    searchQuery: '',
  });
  const [sortBy, setSortBy] = useState<'ratio' | 'cltv' | 'cac' | 'revenue'>('ratio');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredSegments = useMemo(() => {
    return filterCltvCacData(segmentPerformanceData, filters);
  }, [filters]);

  const sortedSegments = useMemo(() => {
    const sorted = [...filteredSegments].sort((a, b) => {
      let aValue: number;
      let bValue: number;
      switch (sortBy) {
        case 'ratio':
          aValue = a.cltvCacRatio;
          bValue = b.cltvCacRatio;
          break;
        case 'cltv':
          aValue = a.avgCltv;
          bValue = b.avgCltv;
          break;
        case 'cac':
          aValue = a.avgCac;
          bValue = b.avgCac;
          break;
        case 'revenue':
          aValue = a.revenue;
          bValue = b.revenue;
          break;
        default:
          return 0;
      }
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
    return sorted;
  }, [filteredSegments, sortBy, sortOrder]);

  const stats = useMemo(() => {
    return getCltvCacStats(filteredSegments);
  }, [filteredSegments]);

  const handleFilterChange = (key: keyof CltvCacFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const lowRatioSegments = sortedSegments.filter((s) => s.cltvCacRatio < 3.5);

  const summaryStats = [
    { label: 'Current Ratio', value: `${stats.currentRatio}×`, icon: <DollarSign size={18} className="text-sky-400" /> },
    { label: 'Avg CLTV', value: `$${stats.avgCltv}`, icon: <TrendingUp size={18} className="text-green-400" />, color: 'text-green-400' },
    { label: 'Avg CAC', value: `$${stats.avgCac}`, icon: <TrendingDown size={18} className="text-orange-400" />, color: 'text-orange-400' },
    { label: 'Target Ratio', value: `${stats.targetRatio}×`, icon: <Target size={18} className="text-emerald-400" />, color: 'text-emerald-400' },
    { label: 'Gap', value: `${stats.gap > 0 ? '+' : ''}${stats.gap}×`, icon: <BarChart3 size={18} className={parseFloat(stats.gap) < 0 ? 'text-red-400' : 'text-green-400'} />, color: parseFloat(stats.gap) < 0 ? 'text-red-400' : 'text-green-400' },
  ];

  const filterFields: FilterField[] = [
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
      key: 'acquisitionSource',
      label: 'Acquisition Source',
      type: 'select',
      options: [
        { value: 'All', label: 'All Sources' },
        { value: 'Paid', label: 'Paid' },
        { value: 'Organic', label: 'Organic' },
        { value: 'Partner', label: 'Partner' },
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
      key: 'dateRange',
      label: 'Date Range',
      type: 'select',
      options: [
        { value: 'All', label: 'All Time' },
        { value: 'Last 30 days', label: 'Last 30 days' },
        { value: 'Last 60 days', label: 'Last 60 days' },
        { value: 'Last 90 days', label: 'Last 90 days' },
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
            <h1 className="text-2xl font-bold text-white mb-1">CLTV / CAC Analysis</h1>
            <p className="text-gray-400">Analyze customer lifetime value vs acquisition cost by segment</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Filter to show low ratio segments
              setFilters((prev) => ({ ...prev, segment: 'All' }));
              // Could add a state to highlight low ratio segments
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-200 hover:bg-orange-500/25 transition-colors"
          >
            <Target size={16} />
            Optimize Low-Ratio
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToAction?.('campaign', { segment: 'high-cltv' })}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <PlayCircle size={16} />
            Create Campaign
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Stats Bar */}
      <SummaryStatsBar stats={summaryStats} columns={5} />

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* CLTV vs CAC Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl border border-sky-500/20 p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">CLTV vs CAC Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cltvCacTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(56,189,248,0.35)',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="cltv" name="CLTV ($)" stroke="#f97316" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="cac" name="CAC ($)" stroke="#38bdf8" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="ratio" name="Ratio" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Optimization Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl border border-sky-500/20 p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200 mb-4">Optimization Opportunities</h3>
          <div className="space-y-3">
            {lowRatioSegments.slice(0, 5).map((segment) => (
              <div key={`${segment.segment}-${segment.plan}`} className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">
                    {segment.segment} - {segment.plan}
                  </span>
                  <span className="text-sm font-bold text-orange-400">{segment.cltvCacRatio.toFixed(1)}×</span>
                </div>
                <div className="text-xs text-gray-400">
                  CLTV: ${segment.avgCltv} | CAC: ${segment.avgCac} | Gap: {(3.5 - segment.cltvCacRatio).toFixed(1)}×
                </div>
              </div>
            ))}
            {lowRatioSegments.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">All segments meet target ratio</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <FilterPanel
        filters={filters}
        filterFields={filterFields}
        onFilterChange={(key, value) => handleFilterChange(key as keyof CltvCacFilters, value)}
        onClearAll={() => {
          setFilters({
            segment: 'All',
            plan: 'All',
            acquisitionSource: 'All',
            region: 'All',
            dateRange: 'All',
            searchQuery: '',
          });
        }}
        searchPlaceholder="Search by segment name or plan type..."
        searchValue={filters.searchQuery}
        onSearchChange={(value) => handleFilterChange('searchQuery', value)}
      />

      {/* Segment Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl border border-sky-500/20 overflow-hidden"
      >
        <div className="p-4 border-b border-sky-500/20 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200">Segment Performance</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as typeof sortBy)}
              className="bg-navy-900/60 border border-sky-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              <option value="ratio">CLTV/CAC Ratio</option>
              <option value="cltv">Avg CLTV</option>
              <option value="cac">Avg CAC</option>
              <option value="revenue">Revenue</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20 transition-colors"
            >
              {sortOrder === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            </motion.button>
          </div>
        </div>
        {sortedSegments.length === 0 ? (
          <div className="p-12 text-center">
            <BarChart3 size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 text-lg">No segments found matching your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy-900/50 border-b border-sky-500/20">
                <tr>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Segment</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Plan</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Subscriber Count</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Avg CLTV</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Avg CAC</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">CLTV/CAC Ratio</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Revenue</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Trend</th>
                  <th className="text-left text-gray-400 font-medium py-4 px-4 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedSegments.map((segment, index) => {
                  const isLowRatio = segment.cltvCacRatio < 3.5;
                  return (
                    <motion.tr
                      key={`${segment.segment}-${segment.plan}-${segment.region}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-sky-500/10 hover:bg-white/5 transition-colors ${isLowRatio ? 'bg-orange-500/5' : ''}`}
                    >
                      <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-white">{segment.segment}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{segment.plan}</td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{segment.subscriberCount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-white font-semibold text-sm">${segment.avgCltv.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-300 text-sm">${segment.avgCac.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-bold ${isLowRatio ? 'text-orange-400' : 'text-emerald-400'}`}>
                          {segment.cltvCacRatio.toFixed(1)}×
                        </span>
                        {isLowRatio && (
                          <span className="ml-2 text-xs text-orange-400">Below target</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-white font-semibold text-sm">${(segment.revenue / 1000000).toFixed(1)}M</td>
                      <td className="py-4 px-4">
                        {segment.trend === 'up' ? (
                          <TrendingUp size={16} className="text-green-400" />
                        ) : segment.trend === 'down' ? (
                          <TrendingDown size={16} className="text-red-400" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onNavigateToAction?.('optimize', { segment })}
                          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
                        >
                          Optimize
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

