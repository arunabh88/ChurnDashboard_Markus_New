import { subscribers } from '@/lib/data/dashboard';

export default function SubscriberDrilldown() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Subscriber drilldown
          </p>
          <h2 className="text-2xl font-bold text-slate-900">Investigate individual journeys</h2>
          <p className="mt-1 text-sm text-slate-600">
            Search, filter, and review each subscriber’s timeline, payment history, churn signals,
            and AI recommendations.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search subscribers…"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
          >
            Filters
          </button>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1.8fr]">
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {subscribers.map((subscriber) => (
            <button
              key={subscriber.id}
              type="button"
              className="w-full rounded-xl border border-transparent bg-white p-4 text-left transition hover:border-sky-200 hover:shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {subscriber.segment}
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {subscriber.name}{' '}
                <span className="text-xs font-normal text-slate-500">({subscriber.id})</span>
              </p>
              <p className="text-xs text-slate-500">{subscriber.plan}</p>
            </button>
          ))}
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-800">
            {subscribers[0].name}{' '}
            <span className="text-xs font-normal text-slate-500">({subscribers[0].id})</span>
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoBlock title="Plan" value={subscribers[0].plan} />
            <InfoBlock title="Risk level" value={subscribers[0].risk} />
            <InfoBlock title="Payment method" value={subscribers[0].payment} />
            <InfoBlock title="Recent interventions" value={subscribers[0].interventions.join(', ')} />
          </div>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Churn signals
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {subscribers[0].churnSignals.map((signal) => (
                <li key={signal}>• {signal}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Content engagement
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {subscribers[0].engagement.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              AI recommendations
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Offer loyalty credits with sports content unlock, schedule concierge follow-up, and
              encourage multi-device usage.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

