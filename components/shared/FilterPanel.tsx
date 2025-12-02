'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField {
  key: string;
  label: string;
  type: 'select' | 'search';
  options?: FilterOption[];
  placeholder?: string;
}

interface FilterPanelProps {
  filters: Record<string, string>;
  filterFields: FilterField[];
  onFilterChange: (key: string, value: string) => void;
  onClearAll: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function FilterPanel({
  filters,
  filterFields,
  onFilterChange,
  onClearAll,
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
}: FilterPanelProps) {
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const hasActiveFilters = Object.values(filters).some((value) => value && value !== 'All' && value !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 border border-sky-500/20"
    >
      <div className="flex flex-col gap-4">
        {/* Search Bar and Filter Toggle - Side by Side */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          {onSearchChange && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-navy-900/60 border border-sky-500/30 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
          )}

          {/* Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/15 transition-colors whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-sky-300" />
              <span className="text-sm font-semibold text-sky-200">Advanced Filters</span>
            </div>
            {filtersOpen ? <ChevronUp size={16} className="text-sky-300" /> : <ChevronDown size={16} className="text-sky-300" />}
          </motion.button>
        </div>

        {/* Filter Panel */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-sky-500/20"
          >
            {filterFields.map((field) => {
              if (field.type === 'select' && field.options) {
                return (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-gray-400 mb-2">{field.label}</label>
                    <select
                      value={filters[field.key] || 'All'}
                      onChange={(e) => onFilterChange(field.key, e.target.value)}
                      className="w-full bg-navy-900/60 border border-sky-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
              return null;
            })}
          </motion.div>
        )}

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-sky-500/20">
            <span className="text-xs text-gray-400">Active filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (!value || value === 'All' || value === '') return null;
              const field = filterFields.find((f) => f.key === key);
              if (!field) return null;
              return (
                <span
                  key={key}
                  className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs border border-sky-500/30"
                >
                  {field.label}: {value}
                  <button
                    onClick={() => onFilterChange(key, 'All')}
                    className="ml-2 hover:text-red-400"
                    aria-label={`Remove ${field.label} filter`}
                  >
                    ×
                  </button>
                </span>
              );
            })}
            <button
              onClick={onClearAll}
              className="px-2 py-1 rounded-full bg-red-500/20 text-red-200 text-xs border border-red-500/30 hover:bg-red-500/30"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

