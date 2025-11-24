const funnelStages = [
  {
    label: 'Trial',
    description: '3,000 subscribers • 70% churn',
    accent: 'bg-rose-100 text-rose-600',
  },
  {
    label: 'New',
    description: '2,190 subscribers • 20% churn',
    accent: 'bg-amber-100 text-amber-600',
  },
  {
    label: 'Established',
    description: '1.29M subscribers • Target < 0.57%',
    accent: 'bg-emerald-100 text-emerald-600',
  },
];

export default function JourneyFunnel() {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Subscriber Journey
        </p>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Funnel → Retention pond
        </span>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        {funnelStages.map((stage) => (
          <div key={stage.label} className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
            <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stage.accent}`}>
              {stage.label}
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-800">{stage.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

