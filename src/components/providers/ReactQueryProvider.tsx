/**
 * React Query Provider wrapper component
 */

'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: Infinity, // Never mark as stale for optimal mobile performance
      gcTime: 15 * 60 * 1000, // Keep in memory for 15 minutes
      refetchOnMount: false,
      refetchOnReconnect: false,
      networkMode: 'offlineFirst', // Prefer cached data
    },
  },
});

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
