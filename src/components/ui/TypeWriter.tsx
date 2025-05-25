import React, { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ 
  text, 
  speed = 40, // Reduced typing speed (higher number = slower typing)
  delay = 0,
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Don't start typing until visible
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only start typing when element is visible
        setIsTyping(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px 0px 0px" } // Standard threshold
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    // Start typing after delay
    const typingDelay = setTimeout(() => {
      if (displayedText.length < text.length) {
        // Type character by character for a more natural effect
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }
    }, speed);

    return () => clearTimeout(typingDelay);
  }, [displayedText, text, speed, isTyping]);
  return (
    <div ref={containerRef} className={className}>
      {displayedText}
      {displayedText.length < text.length && isTyping && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  );
};

export default TypeWriter;
