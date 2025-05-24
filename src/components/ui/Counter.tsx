import React, { useState, useEffect } from 'react';

interface CounterProps {
  end: number;
  start?: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, start = 0, duration = 2000 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
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
  }, [end, start, duration]);

  return <>{count}</>;
};

export default Counter;
