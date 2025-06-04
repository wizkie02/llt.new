import React, { useState } from 'react';

interface TestImageProps {
  src: string;
  alt: string;
  className?: string;
}

const TestImage: React.FC<TestImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    console.log('✅ Image loaded successfully:', src);
    setIsLoaded(true);
    setIsLoading(false);
    setIsError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('❌ Image failed to load:', src, e);
    setIsError(true);
    setIsLoading(false);
    setIsLoaded(false);
  };

  const handleLoadStart = () => {
    console.log('⏳ Image load started:', src);
    setIsLoading(true);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="text-gray-500 text-sm">Loading...</div>
        </div>
      )}
      
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        onLoadStart={handleLoadStart}
        style={{ display: isError ? 'none' : 'block' }}
      />
    </div>
  );
};

export default TestImage;
