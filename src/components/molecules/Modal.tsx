/**
 * Modal molecule component
 * Accessible modal dialog using Radix UI
 */

'use client';

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export const Modal: React.FC<ModalProps> = React.memo(({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = 'md',
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0" />
        <DialogPrimitive.Content
          className={`
            fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]
            w-full ${sizeClasses[size]} rounded-lg border border-gray-700 bg-[#1a1a1a] p-6 shadow-lg
            animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          `}
        >
          {title && (
            <DialogPrimitive.Title className="text-xl font-semibold text-white mb-2">
              {title}
            </DialogPrimitive.Title>
          )}
          <DialogPrimitive.Description className={description ? "text-sm text-gray-400 mb-4" : "sr-only"}>
            {description || "Dialog content"}
          </DialogPrimitive.Description>
          <div className="mt-4">{children}</div>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <X className="h-4 w-4 text-gray-400" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

Modal.displayName = 'Modal';
