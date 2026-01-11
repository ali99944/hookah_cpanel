'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
export type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';
export type DropdownAlign = 'start' | 'end';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode; // Should be DropdownItem components
  
  // Placement Configuration
  position?: DropdownPosition;
  align?: DropdownAlign;

  // Styling
  width?: string;
  className?: string;
}

interface DropdownItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  label: string;
  danger?: boolean;
}

// --- MAIN COMPONENT ---

export function DropdownMenu({ 
  trigger, 
  children, 
  position = 'bottom', 
  align = 'start', // Defaulting to 'end' is common for meatball menus (aligns to right edge)
  width = 'min-w-40',
  className = '' 
}: DropdownMenuProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // --- STYLING LOGIC ---

  // 1. Position Classes (Where does it pop out relative to trigger?)
  const positionClasses: Record<DropdownPosition, string> = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  // 2. Alignment Classes (How does it align with the trigger's edge?)
  const alignmentClasses: Record<DropdownPosition, Record<DropdownAlign, string>> = {
    top: { start: 'left-0', end: 'right-0' },
    bottom: { start: 'left-0', end: 'right-0' },
    left: { start: 'top-0', end: 'bottom-0' },
    right: { start: 'top-0', end: 'bottom-0' },
  };

  // 3. Animation Variants (Directional sliding)
  const getAnimationVariants = () => {
    const distance = 8; // Subtle slide distance
    const hidden = { opacity: 0, scale: 0.95 };

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
    <div className={`relative inline-block text-start ${className}`} ref={containerRef}>
      
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
        {trigger}
      </div>

      {/* Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={animationInitial}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={animationInitial}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className={`
              absolute z-50 bg-white border border-neutral-200 
              rounded-none shadow-none flex flex-col
              ${width} 
              ${positionClasses[position]} 
              ${alignmentClasses[position][align]}
            `}
          >
            {/* Inner Padding Container */}
            <div className="p-1" onClick={() => setIsOpen(false)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB COMPONENT ---

export function DropdownItem({ onClick, icon, label, danger }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors text-start cursor-pointer font-medium
        ${danger 
          ? 'text-destructive hover:bg-destructive/10' 
          : 'text-secondary hover:bg-secondary/10 hover:text-neutral-900'}
      `}
    >
      {icon && (
        <span className={danger ? 'text-destructive' : 'text-secondary group-hover:text-secondary/80'}>
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}