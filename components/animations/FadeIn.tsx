import React, { useRef } from 'react';
import { motion, useInView, UseInViewOptions } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  fullWidth?: boolean;
  viewport?: UseInViewOptions;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
  fullWidth = false,
  viewport = { once: true, margin: "-10%" }
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);

  const getHiddenVariant = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 40 };
      case 'down': return { opacity: 0, y: -40 };
      case 'left': return { opacity: 0, x: 40 };
      case 'right': return { opacity: 0, x: -40 };
      case 'none': return { opacity: 0, scale: 0.95 };
      default: return { opacity: 0, y: 0 };
    }
  };

  const getVisibleVariant = () => {
    switch (direction) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 };
      case 'left':
      case 'right': return { opacity: 1, x: 0 };
      case 'none': return { opacity: 1, scale: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getHiddenVariant()}
      animate={isInView ? getVisibleVariant() : getHiddenVariant()}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut"
      }}
      className={className}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  );
};
