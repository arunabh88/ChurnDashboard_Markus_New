'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  variant?: 'full' | 'back-button';
  onBack?: () => void;
  backLabel?: string;
}

export function Breadcrumb({ items = [], variant = 'full', onBack, backLabel = 'Back' }: BreadcrumbProps) {
  if (variant === 'back-button' && onBack) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-gray-400 mb-2"
      >
        <button
          type="button"
          onClick={onBack}
          className="hover:text-sky-300 transition-colors flex items-center gap-1 font-medium"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-sm text-gray-400 mb-2 flex-wrap"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.onClick ? (
            <button
              type="button"
              onClick={item.onClick}
              className={`hover:text-sky-300 transition-colors ${
                item.isActive ? 'text-sky-300 font-semibold' : ''
              }`}
            >
              {item.label}
            </button>
          ) : (
            <span className={item.isActive ? 'text-sky-300 font-semibold' : ''}>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight size={14} className="text-gray-500" />
          )}
        </div>
      ))}
    </motion.div>
  );
}

