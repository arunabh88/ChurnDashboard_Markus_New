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
  
  const key = `${playbookId}-${segmentId}`;
  
  // Define incentive options for each combination
  const incentiveOptionsMap: Record<string, string[]> = {
    // Onboarding Personalisation
    'onboarding-personalisation-trial': [
      '7-day extended trial + Premium content preview',
      'Personalized onboarding concierge + Device setup assistance',
      'AI-curated content playlist + Watchlist builder tutorial',
      'Premium sports channel preview (7 days) + Multi-device setup guide',
    ],
    'onboarding-personalisation-new': [
      'Personalized content discovery + Advanced features tutorial',
      'Content recommendations + Multi-device setup',
      'Advanced features tutorial + Personalized dashboard',
      'Multi-device setup + Content discovery guide',
    ],
    'onboarding-personalisation-high-cltv': [
      'Premium feature access + VIP concierge onboarding',
      'VIP concierge onboarding + Exclusive content tour',
      'Exclusive content tour + Personalized dashboard',
      'Personalized dashboard + Premium feature access',
    ],
    'onboarding-personalisation-sports-fans': [
      'Sports content deep-dive + Multi-screen setup guide',
      'Multi-screen setup + Live match guide',
      'Live match guide + Sports app tutorial',
      'Sports app tutorial + Sports content deep-dive',
    ],
    
    // Loyalty Discount
    'loyalty-discount-trial': [
      '$15 loyalty credit',
      '$20 credit + 1 month free',
      'Graduated discount tier',
      'Early renewal bonus',
    ],
    'loyalty-discount-new': [
      '$20 loyalty credit + 1 month free',
      '$25 credit + 2 months free',
      'Loyalty tier upgrade',
      'Referral bonus',
    ],
    'loyalty-discount-high-cltv': [
      'Graduated discount with loyalty credit for high-value subscribers',
      'VIP pricing',
      'Annual plan discount',
      'Premium feature bundle',
    ],
    'loyalty-discount-sports-fans': [
      'Sports package discount + Early renewal bonus',
      'Early renewal bonus',
      'Multi-sport bundle',
      'Exclusive sports content access',
    ],
    
    // Content Playlist Re-engagement
    'content-playlist-trial': [
      'Curated content playlist + Watchlist builder tutorial',
      'AI recommendations + Favorites builder',
      'Genre-specific playlist',
      'Trending content access',
    ],
    'content-playlist-new': [
      'Curated content playlists via push/email for dormant users',
      'New releases playlist',
      'Personalized recommendations',
      'Multi-genre discovery',
    ],
    'content-playlist-high-cltv': [
      'Exclusive premium content playlist + Early access',
      'Early access content',
      'Curated collections',
      'VIP content library',
    ],
    'content-playlist-sports-fans': [
      'Sports highlights playlist + Match replay access',
      'Match replay access',
      'Live event reminders',
      'Sports documentary collection',
    ],
    
    // Downgrade to Ad-supported
    'downgrade-ad-supported-trial': [
      'Ad-supported tier preview + Flexible plan options',
      'Flexible plan options',
      'Pay-as-you-go option',
      'Basic tier with upgrade path',
    ],
    'downgrade-ad-supported-new': [
      'Offer lower-cost ad-supported tier before cancellation intent',
      'Lower-cost retention plan',
      'Flexible billing',
      'Core content retention',
    ],
    'downgrade-ad-supported-high-cltv': [
      'Flexible pricing options + Premium feature retention',
      'Premium feature retention',
      'Annual discount option',
      'Custom plan negotiation',
    ],
    'downgrade-ad-supported-sports-fans': [
      'Sports-focused ad-supported plan + Core sports retention',
      'Core sports retention',
      'Flexible sports package',
      'Basic sports access',
    ],
  };
  
  // Return options for this combination, or fallback to default
  return incentiveOptionsMap[key] || [defaultOffer.incentive];
}

export interface AIOfferVariation extends PlaybookOffer {
  expectedLift?: string;
  expectedROI?: string;
  reasoning?: string;
}

/**
 * Generate AI-generated offer variations for a playbook + segment combination
 * @param playbookId - The ID of the selected playbook
 * @param segmentId - The ID of the selected segment
 * @param currentOffer - The current offer configuration (optional, for context)
 * @returns Array of 2-3 AI-generated offer variations
 */
