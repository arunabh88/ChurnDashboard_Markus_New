'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { playbooks } from '@/lib/data/dashboard';
import { Calendar, ClipboardList, Users } from 'lucide-react';

const steps = [
  { id: 1, label: 'Select segment', icon: Users },
  { id: 2, label: 'Choose playbook', icon: ClipboardList },
  { id: 3, label: 'Configure offer', icon: ClipboardList },
  { id: 4, label: 'Schedule execution', icon: Calendar },
  { id: 5, label: 'Review & launch', icon: Calendar },
];

export function ActionWizard() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Card className="border border-slate-200 bg-white">
      <CardContent className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
            Create new action
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Multi-step wizard to launch retention interventions
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const active = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'border-sky-600 bg-sky-600 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-600'
                }`}
              >
                <Icon size={16} />
                {step.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-6">
          <p className="text-sm font-semibold text-slate-700">
            Step {activeStep} of {steps.length}
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>
              For demonstration, pre-fill the wizard with key segments (High CLTV, Trial, Content
              Fatigue). Selecting a playbook surfaces relevant configurations and expected lift.
            </p>
            <p>
              Example: choose <strong>{playbooks[0].title}</strong> for High CLTV segment to offer a
              loyalty credit. Expected retention lift {playbooks[0].lift} with ROI {playbooks[0].roi}.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

