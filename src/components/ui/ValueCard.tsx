import React, { useState, useEffect } from 'react';
import IconPulse from './IconPulse';

interface ValueCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isVisible: boolean;
  delay: number;
  theme: 'light' | 'dark';
}

const ValueCard: React.FC<ValueCardProps> = ({ 
  id, 
  title, 
  description, 
  icon, 
  isVisible,
  delay,
  theme
}) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  
  // Staggered animation timing
  useEffect(() => {
    if (isVisible) {
      // Stagger animations with slight delays
      const titleTimer = setTimeout(() => {
        setShowTitle(true);
      }, delay + 200); // Title appears first
      
      const descTimer = setTimeout(() => {
        setShowDescription(true);
      }, delay + 500); // Description appears last
      
      return () => {
        clearTimeout(titleTimer);
        clearTimeout(descTimer);
      };
    } else {
      // Reset when not visible
      setShowTitle(false);
      setShowDescription(false);
    }
  }, [isVisible, delay]);
  
  return (
    <div
      className={`p-6 rounded-2xl border-l-4 ${id % 2 === 0 ? 'border-[#0093DE]' : 'border-[#64A86B]'} 
        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
        ${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-700 shadow-md'}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.7s ease ${delay}ms, opacity 0.7s ease ${delay}ms`
      }}
    >
      <div className={`${id % 2 === 0 ? 'text-[#0093DE]' : 'text-[#64A86B]'} mb-4`}>
        <IconPulse 
          isVisible={isVisible} 
          delay={delay} 
          pulseColor={id % 2 === 0 ? '#0093DE' : '#64A86B'}
        >
          {icon}
        </IconPulse>
      </div>
      
      <h3 
        className="text-xl font-bold mb-2"
        style={{
          transform: showTitle ? 'translateY(0)' : 'translateY(20px)',
          opacity: showTitle ? 1 : 0,
          transition: 'transform 0.5s ease, opacity 0.5s ease'
        }}
      >
        {title}
      </h3>      <p 
        className={`text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
        style={{
          transform: showDescription ? 'translateY(0)' : 'translateY(20px)',
          opacity: showDescription ? 1 : 0,
          transition: 'transform 0.5s ease, opacity 0.5s ease'
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default ValueCard;
