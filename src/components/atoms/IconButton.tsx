/**
 * IconButton Atom Component
 * Reusable icon button with consistent styling and accessibility
 * 
 * @example
 * <IconButton icon={<Menu />} onClick={handleClick} ariaLabel="Open menu" />
 */

import React from 'react';

export interface IconButtonProps {
  /** Icon component to display */
  icon: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Accessible label for screen readers */
  ariaLabel: string;
  /** Visual variant of the button */
  variant?: 'default' | 'primary' | 'ghost';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Whether button is disabled */
  disabled?: boolean;
}

const variantStyles = {
  default: 'bg-black hover:bg-gray-900 border border-black',
  primary: 'bg-blue-600 hover:bg-blue-700 border border-blue-600',
  ghost: 'bg-transparent hover:bg-gray-800/50 border border-transparent',
};

const sizeStyles = {
  sm: 'w-7 h-7',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export const IconButton = React.memo<IconButtonProps>(({
  icon,
  onClick,
  ariaLabel,
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        rounded flex items-center justify-center
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {icon}
    </button>
  );
});

IconButton.displayName = 'IconButton';

