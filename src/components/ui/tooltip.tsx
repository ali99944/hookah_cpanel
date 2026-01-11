'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
  delay?: number; // Delay in ms before showing
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  delay = 300,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  // Positioning logic
  const sideStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  // Animation variants (Small slide effect)
  const getSlideValues = () => {
    switch (side) {
      case 'top': return { y: 4 };
      case 'bottom': return { y: -4 };
      case 'left': return { x: 4 };
      case 'right': return { x: -4 };
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-fit h-fit"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, ...getSlideValues() }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, ...getSlideValues() }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`
              absolute z-50 whitespace-nowrap 
              bg-secondary text-secondary-foreground
              text-[10px] font-bold uppercase tracking-wide px-2 py-1 
              pointer-events-none border border-transparent rounded-none shadow-none
              ${sideStyles[side]} ${className}
            `}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};