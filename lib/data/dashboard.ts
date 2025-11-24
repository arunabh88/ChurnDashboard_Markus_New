export const kpiCards = [
  {
    id: 'total-subscribers',
    label: 'Total Subscribers',
    value: '1.32M',
    change: '+1.8% vs last month',
    href: '/analyse?view=overview&metric=subscribers',
  },
  {
    id: 'high-risk',
    label: 'High-Risk Subscribers',
    value: '48,200',
    change: '+5.1% vs last week',
    href: '/analyse?view=segments&filter=high-risk',
  },
  {
    id: 'monthly-churn',
    label: 'Monthly Churn (vs target)',
    value: '0.92%',
    change: 'Target 0.75%',
    href: '/analyse?view=overview&metric=churn',
  },
  {
    id: 'early-churn',
    label: 'Early Lifecycle Churn (0–90 days)',
    value: '24%',
    change: '+3.2 pts vs last 30 days',
    href: '/analyse?view=journey&phase=new',
  },
  {
    id: 'cltv-cac',
    label: 'Avg CLTV / CAC',
    value: '3.4×',
    change: '+0.2 vs target 3.0×',
    href: '/analyse?view=signals&metric=cltv',
  },
];

export const journeySnapshot = {
  insight:
    'Churn is rising in the first 45 days. Focus on Trial and New segments.',
  stages: [
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
  ],
};

export const priorityAlerts = [
  {
    id: 'trial',
    title: 'Trial churn up 5% this week — 2,100 users at risk.',
    analyseHref: '/analyse?view=journey&phase=trial',
    actionHref: '/actions?playbook=onboarding',
  },
  {
    id: 'high-cltv',
    title: 'High-CLTV cohort at rising churn — potential loss £1.2M.',
    analyseHref: '/analyse?view=segments&segment=high-cltv',
    actionHref: '/actions?playbook=loyalty-discount',
  },
  {
    id: 'ab-test',
    title: 'A/B test shows loyalty discount 3.1× ROI.',
    analyseHref: '/analyse?view=signals&signal=loyalty',
    actionHref: '/actions?playbook=scale-loyalty',
  },
];

export const filters = {
  dates: ['Last 30 days', 'Last 90 days', 'Year to date', 'Custom'],
  plans: ['All Plans', 'Sports Premium', 'Entertainment', 'Kids', 'News'],
  regions: ['All Regions', 'UK & Ireland', 'Continental Europe', 'North America'],
  acquisitions: ['All Channels', 'Digital', 'Retail', 'Partner', 'Referral'],
};

export const analyticsTrend = [
  { month: 'Jan', churn: 1.12, cltv: 312, engagement: 68, billing: 14 },
  { month: 'Feb', churn: 1.05, cltv: 318, engagement: 71, billing: 12 },
  { month: 'Mar', churn: 0.98, cltv: 327, engagement: 73, billing: 11 },
  { month: 'Apr', churn: 0.94, cltv: 333, engagement: 75, billing: 10 },
  { month: 'May', churn: 0.92, cltv: 338, engagement: 76, billing: 9 },
  { month: 'Jun', churn: 0.89, cltv: 344, engagement: 78, billing: 9 },
];

export const segmentBreakdown = [
  { segment: 'Trial', volume: 4200, churn: 27 },
  { segment: 'New', volume: 6400, churn: 19 },
  { segment: 'Established', volume: 1290000, churn: 0.82 },
];

export const signalMatrix = [
  {
    column: 'Engagement',
    signal: 'Drop in live hours',
    severity: 'Critical',
    frequency: '28%',
    weight: '24%',
  },
  {
    column: 'Billing',
    signal: 'Payment method expired',
    severity: 'High',
    frequency: '17%',
    weight: '18%',
  },
  {
    column: 'Sentiment',
    signal: 'Support CSAT below 3★',
    severity: 'High',
    frequency: '14%',
    weight: '16%',
  },
  {
    column: 'Experience',
    signal: 'Buffering incidents',
    severity: 'Medium',
    frequency: '12%',
    weight: '14%',
  },
  {
    column: 'Competitor',
    signal: 'Price comparison searches',
    severity: 'Medium',
    frequency: '11%',
    weight: '13%',
  },
  {
    column: 'Loyalty',
    signal: 'Referral activity drop',
    severity: 'Low',
    frequency: '9%',
    weight: '15%',
  },
];

export const subscribers = [
  {
    id: 'SKY-92831',
    name: 'Amelia Turner',
    segment: 'High CLTV',
    plan: 'Sky Ultimate + Sports',
    risk: 'High',
    churnSignals: ['Streaming drop -42%', 'Support CSAT 2★', 'Billing retry'],
    payment: 'Visa •••• 0921',
    engagement: ['Watched EPL Live', 'Paused boxset', 'Cross-device usage'],
    interventions: ['Loyalty bundle offer sent 14d ago'],
  },
  {
    id: 'SKY-10455',
    name: 'Marcus Boyd',
    segment: 'Trial',
    plan: 'Entertainment Trial',
    risk: 'Medium',
    churnSignals: ['Onboarding incomplete', 'No watchlist created'],
    payment: 'Pending',
    engagement: ['Browsed sci-fi category', 'Search “Formula 1”'],
    interventions: ['Welcome call missed'],
  },
];

export const playbooks = [
  {
    id: 'loyalty-discount',
    title: 'Loyalty Discount',
    segment: 'High CLTV Established',
    lift: '+5.8%',
    roi: '3.2×',
    description: 'Tiered loyalty credit with exclusive sports content unlock.',
  },
  {
    id: 'onboarding',
    title: 'Onboarding Personalisation',
    segment: 'New Trials',
    lift: '+7.1%',
    roi: '2.9×',
    description: 'Concierge onboarding journeys and curated watchlists.',
  },
  {
    id: 'playlist',
    title: 'Content Playlist Re-engagement',
    segment: 'Content Fatigue',
    lift: '+4.6%',
    roi: '2.7×',
    description: 'AI playlists based on historical viewing gaps.',
  },
  {
    id: 'downgrade',
    title: 'Downgrade to Ad-supported',
    segment: 'Price Sensitive',
    lift: '+3.9%',
    roi: '2.2×',
    description: 'Offer ad-supported tier with optional upsell path.',
  },
];

export const actionHistory = [
  {
    id: 'ACT-001',
    name: 'High CLTV Loyalty Upgrade',
    segment: 'High CLTV',
    duration: 'Mar 01 – Mar 31',
    status: 'Completed',
    expected: '+6.0%',
    actual: '+5.4%',
    roi: '3.1×',
    owner: 'Amelia Turner',
  },
  {
    id: 'ACT-002',
    name: 'Trial Concierge Outreach',
    segment: 'Trial',
    duration: 'Apr 12 – ongoing',
    status: 'Active',
    expected: '+7.5%',
    actual: '+4.8%',
    roi: '2.4×',
    owner: 'Nina Brooks',
  },
  {
    id: 'ACT-003',
    name: 'Ad-supported Downgrade Offer',
    segment: 'Price Sensitive',
    duration: 'Feb 03 – Feb 20',
    status: 'Completed',
    expected: '+4.0%',
    actual: '+4.6%',
    roi: '2.7×',
    owner: 'Deepak Rao',
  },
];

export const modelPerformance = {
  metrics: [
    { label: 'Accuracy', value: '96%' },
    { label: 'Precision', value: '94%' },
    { label: 'Recall', value: '92%' },
    { label: 'F1 Score', value: '93%' },
  ],
  message:
    'AI Alert: Re-training suggested for sentiment signals. Drift detected over past 30 days.',
};

