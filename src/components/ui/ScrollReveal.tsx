import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // in pixels
  duration?: number; // in milliseconds
  delay?: number; // in milliseconds
  easing?: string;
  once?: boolean;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  direction = 'up', 
  distance = 50, 
  duration = 800, 
  delay = 0, 
  easing = 'cubic-bezier(0.5, 0, 0, 1)',
  once = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a delay so animations can be staggered
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          // If once is true, stop observing after it becomes visible
          if (once && domRef.current) {
            observer.unobserve(domRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [delay, once]);
  
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      case 'none': return 'none';
      default: return `translateY(${distance}px)`;
    }
  };

  return (
    <div 
      ref={domRef}
      className={`transition-all ${className}`}
      style={{
        transform: isVisible ? 'translate(0)' : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`,
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;