/**
 * Color transition utilities for price changes
 * Provides smooth visual feedback for live price updates
 */

export type TransitionDirection = 'up' | 'down' | 'neutral';

/**
 * Get transition class based on price direction
 */
export const getPriceTransitionClass = (direction: TransitionDirection): string => {
  switch (direction) {
    case 'up':
      return 'price-flash-up';
    case 'down':
      return 'price-flash-down';
    default:
      return '';
  }
};

/**
 * Get background color for price change
 */
export const getPriceBackgroundColor = (direction: TransitionDirection): string => {
  switch (direction) {
    case 'up':
      return 'bg-green-500/10';
    case 'down':
      return 'bg-red-500/10';
    default:
      return '';
  }
};

/**
 * CSS class for smooth color transitions
 */
export const TRANSITION_CLASSES = 'transition-colors duration-300 ease-in-out';
