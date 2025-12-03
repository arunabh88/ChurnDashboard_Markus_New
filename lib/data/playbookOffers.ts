export interface PlaybookOffer {
  incentive: string;
  message: string;
  guardrail: string;
}

type PlaybookId = 
  | 'loyalty-discount'
  | 'onboarding-personalisation'
  | 'content-playlist'
  | 'downgrade-ad-supported';

type SegmentId = 
  | 'trial'
  | 'new'
  | 'high-cltv'
  | 'sports-fans';

type OfferKey = `${PlaybookId}-${SegmentId}`;

const OFFER_TEMPLATES: Record<OfferKey, PlaybookOffer> = {
  // Onboarding Personalisation + Trial (0-30 days)
  'onboarding-personalisation-trial': {
    incentive: '7-day extended trial + Premium content preview',
    message: "Welcome to Sky TV! We've noticed you're just getting started. Let us help you discover everything Sky has to offer with personalized tutorials, content recommendations, and setup assistance. Your journey to amazing entertainment starts here.",
    guardrail: 'Target users with engagement score <40, days active <10, or device activation attempts >2. Exclude users who have completed onboarding tutorial or watched >5 hours of content.',
  },
  
  // Onboarding Personalisation + New (31-90 days)
  'onboarding-personalisation-new': {
    incentive: 'Personalized content discovery + Advanced features tutorial',
    message: "You've been with Sky TV for a while now. Let's help you unlock more value with personalized content recommendations and advanced features to enhance your viewing experience.",
    guardrail: 'Target users with engagement score <50, days active <60, or no favorites saved. Exclude users who have watched >20 hours of content.',
  },
  
  // Onboarding Personalisation + High CLTV
  'onboarding-personalisation-high-cltv': {
    incentive: 'Premium feature access + VIP concierge onboarding',
    message: 'As a valued Sky TV subscriber, we want to ensure you\'re getting the most from your subscription. Our VIP concierge team will guide you through premium features and exclusive content.',
    guardrail: 'Target users with CLTV >$500 and engagement score <60. Exclude users who have activated all premium features.',
  },
  
  // Onboarding Personalisation + Sports Fans
  'onboarding-personalisation-sports-fans': {
    incentive: 'Sports content deep-dive + Multi-screen setup guide',
    message: 'Discover the full power of Sky Sports! Get personalized tutorials on accessing live matches, highlights, and exclusive sports content across all your devices.',
    guardrail: 'Target sports fans with engagement score <55 or single-device usage. Exclude users who have watched >30 hours of sports content.',
  },
  
  // Loyalty Discount + Trial
  'loyalty-discount-trial': {
    incentive: '$15 loyalty credit',
    message: 'Keep enjoying Sky. Renew today and unlock loyalty pricing.',
    guardrail: 'Target churn risk >65%, CLTV > $250',
  },
  
  // Loyalty Discount + New
  'loyalty-discount-new': {
    incentive: '$20 loyalty credit + 1 month free',
    message: 'Thank you for being a Sky TV subscriber! Renew your subscription and enjoy exclusive loyalty benefits with extended savings.',
    guardrail: 'Target churn risk >50%, CLTV > $300, subscription age 31-90 days',
  },
  
  // Loyalty Discount + High CLTV
  'loyalty-discount-high-cltv': {
    incentive: 'Graduated discount with loyalty credit for high-value subscribers',
    message: 'As one of our most valued subscribers, we\'re offering you an exclusive loyalty discount. Continue enjoying premium Sky TV content with special pricing.',
    guardrail: 'Target churn risk >40%, CLTV > $500, engagement score >70',
  },
  
  // Loyalty Discount + Sports Fans
  'loyalty-discount-sports-fans': {
    incentive: 'Sports package discount + Early renewal bonus',
    message: 'Stay connected to all the sports action! Renew now and save on your Sports package with our exclusive fan loyalty discount.',
    guardrail: 'Target sports fans with churn risk >45%, CLTV > $400, sports engagement >60%',
  },
  
  // Content Playlist Re-engagement + Trial
  'content-playlist-trial': {
    incentive: 'Curated content playlist + Watchlist builder tutorial',
    message: 'Discover content tailored just for you! We\'ve created a personalized playlist based on your preferences. Start watching and build your perfect watchlist.',
    guardrail: 'Target users with content watched <3 hours, engagement score <35, or no favorites. Exclude users who have completed watchlist setup.',
  },
  
  // Content Playlist Re-engagement + New
  'content-playlist-new': {
    incentive: 'Curated content playlists via push/email for dormant users',
    message: 'We miss you! Here\'s a fresh selection of content we think you\'ll love. Re-engage with Sky TV and discover new favorites.',
    guardrail: 'Target users with engagement drop >30%, days since last watch >7, or content watched <10 hours. Exclude active users.',
  },
  
  // Content Playlist Re-engagement + High CLTV
  'content-playlist-high-cltv': {
    incentive: 'Exclusive premium content playlist + Early access',
    message: 'As a premium subscriber, enjoy early access to exclusive content and curated playlists featuring the best of Sky TV\'s library.',
    guardrail: 'Target high CLTV users with engagement score <65 or content diversity <5 genres. Exclude users with high content engagement.',
  },
  
  // Content Playlist Re-engagement + Sports Fans
  'content-playlist-sports-fans': {
    incentive: 'Sports highlights playlist + Match replay access',
    message: 'Never miss the action! Get curated sports highlights and full match replays delivered to your watchlist automatically.',
    guardrail: 'Target sports fans with sports content engagement <40% or missed live events >3. Exclude users with high sports engagement.',
  },
  
  // Downgrade to Ad-supported + Trial
  'downgrade-ad-supported-trial': {
    incentive: 'Ad-supported tier preview + Flexible plan options',
    message: 'We understand you\'re exploring options. Try our ad-supported tier at a lower cost while still enjoying great Sky TV content.',
    guardrail: 'Target users with price sensitivity signals, engagement score <30, or trial days >20. Exclude users who have expressed premium interest.',
  },
  
  // Downgrade to Ad-supported + New
  'downgrade-ad-supported-new': {
    incentive: 'Offer lower-cost ad-supported tier before cancellation intent',
    message: 'Before you go, consider our ad-supported plan. Keep enjoying Sky TV content at a more affordable price point.',
    guardrail: 'Target users with cancellation signals, price sensitivity >70%, or engagement score <45. Exclude users with high engagement.',
  },
  
  // Downgrade to Ad-supported + High CLTV
  'downgrade-ad-supported-high-cltv': {
    incentive: 'Flexible pricing options + Premium feature retention',
    message: 'We value your subscription. If cost is a concern, let\'s explore flexible pricing options that work for you while maintaining access to premium features.',
    guardrail: 'Target high CLTV users with price sensitivity >60% or payment issues. Exclude users with strong engagement and payment history.',
  },
  
  // Downgrade to Ad-supported + Sports Fans
  'downgrade-ad-supported-sports-fans': {
    incentive: 'Sports-focused ad-supported plan + Core sports retention',
    message: 'Stay connected to sports! Our ad-supported sports plan keeps you in the game at a more affordable price.',
    guardrail: 'Target sports fans with price sensitivity >65% or sports engagement <50%. Exclude users with premium sports package engagement.',
  },
};

