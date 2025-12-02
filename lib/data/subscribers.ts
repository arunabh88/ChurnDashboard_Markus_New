export interface Subscriber {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'Active' | 'At Risk';
  tenure: number; // in months
  ltv: number; // lifetime value in dollars
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  engagement: number; // 0-100 percentage
  signUpDate: string;
  lastActiveDate: string;
  region: string;
  acquisitionSource: string;
  churnRisk: number; // 0-100 percentage
}

export const mockSubscribers: Subscriber[] = [
  {
    id: 'SUB-10254',
    name: 'Emma Thompson',
    email: 'emma.t@email.com',
    plan: 'Sky Ultimate',
    status: 'Active',
    tenure: 24,
    ltv: 680,
    risk: 'Low',
    engagement: 92,
    signUpDate: '2022-01-15',
    lastActiveDate: '2024-01-10',
    region: 'London',
    acquisitionSource: 'Direct',
    churnRisk: 8,
  },
  {
    id: 'SUB-10255',
    name: 'James Wilson',
    email: 'j.wilson@email.com',
    plan: 'Sky Entertainment',
    status: 'At Risk',
    tenure: 3,
    ltv: 145,
    risk: 'High',
    engagement: 34,
    signUpDate: '2023-10-20',
    lastActiveDate: '2024-01-05',
    region: 'Manchester',
    acquisitionSource: 'Partner',
    churnRisk: 78,
  },
  {
    id: 'SUB-10256',
    name: 'Sarah Martinez',
    email: 'sarah.m@email.com',
    plan: 'Sky Sports',
    status: 'Active',
    tenure: 18,
    ltv: 520,
    risk: 'Medium',
    engagement: 78,
    signUpDate: '2022-07-10',
    lastActiveDate: '2024-01-12',
    region: 'Birmingham',
    acquisitionSource: 'Direct',
    churnRisk: 42,
  },
  {
    id: 'SUB-10257',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    plan: 'Sky Cinema',
    status: 'Active',
    tenure: 36,
    ltv: 890,
    risk: 'Low',
    engagement: 95,
    signUpDate: '2021-01-05',
    lastActiveDate: '2024-01-15',
    region: 'London',
    acquisitionSource: 'Direct',
    churnRisk: 5,
  },
  {
    id: 'SUB-10258',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    plan: 'Sky Basic',
    status: 'At Risk',
    tenure: 1,
    ltv: 45,
    risk: 'Critical',
    engagement: 18,
    signUpDate: '2023-12-15',
    lastActiveDate: '2023-12-28',
    region: 'Leeds',
    acquisitionSource: 'Partner',
    churnRisk: 92,
  },
  {
    id: 'SUB-10259',
    name: 'David Brown',
    email: 'd.brown@email.com',
    plan: 'Sky Ultimate',
    status: 'Active',
    tenure: 12,
    ltv: 380,
    risk: 'Low',
    engagement: 88,
    signUpDate: '2023-01-20',
    lastActiveDate: '2024-01-14',
    region: 'Glasgow',
    acquisitionSource: 'Direct',
    churnRisk: 12,
  },
  {
    id: 'SUB-10260',
    name: 'Rachel Green',
    email: 'rachel.g@email.com',
    plan: 'Sky Entertainment',
    status: 'At Risk',
    tenure: 2,
    ltv: 68,
    risk: 'Critical',
    engagement: 22,
    signUpDate: '2023-11-10',
    lastActiveDate: '2023-12-20',
    region: 'Liverpool',
    acquisitionSource: 'Partner',
    churnRisk: 88,
  },
  {
    id: 'SUB-10261',
    name: 'Tom Harris',
    email: 'tom.h@email.com',
    plan: 'Sky Sports',
    status: 'Active',
    tenure: 30,
    ltv: 750,
    risk: 'Low',
    engagement: 91,
    signUpDate: '2021-07-15',
    lastActiveDate: '2024-01-13',
    region: 'Bristol',
    acquisitionSource: 'Direct',
    churnRisk: 6,
  },
  {
    id: 'SUB-10262',
    name: 'Sophie White',
    email: 'sophie.w@email.com',
    plan: 'Sky Cinema',
    status: 'At Risk',
    tenure: 4,
    ltv: 120,
    risk: 'High',
    engagement: 41,
    signUpDate: '2023-09-05',
    lastActiveDate: '2024-01-08',
    region: 'Edinburgh',
    acquisitionSource: 'Partner',
    churnRisk: 71,
  },
  {
    id: 'SUB-10263',
    name: 'Chris Taylor',
    email: 'chris.t@email.com',
    plan: 'Sky Ultimate',
    status: 'Active',
    tenure: 15,
    ltv: 450,
    risk: 'Medium',
    engagement: 65,
    signUpDate: '2022-10-12',
    lastActiveDate: '2024-01-11',
    region: 'Newcastle',
    acquisitionSource: 'Direct',
    churnRisk: 38,
  },
  {
    id: 'SUB-10264',
    name: 'Olivia Moore',
    email: 'olivia.m@email.com',
    plan: 'Sky Basic',
    status: 'At Risk',
    tenure: 1,
    ltv: 32,
    risk: 'Critical',
    engagement: 15,
    signUpDate: '2023-12-20',
    lastActiveDate: '2023-12-25',
    region: 'Cardiff',
    acquisitionSource: 'Partner',
    churnRisk: 95,
  },
  {
    id: 'SUB-10265',
    name: 'Daniel Lee',
    email: 'daniel.l@email.com',
    plan: 'Sky Entertainment',
    status: 'Active',
    tenure: 8,
    ltv: 240,
    risk: 'Medium',
    engagement: 72,
    signUpDate: '2023-05-18',
    lastActiveDate: '2024-01-12',
    region: 'London',
    acquisitionSource: 'Direct',
    churnRisk: 35,
  },
  {
    id: 'SUB-10266',
    name: 'Jessica Adams',
    email: 'jessica.a@email.com',
    plan: 'Sky Sports',
    status: 'Active',
    tenure: 20,
    ltv: 580,
    risk: 'Low',
    engagement: 86,
    signUpDate: '2022-05-22',
    lastActiveDate: '2024-01-14',
    region: 'Manchester',
    acquisitionSource: 'Direct',
    churnRisk: 15,
  },
  {
    id: 'SUB-10267',
    name: 'Ryan Clark',
    email: 'ryan.c@email.com',
    plan: 'Sky Cinema',
    status: 'At Risk',
    tenure: 3,
    ltv: 95,
    risk: 'High',
    engagement: 38,
    signUpDate: '2023-10-08',
    lastActiveDate: '2024-01-06',
    region: 'Birmingham',
    acquisitionSource: 'Partner',
    churnRisk: 69,
  },
  {
    id: 'SUB-10268',
    name: 'Amanda Scott',
    email: 'amanda.s@email.com',
    plan: 'Sky Ultimate',
    status: 'Active',
    tenure: 28,
    ltv: 820,
    risk: 'Low',
    engagement: 94,
    signUpDate: '2021-09-30',
    lastActiveDate: '2024-01-15',
    region: 'London',
    acquisitionSource: 'Direct',
    churnRisk: 4,
  },
  {
    id: 'SUB-10269',
    name: 'Mark Johnson',
    email: 'mark.j@email.com',
    plan: 'Sky Basic',
    status: 'At Risk',
    tenure: 2,
    ltv: 55,
    risk: 'Critical',
    engagement: 20,
    signUpDate: '2023-11-25',
    lastActiveDate: '2023-12-30',
    region: 'Leeds',
    acquisitionSource: 'Partner',
    churnRisk: 90,
  },
];

