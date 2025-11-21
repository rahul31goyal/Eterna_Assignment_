/**
 * Token Table organism component
 * Main table displaying token pairs with sorting and real-time updates
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import { TokenPair, SortConfig, SortField } from '@/types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { SkeletonRow } from './SkeletonRow';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectToken } from '@/store/slices/tokensSlice';
import { setSortConfig, toggleModal } from '@/store/slices/uiSlice';

interface TokenTableProps {
  tokens: TokenPair[];
  isLoading?: boolean;
}

export const TokenTable: React.FC<TokenTableProps> = React.memo(({
  tokens,
  isLoading = false,
}) => {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector((state) => state.ui.sortConfig);

  // Sort tokens based on current sort configuration
  const sortedTokens = useMemo(() => {
    if (!tokens.length) return [];

    const sorted = [...tokens].sort((a, b) => {
      const field = sortConfig.field;
      let aValue: number = 0;
      let bValue: number = 0;

      // Type-safe field access
      switch (field) {
        case 'marketCap':
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        case 'liquidity':
          aValue = a.liquidity;
          bValue = b.liquidity;
          break;
        case 'volume24h':
          aValue = a.volume24h;
          bValue = b.volume24h;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'priceChange24h':
          aValue = a.priceChange24h;
          bValue = b.priceChange24h;
          break;
        case 'age':
          // For age, just return 0 for now (string comparison would be complex)
          return 0;
      }

      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  }, [tokens, sortConfig]);

  // Handle sort column change
  const handleSort = useCallback((field: SortField) => {
    dispatch(setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  }, [dispatch, sortConfig]);

  // Handle token selection
  const handleSelectToken = useCallback((token: TokenPair) => {
    dispatch(selectToken(token.id));
    dispatch(toggleModal());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full" data-testid="token-table-loading">
        <TableHeader sortConfig={sortConfig} onSort={handleSort} />
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (!tokens.length) {
    return (
      <div className="w-full p-8 text-center text-gray-400">
        No tokens found
      </div>
    );
  }

  return (
    <div className="w-full" data-testid="token-table">
      <TableHeader sortConfig={sortConfig} onSort={handleSort} />
      <div className="divide-y divide-gray-800">
        {sortedTokens.map((token, index) => (
          <TableRow
            key={token.id}
            token={token}
            onSelectToken={handleSelectToken}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});

TokenTable.displayName = 'TokenTable';
