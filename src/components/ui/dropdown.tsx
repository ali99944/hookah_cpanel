'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
export type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';
export type DropdownAlign = 'start' | 'end';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  
  // Placement Configuration
  position?: DropdownPosition;
  align?: DropdownAlign;
  
  // Styling
  width?: string;
  className?: string;
  
  // Controlled State
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// --- COMPONENT ---
export function Dropdown({ 
  trigger, 
  children, 
  position = 'bottom', 
  align = 'start', 
  width = 'w-56',
  className = '',
  isOpen: controlledIsOpen,
  onOpenChange
}: DropdownProps) {
  
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const show = isControlled ? controlledIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    const newState = !show;
    if (isControlled) {
      onOpenChange?.(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  const handleClose = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalIsOpen(false);
    }
  }, [isControlled, onOpenChange]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show, handleClose]);


  // --- STYLING LOGIC ---

  // 1. Position Classes (Where does it pop out?)
  const positionClasses: Record<DropdownPosition, string> = {
    top: 'bottom-full mb-2',     // Pushes up
    bottom: 'top-full mt-2',     // Pushes down
    left: 'right-full mr-2',     // Pushes left
    right: 'left-full ml-2',     // Pushes right
  };

  // 2. Alignment Classes (How does it align with the edge?)
  const alignmentClasses: Record<DropdownPosition, Record<DropdownAlign, string>> = {
    top: { start: 'left-0', end: 'right-0' },
    bottom: { start: 'left-0', end: 'right-0' },
    left: { start: 'top-0', end: 'bottom-0' },
    right: { start: 'top-0', end: 'bottom-0' },
  };

  // 3. Animation Variants (Directional sliding)
  const getAnimationVariants = () => {
    const distance = 10;
    
    // Initial / Exit states
    const hidden = { opacity: 0, scale: 0.95 };
    
    // Determine the slide direction based on position
    switch (position) {
      case 'top': return { ...hidden, y: distance };    // Slide Up
      case 'bottom': return { ...hidden, y: -distance }; // Slide Down
      case 'left': return { ...hidden, x: distance };    // Slide Left
      case 'right': return { ...hidden, x: -distance };  // Slide Right
      default: return hidden;
    }
  };

  const animationInitial = getAnimationVariants();

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      {/* Trigger */}
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown Content */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={animationInitial}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={animationInitial}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`
              absolute z-50 bg-white border border-neutral-200 
              rounded-none shadow-none flex flex-col overflow-hidden
              ${width} 
              ${positionClasses[position]} 
              ${alignmentClasses[position][align]}
            `}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}