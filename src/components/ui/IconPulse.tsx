import React, { useState, useEffect, ReactNode } from 'react';

interface IconPulseProps {
  children: ReactNode;
  isVisible: boolean;
  delay?: number;
  pulseColor?: string;
}

const IconPulse: React.FC<IconPulseProps> = ({ 
  children, 
  isVisible,
  delay = 0,
  pulseColor = '#0093DE'
}) => {
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsPulsing(true);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      setIsPulsing(false);
    }
  }, [isVisible, delay]);
  
  return (
    <div className="relative">
      {isPulsing && (
        <div 
          className="absolute inset-0 rounded-full animate-ping"
          style={{ 
            backgroundColor: pulseColor,
            opacity: 0.2,
            animationDuration: '2s',
            animationIterationCount: 3
          }}
        />
      )}
      <div 
        className={`transition-transform duration-700 ${isPulsing ? 'scale-110' : 'scale-100'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default IconPulse;
