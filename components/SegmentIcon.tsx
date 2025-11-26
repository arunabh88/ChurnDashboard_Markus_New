import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';

interface SegmentIconProps {
  icon: LucideIcon;
  gradient: [string, string];
  size?: 'md' | 'lg';
}

const sizeMap = {
  md: { wrapper: 'h-12 w-12', icon: 22 },
  lg: { wrapper: 'h-14 w-14', icon: 28 },
} as const;

export function SegmentIcon({ icon: Icon, gradient, size = 'md' }: SegmentIconProps) {
  const [start, end] = gradient;
  const { wrapper, icon: iconSize } = sizeMap[size];

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${start}, ${end})`,
  };

  return (
    <span
      style={gradientStyle}
      className={`relative inline-flex ${wrapper} items-center justify-center overflow-hidden rounded-full text-white shadow-[0_12px_28px_rgba(8,47,73,0.4)]`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full border border-white/25 opacity-80" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-20 mix-blend-overlay" />
      <span className="pointer-events-none absolute inset-1 rounded-full bg-white/10 opacity-30 blur-sm" />
      <Icon className="relative drop-shadow-[0_6px_12px_rgba(15,23,42,0.45)]" size={iconSize} />
    </span>
  );
}

