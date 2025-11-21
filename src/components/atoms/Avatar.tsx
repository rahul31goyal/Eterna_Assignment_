/**
 * Avatar atom component
 * Displays token images with fallback
 */

import React, { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
};

export const Avatar: React.FC<AvatarProps> = React.memo(({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const dimension = sizeMap[size];
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  // Create a fallback with first letter of symbol
  const fallbackLetter = alt.charAt(0).toUpperCase();

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-blue-600 flex items-center justify-center ${className}`}
      style={{ width: dimension, height: dimension, minWidth: dimension, minHeight: dimension }}
    >
      {!hasError && imgSrc ? (
        <Image
          src={imgSrc}
          alt={alt}
          width={dimension}
          height={dimension}
          className="object-cover"
          onError={handleError}
          unoptimized={imgSrc.startsWith('http')}
        />
      ) : (
        <span className="text-white font-bold" style={{ fontSize: dimension * 0.5 }}>
          {fallbackLetter}
        </span>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';
