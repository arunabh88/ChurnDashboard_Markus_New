import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { recommendedPlaybooks } from '@/lib/data/dashboard';

export default function RecommendedPlaybooks() {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Recommended playbooks
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            AI ready-to-launch retention plans
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Each playbook includes expected lift, ROI, and the segment focus so
            teams can configure in minutes.
          </p>
        </div>
        <Link
          href="/actions?create=custom"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
        >
          <Sparkles size={16} />
          Create Custom Action Plan
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {recommendedPlaybooks.map((playbook) => (
          <div
            key={playbook.id}
            className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-sky-50"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {playbook.segment}
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                {playbook.description}
              </h3>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>Expected lift: {playbook.lift}</li>
                <li>Expected ROI: {playbook.roi}</li>
              </ul>
            </div>
            <Link
              href={`/actions?configure=${playbook.id}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700"
            >
              Configure & Launch
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

