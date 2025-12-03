import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export type MetricType = 'churn' | 'risk' | 'growth' | 'roi' | 'revenue' | 'subscribers';

export interface ChangeDisplay {
  value: string;
  color: string;
  icon: 'up' | 'down' | 'neutral';
  isGood: boolean;
}

/**
 * Formats a change value with proper sign, color, and icon based on metric type
 * @param change - The change value (can be positive or negative)
 * @param metricType - The type of metric to determine if change is good/bad
 * @returns Formatted change display with sign, color, and icon
 */
export function formatChange(change: number, metricType: MetricType): ChangeDisplay {
  const absChange = Math.abs(change);
  const isPositive = change > 0;
  const isZero = change === 0;

  // Determine if the change is good or bad based on metric type
  let isGood: boolean;
  switch (metricType) {
    case 'churn':
    case 'risk':
      // For churn/risk: negative change is good (decrease), positive is bad (increase)
      isGood = !isPositive && !isZero;
      break;
    case 'growth':
    case 'revenue':
    case 'subscribers':
    case 'roi':
      // For growth/revenue/subscribers/roi: positive change is good, negative is bad
      isGood = isPositive && !isZero;
      break;
    default:
      isGood = isPositive;
  }

  // Determine color
  let color: string;
  if (isZero) {
    color = 'text-gray-400';
  } else if (isGood) {
    color = 'text-emerald-400';
  } else {
    color = 'text-red-400';
  }

  // Determine icon
  let icon: 'up' | 'down' | 'neutral';
  if (isZero) {
    icon = 'neutral';
  } else if (isPositive) {
    icon = 'up';
  } else {
    icon = 'down';
  }

  // Format value with sign
  const sign = isPositive ? '+' : isZero ? '' : '-';
  const value = `${sign}${absChange}%`;

  return { value, color, icon, isGood };
}


