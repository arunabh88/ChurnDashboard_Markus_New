import { filters } from '@/lib/data/dashboard';

export default function GlobalFilters() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Global filters
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Use filters to refine Analytic views across journey, signals, and
            models.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect label="Date Range" options={filters.dates} />
          <FilterSelect label="Region" options={filters.regions} />
          <FilterSelect label="Plan" options={filters.plans} />
          <FilterSelect label="Device" options={filters.devices} />
        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
      {label}
      <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

