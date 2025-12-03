export interface EarlyLifecycleSubscriber {
  id: string;
  name: string;
  email: string;
  plan: string;
  daysActive: number;
  churnRisk: number;
  triggers: string[];
  signUpDate: string;
  region: string;
  ltv: number;
}

export interface LifecycleTrigger {
  trigger: string;
  count: number;
  percentage: number;
}

export interface LifecycleSegment {
  segment: 'Trial' | 'New';
  churnRate: number;
  count: number;
  avgDaysToChurn: number;
}

export const lifecycleTriggers: LifecycleTrigger[] = [
  { trigger: 'Onboarding confusion', count: 8400, percentage: 35 },
  { trigger: 'Content misalignment', count: 6000, percentage: 25 },
  { trigger: 'Device setup issues', count: 4800, percentage: 20 },
  { trigger: 'Engagement drop', count: 3600, percentage: 15 },
  { trigger: 'Billing confusion', count: 1200, percentage: 5 },
];

export const lifecycleSegments: LifecycleSegment[] = [
  { segment: 'Trial', churnRate: 6.2, count: 18600, avgDaysToChurn: 12 },
  { segment: 'New', churnRate: 2.1, count: 4599, avgDaysToChurn: 45 },
];

export const earlyLifecycleSubscribers: EarlyLifecycleSubscriber[] = [
  {
    id: 'SUB-EL-001',
    name: 'Sarah Mitchell',
    email: 'sarah.m@email.com',
    plan: 'Sky Basic',
    daysActive: 8,
    churnRisk: 85,
    triggers: ['Onboarding confusion', 'Content misalignment'],
    signUpDate: '2024-01-15',
    region: 'London',
    ltv: 45,
  },
  {
    id: 'SUB-EL-002',
    name: 'James Parker',
    email: 'j.parker@email.com',
    plan: 'Sky Entertainment',
    daysActive: 5,
    churnRisk: 92,
    triggers: ['Device setup issues', 'Onboarding confusion'],
    signUpDate: '2024-01-18',
    region: 'Manchester',
    ltv: 68,
  },
  {
    id: 'SUB-EL-003',
    name: 'Emily Chen',
    email: 'emily.c@email.com',
    plan: 'Sky Sports',
    daysActive: 25,
    churnRisk: 78,
    triggers: ['Engagement drop'],
    signUpDate: '2023-12-28',
    region: 'Birmingham',
    ltv: 145,
  },
  {
    id: 'SUB-EL-004',
    name: 'Michael Rodriguez',
    email: 'm.rodriguez@email.com',
    plan: 'Sky Ultimate',
    daysActive: 12,
    churnRisk: 88,
    triggers: ['Content misalignment', 'Onboarding confusion'],
    signUpDate: '2024-01-11',
    region: 'Leeds',
    ltv: 120,
  },
  {
    id: 'SUB-EL-005',
    name: 'Olivia White',
    email: 'olivia.w@email.com',
    plan: 'Sky Cinema',
    daysActive: 35,
    churnRisk: 65,
    triggers: ['Engagement drop', 'Billing confusion'],
    signUpDate: '2023-12-18',
    region: 'Glasgow',
    ltv: 195,
  },
  {
    id: 'SUB-EL-006',
    name: 'David Kim',
    email: 'david.k@email.com',
    plan: 'Sky Basic',
    daysActive: 6,
    churnRisk: 90,
    triggers: ['Device setup issues'],
    signUpDate: '2024-01-17',
    region: 'Liverpool',
    ltv: 32,
  },
  {
    id: 'SUB-EL-007',
    name: 'Sophia Martinez',
    email: 'sophia.m@email.com',
    plan: 'Sky Entertainment',
    daysActive: 42,
    churnRisk: 58,
    triggers: ['Content misalignment'],
    signUpDate: '2023-12-11',
    region: 'Bristol',
    ltv: 240,
  },
  {
    id: 'SUB-EL-008',
    name: 'Robert Lee',
    email: 'robert.l@email.com',
    plan: 'Sky Sports',
    daysActive: 15,
    churnRisk: 82,
    triggers: ['Onboarding confusion', 'Device setup issues'],
    signUpDate: '2024-01-08',
    region: 'Edinburgh',
    ltv: 95,
  },
  {
    id: 'SUB-EL-009',
    name: 'Emma Thompson',
    email: 'emma.t@email.com',
    plan: 'Sky Ultimate',
    daysActive: 28,
    churnRisk: 72,
    triggers: ['Engagement drop'],
    signUpDate: '2023-12-25',
    region: 'Newcastle',
    ltv: 280,
  },
  {
    id: 'SUB-EL-010',
    name: 'Christopher Brown',
    email: 'chris.b@email.com',
    plan: 'Sky Cinema',
    daysActive: 50,
    churnRisk: 55,
    triggers: ['Content misalignment', 'Billing confusion'],
    signUpDate: '2023-12-03',
    region: 'Cardiff',
    ltv: 320,
  },
];

