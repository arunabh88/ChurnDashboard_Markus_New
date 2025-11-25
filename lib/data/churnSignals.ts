export interface ChurnSignal {
  dimension: string;
  keySignal: string;
  source: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  weight: number;
}

export const CHURN_SIGNALS: ChurnSignal[] = [
  {
    dimension: 'Engagement',
    keySignal: 'Drop in live TV hours',
    source: 'Usage Logs',
    severity: 'critical',
    weight: 24,
  },
  {
    dimension: 'Billing',
    keySignal: 'Payment method expired',
    source: 'Payment API',
    severity: 'high',
    weight: 18,
  },
  {
    dimension: 'Sentiment',
    keySignal: 'Negative support interactions',
    source: 'NLP Analysis',
    severity: 'high',
    weight: 16,
  },
  {
    dimension: 'Experience',
    keySignal: 'Buffering incidents increased',
    source: 'Quality Metrics',
    severity: 'medium',
    weight: 14,
  },
  {
    dimension: 'Competitor',
    keySignal: 'Price comparison searches',
    source: 'Web Analytics',
    severity: 'medium',
    weight: 13,
  },
  {
    dimension: 'Loyalty',
    keySignal: 'Reduced referral activity',
    source: 'CRM Data',
    severity: 'low',
    weight: 15,
  },
];

export const CHURN_RADAR_DATA = [
  { dimension: 'Engagement', value: 85 },
  { dimension: 'Billing', value: 70 },
  { dimension: 'Sentiment', value: 65 },
  { dimension: 'Experience', value: 60 },
  { dimension: 'Competitor', value: 55 },
  { dimension: 'Loyalty', value: 75 },
];

