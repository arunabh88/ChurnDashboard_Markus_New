export default function ActionWizard() {
  const steps = [
    { title: 'Segment', description: 'Choose target cohort (pre-filled from Analyse).' },
    { title: 'Playbook', description: 'Select recommended intervention or create custom.' },
    { title: 'Configure', description: 'Fine-tune offer, incentive, or messaging.' },
    { title: 'Schedule', description: 'Pick start date, cadence, and channel mix.' },
    { title: 'Summary', description: 'Review expected lift, KPIs, and approvals.' },
  ];

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Create new action
          </p>
          <h2 className="text-2xl font-bold text-slate-900">Wizard for targeted retention plans</h2>
          <p className="mt-1 text-sm text-slate-600">
            Pre-populated using Analyse insights. Each step ensures the right segment, treatment, and
            measurement plan are applied.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
        >
          Launch Wizard
        </button>
      </header>

      <ol className="grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Step {index + 1}
            </p>
            <p className="mt-2 font-semibold text-slate-800">{step.title}</p>
            <p className="mt-1">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

