export interface NewUsersSubscriber {
  id: string;
  name: string;
  email: string;
  signUpDate: string;
  daysActive: number;
  engagementScore: number;
  churnRisk: number;
  ltv: string;
  triggers: string[];
  engagementDrop?: number;
  sessionsPerWeek?: number;
  favoritesCount?: number;
  deviceCount?: number;
  hasMobileApp?: boolean;
}

export const NEW_USERS_TRIGGERS = {
  ENGAGEMENT: 'Drop in engagement',
  FAVORITES: 'No favorite content',
  DEVICE: 'Single device usage',
} as const;

export const newUsersSubscribers: NewUsersSubscriber[] = [
  {
    id: 'SUB-NU-001',
    name: 'Alex Thompson',
    email: 'alex.t@email.com',
    signUpDate: '2024-02-10',
    daysActive: 45,
    engagementScore: 32,
    churnRisk: 78,
    ltv: '£68',
    triggers: [NEW_USERS_TRIGGERS.ENGAGEMENT, NEW_USERS_TRIGGERS.FAVORITES],
    engagementDrop: 52,
    sessionsPerWeek: 1.5,
    favoritesCount: 0,
    deviceCount: 2,
  },
  {
    id: 'SUB-NU-002',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    signUpDate: '2024-02-15',
    daysActive: 38,
    engagementScore: 28,
    churnRisk: 82,
    ltv: '£62',
    triggers: [NEW_USERS_TRIGGERS.ENGAGEMENT],
    engagementDrop: 48,
    sessionsPerWeek: 1.2,
    favoritesCount: 2,
    deviceCount: 2,
  },
  {
    id: 'SUB-NU-003',
    name: 'John Smith',
    email: 'john.s@email.com',
    signUpDate: '2024-02-20',
    daysActive: 33,
    engagementScore: 35,
    churnRisk: 72,
    ltv: '£70',
    triggers: [NEW_USERS_TRIGGERS.FAVORITES, NEW_USERS_TRIGGERS.DEVICE],
    engagementDrop: 25,
    sessionsPerWeek: 2.8,
    favoritesCount: 0,
    deviceCount: 1,
    hasMobileApp: false,
  },
  {
    id: 'SUB-NU-004',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    signUpDate: '2024-02-08',
    daysActive: 52,
    engagementScore: 42,
    churnRisk: 68,
    ltv: '£75',
    triggers: [NEW_USERS_TRIGGERS.ENGAGEMENT, NEW_USERS_TRIGGERS.FAVORITES, NEW_USERS_TRIGGERS.DEVICE],
    engagementDrop: 45,
    sessionsPerWeek: 1.8,
    favoritesCount: 0,
    deviceCount: 1,
    hasMobileApp: false,
  },
  {
    id: 'SUB-NU-005',
    name: 'David Lee',
    email: 'david.l@email.com',
    signUpDate: '2024-02-25',
    daysActive: 28,
    engagementScore: 25,
    churnRisk: 85,
    ltv: '£58',
    triggers: [NEW_USERS_TRIGGERS.DEVICE],
    engagementDrop: 15,
    sessionsPerWeek: 3.2,
    favoritesCount: 5,
    deviceCount: 1,
    hasMobileApp: true,
  },
  {
    id: 'SUB-NU-006',
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    signUpDate: '2024-02-12',
    daysActive: 48,
    engagementScore: 30,
    churnRisk: 75,
    ltv: '£65',
    triggers: [NEW_USERS_TRIGGERS.ENGAGEMENT],
    engagementDrop: 55,
    sessionsPerWeek: 1.1,
    favoritesCount: 3,
    deviceCount: 2,
  },
  {
    id: 'SUB-NU-007',
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    signUpDate: '2024-02-18',
    daysActive: 42,
    engagementScore: 38,
    churnRisk: 70,
    ltv: '£72',
    triggers: [NEW_USERS_TRIGGERS.FAVORITES],
    engagementDrop: 20,
    sessionsPerWeek: 2.5,
    favoritesCount: 0,
    deviceCount: 2,
  },
  {
    id: 'SUB-NU-008',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    signUpDate: '2024-02-22',
    daysActive: 35,
    engagementScore: 22,
    churnRisk: 88,
    ltv: '£55',
    triggers: [NEW_USERS_TRIGGERS.ENGAGEMENT, NEW_USERS_TRIGGERS.DEVICE],
    engagementDrop: 60,
    sessionsPerWeek: 0.9,
    favoritesCount: 1,
    deviceCount: 1,
    hasMobileApp: false,
  },
  {
    id: 'SUB-NU-009',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    signUpDate: '2024-02-14',
    daysActive: 46,
    engagementScore: 40,
    churnRisk: 65,
    ltv: '£78',
    triggers: [NEW_USERS_TRIGGERS.FAVORITES, NEW_USERS_TRIGGERS.DEVICE],
    engagementDrop: 18,
    sessionsPerWeek: 2.2,
    favoritesCount: 0,
    deviceCount: 1,
    hasMobileApp: true,
  },
  {
    id: 'SUB-NU-010',
    name: 'Olivia Martinez',
    email: 'olivia.m@email.com',
    signUpDate: '2024-02-28',
    daysActive: 25,
    engagementScore: 20,
    churnRisk: 90,
    ltv: '£52',
    triggers: [NEW_USERS_TRIGGERS.ENGAGEMENT],
    engagementDrop: 65,
    sessionsPerWeek: 0.8,
    favoritesCount: 1,
    deviceCount: 2,
  },
];

