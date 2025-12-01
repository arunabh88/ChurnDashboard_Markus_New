export interface EstablishedUsersSubscriber {
  id: string;
  name: string;
  email: string;
  signUpDate: string;
  daysActive: number;
  engagementScore: number;
  churnRisk: number;
  ltv: string;
  triggers: string[];
  priceComparisonVisits?: number;
  planDowngradeSignals?: boolean;
  competitorAppUsage?: boolean;
  promoEmailOpens?: number;
  accountChanges?: number;
  paymentMethodUpdates?: number;
}

export const ESTABLISHED_USERS_TRIGGERS = {
  PRICE: 'Price sensitivity',
  COMPETITOR: 'Competitor offers',
  LIFE_EVENTS: 'Life events',
} as const;

export const establishedUsersSubscribers: EstablishedUsersSubscriber[] = [
  {
    id: 'SUB-ES-001',
    name: 'Jennifer White',
    email: 'jennifer.w@email.com',
    signUpDate: '2023-08-15',
    daysActive: 230,
    engagementScore: 78,
    churnRisk: 18,
    ltv: '£420',
    triggers: [ESTABLISHED_USERS_TRIGGERS.PRICE, ESTABLISHED_USERS_TRIGGERS.COMPETITOR],
    priceComparisonVisits: 8,
    planDowngradeSignals: true,
    competitorAppUsage: true,
    promoEmailOpens: 5,
  },
  {
    id: 'SUB-ES-002',
    name: 'Christopher Davis',
    email: 'chris.d@email.com',
    signUpDate: '2023-06-20',
    daysActive: 285,
    engagementScore: 82,
    churnRisk: 12,
    ltv: '£580',
    triggers: [ESTABLISHED_USERS_TRIGGERS.PRICE],
    priceComparisonVisits: 12,
    planDowngradeSignals: true,
    competitorAppUsage: false,
    promoEmailOpens: 3,
  },
  {
    id: 'SUB-ES-003',
    name: 'Amanda Harris',
    email: 'amanda.h@email.com',
    signUpDate: '2023-09-10',
    daysActive: 205,
    engagementScore: 75,
    churnRisk: 25,
    ltv: '£380',
    triggers: [ESTABLISHED_USERS_TRIGGERS.COMPETITOR, ESTABLISHED_USERS_TRIGGERS.LIFE_EVENTS],
    priceComparisonVisits: 2,
    planDowngradeSignals: false,
    competitorAppUsage: true,
    promoEmailOpens: 8,
    accountChanges: 2,
    paymentMethodUpdates: 1,
  },
  {
    id: 'SUB-ES-004',
    name: 'Daniel Miller',
    email: 'daniel.m@email.com',
    signUpDate: '2023-05-05',
    daysActive: 330,
    engagementScore: 88,
    churnRisk: 8,
    ltv: '£650',
    triggers: [ESTABLISHED_USERS_TRIGGERS.PRICE, ESTABLISHED_USERS_TRIGGERS.COMPETITOR, ESTABLISHED_USERS_TRIGGERS.LIFE_EVENTS],
    priceComparisonVisits: 15,
    planDowngradeSignals: true,
    competitorAppUsage: true,
    promoEmailOpens: 12,
    accountChanges: 3,
    paymentMethodUpdates: 2,
  },
  {
    id: 'SUB-ES-005',
    name: 'Jessica Moore',
    email: 'jessica.m@email.com',
    signUpDate: '2023-07-22',
    daysActive: 250,
    engagementScore: 80,
    churnRisk: 15,
    ltv: '£480',
    triggers: [ESTABLISHED_USERS_TRIGGERS.LIFE_EVENTS],
    priceComparisonVisits: 1,
    planDowngradeSignals: false,
    competitorAppUsage: false,
    promoEmailOpens: 2,
    accountChanges: 4,
    paymentMethodUpdates: 3,
  },
  {
    id: 'SUB-ES-006',
    name: 'Matthew Wilson',
    email: 'matthew.w@email.com',
    signUpDate: '2023-04-18',
    daysActive: 350,
    engagementScore: 85,
    churnRisk: 10,
    ltv: '£720',
    triggers: [ESTABLISHED_USERS_TRIGGERS.PRICE],
    priceComparisonVisits: 6,
    planDowngradeSignals: true,
    competitorAppUsage: false,
    promoEmailOpens: 1,
  },
  {
    id: 'SUB-ES-007',
    name: 'Emily Thompson',
    email: 'emily.t@email.com',
    signUpDate: '2023-10-05',
    daysActive: 180,
    engagementScore: 72,
    churnRisk: 22,
    ltv: '£340',
    triggers: [ESTABLISHED_USERS_TRIGGERS.COMPETITOR],
    priceComparisonVisits: 3,
    planDowngradeSignals: false,
    competitorAppUsage: true,
    promoEmailOpens: 10,
  },
  {
    id: 'SUB-ES-008',
    name: 'Ryan Garcia',
    email: 'ryan.g@email.com',
    signUpDate: '2023-08-30',
    daysActive: 215,
    engagementScore: 77,
    churnRisk: 20,
    ltv: '£390',
    triggers: [ESTABLISHED_USERS_TRIGGERS.PRICE, ESTABLISHED_USERS_TRIGGERS.LIFE_EVENTS],
    priceComparisonVisits: 9,
    planDowngradeSignals: true,
    competitorAppUsage: false,
    promoEmailOpens: 4,
    accountChanges: 1,
    paymentMethodUpdates: 1,
  },
  {
    id: 'SUB-ES-009',
    name: 'Sophia Rodriguez',
    email: 'sophia.r@email.com',
    signUpDate: '2023-06-12',
    daysActive: 295,
    engagementScore: 83,
    churnRisk: 14,
    ltv: '£560',
    triggers: [ESTABLISHED_USERS_TRIGGERS.COMPETITOR],
    priceComparisonVisits: 4,
    planDowngradeSignals: false,
    competitorAppUsage: true,
    promoEmailOpens: 7,
  },
  {
    id: 'SUB-ES-010',
    name: 'Kevin Martinez',
    email: 'kevin.m@email.com',
    signUpDate: '2023-09-25',
    daysActive: 190,
    engagementScore: 70,
    churnRisk: 28,
    ltv: '£320',
    triggers: [ESTABLISHED_USERS_TRIGGERS.LIFE_EVENTS],
    priceComparisonVisits: 1,
    planDowngradeSignals: false,
    competitorAppUsage: false,
    promoEmailOpens: 1,
    accountChanges: 5,
    paymentMethodUpdates: 4,
  },
];

