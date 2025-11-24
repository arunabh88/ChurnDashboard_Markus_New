export const kpiTiles = [
  {
    id: 'total-subscribers',
    label: 'Total Subscribers',
    value: '1.32M',
    trend: '+1.8% vs last month',
    href: '/analyse?view=overview&filter=subscribers',
  },
  {
    id: 'high-risk',
    label: 'High-Risk Subscribers',
    value: '48,200',
    trend: '+5.1% vs last week',
    href: '/analyse?view=segments&filter=high-risk',
  },
  {
    id: 'cltv-cac',
    label: 'Avg CLTV / CAC',
    value: '3.4×',
    trend: '+0.2 vs target 3.0×',
    href: '/analyse?view=signals&filter=financial',
  },
  {
    id: 'early-churn',
    label: 'Early Lifecycle Churn (0-90d)',
    value: '24%',
    trend: '+3.2 pts vs last 30 days',
    href: '/analyse?view=journey&phase=new',
  },
  {
    id: 'overall-churn',
    label: 'Overall Monthly Churn',
    value: '0.92%',
    trend: '-0.18 pts vs target 1.1%',
    href: '/analyse?view=overview&metric=churn',
  },
];

export const journeySnapshot = {
  trial: { label: 'Trial Users', value: '3,000', churn: '70% churn' },
  new: { label: 'New Users', value: '2,190', churn: '20% churn' },
  established: {
    label: 'Established Users',
    value: '1.29M',
    churn: 'Goal churn < 0.57%',
  },
  insight: 'AI Insight: Churn rising in the first 45 days. Focus on Trial + New segments.',
};

export const attentionAlerts = [
  {
    id: 'trial-churn',
    title: 'Trial churn up 5% this week — 2,100 trial users at risk.',
    primaryHref: '/analyse?view=journey&phase=trial',
    secondaryHref: '/actions?create=trial-engagement',
  },
  {
    id: 'high-cltv',
    title: 'High CLTV churn spike — potential £1.2M annual risk.',
    primaryHref: '/analyse?view=segments&segment=high-cltv',
    secondaryHref: '/actions?create=loyalty-discount',
  },
  {
    id: 'ab-test',
    title: 'A/B test: Loyalty discount delivering 3.1× ROI.',
    primaryHref: '/analyse?view=signals&signal=loyalty',
    secondaryHref: '/actions?create=scale-loyalty',
  },
];

export const filters = {
  dates: ['Last 30 days', 'Last 90 days', 'Year to date', 'Custom'],
  regions: ['All Regions', 'UK & Ireland', 'Continental Europe', 'North America'],
  plans: ['All Plans', 'Premium Sports', 'Entertainment', 'Kids', 'News'],
  devices: ['All Devices', 'Smart TV', 'Mobile App', 'Web', 'Set-top Box'],
};

export const overviewAnalytics = {
  trendSeries: [
    { month: 'Jan', churn: 1.12, retention: 98.1 },
    { month: 'Feb', churn: 1.05, retention: 98.6 },
    { month: 'Mar', churn: 1.01, retention: 98.9 },
    { month: 'Apr', churn: 0.96, retention: 99.0 },
    { month: 'May', churn: 0.94, retention: 99.1 },
    { month: 'Jun', churn: 0.92, retention: 99.2 },
  ],
  breakdown: [
    { phase: 'Trial', churn: 28, volume: 6000 },
    { phase: 'New', churn: 19, volume: 4200 },
    { phase: 'Established', churn: 0.85, volume: 1290000 },
  ],
};

export const journeyDetails = [
  {
    id: 'trial',
    label: 'Trial Users',
    conversion: 'Trial → New: 30%',
    avgDays: 'Average tenure: 21 days',
    churnWindow: 'Peak churn: day 12-18',
    drivers: ['Onboarding confusion', 'No saved content', 'Device setup friction'],
  },
  {
    id: 'new',
    label: 'New Users',
    conversion: 'New → Established: 63%',
    avgDays: 'Average tenure: 78 days',
    churnWindow: 'Peak churn: day 45-60',
    drivers: ['Content fatigue', 'Pricing concerns', 'Single-device usage'],
  },
  {
    id: 'established',
    label: 'Established Users',
    conversion: 'Established retention: 99.15%',
    avgDays: 'Average tenure: 3.4 years',
    churnWindow: 'Peak churn: contract renewal month',
    drivers: ['Competitor offers', 'Cost vs usage', 'Life events'],
  },
];

export const signalMatrix = [
  {
    column: 'Engagement',
    signal: 'Drop in live viewing hours',
    status: 'Critical',
    weight: '24%',
  },
  {
    column: 'Billing',
    signal: 'Payment method expired',
    status: 'High',
    weight: '18%',
  },
  {
    column: 'Sentiment',
    signal: 'Negative support interactions',
    status: 'High',
    weight: '16%',
  },
  {
    column: 'Experience',
    signal: 'Buffering incidents increased',
    status: 'Medium',
    weight: '14%',
  },
  {
    column: 'Competitor',
    signal: 'Price comparison searches',
    status: 'Medium',
    weight: '13%',
  },
  {
    column: 'Loyalty',
    signal: 'Reduced referral activity',
    status: 'Low',
    weight: '15%',
  },
];

export const modelPerformance = {
  metrics: [
    { label: 'Model Accuracy', value: '96%' },
    { label: 'Precision', value: '94%' },
    { label: 'Recall', value: '92%' },
    { label: 'F1 Score', value: '93%' },
  ],
  message:
    'AI Alert: Model drift detected — sentiment classifier accuracy dropped by 3% over the past 30 days. Retraining recommended.',
};

export const recommendedPlaybooks = [
  {
    id: 'loyalty-discount',
    segment: 'High CLTV Loyalists',
    lift: '+5.8% retention lift',
    roi: '3.4× ROI',
    description: 'Tiered loyalty credits + exclusive content series unlock.',
  },
  {
    id: 'starter-playlist',
    segment: 'New Trial Users',
    lift: '+7.2% activation lift',
    roi: '2.9× ROI',
    description: 'Personalised “Day 1 playlist” across sports and entertainment.',
  },
  {
    id: 'ad-supported-tier',
    segment: 'Price Sensitive Established',
    lift: '+4.1% retention lift',
    roi: '2.6× ROI',
    description: 'Offer ad-supported downgrade with loyalty upsell path.',
  },
];

export const actionHistory = [
  {
    id: 'action-001',
    name: 'Loyalty Discount Wave',
    segment: 'High CLTV',
    start: '01 Apr 2025',
    end: '30 Apr 2025',
    status: 'Completed',
    expectedLift: '+6.0%',
    actualLift: '+5.4%',
    roi: '3.1×',
    owner: 'Amelia Turner',
  },
  {
    id: 'action-002',
    name: 'Starter Playlist Push',
    segment: 'Trial Users',
    start: '12 May 2025',
    end: 'In-flight',
    status: 'Running',
    expectedLift: '+7.5%',
    actualLift: '+4.3%',
    roi: '2.4×',
    owner: 'Deepak Rao',
  },
  {
    id: 'action-003',
    name: 'Ad Tier Downgrade Offer',
    segment: 'Price Sensitive',
    start: '05 Mar 2025',
    end: '22 Mar 2025',
    status: 'Completed',
    expectedLift: '+4.0%',
    actualLift: '+4.6%',
    roi: '2.8×',
    owner: 'Nina Brooks',
  },
];

export type DashboardSection = 'home' | 'analyse' | 'actions';