export interface NewUsersTriggerMetrics {
  trigger: string;
  affectedCount: number;
  churnRate: number;
  avgDaysToChurn: number;
  keyIndicators: {
    label: string;
    value: number | string;
  }[];
}

export const newUsersTriggerMetrics: NewUsersTriggerMetrics[] = [
  {
    trigger: NEW_USERS_TRIGGERS.ENGAGEMENT,
    affectedCount: 1120,
    churnRate: 72,
    avgDaysToChurn: 25,
    keyIndicators: [
      { label: 'Engagement drop >40%', value: '890 users' },
      { label: 'Sessions/week <2', value: '650 users' },
      { label: 'Content consumption decline', value: '45% avg' },
    ],
  },
  {
    trigger: NEW_USERS_TRIGGERS.FAVORITES,
    affectedCount: 780,
    churnRate: 65,
    avgDaysToChurn: 32,
    keyIndicators: [
      { label: 'No favorites added', value: '780 users' },
      { label: 'Content diversity low', value: '520 users' },
      { label: 'Watchlist empty', value: '680 users' },
    ],
  },
  {
    trigger: NEW_USERS_TRIGGERS.DEVICE,
    affectedCount: 450,
    churnRate: 58,
    avgDaysToChurn: 28,
    keyIndicators: [
      { label: 'Only one device', value: '450 users' },
      { label: 'No mobile app', value: '320 users' },
      { label: 'Single platform usage', value: '380 users' },
    ],
  },
];

export interface NewUsersOverlapData {
  combination: string;
  count: number;
  percentage: number;
}

export const newUsersOverlapData: NewUsersOverlapData[] = [
  { combination: 'All three triggers', count: 95, percentage: 5.0 },
  { combination: 'Engagement + Favorites', count: 320, percentage: 16.9 },
  { combination: 'Engagement + Device', count: 180, percentage: 9.5 },
  { combination: 'Favorites + Device', count: 125, percentage: 6.6 },
  { combination: 'Engagement only', count: 525, percentage: 27.8 },
  { combination: 'Favorites only', count: 240, percentage: 12.7 },
  { combination: 'Device only', count: 405, percentage: 21.4 },
];

export const newUsersSummaryMetrics = {
  totalAffected: 1890,
  avgChurnRisk: 68,
  revenueAtRisk: '£380K',
};

export const newUsersAiRecommendations = [
  {
    title: 'Launch re-engagement campaign',
    targetCount: 1120,
    expectedLift: '+15%',
    action: 're-engagement',
  },
  {
    title: 'Personalize content recommendations',
    targetCount: 780,
    expectedLift: '+12%',
    action: 'content-personalization',
  },
  {
    title: 'Promote multi-device usage',
    targetCount: 450,
    expectedLift: '+18%',
    action: 'multi-device-promotion',
  },
];

