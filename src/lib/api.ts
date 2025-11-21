/**
 * API client for fetching token data
 * Uses mock data for development
 */

import { TokenPair, TokenStatus } from '@/types';
import { generateMockTokens, generateMockToken } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Progressive loading - fetch tokens in batches
export const fetchTokensBatch = async (
  status: TokenStatus,
  page: number = 0,
  pageSize: number = 20
): Promise<{ tokens: TokenPair[]; hasMore: boolean; total: number }> => {
  await delay(300); // Simulate network delay
  
  const totalTokens = 100; // 100 tokens per category
  const start = page * pageSize;
  const end = Math.min(start + pageSize, totalTokens);
  
  if (start >= totalTokens) {
    return { tokens: [], hasMore: false, total: totalTokens };
  }
  
  // Generate batch of tokens with unique IDs based on status and page
  // Create unique offset for each status to avoid ID conflicts
  const statusOffsets: Record<TokenStatus, number> = {
    'new': 0,
    'final-stretch': 1000,
    'migrated': 2000,
    'trending': 3000,
  };
  
  const baseOffset = statusOffsets[status];
  const batchSize = end - start;
  const tokens: TokenPair[] = [];
  
  for (let i = 0; i < batchSize; i++) {
    const globalId = baseOffset + start + i;
    tokens.push(generateMockToken(globalId, status));
  }
  
  return {
    tokens,
    hasMore: end < totalTokens,
    total: totalTokens,
  };
};

// Legacy function for backwards compatibility
export const fetchTokens = async (status?: TokenStatus): Promise<TokenPair[]> => {
  await delay(50);
  
  // Return initial batch (20 tokens per category)
  const newPairs = generateMockTokens(20, 'new');
  const finalStretch = generateMockTokens(20, 'final-stretch');
  const migrated = generateMockTokens(20, 'migrated');
  
  return [...newPairs, ...finalStretch, ...migrated];
};

export const fetchTokenById = async (id: string): Promise<TokenPair | null> => {
  await delay(200);
  const tokens = await fetchTokens();
  return tokens.find((t) => t.id === id) || null;
};
