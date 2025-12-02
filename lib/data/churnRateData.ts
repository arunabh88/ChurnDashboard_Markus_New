export interface ChurnedSubscriber {
  id: string;
  name: string;
  email: string;
  plan: string;
  segment: 'Trial' | 'New' | 'Established';
  churnDate: string;
  reason: string;
  ltvLost: number;
  daysActive: number;
  region: string;
  signUpDate: string;
}

export interface ChurnTrend {
  month: string;
  churnRate: number;
  target: number;
  churned: number;
  retained: number;
}

export interface RootCause {
  reason: string;
  count: number;
  percentage: number;
  color: string;
}

export interface SegmentChurn {
  segment: 'Trial' | 'New' | 'Established';
  churnRate: number;
  churned: number;
  retained: number;
}

export const churnTrendData: ChurnTrend[] = [
  { month: 'Nov', churnRate: 1.9, target: 1.7, churned: 39900, retained: 2060100 },
  { month: 'Dec', churnRate: 1.8, target: 1.65, churned: 38160, retained: 2081840 },
  { month: 'Jan', churnRate: 1.7, target: 1.6, churned: 36040, retained: 2103960 },
  { month: 'Feb', churnRate: 1.55, target: 1.55, churned: 32860, retained: 2127140 },
  { month: 'Mar', churnRate: 1.52, target: 1.5, churned: 32160, retained: 2150840 },
];

export const rootCauses: RootCause[] = [
  { reason: 'Price Too High', count: 11220, percentage: 35, color: '#ef4444' },
  { reason: 'Content Issues', count: 8016, percentage: 25, color: '#f97316' },
  { reason: 'Technical Problems', count: 6413, percentage: 20, color: '#eab308' },
  { reason: 'Competition', count: 4809, percentage: 15, color: '#3b82f6' },
  { reason: 'Other', count: 1603, percentage: 5, color: '#6b7280' },
];

export const segmentChurnData: SegmentChurn[] = [
  { segment: 'Trial', churnRate: 6.2, churned: 18600, retained: 281400 },
  { segment: 'New', churnRate: 2.1, churned: 4599, retained: 214401 },
  { segment: 'Established', churnRate: 0.9, churned: 8961, retained: 1616039 },
];

export const churnedSubscribers: ChurnedSubscriber[] = [
  {
    id: 'SUB-CH-001',
    name: 'John Smith',
    email: 'john.s@email.com',
    plan: 'Sky Entertainment',
    segment: 'Trial',
    churnDate: '2024-01-15',
    reason: 'Price Too High',
    ltvLost: 145,
    daysActive: 12,
    region: 'London',
    signUpDate: '2024-01-03',
  },
  {
    id: 'SUB-CH-002',
    name: 'Emma Johnson',
    email: 'emma.j@email.com',
    plan: 'Sky Sports',
    segment: 'New',
    churnDate: '2024-01-20',
    reason: 'Content Issues',
    ltvLost: 280,
    daysActive: 45,
    region: 'Manchester',
    signUpDate: '2023-12-06',
  },
  {
    id: 'SUB-CH-003',
    name: 'Michael Brown',
    email: 'm.brown@email.com',
    plan: 'Sky Ultimate',
    segment: 'Established',
    churnDate: '2024-01-25',
    reason: 'Competition',
    ltvLost: 680,
    daysActive: 420,
    region: 'Birmingham',
    signUpDate: '2022-11-20',
  },
  {
    id: 'SUB-CH-004',
    name: 'Sarah Davis',
    email: 'sarah.d@email.com',
    plan: 'Sky Basic',
    segment: 'Trial',
    churnDate: '2024-01-10',
    reason: 'Technical Problems',
    ltvLost: 45,
    daysActive: 8,
    region: 'Leeds',
    signUpDate: '2024-01-02',
  },
  {
    id: 'SUB-CH-005',
    name: 'David Wilson',
    email: 'd.wilson@email.com',
    plan: 'Sky Cinema',
    segment: 'New',
    churnDate: '2024-01-18',
    reason: 'Price Too High',
    ltvLost: 195,
    daysActive: 60,
    region: 'Glasgow',
    signUpDate: '2023-11-19',
  },
  {
    id: 'SUB-CH-006',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    plan: 'Sky Entertainment',
    segment: 'Trial',
    churnDate: '2024-01-12',
    reason: 'Content Issues',
    ltvLost: 68,
    daysActive: 10,
    region: 'Liverpool',
    signUpDate: '2024-01-02',
  },
  {
    id: 'SUB-CH-007',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    plan: 'Sky Sports',
    segment: 'Established',
    churnDate: '2024-01-22',
    reason: 'Competition',
    ltvLost: 520,
    daysActive: 380,
    region: 'Bristol',
    signUpDate: '2023-01-07',
  },
  {
    id: 'SUB-CH-008',
    name: 'Jennifer Martinez',
    email: 'j.martinez@email.com',
    plan: 'Sky Basic',
    segment: 'Trial',
    churnDate: '2024-01-08',
    reason: 'Technical Problems',
    ltvLost: 32,
    daysActive: 5,
    region: 'Edinburgh',
    signUpDate: '2024-01-03',
  },
  {
    id: 'SUB-CH-009',
    name: 'William Garcia',
    email: 'w.garcia@email.com',
    plan: 'Sky Ultimate',
    segment: 'New',
    churnDate: '2024-01-19',
    reason: 'Price Too High',
    ltvLost: 240,
    daysActive: 55,
    region: 'Newcastle',
    signUpDate: '2023-11-25',
  },
  {
    id: 'SUB-CH-010',
    name: 'Amanda Lee',
    email: 'amanda.l@email.com',
    plan: 'Sky Cinema',
    segment: 'Established',
    churnDate: '2024-01-24',
    reason: 'Content Issues',
    ltvLost: 450,
    daysActive: 320,
    region: 'Cardiff',
    signUpDate: '2023-03-09',
  },
];

export interface ChurnFilters {
  dateRange: '30' | '60' | '90' | 'all';
  plan: 'All' | 'Sky Ultimate' | 'Sky Entertainment' | 'Sky Sports' | 'Sky Cinema' | 'Sky Basic';
  region: 'All' | 'Global' | 'EMEA' | 'Americas' | 'APAC';
  segment: 'All' | 'Trial' | 'New' | 'Established';
  searchQuery: string;
}

export function filterChurnData(
  subscribers: ChurnedSubscriber[],
  filters: ChurnFilters
): ChurnedSubscriber[] {
  return subscribers.filter((sub) => {
    // Date range filter
    if (filters.dateRange !== 'all') {
      const days = parseInt(filters.dateRange);
      const churnDate = new Date(sub.churnDate);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      if (churnDate < cutoffDate) return false;
    }

    // Plan filter
    if (filters.plan !== 'All' && sub.plan !== filters.plan) {
      return false;
    }

    // Region filter
    if (filters.region !== 'All' && filters.region !== 'Global') {
      // Map region logic if needed
      if (filters.region === 'EMEA' && !['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Bristol', 'Edinburgh', 'Newcastle', 'Cardiff'].includes(sub.region)) {
        return false;
      }
    }

    // Segment filter
    if (filters.segment !== 'All' && sub.segment !== filters.segment) {
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

