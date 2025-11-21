/**
 * Mock data generator for token pairs
 * Creates realistic token data for development and testing
 */

import { TokenPair, TokenBadge, TokenStatus } from '@/types';

const TOKEN_NAMES = [
  { symbol: "MOCHI", name: "Mochi Roll", image: "https://picsum.photos/seed/mochiroll/100/100" },
  { symbol: "GLYPH", name: "GlyphStone", image: "https://picsum.photos/seed/glyphstone/100/100" },
  { symbol: "NEB", name: "Nebula Coin", image: "https://picsum.photos/seed/nebulacoin/100/100" },
  { symbol: "FOAM", name: "Foam Protocol", image: "https://picsum.photos/seed/foamproto/100/100" },
  { symbol: "CRWL", name: "CrawlToken", image: "https://picsum.photos/seed/crawltoken/100/100" },
  { symbol: "OWL", name: "NightOwl Finance", image: "https://picsum.photos/seed/nightowl/100/100" },
  { symbol: "PLNK", name: "PlanktonX", image: "https://picsum.photos/seed/planktonx/100/100" },
  { symbol: "RIFT", name: "Rift Shard", image: "https://picsum.photos/seed/riftshard/100/100" },
  { symbol: "KOKO", name: "KoKo Beans", image: "https://picsum.photos/seed/kokobeans/100/100" },
  { symbol: "SPRK", name: "SparkBite", image: "https://picsum.photos/seed/sparkbite/100/100" },
  { symbol: "BUB", name: "BubbleChain", image: "https://picsum.photos/seed/bubbleseed/100/100" },
];


const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const randomInt = (min: number, max: number): number => {
  return Math.floor(randomInRange(min, max));
};

const generateAge = (): string => {
  const type = Math.random();
  if (type < 0.3) return `${randomInt(1, 60)}m`;
  if (type < 0.6) return `${randomInt(1, 24)}h`;
  if (type < 0.9) return `${randomInt(1, 60)}s`;
  return `${randomInt(1, 30)}d`;
};

const generateBadges = (): TokenBadge[] => {
  const badges: TokenBadge[] = [];
  if (Math.random() > 0.7) badges.push({ type: 'bagholder', label: 'bagholder' });
  if (Math.random() > 0.8) badges.push({ type: 'verified' });
  return badges;
};

export const generateMockToken = (id: number, status: TokenStatus = 'new'): TokenPair => {
  const tokenInfo = TOKEN_NAMES[id % TOKEN_NAMES.length];
  const marketCap = randomInRange(10000, 10000000);
  const liquidity = marketCap * randomInRange(0.1, 0.5);
  const volume24h = marketCap * randomInRange(0.05, 0.3);
  
  return {
    id: `token-${id}`,
    symbol: `${tokenInfo.symbol}${id > 6 ? id : ''}`,
    name: tokenInfo.name,
    image: tokenInfo.image,
    marketCap,
    liquidity,
    volume24h,
    price: randomInRange(0.0001, 100),
    priceChange24h: randomInRange(-50, 150),
    txns: {
      buys: randomInt(50, 500),
      sells: randomInt(30, 400),
    },
    holders: randomInt(100, 5000),
    age: generateAge(),
    badges: generateBadges(),
    links: {
      website: Math.random() > 0.5 ? `https://token${id}.com` : undefined,
      twitter: Math.random() > 0.3 ? `https://twitter.com/token${id}` : undefined,
      telegram: Math.random() > 0.6 ? `https://t.me/token${id}` : undefined,
    },
    status,
  };
};

export const generateMockTokens = (count: number, status: TokenStatus = 'new'): TokenPair[] => {
  return Array.from({ length: count }, (_, i) => generateMockToken(i, status));
};
