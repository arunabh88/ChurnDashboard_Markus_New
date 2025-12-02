export interface SegmentPerformance {
  segment: 'Trial' | 'New' | 'Established';
  subscriberCount: number;
  avgCltv: number;
  avgCac: number;
  cltvCacRatio: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
  plan: string;
  acquisitionSource: string;
  region: string;
}

export interface CltvCacTrend {
  month: string;
  cltv: number;
  cac: number;
  ratio: number;
}

export const cltvCacTrendData: CltvCacTrend[] = [
  { month: 'Nov', cltv: 422, cac: 128, ratio: 3.3 },
  { month: 'Dec', cltv: 438, cac: 130, ratio: 3.4 },
  { month: 'Jan', cltv: 452, cac: 132, ratio: 3.4 },
  { month: 'Feb', cltv: 461, cac: 134, ratio: 3.4 },
  { month: 'Mar', cltv: 468, cac: 136, ratio: 3.4 },
];

export const segmentPerformanceData: SegmentPerformance[] = [
  {
    segment: 'Trial',
    subscriberCount: 300000,
    avgCltv: 145,
    avgCac: 95,
    cltvCacRatio: 1.5,
    revenue: 43500000,
    trend: 'down',
    plan: 'Sky Basic',
    acquisitionSource: 'Paid',
    region: 'Global',
  },
  {
    segment: 'New',
    subscriberCount: 219000,
    avgCltv: 280,
    avgCac: 120,
    cltvCacRatio: 2.3,
    revenue: 61320000,
    trend: 'stable',
    plan: 'Sky Entertainment',
    acquisitionSource: 'Organic',
    region: 'Global',
  },
  {
    segment: 'Established',
    subscriberCount: 1290000,
    avgCltv: 680,
    avgCac: 145,
    cltvCacRatio: 4.7,
    revenue: 877200000,
    trend: 'up',
    plan: 'Sky Ultimate',
    acquisitionSource: 'Partner',
    region: 'Global',
  },
  {
    segment: 'Trial',
    subscriberCount: 120000,
    avgCltv: 165,
    avgCac: 110,
    cltvCacRatio: 1.5,
    revenue: 19800000,
    trend: 'down',
    plan: 'Sky Sports',
    acquisitionSource: 'Paid',
    region: 'EMEA',
  },
  {
    segment: 'New',
    subscriberCount: 85000,
    avgCltv: 320,
    avgCac: 135,
    cltvCacRatio: 2.4,
    revenue: 27200000,
    trend: 'stable',
    plan: 'Sky Cinema',
    acquisitionSource: 'Organic',
    region: 'EMEA',
  },
  {
    segment: 'Established',
    subscriberCount: 520000,
    avgCltv: 720,
    avgCac: 150,
    cltvCacRatio: 4.8,
    revenue: 374400000,
    trend: 'up',
    plan: 'Sky Ultimate',
    acquisitionSource: 'Partner',
    region: 'EMEA',
  },
];

export interface CltvCacFilters {
  segment: 'All' | 'Trial' | 'New' | 'Established';
  plan: 'All' | 'Sky Ultimate' | 'Sky Entertainment' | 'Sky Sports' | 'Sky Cinema' | 'Sky Basic';
  acquisitionSource: 'All' | 'Paid' | 'Organic' | 'Partner';
  region: 'All' | 'Global' | 'EMEA' | 'Americas' | 'APAC';
  dateRange: 'All' | 'Last 30 days' | 'Last 60 days' | 'Last 90 days';
  searchQuery: string;
}

export function filterCltvCacData(
  segments: SegmentPerformance[],
  filters: CltvCacFilters
): SegmentPerformance[] {
  return segments.filter((seg) => {
    // Segment filter
    if (filters.segment !== 'All' && seg.segment !== filters.segment) {
      return false;
    }

    // Plan filter
    if (filters.plan !== 'All' && seg.plan !== filters.plan) {
      return false;
    }

    // Acquisition source filter
    if (filters.acquisitionSource !== 'All' && seg.acquisitionSource !== filters.acquisitionSource) {
      return false;
    }

    // Region filter
    if (filters.region !== 'All' && seg.region !== filters.region) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (
        !seg.segment.toLowerCase().includes(query) &&
        !seg.plan.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    return true;
  });
}

export function getCltvCacStats(segments: SegmentPerformance[]) {
  const totalRevenue = segments.reduce((sum, s) => sum + s.revenue, 0);
  const totalSubscribers = segments.reduce((sum, s) => sum + s.subscriberCount, 0);
  const avgCltv = segments.reduce((sum, s) => sum + s.avgCltv * s.subscriberCount, 0) / totalSubscribers;
  const avgCac = segments.reduce((sum, s) => sum + s.avgCac * s.subscriberCount, 0) / totalSubscribers;
  const currentRatio = avgCltv / avgCac;
  const targetRatio = 3.5;

  return {
    currentRatio: currentRatio.toFixed(1),
    avgCltv: avgCltv.toFixed(0),
    avgCac: avgCac.toFixed(0),
    targetRatio: targetRatio.toFixed(1),
    gap: (currentRatio - targetRatio).toFixed(2),
    totalRevenue,
  };
}

