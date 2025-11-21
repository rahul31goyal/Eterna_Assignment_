/**
 * Token Detail Modal
 * Displays comprehensive token information
 */

'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Modal } from '../molecules';
import { Avatar, Badge, Button } from '../atoms';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectToken } from '@/store/slices/tokensSlice';
import { toggleModal } from '@/store/slices/uiSlice';
import { fetchTokenById } from '@/lib/api';
import { formatCurrency, formatPrice, formatPercentage, getPercentageColor } from '@/utils/formatters';
import { Globe, Twitter, Send, TrendingUp, DollarSign } from 'lucide-react';

export const TokenDetailModal: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isModalOpen);
  const selectedTokenId = useAppSelector((state) => state.tokens.selectedTokenId);

  const { data: token, isLoading } = useQuery({
    queryKey: ['token', selectedTokenId],
    queryFn: () => fetchTokenById(selectedTokenId!),
    enabled: !!selectedTokenId && isOpen,
  });

  const handleClose = () => {
    dispatch(toggleModal());
    dispatch(selectToken(null));
  };

  if (!isOpen || !selectedTokenId) return null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleClose}
      title={token ? `${token.symbol} - ${token.name}` : 'Loading...'}
      size="lg"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : token ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Avatar src={token.image} alt={token.symbol} size="lg" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{token.name}</h3>
              <p className="text-gray-400">{token.symbol}</p>
              <div className="flex gap-2 mt-2">
                {token.badges.map((badge, i) => (
                  <Badge key={i} variant="info">
                    {badge.label || badge.type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <DollarSign size={16} />
                <span>Price</span>
              </div>
              <p className="text-xl font-semibold text-white">{formatPrice(token.price)}</p>
              <p className={`text-sm ${getPercentageColor(token.priceChange24h)}`}>
                {formatPercentage(token.priceChange24h)} (24h)
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <TrendingUp size={16} />
                <span>Market Cap</span>
              </div>
              <p className="text-xl font-semibold text-white">{formatCurrency(token.marketCap)}</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Liquidity</p>
              <p className="text-xl font-semibold text-white">{formatCurrency(token.liquidity)}</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Volume (24h)</p>
              <p className="text-xl font-semibold text-white">{formatCurrency(token.volume24h)}</p>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Transactions (24h)</p>
            <div className="flex gap-4">
              <div>
                <span className="text-green-500 font-semibold">{token.txns.buys}</span>
                <span className="text-gray-400 text-sm ml-1">Buys</span>
              </div>
              <div>
                <span className="text-red-500 font-semibold">{token.txns.sells}</span>
                <span className="text-gray-400 text-sm ml-1">Sells</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {token.links.website && (
              <a
                href={token.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="secondary" className="w-full">
                  <Globe size={16} className="mr-2" />
                  Website
                </Button>
              </a>
            )}
            {token.links.twitter && (
              <a
                href={token.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="secondary" className="w-full">
                  <Twitter size={16} className="mr-2" />
                  Twitter
                </Button>
              </a>
            )}
            {token.links.telegram && (
              <a
                href={token.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="secondary" className="w-full">
                  <Send size={16} className="mr-2" />
                  Telegram
                </Button>
              </a>
            )}
          </div>

          {/* Action Button */}
          <Button variant="primary" className="w-full" size="lg">
            Buy {token.symbol}
          </Button>
        </div>
      ) : (
        <p className="text-center text-gray-400 py-8">Token not found</p>
      )}
    </Modal>
  );
});

TokenDetailModal.displayName = 'TokenDetailModal';
