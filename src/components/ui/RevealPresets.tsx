import React, { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface RevealPresetProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export const FadeIn: React.FC<RevealPresetProps> = ({
  children,
  delay = 0,
  duration = 800,
  once = true,
  className = ""
}) => (
  <ScrollReveal 
    direction="none" 
    distance={0} 
    delay={delay} 
    duration={duration} 
    once={once}
    className={className}
  >
    {children}
  </ScrollReveal>
);

export const FadeUp: React.FC<RevealPresetProps> = ({
  children,
  delay = 0,
  duration = 800,
  once = true,
  className = ""
}) => (
  <ScrollReveal 
    direction="up" 
    distance={50} 
    delay={delay} 
    duration={duration} 
    once={once}
    className={className}
  >
    {children}
  </ScrollReveal>
);

export const FadeDown: React.FC<RevealPresetProps> = ({
  children,
  delay = 0,
  duration = 800,
  once = true,
  className = ""
}) => (
  <ScrollReveal 
    direction="down" 
    distance={50} 
    delay={delay} 
    duration={duration} 
    once={once}
    className={className}
  >
    {children}
  </ScrollReveal>
);

export const FadeLeft: React.FC<RevealPresetProps> = ({
  children,
  delay = 0,
  duration = 800,
  once = true,
  className = ""
}) => (
  <ScrollReveal 
    direction="left" 
    distance={50} 
    delay={delay} 
    duration={duration} 
    once={once}
    className={className}
  >
    {children}
  </ScrollReveal>
);

export const FadeRight: React.FC<RevealPresetProps> = ({
  children,
  delay = 0,
  duration = 800,
  once = true,
  className = ""
}) => (
  <ScrollReveal 
    direction="right" 
    distance={50} 
    delay={delay} 
    duration={duration} 
    once={once}
    className={className}
  >
    {children}
  </ScrollReveal>
);

// For staggered animations (items appearing one after another)
export const StaggeredFade: React.FC<{
  children: ReactNode[];
  baseDelay?: number;
  delayIncrement?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}> = ({
  children,
  baseDelay = 0,
  delayIncrement = 100,
  direction = 'up',
  distance = 50,
  duration = 800,
  once = true,
  className = ""
}) => (
  <>
    {React.Children.map(children, (child, index) => (
      <ScrollReveal
        direction={direction}
        distance={distance}
        delay={baseDelay + (index * delayIncrement)}
        duration={duration}
        once={once}
        className={className}
      >
        {child}
      </ScrollReveal>
    ))}
  </>
);