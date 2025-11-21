/**
 * Combined Providers component
 */

'use client';

import React from 'react';
import { ReduxProvider } from './ReduxProvider';
import { ReactQueryProvider } from './ReactQueryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
};
