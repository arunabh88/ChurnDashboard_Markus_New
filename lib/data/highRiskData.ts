export interface HighRiskSubscriber {
  id: string;
  name: string;
  email: string;
  plan: string;
  riskLevel: 'Critical' | 'High' | 'Medium';
  churnProbability: number;
  topRiskSignals: string[];
  ltv: number;
  tenure: number;
  engagement: number;
  region: string;
}

export interface RiskSignal {
  signal: string;
  count: number;
  severity: 'Critical' | 'High' | 'Medium';
}

export const riskSignals: RiskSignal[] = [
  { signal: 'Engagement Drop', count: 12400, severity: 'Critical' },
  { signal: 'Billing Issues', count: 8900, severity: 'High' },
  { signal: 'Sentiment Negative', count: 6500, severity: 'High' },
  { signal: 'Experience Issues', count: 4200, severity: 'Medium' },
  { signal: 'Competitor Activity', count: 2800, severity: 'Medium' },
  { signal: 'Loyalty Decline', count: 1600, severity: 'Medium' },
];

export const highRiskSubscribers: HighRiskSubscriber[] = [
  {
    id: 'SUB-HR-001',
    name: 'Alice Thompson',
    email: 'alice.t@email.com',
    plan: 'Sky Basic',
    riskLevel: 'Critical',
    churnProbability: 92,
    topRiskSignals: ['Engagement Drop', 'Billing Issues'],
    ltv: 45,
    tenure: 1,
    engagement: 15,
    region: 'London',
  },
  {
    id: 'SUB-HR-002',
    name: 'Bob Williams',
    email: 'bob.w@email.com',
    plan: 'Sky Entertainment',
    riskLevel: 'Critical',
    churnProbability: 88,
    topRiskSignals: ['Sentiment Negative', 'Engagement Drop'],
    ltv: 120,
    tenure: 2,
    engagement: 22,
    region: 'Manchester',
  },
  {
    id: 'SUB-HR-003',
    name: 'Carol Johnson',
    email: 'carol.j@email.com',
    plan: 'Sky Sports',
    riskLevel: 'High',
    churnProbability: 75,
    topRiskSignals: ['Billing Issues'],
    ltv: 280,
    tenure: 4,
    engagement: 38,
    region: 'Birmingham',
  },
  {
    id: 'SUB-HR-004',
    name: 'Daniel Brown',
    email: 'daniel.b@email.com',
    plan: 'Sky Ultimate',
    riskLevel: 'High',
    churnProbability: 71,
    topRiskSignals: ['Competitor Activity', 'Loyalty Decline'],
    ltv: 450,
    tenure: 8,
    engagement: 42,
    region: 'Leeds',
  },
  {
    id: 'SUB-HR-005',
    name: 'Eva Davis',
    email: 'eva.d@email.com',
    plan: 'Sky Cinema',
    riskLevel: 'Critical',
    churnProbability: 90,
    topRiskSignals: ['Engagement Drop', 'Experience Issues'],
    ltv: 95,
    tenure: 3,
    engagement: 20,
    region: 'Glasgow',
  },
  {
    id: 'SUB-HR-006',
    name: 'Frank Miller',
    email: 'frank.m@email.com',
    plan: 'Sky Basic',
    riskLevel: 'High',
    churnProbability: 69,
    topRiskSignals: ['Billing Issues', 'Sentiment Negative'],
    ltv: 68,
    tenure: 2,
    engagement: 35,
    region: 'Liverpool',
  },
  {
    id: 'SUB-HR-007',
    name: 'Grace Wilson',
    email: 'grace.w@email.com',
    plan: 'Sky Entertainment',
    riskLevel: 'Medium',
    churnProbability: 55,
    topRiskSignals: ['Loyalty Decline'],
    ltv: 195,
    tenure: 6,
    engagement: 48,
    region: 'Bristol',
  },
  {
    id: 'SUB-HR-008',
    name: 'Henry Moore',
    email: 'henry.m@email.com',
    plan: 'Sky Sports',
    riskLevel: 'High',
    churnProbability: 73,
    topRiskSignals: ['Engagement Drop', 'Competitor Activity'],
    ltv: 320,
    tenure: 5,
    engagement: 41,
    region: 'Edinburgh',
  },
  {
    id: 'SUB-HR-009',
    name: 'Ivy Taylor',
    email: 'ivy.t@email.com',
    plan: 'Sky Ultimate',
    riskLevel: 'Critical',
    churnProbability: 85,
    topRiskSignals: ['Sentiment Negative', 'Billing Issues', 'Engagement Drop'],
    ltv: 580,
    tenure: 12,
    engagement: 28,
    region: 'Newcastle',
  },
  {
    id: 'SUB-HR-010',
    name: 'Jack Anderson',
    email: 'jack.a@email.com',
    plan: 'Sky Cinema',
    riskLevel: 'High',
    churnProbability: 67,
    topRiskSignals: ['Experience Issues'],
    ltv: 240,
    tenure: 7,
    engagement: 44,
    region: 'Cardiff',
  },
];

