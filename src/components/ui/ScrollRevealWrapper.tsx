import React, { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface ScrollRevealWrapperProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  easing?: string;
  once?: boolean;
  className?: string;
}

const ScrollRevealWrapper: React.FC<ScrollRevealWrapperProps> = ({
  children,
  ...props
}) => {
  return (
    <ScrollReveal {...props}>
      {children}
    </ScrollReveal>
  );
};

export default ScrollRevealWrapper;