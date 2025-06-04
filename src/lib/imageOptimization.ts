// Image optimization utilities for Vietnamese travel website

export interface ImageOptimizationOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export interface ResponsiveImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  xl: number;
}

// Default responsive breakpoints for the travel website
export const DEFAULT_BREAKPOINTS: ResponsiveImageSizes = {
  mobile: 380,
  tablet: 768,
  desktop: 1024,
  xl: 1920,
};

// Generate optimized URL for external services (Unsplash, etc.)
export function generateOptimizedUrl(
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  const { quality = 75, width, height, format = 'webp', fit = 'cover' } = options;

  // Handle Unsplash URLs
  if (originalUrl.includes('unsplash.com')) {
    const url = new URL(originalUrl);
    
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fit', fit);
    
    // Set format for modern browsers
    if (format === 'webp') url.searchParams.set('fm', 'webp');
    if (format === 'avif') url.searchParams.set('fm', 'avif');
    
    // Add auto format parameter for better compatibility
    url.searchParams.set('auto', 'format');
    
    return url.toString();
  }

  // Handle other image services
  if (originalUrl.includes('cloudinary.com')) {
    // Add Cloudinary transformations
    const transformations = [];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push(`q_${quality}`);
    transformations.push(`f_${format}`);
    transformations.push(`c_${fit}`);
    
    return originalUrl.replace('/upload/', `/upload/${transformations.join(',')}/`);
  }

  // For other URLs, return as-is (will be handled by other optimization layers)
  return originalUrl;
}

// Generate srcSet for responsive images
export function generateSrcSet(
  baseUrl: string,
  sizes: ResponsiveImageSizes = DEFAULT_BREAKPOINTS,
  options: ImageOptimizationOptions = {}
): string {
  const srcSetEntries = Object.entries(sizes).map(([_, width]) => {
    const optimizedUrl = generateOptimizedUrl(baseUrl, {
      ...options,
      width,
    });
    return `${optimizedUrl} ${width}w`;
  });

  return srcSetEntries.join(', ');
}

// Generate sizes attribute for responsive images
export function generateSizesAttribute(
  sizes: Partial<ResponsiveImageSizes> = {}
): string {
  const defaultSizes = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
    xl: '25vw',
  };

  const finalSizes = { ...defaultSizes, ...sizes };
  
  return [
    `(max-width: 768px) ${finalSizes.mobile}`,
    `(max-width: 1024px) ${finalSizes.tablet}`,
    `(max-width: 1920px) ${finalSizes.desktop}`,
    finalSizes.xl,
  ].join(', ');
}

// Client-side image compression
export async function compressImage(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: string;
  } = {}
): Promise<Blob> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    format = 'image/jpeg',
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas toBlob failed'));
          }
        },
        format,
        quality
      );
    };

    img.onerror = () => reject(new Error('Image load failed'));
    img.src = URL.createObjectURL(file);
  });
}

// Convert base64 to blob (for optimizing localStorage images)
export function base64ToBlob(base64: string, mimeType: string = 'image/jpeg'): Blob {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

// Convert blob to base64
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Generate blur placeholder data URL
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = width;
  canvas.height = height;
  
  if (ctx) {
    // Create a simple gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export async function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(urls.map(preloadImage));
}

// Image format detection and support
export function supportsWebP(): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

export function supportsAVIF(): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

// Get optimal image format based on browser support
export function getOptimalFormat(): 'avif' | 'webp' | 'jpeg' {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}

// Calculate image aspect ratio
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

// Get image dimensions from URL
export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
}

// Image optimization presets for different use cases
export const IMAGE_PRESETS = {
  hero: {
    quality: 85,
    format: 'webp' as const,
    sizes: {
      mobile: 768,
      tablet: 1024,
      desktop: 1920,
      xl: 2560,
    },
  },
  card: {
    quality: 80,
    format: 'webp' as const,
    sizes: {
      mobile: 300,
      tablet: 400,
      desktop: 500,
      xl: 600,
    },
  },
  thumbnail: {
    quality: 75,
    format: 'webp' as const,
    sizes: {
      mobile: 150,
      tablet: 200,
      desktop: 250,
      xl: 300,
    },
  },
  gallery: {
    quality: 85,
    format: 'webp' as const,
    sizes: {
      mobile: 400,
      tablet: 600,
      desktop: 800,
      xl: 1200,
    },
  },
} as const;

// Apply preset to image URL
export function applyImagePreset(
  url: string,
  preset: keyof typeof IMAGE_PRESETS,
  size?: keyof ResponsiveImageSizes
): string {
  const presetConfig = IMAGE_PRESETS[preset];
  const width = size ? presetConfig.sizes[size] : presetConfig.sizes.desktop;
  
  return generateOptimizedUrl(url, {
    width,
    quality: presetConfig.quality,
    format: presetConfig.format,
  });
}
