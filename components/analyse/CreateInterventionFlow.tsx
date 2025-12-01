'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Sparkles, PlayCircle, Calendar, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface CreateInterventionFlowProps {
  open: boolean;
  onClose: () => void;
  stage: string;
  triggers: string[];
  onLaunchAction: () => void;
}

interface Playbook {
  id: string;
  name: string;
  description: string;
  expectedLift: string;
  roi: string;
  recommended: boolean;
}

const PLAYBOOKS_BY_STAGE: Record<string, Playbook[]> = {
  'Trial Users': [
    {
      id: 'onboarding-tutorial',
      name: 'Onboarding Tutorial Campaign',
      description: 'Personalized tutorial sequences targeting onboarding confusion triggers',
      expectedLift: '+18%',
      roi: '2.9×',
      recommended: true,
    },
    {
      id: 'content-personalization',
      name: 'Content Personalization',
      description: 'AI-curated content recommendations for content misalignment',
      expectedLift: '+15%',
      roi: '2.6×',
      recommended: false,
    },
    {
      id: 'device-assistance',
      name: 'Device Setup Assistance',
      description: 'Proactive device activation support and troubleshooting',
      expectedLift: '+22%',
      roi: '3.1×',
      recommended: false,
    },
  ],
  'New Users': [
    {
      id: 're-engagement',
      name: 'Re-engagement Campaign',
      description: 'Targeted content playlists and push notifications for engagement drop',
      expectedLift: '+12%',
      roi: '2.4×',
      recommended: true,
    },
    {
      id: 'favorites-nudge',
      name: 'Favorites Discovery',
      description: 'Personalized recommendations to build favorites library',
      expectedLift: '+10%',
      roi: '2.2×',
      recommended: false,
    },
    {
      id: 'multi-device',
      name: 'Multi-Device Promotion',
      description: 'Incentivize mobile app and multi-device usage',
      expectedLift: '+8%',
      roi: '2.0×',
      recommended: false,
    },
  ],
  'Established Users': [
    {
      id: 'loyalty-discount',
      name: 'Loyalty Discount',
      description: 'Proactive discount offers for price-sensitive subscribers',
      expectedLift: '+12%',
      roi: '3.4×',
      recommended: true,
    },
    {
      id: 'competitor-response',
      name: 'Competitor Response',
      description: 'Targeted offers and exclusive content to counter competitor moves',
      expectedLift: '+9%',
      roi: '2.8×',
      recommended: false,
    },
    {
      id: 'life-events-support',
      name: 'Life Events Support',
      description: 'Flexible plans and pause options for life event triggers',
      expectedLift: '+7%',
      roi: '2.1×',
      recommended: false,
    },
  ],
};

const STEPS = ['Select Playbook', 'Configure Targeting', 'Set Schedule', 'Review & Launch'];

