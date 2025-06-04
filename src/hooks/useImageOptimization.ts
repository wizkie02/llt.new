import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyImageOptions {
  threshold?: number;
  rootMargin?: string;
  priority?: boolean;
}

interface UseLazyImageReturn {
  imgRef: React.RefObject<HTMLImageElement>;
  isLoading: boolean;
  isError: boolean;
  isInView: boolean;
  handleLoad: () => void;
  handleError: () => void;
  shouldLoad: boolean;
}

export function useLazyImage(options: UseLazyImageOptions = {}): UseLazyImageReturn {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    priority = false
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  const shouldLoad = isInView || priority;

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setIsError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setIsError(true);
  }, []);

  useEffect(() => {
    if (priority || isInView) return;

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
        threshold,
        rootMargin,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [priority, isInView, threshold, rootMargin]);

  return {
    imgRef,
    isLoading,
    isError,
    isInView,
    handleLoad,
    handleError,
    shouldLoad,
  };
}

// Hook for managing image preloading
export function useImagePreload(src: string, priority: boolean = false) {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    if (!priority) return;

    const img = new Image();
    img.onload = () => setIsPreloaded(true);
    img.onerror = () => setIsPreloaded(false);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority]);

  return isPreloaded;
}

// Hook for generating optimized image URLs
export function useOptimizedImageUrl(
  src: string, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
  } = {}
) {
  const { width, height, quality = 75, format = 'auto' } = options;

  return useCallback((requestedFormat?: 'webp' | 'avif') => {
    // Handle Unsplash URLs
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('fit', 'crop');
      
      const targetFormat = requestedFormat || format;
      if (targetFormat === 'webp') url.searchParams.set('fm', 'webp');
      if (targetFormat === 'avif') url.searchParams.set('fm', 'avif');
      
      return url.toString();
    }

    // For other external URLs, try to append query parameters
    if (src.startsWith('http')) {
      try {
        const url = new URL(src);
        if (width) url.searchParams.set('w', width.toString());
        if (height) url.searchParams.set('h', height.toString());
        return url.toString();
      } catch {
        return src;
      }
    }

    // For local images, return as-is (we'll handle optimization server-side later)
    return src;
  }, [src, width, height, quality, format]);
}

// Hook for progressive image loading with blur effect
export function useProgressiveImage(src: string, placeholder?: string) {
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [src]);

  return {
    src: currentSrc,
    isLoaded,
  };
}

// Hook for image retry logic
export function useImageRetry(src: string, maxRetries: number = 3) {
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const retry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setIsError(false);
      // Add timestamp to bypass cache
      const separator = src.includes('?') ? '&' : '?';
      setCurrentSrc(`${src}${separator}_retry=${Date.now()}`);
    } else {
      setIsError(true);
    }
  }, [src, retryCount, maxRetries]);

  const handleError = useCallback(() => {
    retry();
  }, [retry]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setCurrentSrc(src);
    setIsError(false);
  }, [src]);

  return {
    src: currentSrc,
    retryCount,
    isError: isError && retryCount >= maxRetries,
    canRetry: retryCount < maxRetries,
    handleError,
    retry,
    reset,
  };
}
