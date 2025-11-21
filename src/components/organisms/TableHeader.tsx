/**
 * Table Header component
 * Sortable column headers
 */

'use client';

import React from 'react';
import { SortConfig, SortField } from '@/types';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TableHeaderProps {
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}

interface ColumnDef {
  field: SortField | null;
  label: string;
  width: string;
  align?: 'left' | 'center' | 'right';
}

const columns: ColumnDef[] = [
  { field: null, label: 'Pair Info', width: 'min-w-[200px] flex-1', align: 'left' },
  { field: 'marketCap', label: 'Market Cap', width: 'w-24', align: 'right' },
  { field: 'liquidity', label: 'Liquidity', width: 'w-24', align: 'right' },
  { field: 'volume24h', label: 'Volume', width: 'w-24', align: 'right' },
  { field: null, label: 'TXNS', width: 'w-28', align: 'center' },
  { field: 'priceChange24h', label: 'Token Info', width: 'w-32', align: 'center' },
  { field: null, label: 'Action', width: 'w-20', align: 'center' },
];

export const TableHeader: React.FC<TableHeaderProps> = React.memo(({
  sortConfig,
  onSort,
}) => {
  const renderSortIcon = (field: SortField | null) => {
    if (!field) return null;
    
    const isActive = sortConfig.field === field;
    const Icon = sortConfig.direction === 'asc' ? ChevronUp : ChevronDown;
    
    return (
      <Icon
        size={16}
        className={`inline-block ml-1 transition-opacity ${
          isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-60'
        }`}
      />
    );
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-700 bg-gray-900/50 sticky top-0 z-10">
      {columns.map((column) => (
        <div
          key={column.label}
          className={`${column.width} text-${column.align || 'left'}`}
        >
          {column.field ? (
            <button
              onClick={() => onSort(column.field!)}
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors group"
            >
              {column.label}
              {renderSortIcon(column.field)}
            </button>
          ) : (
            <span className="text-gray-400 text-sm font-medium">{column.label}</span>
          )}
        </div>
      ))}
    </div>
  );
});

TableHeader.displayName = 'TableHeader';
