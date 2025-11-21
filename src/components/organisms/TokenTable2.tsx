/**
 * Token Table - Pixel-perfect Axiom Trade replica
 * Matches exact spacing, typography, and visual design
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import { TokenPair, SortConfig, SortField } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectToken } from '@/store/slices/tokensSlice';
import { setSortConfig, toggleModal } from '@/store/slices/uiSlice2';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TokenTableProps {
  tokens: TokenPair[];
  isLoading?: boolean;
}

export const TokenTable2: React.FC<TokenTableProps> = React.memo(({
  tokens,
  isLoading = false,
}) => {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector((state) => state.ui.sortConfig);

  // Sort tokens
  const sortedTokens = useMemo(() => {
    if (!tokens.length) return [];
    const sorted = [...tokens].sort((a, b) => {
      let aValue: number = 0;
      let bValue: number = 0;

      switch (sortConfig.field) {
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
      }

      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  }, [tokens, sortConfig]);

  const handleSort = useCallback((field: SortField) => {
    dispatch(setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  }, [dispatch, sortConfig]);

  const handleSelectToken = useCallback((token: TokenPair) => {
    dispatch(selectToken(token.id));
    dispatch(toggleModal());
  }, [dispatch]);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    return `$${price.toFixed(2)}`;
  };

  const SortButton = ({ field, label }: { field: SortField; label: string }) => {
    const isActive = sortConfig.field === field;
    const direction = sortConfig.direction;

    return (
      <button
        onClick={() => handleSort(field)}
        className="flex items-center gap-1 hover:text-gray-300 transition-colors"
      >
        <span>{label}</span>
        {isActive && (
          direction === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />
        )}
      </button>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 px-4 py-3 border-b border-gray-800/50 text-xs text-gray-500 font-medium">
          <div>Pair Info</div>
          <div className="text-right">Market Cap</div>
          <div className="text-right">Liquidity</div>
          <div className="text-right">Volume</div>
          <div className="text-right">TXNS</div>
          <div className="text-right">Token Info</div>
          <div className="text-right">Action</div>
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="px-4 py-3 border-b border-gray-800/30 animate-pulse">
            <div className="h-10 bg-gray-800/30 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 px-4 py-3 border-b border-gray-800/50 text-xs text-gray-500 font-medium">
        <div>Pair Info</div>
        <div className="text-right">
          <SortButton field="marketCap" label="Market Cap" />
        </div>
        <div className="text-right">
          <SortButton field="liquidity" label="Liquidity" />
        </div>
        <div className="text-right">
          <SortButton field="volume24h" label="Volume" />
        </div>
        <div className="text-right">TXNS</div>
        <div className="text-right">Token Info</div>
        <div className="text-right">Action</div>
      </div>

      {/* Table Body */}
      {sortedTokens.map((token) => (
        <div
          key={token.id}
          className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 px-4 py-3 border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors cursor-pointer group"
          onClick={() => handleSelectToken(token)}
        >
          {/* Pair Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {token.symbol[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white text-sm">{token.symbol}</span>
                {token.badges.map((badge, i) => (
                  <span
                    key={i}
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      badge.type === 'verified'
                        ? 'bg-blue-500/20 text-blue-400'
                        : badge.type === 'bagholder'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {badge.type}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{token.age}</div>
            </div>
          </div>

          {/* Market Cap */}
          <div className="text-right text-sm text-gray-300">
            {formatNumber(token.marketCap)}
          </div>

          {/* Liquidity */}
          <div className="text-right text-sm text-gray-300">
            {formatNumber(token.liquidity)}
          </div>

          {/* Volume */}
          <div className="text-right text-sm text-gray-300">
            {formatNumber(token.volume24h)}
          </div>

          {/* TXNS */}
          <div className="text-right text-xs">
            <span className="text-green-400">{token.txns.buys}</span>
            <span className="text-gray-500 mx-1">/</span>
            <span className="text-red-400">{token.txns.sells}</span>
          </div>

          {/* Token Info */}
          <div className="text-right text-xs">
            <div className={`font-medium ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </div>
            <div className="text-gray-500 mt-0.5">{formatPrice(token.price)}</div>
          </div>

          {/* Action */}
          <div className="text-right">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectToken(token);
              }}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

TokenTable2.displayName = 'TokenTable2';
