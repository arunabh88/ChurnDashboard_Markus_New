'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';

interface CreateActionPlanWizardProps {
  open: boolean;
  onClose: () => void;
  onComplete?: (payload: {
    segment: string;
    playbook: string;
    offer: { incentive: string; message: string; guardrail: string };
    schedule: { start: string; channel: string; cadence: string };
  }) => void;
  defaultSegment?: string | null;
}

const STEPS = ['Select segment', 'Choose playbook', 'Configure offer', 'Schedule execution', 'Review & launch'];

const SEGMENTS = [
  { id: 'trial', name: 'Trial · 0-30 days', size: '12.3K users', risk: 'Churn 72%' },
  { id: 'new', name: 'New · 31-90 days', size: '28.4K users', risk: 'Churn 24%' },
  { id: 'high-cltv', name: 'High CLTV established', size: '84.1K users', risk: 'Churn 0.9%' },
  { id: 'sports-fans', name: 'Sports superfans', size: '41.6K users', risk: 'Churn 1.8%' },
];

const PLAYBOOKS = [
  {
    id: 'loyalty-discount',
    name: 'Loyalty Discount',
    lift: '+6.2%',
    roi: '3.4×',
    description: 'Graduated discount with loyalty credit for high-value subscribers.',
  },
  {
    id: 'onboarding-personalisation',
    name: 'Onboarding Personalisation',
    lift: '+8.4%',
    roi: '2.9×',
    description: 'Adaptive onboarding workflow with AI tutorials + concierge outreach.',
  },
  {
    id: 'content-playlist',
    name: 'Content Playlist Re-engagement',
    lift: '+5.1%',
    roi: '2.6×',
    description: 'Curated content playlists via push/email for dormant users.',
  },
  {
    id: 'downgrade-ad-supported',
    name: 'Downgrade to Ad-supported',
    lift: '+4.3%',
    roi: '2.4×',
    description: 'Offer lower-cost ad-supported tier before cancellation intent.',
  },
];

