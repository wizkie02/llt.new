import React, { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface RevealSectionProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
  wrapperClassName?: string;
  useContainer?: boolean;
}

const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  wrapperClassName = '',
  useContainer = true
}) => {
  const content = (
    <ScrollReveal 
      direction={direction} 
      delay={delay} 
      className={wrapperClassName}
    >
      <section className={className}>
        {children}
      </section>
    </ScrollReveal>
  );

  if (useContainer) {
    return (
      <div className="container mx-auto px-4">
        {content}
      </div>
    );
  }

  return content;
};

export default RevealSection;