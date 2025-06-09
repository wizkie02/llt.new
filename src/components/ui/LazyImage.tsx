import React from 'react';
import TestImage from './TestImage';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  preset?: string;
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
}) => {
  // console.log('🔍 LazyImage rendering with src:', src);
  
  return (
    <TestImage
      src={src}
      alt={alt}
      className={className}
    />
  );
};

export default LazyImage;
