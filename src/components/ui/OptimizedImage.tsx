import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  onLoad,
  onError,
  fallbackSrc,  loading = 'lazy',
  objectFit = 'cover',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState(src); // Always set the src initially
  const imgRef = useRef<HTMLImageElement>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // Generate optimized URLs for different formats
  const generateOptimizedSrc = useCallback((originalSrc: string, format?: 'webp' | 'avif') => {
    // Check if it's an external URL (Unsplash, etc.)
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('fit', 'crop');
      if (format === 'webp') url.searchParams.set('fm', 'webp');
      if (format === 'avif') url.searchParams.set('fm', 'avif');
      return url.toString();
    }
    
    // For local images, we'll handle format conversion later
    return originalSrc;
  }, [width, height, quality]);
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setIsError(false);
    setRetryCount(0);
    onLoad?.();
  }, [onLoad]);

  // Handle image error with retry logic
  const handleError = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      // Add a small delay before retry
      setTimeout(() => {
        setCurrentSrc(generateOptimizedSrc(src));
      }, 1000 * (retryCount + 1));
    } else {
      setIsError(true);
      setIsLoading(false);
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setIsError(false);
      } else {
        onError?.();
      }
    }
  }, [retryCount, maxRetries, src, fallbackSrc, onError, generateOptimizedSrc]);

  // Generate blur data URL if not provided
  const defaultBlurDataURL = blurDataURL || 
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';

  // Create srcSet for responsive images
  const createSrcSet = useCallback(() => {
    if (!width) return undefined;
    
    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map(multiplier => {
        const scaledWidth = Math.round(width * multiplier);
        const optimizedSrc = generateOptimizedSrc(src);
        return `${optimizedSrc} ${scaledWidth}w`;
      })
      .join(', ');
  }, [src, width, generateOptimizedSrc]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {placeholder === 'blur' && isLoading && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${defaultBlurDataURL})`,
          }}
        />
      )}

      {/* Loading skeleton */}
      {isLoading && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Main image with multiple format support */}
      {(isInView || priority) && (
        <picture>
          {/* AVIF format */}
          <source
            srcSet={generateOptimizedSrc(currentSrc, 'avif')}
            type="image/avif"
          />
          {/* WebP format */}
          <source
            srcSet={generateOptimizedSrc(currentSrc, 'webp')}
            type="image/webp"
          />
          {/* Fallback image */}
          <img
            ref={imgRef}
            src={currentSrc}
            srcSet={createSrcSet()}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full transition-opacity duration-300',
              objectFit === 'cover' && 'object-cover',
              objectFit === 'contain' && 'object-contain',
              objectFit === 'fill' && 'object-fill',
              objectFit === 'none' && 'object-none',
              objectFit === 'scale-down' && 'object-scale-down',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            style={{
              aspectRatio: width && height ? `${width}/${height}` : undefined,
            }}
          />
        </picture>
      )}

      {/* Error state */}
      {isError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Không thể tải ảnh</p>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
