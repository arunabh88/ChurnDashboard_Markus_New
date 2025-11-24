import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { kpiCards } from '@/lib/data/dashboard';

export default function KpiStrip() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {kpiCards.map((card) => (
        <Link
          key={card.id}
          href={card.href}
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <ArrowUpRight
              size={16}
              className="text-slate-300 transition group-hover:text-sky-500"
            />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{card.value}</p>
          <p className="mt-2 text-xs font-semibold text-sky-600">{card.change}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Tap to open Analyse
          </p>
        </Link>
      ))}
    </section>
  );
}

