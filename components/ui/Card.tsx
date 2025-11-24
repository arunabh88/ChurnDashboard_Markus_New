'use client';

import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card-background))] shadow-sm transition-colors duration-300 dark:shadow-lg/10',
        className,
      )}
      {...props}
    />
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn('p-6', className)} {...props} />;
}

