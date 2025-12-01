export interface TrialSubscriber {
  id: string;
  name: string;
  email: string;
  signUpDate: string;
  daysActive: number;
  engagementScore: number;
  churnRisk: number;
  ltv: string;
  triggers: string[];
  supportTickets?: number;
  contentWatchedHours?: number;
  deviceActivationAttempts?: number;
}

export const TRIAL_TRIGGERS = {
  ONBOARDING: 'Onboarding confusion',
  CONTENT: 'Content misalignment',
  DEVICE: 'Device setup issues',
} as const;

export const trialSubscribers: TrialSubscriber[] = [
  {
    id: 'SUB-TR-001',
    name: 'Sarah Mitchell',
    email: 'sarah.m@email.com',
    signUpDate: '2024-03-15',
    daysActive: 8,
    engagementScore: 28,
    churnRisk: 85,
    ltv: '$45',
    triggers: [TRIAL_TRIGGERS.ONBOARDING, TRIAL_TRIGGERS.CONTENT],
    supportTickets: 2,
    contentWatchedHours: 1.2,
  },
  {
    id: 'SUB-TR-002',
    name: 'James Parker',
    email: 'j.parker@email.com',
    signUpDate: '2024-03-18',
    daysActive: 5,
    engagementScore: 15,
    churnRisk: 92,
    ltv: '$38',
    triggers: [TRIAL_TRIGGERS.DEVICE, TRIAL_TRIGGERS.ONBOARDING],
    supportTickets: 3,
    deviceActivationAttempts: 4,
  },
  {
    id: 'SUB-TR-003',
    name: 'Emma Watson',
    email: 'emma.w@email.com',
    signUpDate: '2024-03-20',
    daysActive: 3,
    engagementScore: 22,
    churnRisk: 88,
    ltv: '$42',
    triggers: [TRIAL_TRIGGERS.CONTENT],
    contentWatchedHours: 0.8,
  },
  {
    id: 'SUB-TR-004',
    name: 'Michael Brown',
    email: 'm.brown@email.com',
    signUpDate: '2024-03-12',
    daysActive: 12,
    engagementScore: 35,
    churnRisk: 78,
    ltv: '$52',
    triggers: [TRIAL_TRIGGERS.ONBOARDING, TRIAL_TRIGGERS.CONTENT, TRIAL_TRIGGERS.DEVICE],
    supportTickets: 1,
    contentWatchedHours: 1.5,
    deviceActivationAttempts: 2,
  },
  {
    id: 'SUB-TR-005',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    signUpDate: '2024-03-22',
    daysActive: 1,
    engagementScore: 8,
    churnRisk: 95,
    ltv: '$35',
    triggers: [TRIAL_TRIGGERS.DEVICE],
    deviceActivationAttempts: 5,
  },
  {
    id: 'SUB-TR-006',
    name: 'David Chen',
    email: 'd.chen@email.com',
    signUpDate: '2024-03-16',
    daysActive: 7,
    engagementScore: 31,
    churnRisk: 82,
    ltv: '$48',
    triggers: [TRIAL_TRIGGERS.ONBOARDING],
    supportTickets: 2,
  },
  {
    id: 'SUB-TR-007',
    name: 'Rachel Green',
    email: 'rachel.g@email.com',
    signUpDate: '2024-03-19',
    daysActive: 4,
    engagementScore: 18,
    churnRisk: 90,
    ltv: '$40',
    triggers: [TRIAL_TRIGGERS.CONTENT, TRIAL_TRIGGERS.DEVICE],
    contentWatchedHours: 0.6,
    deviceActivationAttempts: 3,
  },
  {
    id: 'SUB-TR-008',
    name: 'Tom Wilson',
    email: 'tom.w@email.com',
    signUpDate: '2024-03-14',
    daysActive: 9,
    engagementScore: 42,
    churnRisk: 75,
    ltv: '$55',
    triggers: [TRIAL_TRIGGERS.ONBOARDING],
    supportTickets: 1,
  },
  {
    id: 'SUB-TR-009',
    name: 'Olivia Martinez',
    email: 'olivia.m@email.com',
    signUpDate: '2024-03-21',
    daysActive: 2,
    engagementScore: 12,
    churnRisk: 93,
    ltv: '$36',
    triggers: [TRIAL_TRIGGERS.CONTENT],
    contentWatchedHours: 0.4,
  },
  {
    id: 'SUB-TR-010',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    signUpDate: '2024-03-17',
    daysActive: 6,
    engagementScore: 25,
    churnRisk: 86,
    ltv: '$46',
    triggers: [TRIAL_TRIGGERS.ONBOARDING, TRIAL_TRIGGERS.DEVICE],
    supportTickets: 2,
    deviceActivationAttempts: 3,
  },
];

export interface TriggerMetrics {
  trigger: string;
  affectedCount: number;
  churnRate: number;
  avgDaysToChurn: number;
  keyIndicators: {
    label: string;
    value: number | string;
  }[];
}

export const triggerMetrics: TriggerMetrics[] = [
  {
    trigger: TRIAL_TRIGGERS.ONBOARDING,
    affectedCount: 1260,
    churnRate: 82,
    avgDaysToChurn: 12,
    keyIndicators: [
      { label: 'Support tickets', value: 340 },
      { label: 'App sessions < 3', value: '890 users' },
      { label: 'Tutorial completion', value: '23%' },
    ],
  },
  {
    trigger: TRIAL_TRIGGERS.CONTENT,
    affectedCount: 945,
    churnRate: 74,
    avgDaysToChurn: 18,
    keyIndicators: [
      { label: 'Content watched < 2 hours', value: '720 users' },
      { label: 'No favorites added', value: '680 users' },
      { label: 'Genre mismatch detected', value: '450 users' },
    ],
  },
  {
    trigger: TRIAL_TRIGGERS.DEVICE,
    affectedCount: 630,
    churnRate: 68,
    avgDaysToChurn: 8,
    keyIndicators: [
      { label: 'Device activation failures', value: 280 },
      { label: 'Multiple device attempts', value: '420 users' },
      { label: 'Support calls (device-related)', value: 195 },
    ],
  },
];

export interface OverlapData {
  combination: string;
  count: number;
  percentage: number;
}

export const overlapData: OverlapData[] = [
  { combination: 'All three triggers', count: 180, percentage: 8.6 },
  { combination: 'Onboarding + Content', count: 420, percentage: 20.0 },
  { combination: 'Onboarding + Device', count: 210, percentage: 10.0 },
  { combination: 'Content + Device', count: 150, percentage: 7.1 },
  { combination: 'Onboarding only', count: 450, percentage: 21.4 },
  { combination: 'Content only', count: 195, percentage: 9.3 },
  { combination: 'Device only', count: 495, percentage: 23.6 },
];

export const summaryMetrics = {
  totalAffected: 2100,
  avgChurnRisk: 76,
  revenueAtRisk: '$420K',
};

export const aiRecommendations = [
  {
    title: 'Launch onboarding tutorial campaign',
    targetCount: 1260,
    expectedLift: '+18%',
    action: 'onboarding-tutorial',
  },
  {
    title: 'Personalize content recommendations',
    targetCount: 945,
    expectedLift: '+15%',
    action: 'content-personalization',
  },
  {
    title: 'Send device setup assistance',
    targetCount: 630,
    expectedLift: '+22%',
    action: 'device-assistance',
  },
];

