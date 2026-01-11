'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface CollapsibleProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({ title, description, children, defaultOpen = false, className = '' }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`w-full ${className}`}>
      {/* 1. THE CARD (Header) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="
          group w-full flex items-center justify-between p-3 
          bg-secondary/10 hover:border-neutral-300 
          cursor-pointer transition-colors select-none
        "
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-neutral-900 uppercase tracking-wide">
            {title}
          </span>
          {description && (
            <span className="text-xs text-neutral-500">
              {description}
            </span>
          )}
        </div>

        {/* Custom Checkbox as Toggle */}
        <div className={`
          w-5 h-5 border flex items-center justify-center transition-colors
          ${isOpen 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-white border-neutral-300 text-transparent'}
        `}>
          <Check size={14} strokeWidth={3} />
        </div>
      </div>

      {/* 2. THE CONTENT (Under the card) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {/* Inner container with padding/border to visually separate content */}
            <div>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}