export interface EstablishedUsersTriggerMetrics {
  trigger: string;
  affectedCount: number;
  churnRate: number;
  avgDaysToChurn: number;
  keyIndicators: {
    label: string;
    value: number | string;
  }[];
}

export const establishedUsersTriggerMetrics: EstablishedUsersTriggerMetrics[] = [
  {
    trigger: ESTABLISHED_USERS_TRIGGERS.PRICE,
    affectedCount: 28500,
    churnRate: 15,
    avgDaysToChurn: 45,
    keyIndicators: [
      { label: 'Price comparison visits', value: '12,400 users' },
      { label: 'Plan downgrade signals', value: '8,200 users' },
      { label: 'Billing complaints', value: '3,100 users' },
    ],
  },
  {
    trigger: ESTABLISHED_USERS_TRIGGERS.COMPETITOR,
    affectedCount: 18900,
    churnRate: 18,
    avgDaysToChurn: 38,
    keyIndicators: [
      { label: 'Competitor app usage', value: '6,800 users' },
      { label: 'Promo email opens', value: '11,200 users' },
      { label: 'Comparison site visits', value: '9,500 users' },
    ],
  },
  {
    trigger: ESTABLISHED_USERS_TRIGGERS.LIFE_EVENTS,
    affectedCount: 9800,
    churnRate: 22,
    avgDaysToChurn: 52,
    keyIndicators: [
      { label: 'Account changes', value: '4,200 users' },
      { label: 'Payment method updates', value: '3,600 users' },
      { label: 'Usage pattern shifts', value: '5,800 users' },
    ],
  },
];

export interface EstablishedUsersOverlapData {
  combination: string;
  count: number;
  percentage: number;
}

export const establishedUsersOverlapData: EstablishedUsersOverlapData[] = [
  { combination: 'All three triggers', count: 2100, percentage: 4.6 },
  { combination: 'Price + Competitor', count: 6800, percentage: 15.0 },
  { combination: 'Price + Life events', count: 3200, percentage: 7.1 },
  { combination: 'Competitor + Life events', count: 1800, percentage: 4.0 },
  { combination: 'Price only', count: 16400, percentage: 36.3 },
  { combination: 'Competitor only', count: 8200, percentage: 18.1 },
  { combination: 'Life events only', count: 2700, percentage: 6.0 },
];

export const establishedUsersSummaryMetrics = {
  totalAffected: 45200,
  avgChurnRisk: 12,
  revenueAtRisk: '£2.8M',
};

export const establishedUsersAiRecommendations = [
  {
    title: 'Launch loyalty discount program',
    targetCount: 28500,
    expectedLift: '+8%',
    action: 'loyalty-discount',
  },
  {
    title: 'Offer competitive match',
    targetCount: 18900,
    expectedLift: '+12%',
    action: 'competitive-match',
  },
  {
    title: 'Provide life event support',
    targetCount: 9800,
    expectedLift: '+15%',
    action: 'life-event-support',
  },
];

