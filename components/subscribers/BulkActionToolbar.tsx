'use client';

import { motion } from 'framer-motion';
import { BookOpen, Mail, Users, Download, X } from 'lucide-react';
import { Subscriber } from '@/lib/data/subscribers';

interface BulkActionToolbarProps {
  selectedCount: number;
  selectedSubscribers: Subscriber[];
  onBulkAction: (action: string, subscribers: Subscriber[]) => void;
  onClearSelection: () => void;
}

export function BulkActionToolbar({
  selectedCount,
  selectedSubscribers,
  onBulkAction,
  onClearSelection,
}: BulkActionToolbarProps) {
  if (selectedCount === 0) return null;

  const riskBreakdown = {
    Critical: selectedSubscribers.filter((s) => s.risk === 'Critical').length,
    High: selectedSubscribers.filter((s) => s.risk === 'High').length,
    Medium: selectedSubscribers.filter((s) => s.risk === 'Medium').length,
    Low: selectedSubscribers.filter((s) => s.risk === 'Low').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="sticky top-24 z-30 mb-4 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-500/20 to-blue-500/20 backdrop-blur-lg p-4 shadow-[0_8px_24px_rgba(14,165,233,0.3)]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-500/30 flex items-center justify-center">
              <span className="text-sm font-bold text-white">{selectedCount}</span>
            </div>
            <span className="text-white font-semibold">
              {selectedCount} subscriber{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs">
            {riskBreakdown.Critical > 0 && (
              <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                {riskBreakdown.Critical} Critical
              </span>
            )}
            {riskBreakdown.High > 0 && (
              <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {riskBreakdown.High} High
              </span>
            )}
            {riskBreakdown.Medium > 0 && (
              <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                {riskBreakdown.Medium} Medium
              </span>
            )}
            {riskBreakdown.Low > 0 && (
              <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                {riskBreakdown.Low} Low
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBulkAction('playbook', selectedSubscribers)}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <BookOpen size={14} />
            Apply Playbook
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBulkAction('email', selectedSubscribers)}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <Mail size={14} />
            Send Email
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBulkAction('campaign', selectedSubscribers)}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <Users size={14} />
            Add to Campaign
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBulkAction('export', selectedSubscribers)}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
          >
            <Download size={14} />
            Export
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearSelection}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-500/25 transition-colors"
          >
            <X size={14} />
            Clear
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