export function CreateInterventionFlow({ open, onClose, stage, triggers, onLaunchAction }: CreateInterventionFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [targeting, setTargeting] = useState({
    segment: stage,
    triggerFilters: triggers,
    subscriberCount: 0,
  });
  const [schedule, setSchedule] = useState({
    startDate: '',
    duration: '30',
    channel: 'email',
  });

  const playbooks = PLAYBOOKS_BY_STAGE[stage] || [];

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Launch action
      onLaunchAction();
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateSubscriberCount = () => {
    // This would be calculated from actual data, simplified for now
    const counts: Record<string, number> = {
      'Trial Users': 2100,
      'New Users': 1890,
      'Established Users': 45200,
    };
    return counts[stage] || 0;
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-sky-500/30 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Create Intervention</h2>
              <p className="text-sm text-gray-400 mt-1">
                Configure a targeted retention campaign for <span className="text-sky-300 font-semibold">{stage}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index <= currentStep
                        ? 'bg-sky-500 text-white'
                        : 'bg-navy-800 text-gray-400 border border-sky-500/30'
                    }`}
                  >
                    {index < currentStep ? <CheckCircle size={20} /> : index + 1}
                  </div>
                  <p className={`text-xs mt-2 text-center ${index <= currentStep ? 'text-sky-300' : 'text-gray-500'}`}>
                    {step}
                  </p>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${index < currentStep ? 'bg-sky-500' : 'bg-navy-800'}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-6 min-h-[400px]">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Select Playbook</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Choose a playbook template optimized for {stage} with triggers: {triggers.join(', ')}
                  </p>
                </div>
                <div className="grid gap-4">
                  {playbooks.map((playbook) => (
                    <motion.div
                      key={playbook.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedPlaybook(playbook)}
                      className={`rounded-xl border p-4 cursor-pointer transition-all ${
                        selectedPlaybook?.id === playbook.id
                          ? 'border-sky-500 bg-sky-500/20'
                          : 'border-sky-500/20 bg-navy-900/60 hover:border-sky-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-white font-semibold">{playbook.name}</h4>
                            {playbook.recommended && (
                              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full px-2 py-0.5">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{playbook.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-emerald-300">
                              <TrendingUp size={14} />
                              <span className="font-semibold">{playbook.expectedLift}</span>
                              <span className="text-gray-400"> retention lift</span>
                            </div>
                            <div className="flex items-center gap-1 text-sky-300">
                              <Target size={14} />
                              <span className="font-semibold">{playbook.roi}</span>
                              <span className="text-gray-400"> ROI</span>
                            </div>
                          </div>
                        </div>
                        {selectedPlaybook?.id === playbook.id && (
                          <CheckCircle size={20} className="text-sky-400 flex-shrink-0" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Configure Targeting</h3>
                  <p className="text-sm text-gray-400 mb-4">Define the segment and trigger filters for this intervention</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4">
                    <label className="text-sm font-semibold text-sky-200 mb-2 block">Segment</label>
                    <input
                      type="text"
                      value={targeting.segment}
                      readOnly
                      className="w-full rounded-lg border border-sky-500/30 bg-navy-800 px-4 py-2 text-white"
                    />
                  </div>
                  <div className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4">
                    <label className="text-sm font-semibold text-sky-200 mb-2 block">Trigger Filters</label>
                    <div className="flex flex-wrap gap-2">
                      {targeting.triggerFilters.map((trigger) => (
                        <span
                          key={trigger}
                          className="inline-flex items-center gap-1 rounded-full border border-sky-500/40 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200"
                        >
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4">
                    <label className="text-sm font-semibold text-sky-200 mb-2 block">Target Subscribers</label>
                    <p className="text-2xl font-bold text-white">{calculateSubscriberCount().toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">Based on selected triggers</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Set Schedule</h3>
                  <p className="text-sm text-gray-400 mb-4">Configure when and how the intervention will be executed</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4">
                    <label className="text-sm font-semibold text-sky-200 mb-2 block flex items-center gap-2">
                      <Calendar size={16} />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={schedule.startDate}
                      onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
                      className="w-full rounded-lg border border-sky-500/30 bg-navy-800 px-4 py-2 text-white"
                    />
                  </div>
                  <div className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4">
                    <label className="text-sm font-semibold text-sky-200 mb-2 block">Campaign Duration (days)</label>
                    <select
                      value={schedule.duration}
                      onChange={(e) => setSchedule({ ...schedule, duration: e.target.value })}
                      className="w-full rounded-lg border border-sky-500/30 bg-navy-800 px-4 py-2 text-white"
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                    </select>
                  </div>
                  <div className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4">
                    <label className="text-sm font-semibold text-sky-200 mb-2 block">Primary Channel</label>
                    <select
                      value={schedule.channel}
                      onChange={(e) => setSchedule({ ...schedule, channel: e.target.value })}
                      className="w-full rounded-lg border border-sky-500/30 bg-navy-800 px-4 py-2 text-white"
                    >
                      <option value="email">Email</option>
                      <option value="push">Push Notification</option>
                      <option value="in-app">In-App Message</option>
                      <option value="sms">SMS</option>
                      <option value="multi">Multi-Channel</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && selectedPlaybook && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Review & Launch</h3>
                  <p className="text-sm text-gray-400 mb-4">Review your intervention configuration before launching</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-sky-500/20 bg-navy-900/60 p-4">
                    <h4 className="text-sm font-semibold text-sky-200 mb-3">Intervention Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Playbook:</span>
                        <span className="text-white font-semibold">{selectedPlaybook.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Segment:</span>
                        <span className="text-white font-semibold">{targeting.segment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target Subscribers:</span>
                        <span className="text-white font-semibold">{calculateSubscriberCount().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expected Lift:</span>
                        <span className="text-emerald-300 font-semibold">{selectedPlaybook.expectedLift}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expected ROI:</span>
                        <span className="text-sky-300 font-semibold">{selectedPlaybook.roi}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={18} className="text-emerald-400" />
                      <h4 className="text-sm font-semibold text-emerald-300">Ready to Launch</h4>
                    </div>
                    <p className="text-xs text-gray-300">
                      This intervention will be created in the Act tab with all configurations pre-filled. You can review
                      and launch it from there.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-sky-500/20">
            <button
              onClick={currentStep === 0 ? onClose : handleBack}
              className="px-4 py-2 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20 transition-colors"
            >
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={currentStep === 0 && !selectedPlaybook}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentStep === 0 && !selectedPlaybook
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-lg shadow-sky-500/30'
              }`}
            >
              {currentStep === STEPS.length - 1 ? (
                <>
                  <PlayCircle size={16} />
                  Launch Action
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