export function generateAIOffers(
  playbookId: string,
  segmentId: string,
  currentOffer?: PlaybookOffer
): AIOfferVariation[] {
  const key = `${playbookId}-${segmentId}`;
  const defaultOffer = getDefaultOfferForPlaybook(playbookId, segmentId) || currentOffer;
  
  if (!defaultOffer) return [];
  
  // AI-generated variations for each combination
  const aiVariationsMap: Record<string, AIOfferVariation[]> = {
    // Onboarding Personalisation + Trial
    'onboarding-personalisation-trial': [
      {
        incentive: 'Extended 10-day trial + Premium content unlock',
        message: "Hi! We noticed you're exploring Sky TV. Let's make sure you get the most out of your trial. We're extending your trial by 10 days and unlocking premium content so you can experience everything we offer. Plus, get personalized setup help from our team.",
        guardrail: 'Target users with engagement <35%, days active <8, or device setup issues. Exclude users who have watched >6 hours or completed onboarding.',
        expectedLift: '+9.2%',
        expectedROI: '3.1×',
        reasoning: 'Extended trial period addresses time constraint concerns while premium unlock increases perceived value.',
      },
      {
        incentive: 'AI-powered content discovery + One-on-one onboarding call',
        message: "Welcome to Sky TV! We want to ensure you find content you'll love. Our AI will curate personalized recommendations just for you, and our onboarding specialist is available for a free 15-minute call to help you get started. Let's make your Sky TV experience amazing!",
        guardrail: 'Target users with engagement <40%, no favorites saved, or content watched <2 hours. Exclude users who have scheduled onboarding call.',
        expectedLift: '+8.7%',
        expectedROI: '2.8×',
        reasoning: 'Personalized human touch combined with AI recommendations addresses both onboarding confusion and content discovery.',
      },
    ],
    
    // Loyalty Discount + Trial
    'loyalty-discount-trial': [
      {
        incentive: '$18 loyalty credit + Early renewal bonus',
        message: 'You\'re doing great with Sky TV! Renew now and save $18 with our loyalty credit, plus get an early renewal bonus. Continue enjoying premium entertainment at a special price.',
        guardrail: 'Target churn risk >60%, CLTV > $200, days active >15. Exclude users with payment issues.',
        expectedLift: '+6.8%',
        expectedROI: '3.6×',
        reasoning: 'Slightly higher credit amount with early renewal bonus creates urgency and increases perceived value.',
      },
      {
        incentive: 'Graduated loyalty tier + $15 credit',
        message: 'Join our loyalty program! Renew today and unlock tier benefits plus a $15 credit. The longer you stay, the more you save. Start your loyalty journey now.',
        guardrail: 'Target churn risk >65%, CLTV > $250, engagement score >30. Exclude users already in loyalty program.',
        expectedLift: '+7.1%',
        expectedROI: '3.4×',
        reasoning: 'Loyalty tier structure creates long-term value perception beyond immediate discount.',
      },
    ],
    
    // Content Playlist + Trial
    'content-playlist-trial': [
      {
        incentive: 'AI-curated binge-worthy playlist + Watchlist tutorial',
        message: 'Discover your next favorite show! We\'ve created a personalized playlist of binge-worthy content based on your viewing patterns. Plus, learn how to build your perfect watchlist to never miss great content again.',
        guardrail: 'Target users with content watched <4 hours, engagement <40%, or no watchlist. Exclude users with active watchlist.',
        expectedLift: '+5.8%',
        expectedROI: '2.7×',
        reasoning: 'Binge-worthy framing increases engagement appeal while tutorial addresses onboarding needs.',
      },
      {
        incentive: 'Trending now playlist + Genre discovery guide',
        message: 'Stay in the loop! Get access to our "Trending Now" playlist featuring the most popular content, plus a guide to discovering new genres you might love. There\'s always something great to watch on Sky TV.',
        guardrail: 'Target users with content diversity <2 genres, engagement <35%, or days since last watch >3. Exclude users with diverse viewing.',
        expectedLift: '+5.4%',
        expectedROI: '2.6×',
        reasoning: 'Trending content creates FOMO while genre guide helps users discover new interests.',
      },
    ],
    
    // Downgrade Ad-supported + Trial
    'downgrade-ad-supported-trial': [
      {
        incentive: 'Flexible ad-supported plan + Easy upgrade path',
        message: 'We understand budget matters. Try our flexible ad-supported plan at a lower cost - you can always upgrade later with no penalties. Keep enjoying Sky TV content that fits your budget.',
        guardrail: 'Target users with price sensitivity >60%, engagement <30%, or trial days >18. Exclude users who have expressed premium interest.',
        expectedLift: '+4.8%',
        expectedROI: '2.5×',
        reasoning: 'Flexible framing with upgrade path reduces commitment anxiety while maintaining retention.',
      },
      {
        incentive: 'Basic tier preview + Premium upgrade incentive',
        message: 'Explore our basic tier with ads - it\'s more affordable and still gives you access to great content. Plus, if you upgrade to premium within 30 days, we\'ll credit your first month. Try it risk-free!',
        guardrail: 'Target users with price sensitivity >65%, engagement <25%, or payment method issues. Exclude users with premium subscription history.',
        expectedLift: '+4.5%',
        expectedROI: '2.4×',
        reasoning: 'Preview model with upgrade incentive maintains engagement while addressing price concerns.',
      },
    ],
  };
  
  // Return AI variations for this combination, or generate generic ones
  if (aiVariationsMap[key]) {
    return aiVariationsMap[key];
  }
  
  // Generate generic AI variations if none exist
  return [
    {
      incentive: `${defaultOffer.incentive} (Optimized)`,
      message: `${defaultOffer.message} This offer has been optimized based on similar successful campaigns.`,
      guardrail: defaultOffer.guardrail,
      expectedLift: '+5.0%',
      expectedROI: '2.5×',
      reasoning: 'AI-optimized based on historical performance data for similar segments.',
    },
    {
      incentive: `${defaultOffer.incentive} (Enhanced)`,
      message: `${defaultOffer.message} Enhanced with best practices from top-performing retention campaigns.`,
      guardrail: defaultOffer.guardrail,
      expectedLift: '+5.5%',
      expectedROI: '2.7×',
      reasoning: 'Enhanced version incorporating industry best practices and A/B test results.',
    },
  ];
}

