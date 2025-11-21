/**
 * Mock WebSocket hook for real-time price updates
 * Simulates live price feeds with smooth transitions
 * 
 * Updates prices in React Query cache and Redux store
 * Triggers visual transitions via PriceUpdate events
 */

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';
import { updatePrice } from '@/store/slices/tokensSlice';
import { TokenPair, PriceUpdate } from '@/types';

const UPDATE_INTERVAL = 2000; // Update every 2 seconds
const PRICE_CHANGE_FACTOR = 0.05; // Max 5% change per update

export const useWebSocketMock = (enabled: boolean = true) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    intervalRef.current = setInterval(() => {
      // Get current tokens from React Query cache
      const tokensData = queryClient.getQueryData<TokenPair[]>(['tokens']);
      
      if (!tokensData || tokensData.length === 0) return;

      // Pick 2-5 random tokens to update
      const numUpdates = Math.floor(Math.random() * 4) + 2;
      const indicesToUpdate = new Set<number>();
      
      while (indicesToUpdate.size < Math.min(numUpdates, tokensData.length)) {
        indicesToUpdate.add(Math.floor(Math.random() * tokensData.length));
      }

      // Generate price updates
      indicesToUpdate.forEach((index) => {
        const token = tokensData[index];
        const changePercent = (Math.random() - 0.5) * 2 * PRICE_CHANGE_FACTOR;
        const newPrice = token.price * (1 + changePercent);
        
        const priceUpdate: PriceUpdate = {
          id: token.id,
          price: newPrice,
          timestamp: Date.now(),
          direction: changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral',
        };

        // Update Redux store for UI transitions
        dispatch(updatePrice(priceUpdate));

        // Update React Query cache
        queryClient.setQueryData<TokenPair[]>(['tokens'], (oldData) => {
          if (!oldData) return oldData;
          return oldData.map((t) =>
            t.id === token.id
              ? {
                  ...t,
                  price: newPrice,
                  priceChange24h: t.priceChange24h + changePercent * 100,
                }
              : t
          );
        });
      });
    }, UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, queryClient, dispatch]);
};
