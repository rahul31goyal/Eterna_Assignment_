/**
 * Core type definitions for token trading pairs
 * Strict typing for all token-related data structures
 */

export interface TokenPair {
  id: string;
  symbol: string;
  name: string;
  image: string;
  marketCap: number;
  liquidity: number;
  volume24h: number;
  price: number;
  priceChange24h: number;
  txns: {
    buys: number;
    sells: number;
  };
  holders: number;
  age: string; // e.g., "13m", "4h", "47s"
  badges: TokenBadge[];
  links: TokenLinks;
  status: TokenStatus;
}

export interface TokenBadge {
  type: 'bagholder' | 'verified' | 'migrated' | 'new';
  label?: string;
}

export interface TokenLinks {
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export type TokenStatus = 'new' | 'trending' | 'final-stretch' | 'migrated';

export interface PriceUpdate {
  id: string;
  price: number;
  timestamp: number;
  direction: 'up' | 'down' | 'neutral';
}

export type SortField = 'marketCap' | 'volume24h' | 'liquidity' | 'age' | 'price' | 'priceChange24h';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface TokenFilters {
  status?: TokenStatus;
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  search?: string;
}