export interface EarlyLifecycleFilters {
  lifecycleStage: 'All' | '0-30' | '31-60' | '61-90';
  triggerType: 'All' | 'Onboarding confusion' | 'Content misalignment' | 'Device setup issues' | 'Engagement drop' | 'Billing confusion';
  plan: 'All' | 'Sky Ultimate' | 'Sky Entertainment' | 'Sky Sports' | 'Sky Cinema' | 'Sky Basic';
  region: 'All' | 'Global' | 'EMEA' | 'Americas' | 'APAC';
  signUpDateRange: 'All' | 'Last 7 days' | 'Last 30 days' | 'Last 60 days';
  searchQuery: string;
}

/**
 * Map city name to regional category
 * @param city - The city name from subscriber data
 * @returns Regional category (EMEA, Americas, or APAC)
 */
export function getRegionFromCity(city: string): 'EMEA' | 'Americas' | 'APAC' {
  const emeaCities = [
    'London',
    'Manchester',
    'Birmingham',
    'Leeds',
    'Glasgow',
    'Liverpool',
    'Bristol',
    'Edinburgh',
    'Newcastle',
    'Cardiff',
  ];
  
  const americasCities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Toronto',
    'Vancouver',
    'Mexico City',
    'São Paulo',
    'Buenos Aires',
  ];
  
  const apacCities = [
    'Sydney',
    'Melbourne',
    'Singapore',
    'Hong Kong',
    'Tokyo',
    'Seoul',
    'Mumbai',
    'Bangalore',
    'Shanghai',
  ];
  
  if (emeaCities.includes(city)) return 'EMEA';
  if (americasCities.includes(city)) return 'Americas';
  if (apacCities.includes(city)) return 'APAC';
  
  // Default to EMEA for UK cities
  return 'EMEA';
}

export function filterEarlyLifecycleData(
  subscribers: EarlyLifecycleSubscriber[],
  filters: EarlyLifecycleFilters
): EarlyLifecycleSubscriber[] {
  return subscribers.filter((sub) => {
    // Lifecycle stage filter
    if (filters.lifecycleStage !== 'All') {
      const [min, max] = filters.lifecycleStage.split('-').map(Number);
      if (sub.daysActive < min || sub.daysActive > max) {
        return false;
      }
    }

    // Trigger type filter
    if (filters.triggerType !== 'All' && !sub.triggers.includes(filters.triggerType)) {
      return false;
    }

    // Plan filter
    if (filters.plan !== 'All' && sub.plan !== filters.plan) {
      return false;
    }

    // Region filter
    if (filters.region !== 'All' && filters.region !== 'Global') {
      const subscriberRegion = getRegionFromCity(sub.region);
      if (subscriberRegion !== filters.region) {
        return false;
      }
    }

    // Sign-up date range filter
    if (filters.signUpDateRange !== 'All') {
      const signUpDate = new Date(sub.signUpDate);
      const cutoffDate = new Date();
      if (filters.signUpDateRange === 'Last 7 days') {
        cutoffDate.setDate(cutoffDate.getDate() - 7);
      } else if (filters.signUpDateRange === 'Last 30 days') {
        cutoffDate.setDate(cutoffDate.getDate() - 30);
      } else if (filters.signUpDateRange === 'Last 60 days') {
        cutoffDate.setDate(cutoffDate.getDate() - 60);
      }
      if (signUpDate < cutoffDate) return false;
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

export function getEarlyLifecycleStats(subscribers: EarlyLifecycleSubscriber[]) {
  const total = subscribers.length;
  return {
    total,
    churnRate: 18.5,
    revenueAtRisk: subscribers.reduce((sum, s) => sum + s.ltv, 0),
    avgDaysToChurn: total > 0 ? subscribers.reduce((sum, s) => sum + s.daysActive, 0) / total : 0, // Prevent division by zero
  };
}

/**
 * Get trigger data grouped by region for chart visualization
 * @param subscribers - Array of early lifecycle subscribers
 * @returns Array of region data with trigger counts
 */
export function getTriggerDataByRegion(subscribers: EarlyLifecycleSubscriber[]) {
  const regionMap: Record<string, Record<string, number>> = {};
  
  // Initialize all regions
  const regions: ('EMEA' | 'Americas' | 'APAC')[] = ['EMEA', 'Americas', 'APAC'];
  const triggerTypes = [
    'Onboarding confusion',
    'Content misalignment',
    'Device setup issues',
    'Engagement drop',
    'Billing confusion',
  ];
  
  // Initialize region map
  regions.forEach((region) => {
    regionMap[region] = {};
    triggerTypes.forEach((trigger) => {
      regionMap[region][trigger] = 0;
    });
  });
  
  // Count triggers by region
  subscribers.forEach((sub) => {
    const region = getRegionFromCity(sub.region);
    sub.triggers.forEach((trigger) => {
      if (regionMap[region][trigger] !== undefined) {
        regionMap[region][trigger]++;
      }
    });
  });
  
  // Transform to chart data format
  return regions.map((region) => {
    const data: Record<string, string | number> = { region };
    triggerTypes.forEach((trigger) => {
      data[trigger] = regionMap[region][trigger] || 0;
    });
    return data;
  });
}

