import React from 'react';

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
  return (
    <div
      className={`p-6 rounded-2xl border-l-4 ${id % 2 === 0 ? 'border-[#0093DE]' : 'border-[#64A86B]'} 
        transition-all duration-500 hover:-translate-y-1 hover:shadow-lg 
        ${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-700 shadow-md'}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.6s ease ${delay}ms, opacity 0.6s ease ${delay}ms`
      }}
    >
      <div className={`${id % 2 === 0 ? 'text-[#0093DE]' : 'text-[#64A86B]'} mb-4 text-4xl
        transition-transform duration-300 hover:scale-105`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2 transition-opacity duration-300">
        {title}
      </h3>
      
      <p className={`text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} 
        transition-opacity duration-300`}>
        {description}
      </p>
    </div>
  );
};

export default ValueCard;
