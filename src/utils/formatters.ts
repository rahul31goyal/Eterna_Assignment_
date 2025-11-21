/**
 * Formatting utilities for numbers, currency, and percentages
 * Provides consistent display across the application
 */

/**
 * Format number to compact notation (K, M, B)
 */
export const formatCompactNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toFixed(0);
};

/**
 * Format number as currency with $ symbol
 */
export const formatCurrency = (num: number): string => {
  return `$${formatCompactNumber(num)}`;
};

/**
 * Format price with appropriate decimal places
 */
export const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  }
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  if (price < 100) {
    return `$${price.toFixed(2)}`;
  }
  return formatCurrency(price);
};

/**
 * Format percentage with + or - sign and color coding
 */
export const formatPercentage = (percent: number): string => {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
};

/**
 * Get color class for percentage change
 */
export const getPercentageColor = (percent: number): string => {
  if (percent > 0) return 'text-green-500';
  if (percent < 0) return 'text-red-500';
  return 'text-gray-400';
};

/**
 * Format transaction count
 */
export const formatTxns = (buys: number, sells: number): string => {
  return `${buys} / ${sells}`;
};
