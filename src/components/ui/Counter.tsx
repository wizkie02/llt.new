import React, { useState, useEffect } from 'react';

interface CounterProps {
  end: number;
  start?: number;
  duration?: number;
  shouldAnimate?: boolean;
}

const Counter: React.FC<CounterProps> = ({ 
  end, 
  start = 0, 
  duration = 2000,
  shouldAnimate = true
}) => {
  const [count, setCount] = useState(shouldAnimate ? start : end);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(end);
      return;
    }
    
    let startTime: number | null = null;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [end, start, duration, shouldAnimate]);

  return <>{count}</>;
};

export default Counter;