export function CreateActionPlanWizard({
  open,
  onClose,
  onComplete,
  defaultSegment,
}: CreateActionPlanWizardProps) {
  const [step, setStep] = useState(0);
  const [segment, setSegment] = useState<string>('trial');
  const [playbook, setPlaybook] = useState<string>('loyalty-discount');
  const [offer, setOffer] = useState({
    incentive: '£15 loyalty credit',
    message: 'Keep enjoying Sky. Renew today and unlock loyalty pricing.',
    guardrail: 'Target churn risk >65%, CLTV > £250',
  });
  const [schedule, setSchedule] = useState({
    start: 'Immediate (today)',
    channel: 'Email + in-app',
    cadence: '2 touches over 7 days',
  });

  const isLastStep = step === STEPS.length - 1;

  useEffect(() => {
    if (!defaultSegment) return;
    const match = SEGMENTS.find((entry) => entry.id === defaultSegment);
    if (match) {
      setSegment(match.id);
    }
  }, [defaultSegment]);

  useEffect(() => {
    if (!open) {
      setStep(0);
    }
  }, [open]);

  const selectedSegment = useMemo(() => SEGMENTS.find((entry) => entry.id === segment), [segment]);
  const selectedPlaybook = useMemo(() => PLAYBOOKS.find((entry) => entry.id === playbook), [playbook]);

  const handleSubmit = () => {
    if (!selectedSegment || !selectedPlaybook) return;
    onComplete?.({
      segment: selectedSegment.name,
      playbook: selectedPlaybook.name,
      offer,
      schedule,
    });
    onClose();
  };

  const nextDisabled =
    (step === 0 && !segment) ||
    (step === 1 && !playbook) ||
    (step === 2 && (!offer.incentive || !offer.message)) ||
    (step === 3 && (!schedule.start || !schedule.channel));

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="glass-card w-full max-w-3xl rounded-2xl border border-sky-500/30 bg-navy-900/90 shadow-[0_28px_60px_rgba(8,47,73,0.55)]"
      >
        <div className="flex items-start justify-between border-b border-sky-500/20 p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-200">{`Step ${step + 1} · ${STEPS[step]}`}</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Create New Retention Action</h2>
            <p className="mt-2 text-sm text-gray-400">Use Einstein Copilot recommendations to configure and schedule the action.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-sky-500/30 p-1.5 text-sky-200 hover:bg-sky-500/10 transition-colors"
            aria-label="Close wizard"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-sky-200/60">
            {STEPS.map((label, index) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                    index === step
                      ? 'border-sky-400 bg-sky-500/20 text-white'
                      : index < step
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                      : 'border-sky-500/30 bg-transparent text-sky-200/60'
                  }`}
                >
                  {index < step ? <CheckCircle size={16} /> : index + 1}
                </div>
                <span className="w-24 text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-sky-500/20 bg-sky-500/10 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-white">Select the target segment</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {SEGMENTS.map((entry) => {
                        const active = segment === entry.id;
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            onClick={() => setSegment(entry.id)}
                            className={`rounded-xl border px-4 py-4 text-left transition-all ${
                              active
                                ? 'border-sky-400 bg-sky-500/20 shadow-[0_0_24px_rgba(56,189,248,0.18)]'
                                : 'border-sky-500/20 hover:border-sky-400/50'
                            }`}
                          >
                            <div className="flex items-center gap-3 text-sm font-semibold text-white">
                              <Users size={18} className="text-sky-300" />
                              {entry.name}
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs text-sky-200/80">
                              <span>{entry.size}</span>
                              <span className="font-semibold text-rose-300">{entry.risk}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-white">Pick the most effective playbook</h3>
                    <div className="space-y-3">
                      {PLAYBOOKS.map((entry) => {
                        const active = playbook === entry.id;
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            onClick={() => setPlaybook(entry.id)}
                            className={`w-full rounded-xl border px-4 py-4 text-left transition-all ${
                              active
                                ? 'border-sky-400 bg-sky-500/20 shadow-[0_0_24px_rgba(14,165,233,0.25)]'
                                : 'border-sky-500/20 hover:border-sky-400/50'
                            }`}
                          >
                            <div className="flex items-center justify-between text-sm text-white">
                              <div className="font-semibold">{entry.name}</div>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-1 text-emerald-300">
                                  Lift {entry.lift}
                                </span>
                                <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-1 text-sky-200">
                                  ROI {entry.roi}
                                </span>
                              </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-300 leading-relaxed">{entry.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-white">Configure offer details</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
                        Incentive
                        <input
                          value={offer.incentive}
                          onChange={(event) => setOffer((prev) => ({ ...prev, incentive: event.target.value }))}
                          className="rounded-lg border border-sky-500/30 bg-slate-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
                        Guardrail criteria
                        <input
                          value={offer.guardrail}
                          onChange={(event) => setOffer((prev) => ({ ...prev, guardrail: event.target.value }))}
                          className="rounded-lg border border-sky-500/30 bg-slate-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                        />
                      </label>
                    </div>
                    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
                      Message copy
                      <textarea
                        value={offer.message}
                        onChange={(event) => setOffer((prev) => ({ ...prev, message: event.target.value }))}
                        className="min-h-[96px] rounded-lg border border-sky-500/30 bg-slate-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                      />
                    </label>
                    <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-4 text-xs text-sky-100">
                      <p>Einstein Copilot will automatically test incentive elasticity and adjust for ROI guardrails.</p>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-white">Schedule execution</h3>
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
                        Start window
                        <select
                          value={schedule.start}
                          onChange={(event) => setSchedule((prev) => ({ ...prev, start: event.target.value }))}
                          className="rounded-lg border border-sky-500/30 bg-slate-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                        >
                          <option>Immediate (today)</option>
                          <option>Tomorrow 09:00</option>
                          <option>Next Monday</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
                        Primary channel
                        <select
                          value={schedule.channel}
                          onChange={(event) => setSchedule((prev) => ({ ...prev, channel: event.target.value }))}
                          className="rounded-lg border border-sky-500/30 bg-slate-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                        >
                          <option>Email + in-app</option>
                          <option>Push notifications</option>
                          <option>SMS concierge</option>
                          <option>Outbound call list</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-sky-200">
                        Cadence
                        <select
                          value={schedule.cadence}
                          onChange={(event) => setSchedule((prev) => ({ ...prev, cadence: event.target.value }))}
                          className="rounded-lg border border-sky-500/30 bg-slate-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                        >
                          <option>2 touches over 7 days</option>
                          <option>3 touches over 10 days</option>
                          <option>Always-on until conversion</option>
                        </select>
                      </label>
                    </div>
                    <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-4 text-xs text-sky-100">
                      <p>Einstein Copilot will pause delivery when churn risk drops below guardrail or if user converts.</p>
                    </div>
                  </div>
                )}

                {step === 4 && selectedSegment && selectedPlaybook && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-white">Review summary</h3>
                    <div className="space-y-3 rounded-xl border border-sky-500/20 bg-slate-900/50 p-4 text-sm text-gray-200">
                      <div className="flex items-center gap-2 text-sky-200">
                        <Target size={16} />
                        <span>
                          Segment: <span className="font-semibold text-white">{selectedSegment.name}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sky-200">
                        <Sparkles size={16} />
                        <span>
                          Playbook: <span className="font-semibold text-white">{selectedPlaybook.name}</span>{' '}
                          <span className="text-xs text-emerald-300">Lift {selectedPlaybook.lift}</span>
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sky-200">
                        <Users size={16} />
                        <span>
                          Offer: <span className="font-semibold text-white">{offer.incentive}</span>
                          <br />
                          <span className="text-xs text-sky-100/80">{offer.message}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sky-200">
                        <Clock size={16} />
                        <span>
                          Schedule: <span className="font-semibold text-white">{schedule.start}</span> ·{' '}
                          <span className="text-white">{schedule.channel}</span> ·{' '}
                          <span className="text-white">{schedule.cadence}</span>
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
                      Projected retention lift <span className="font-semibold text-emerald-300">+{selectedPlaybook.lift}</span> |
                      Expected ROI <span className="font-semibold text-emerald-300">{selectedPlaybook.roi}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-sky-500/30 px-4 py-2 text-sm font-semibold text-sky-200 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <button
              type="button"
              disabled={nextDisabled}
              onClick={() => {
                if (isLastStep) {
                  handleSubmit();
                } else {
                  setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLastStep ? (
                <>
                  Launch Action
                  <CheckCircle size={16} />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