/**
 * Get default offer configuration for a specific playbook and segment combination
 * @param playbookId - The ID of the selected playbook
 * @param segmentId - The ID of the selected segment
 * @returns PlaybookOffer with default values, or null if no template exists
 */
export function getDefaultOfferForPlaybook(
  playbookId: string,
  segmentId: string
): PlaybookOffer | null {
  const key = `${playbookId}-${segmentId}` as OfferKey;
  return OFFER_TEMPLATES[key] || null;
}

/**
 * Get all available incentive options for a playbook + segment combination
 * This can be used to populate dropdown options
 */
export function getIncentiveOptions(playbookId: string, segmentId: string): string[] {
  const defaultOffer = getDefaultOfferForPlaybook(playbookId, segmentId);
  if (!defaultOffer) return [];
  
  // For Onboarding Personalisation + Trial, return the alternative options
  if (playbookId === 'onboarding-personalisation' && segmentId === 'trial') {
    return [
      '7-day extended trial + Premium content preview',
      'Personalized onboarding concierge + Device setup assistance',
      'AI-curated content playlist + Watchlist builder tutorial',
      'Premium sports channel preview (7 days) + Multi-device setup guide',
    ];
  }
  
  // For other combinations, return just the default incentive
  return [defaultOffer.incentive];
}