export interface HighRiskFilters {
  riskLevel: 'All' | 'Critical' | 'High' | 'Medium';
  plan: 'All' | 'Sky Ultimate' | 'Sky Entertainment' | 'Sky Sports' | 'Sky Cinema' | 'Sky Basic';
  tenureRange: 'All' | '0-3' | '3-6' | '6-12' | '12-24' | '24+';
  engagementRange: 'All' | '0-25' | '25-50' | '50-75' | '75-100';
  riskSignal: 'All' | 'Engagement Drop' | 'Billing Issues' | 'Sentiment Negative' | 'Experience Issues' | 'Competitor Activity' | 'Loyalty Decline';
  region: 'All' | 'Global' | 'EMEA' | 'Americas' | 'APAC';
  searchQuery: string;
}

export function filterHighRiskData(
  subscribers: HighRiskSubscriber[],
  filters: HighRiskFilters
): HighRiskSubscriber[] {
  return subscribers.filter((sub) => {
    // Risk level filter
    if (filters.riskLevel !== 'All' && sub.riskLevel !== filters.riskLevel) {
      return false;
    }

    // Plan filter
    if (filters.plan !== 'All' && sub.plan !== filters.plan) {
      return false;
    }

    // Tenure range filter
    if (filters.tenureRange !== 'All') {
      const [min, max] = filters.tenureRange.split('-').map(Number);
      if (filters.tenureRange === '24+') {
        if (sub.tenure < 24) return false;
      } else if (sub.tenure < min || sub.tenure >= max) {
        return false;
      }
    }

    // Engagement range filter
    if (filters.engagementRange !== 'All') {
      const [min, max] = filters.engagementRange.split('-').map(Number);
      if (sub.engagement < min || sub.engagement > max) {
        return false;
      }
    }

    // Risk signal filter
    if (filters.riskSignal !== 'All' && !sub.topRiskSignals.includes(filters.riskSignal)) {
      return false;
    }

    // Region filter
    if (filters.region !== 'All' && filters.region !== 'Global') {
      // Map region logic if needed
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (
        !sub.id.toLowerCase().includes(query) &&
        !sub.name.toLowerCase().includes(query) &&
        !sub.email.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    return true;
  });
}

export function getHighRiskStats(subscribers: HighRiskSubscriber[]) {
  return {
    total: subscribers.length,
    critical: subscribers.filter((s) => s.riskLevel === 'Critical').length,
    high: subscribers.filter((s) => s.riskLevel === 'High').length,
    medium: subscribers.filter((s) => s.riskLevel === 'Medium').length,
    revenueAtRisk: subscribers.reduce((sum, s) => sum + s.ltv, 0),
    avgChurnProbability: subscribers.reduce((sum, s) => sum + s.churnProbability, 0) / subscribers.length,
  };
}

