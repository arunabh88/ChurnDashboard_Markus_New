import type { LucideIcon } from 'lucide-react';
import { Crown, Tag, Film, Wrench, ShoppingCart } from 'lucide-react';

export type SegmentPriority = 'save-first' | 'needs-attention' | 'low-roi';

export interface RetentionSegment {
  name: string;
  churnRisk: number;
  cltv: number;
  roi: number;
  aiSuggestion: string;
  priority: SegmentPriority;
  count: number;
  icon: LucideIcon;
  iconGradient: [string, string];
  persona: string;
  recommendedAction: string;
  expectedLift: string;
}

export const RETENTION_SEGMENTS: RetentionSegment[] = [
  {
    name: 'High-value loyalists',
    churnRisk: 76,
    cltv: 620,
    roi: 3.2,
    aiSuggestion: 'Loyalty discount + exclusive content',
    priority: 'save-first',
    count: 8400,
    icon: Crown,
    iconGradient: ['#fde68a', '#f97316'],
    persona: 'Sports enthusiasts with premium bundles and multi-device households.',
    recommendedAction: 'Deploy loyalty credit bundle with exclusive sports content unlock and concierge support.',
    expectedLift: '+5.8% in retention and +3.2× ROI',
  },
  {
    name: 'Price-sensitive',
    churnRisk: 83,
    cltv: 180,
    roi: 2.5,
    aiSuggestion: 'Flexible plan + ad-supported tier',
    priority: 'needs-attention',
    count: 15200,
    icon: Tag,
    iconGradient: ['#5eead4', '#0ea5e9'],
    persona: 'Budget-conscious viewers primarily on single device with limited add-ons.',
    recommendedAction: 'Offer downgrade-to-ad-supported plan with optional upsell bundles and payment reminders.',
    expectedLift: '+4.2% retention and +2.1× ROI',
  },
  {
    name: 'Content-fatigued',
    churnRisk: 69,
    cltv: 240,
    roi: 3.1,
    aiSuggestion: 'Recommend new series + personalized playlists',
    priority: 'save-first',
    count: 6800,
    icon: Film,
    iconGradient: ['#f0abfc', '#f472b6'],
    persona: 'Binge watchers with declining session length across drama & documentary genres.',
    recommendedAction: 'Activate AI-curated content journeys with push notifications and watch-party invitations.',
    expectedLift: '+6.4% retention and +3.4× ROI',
  },
  {
    name: 'Tech-frustrated',
    churnRisk: 71,
    cltv: 210,
    roi: 2.8,
    aiSuggestion: 'Proactive support + device upgrade offer',
    priority: 'needs-attention',
    count: 4200,
    icon: Wrench,
    iconGradient: ['#38bdf8', '#6366f1'],
    persona: 'Multi-screen households experiencing buffering across legacy set-top boxes.',
    recommendedAction: 'Schedule proactive technician outreach with device upgrade credits and simplified setup guides.',
    expectedLift: '+4.9% retention and +2.6× ROI',
  },
  {
    name: 'Competitive shoppers',
    churnRisk: 88,
    cltv: 150,
    roi: 2.1,
    aiSuggestion: 'Price match + bundle discount',
    priority: 'low-roi',
    count: 9600,
    icon: ShoppingCart,
    iconGradient: ['#fb7185', '#f43f5e'],
    persona: 'Subscribers comparing rival offers and engaging mainly during marquee events.',
    recommendedAction: 'Provide limited-time price match offer with loyalty bundle and competitor comparison messaging.',
    expectedLift: '+3.1% retention and +1.9× ROI',
  },
];

