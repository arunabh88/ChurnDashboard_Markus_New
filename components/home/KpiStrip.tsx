import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { kpiTiles } from '@/lib/data/dashboard';

export default function KpiStrip() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {kpiTiles.map((tile) => (
        <Link
          key={tile.id}
          href={tile.href}
          className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {tile.label}
            </p>
            <ArrowUpRight
              size={16}
              className="text-slate-300 transition group-hover:text-sky-500"
            />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{tile.value}</p>
          <p className="mt-2 text-xs font-medium text-sky-600">{tile.trend}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Tap to open Analyse
          </p>
        </Link>
      ))}
    </section>
  );
}