export interface SubscriberFilters {
  riskLevel: 'All' | 'Critical' | 'High' | 'Medium' | 'Low';
  plan: 'All' | 'Sky Ultimate' | 'Sky Entertainment' | 'Sky Sports' | 'Sky Cinema' | 'Sky Basic';
  tenureRange: 'All' | '0-3' | '3-6' | '6-12' | '12-24' | '24+';
  engagementRange: 'All' | '0-25' | '25-50' | '50-75' | '75-100';
  status: 'All' | 'Active' | 'At Risk';
  searchQuery: string;
}

export function filterSubscribers(subscribers: Subscriber[], filters: SubscriberFilters): Subscriber[] {
  return subscribers.filter((sub) => {
    // Risk level filter
    if (filters.riskLevel !== 'All' && sub.risk !== filters.riskLevel) {
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

    // Status filter
    if (filters.status !== 'All' && sub.status !== filters.status) {
      return false;
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

export function getSubscriberStats(subscribers: Subscriber[]) {
  return {
    total: subscribers.length,
    critical: subscribers.filter((s) => s.risk === 'Critical').length,
    high: subscribers.filter((s) => s.risk === 'High').length,
    medium: subscribers.filter((s) => s.risk === 'Medium').length,
    low: subscribers.filter((s) => s.risk === 'Low').length,
  };
}

