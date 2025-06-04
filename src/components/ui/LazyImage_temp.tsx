import React from 'react';
import SimpleImage from './SimpleImage';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  preset?: string; // Temporarily simplified
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  priority = false,
}) => {
  return (
    <SimpleImage
      src={src}
      alt={alt}
      className={className}
      priority={priority}
    />
  );
};

export default LazyImage;
