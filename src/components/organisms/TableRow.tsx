/**
 * Table Row component
 * Memoized row with hover effects and price transition animations
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TokenPair } from '@/types';
import { Avatar, Badge, Button } from '../atoms';
import { Tooltip, Popover } from '../molecules';
import { useAppSelector } from '@/store/hooks';
import {
  formatCurrency,
  formatPrice,
  formatPercentage,
  getPercentageColor,
  formatTxns,
} from '@/utils/formatters';
import { Globe, Twitter, Send, Info } from 'lucide-react';

interface TableRowProps {
  token: TokenPair;
  onSelectToken: (token: TokenPair) => void;
  index: number;
}

export const TableRow: React.FC<TableRowProps> = React.memo(({
  token,
  onSelectToken,
  index,
}) => {
  const priceUpdate = useAppSelector((state) => state.tokens.priceUpdates[token.id]);
  const [flashClass, setFlashClass] = useState('');
  const previousPriceRef = useRef(token.price);

  // Handle price flash animation
  useEffect(() => {
    if (priceUpdate && priceUpdate.price !== previousPriceRef.current) {
      const direction = priceUpdate.direction;
      setFlashClass(direction === 'up' ? 'price-flash-up' : 'price-flash-down');
      
      const timeout = setTimeout(() => setFlashClass(''), 700);
      previousPriceRef.current = priceUpdate.price;
      
      return () => clearTimeout(timeout);
    }
  }, [priceUpdate]);

  const currentPrice = priceUpdate?.price ?? token.price;
  const priceChangePercent = token.priceChange24h;

  return (
    <div
      className={`
        flex items-center gap-4 p-4 border-b border-gray-800
        hover:bg-gray-800/50 transition-colors duration-150
        cursor-pointer group
        ${flashClass}
      `}
      onClick={() => onSelectToken(token)}
      data-testid={`token-row-${index}`}
    >
      {/* Pair Info */}
      <div className="flex items-center gap-3 min-w-[200px] flex-1">
        <Avatar src={token.image} alt={token.symbol} size="md" />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Popover
              content={
                <div className="space-y-2">
                  <h3 className="font-semibold text-white">{token.name}</h3>
                  <p className="text-sm text-gray-400">Symbol: {token.symbol}</p>
                  <p className="text-sm text-gray-400">Holders: {token.holders.toLocaleString()}</p>
                  <div className="flex gap-2 mt-3">
                    {token.links.website && (
                      <a href={token.links.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        <Globe size={16} />
                      </a>
                    )}
                    {token.links.twitter && (
                      <a href={token.links.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        <Twitter size={16} />
                      </a>
                    )}
                    {token.links.telegram && (
                      <a href={token.links.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        <Send size={16} />
                      </a>
                    )}
                  </div>
                </div>
              }
            >
              <button className="text-white font-medium hover:text-blue-400 transition-colors">
                {token.symbol}
              </button>
            </Popover>
            {token.badges.map((badge, i) => (
              <Badge key={i} variant="info" size="sm">
                {badge.label || badge.type}
              </Badge>
            ))}
          </div>
          <span className="text-xs text-gray-400">{token.age}</span>
        </div>
      </div>

      {/* Market Cap */}
      <div className="w-24 text-right">
        <span className="text-white font-medium">{formatCurrency(token.marketCap)}</span>
      </div>

      {/* Liquidity */}
      <div className="w-24 text-right">
        <span className="text-gray-300">{formatCurrency(token.liquidity)}</span>
      </div>

      {/* Volume */}
      <div className="w-24 text-right">
        <span className="text-gray-300">{formatCurrency(token.volume24h)}</span>
      </div>

      {/* TXNS */}
      <Tooltip content="Buys / Sells">
        <div className="w-28 text-center">
          <div className="flex justify-center gap-1">
            <span className="text-green-500">{token.txns.buys}</span>
            <span className="text-gray-500">/</span>
            <span className="text-red-500">{token.txns.sells}</span>
          </div>
        </div>
      </Tooltip>

      {/* Token Info */}
      <div className="w-32 flex items-center justify-center gap-2">
        <span className={`font-medium ${getPercentageColor(priceChangePercent)}`}>
          {formatPercentage(priceChangePercent)}
        </span>
        <Tooltip content="Price">
          <Info size={14} className="text-gray-500" />
        </Tooltip>
      </div>

      {/* Action */}
      <div className="w-20">
        <Button size="sm" variant="primary" onClick={(e) => { e.stopPropagation(); onSelectToken(token); }}>
          Buy
        </Button>
      </div>
    </div>
  );
});

TableRow.displayName = 'TableRow';
