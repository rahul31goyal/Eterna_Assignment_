/**
 * Popover molecule component
 * Accessible popover using Radix UI
 */

'use client';

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = React.memo(({
  children,
  content,
  side = 'bottom',
  align = 'start',
  open,
  onOpenChange,
}) => {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={5}
          className="
            z-50 w-72 rounded-lg border border-gray-700 bg-gray-900 p-4 shadow-xl
            animate-in fade-in-0 zoom-in-95
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          "
        >
          {content}
          <PopoverPrimitive.Arrow className="fill-gray-700" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});

Popover.displayName = 'Popover';
