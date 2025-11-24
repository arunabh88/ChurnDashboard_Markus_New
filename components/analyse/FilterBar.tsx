'use client';

import { filters } from '@/lib/data/dashboard';
import { Card, CardContent } from '@/components/ui/Card';

export function FilterBar() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Filters help refine analytics in real-time across the customer journey.
        </p>
        <div className="flex flex-wrap gap-3">
          <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 focus:border-sky-300 focus:outline-none dark:border-slate-600 dark:bg-navy-900/80 dark:text-slate-200 dark:focus:border-sky-500/50">
            {filters.dates.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 focus:border-sky-300 focus:outline-none dark:border-slate-600 dark:bg-navy-900/80 dark:text-slate-200 dark:focus:border-sky-500/50">
            {filters.plans.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 focus:border-sky-300 focus:outline-none dark:border-slate-600 dark:bg-navy-900/80 dark:text-slate-200 dark:focus:border-sky-500/50">
            {filters.regions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 focus:border-sky-300 focus:outline-none dark:border-slate-600 dark:bg-navy-900/80 dark:text-slate-200 dark:focus:border-sky-500/50">
            {filters.acquisitions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
}

