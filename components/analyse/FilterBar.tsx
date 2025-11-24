import { filters } from '@/lib/data/dashboard';

export default function FilterBar() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FilterSelect label="Date range" options={filters.dates} />
        <FilterSelect label="Plan" options={filters.plans} />
        <FilterSelect label="Region" options={filters.regions} />
        <FilterSelect label="Acquisition source" options={filters.acquisitions} />
      </div>
    </section>
  );
}

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-semibold text-slate-600">
      {label}
      <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

