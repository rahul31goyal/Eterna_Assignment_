/**
 * Skeleton loader component
 * Loading state with shimmer effect
 */

'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = React.memo(({
  className = '',
  animate = true,
}) => {
  return (
    <div
      className={`
        bg-gray-800 rounded
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export const SkeletonRow: React.FC = React.memo(() => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-800">
      {/* Token info */}
      <div className="flex items-center gap-3 flex-1">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Market cap */}
      <div className="w-24">
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Liquidity */}
      <div className="w-24">
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Volume */}
      <div className="w-24">
        <Skeleton className="h-4 w-full" />
      </div>

      {/* TXNS */}
      <div className="w-20">
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Token Info icons */}
      <div className="w-32 flex gap-2">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-6 w-6 rounded" />
      </div>

      {/* Action */}
      <div className="w-20">
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
});

SkeletonRow.displayName = 'SkeletonRow';
