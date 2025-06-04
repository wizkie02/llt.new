import React from 'react';

interface BasicImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Component đơn giản nhất để test loading ảnh
const BasicImage: React.FC<BasicImageProps> = ({ src, alt, className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onLoad={() => console.log('Image loaded:', src)}
      onError={(e) => console.error('Image failed to load:', src, e)}
    />
  );
};

export default BasicImage;
