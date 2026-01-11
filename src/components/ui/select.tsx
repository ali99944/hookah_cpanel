'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Select({ label, placeholder = "Select option", options, value, onChange, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className || ''}`} ref={containerRef}>
      {label && <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1.5">{label}</label>}
      
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-2 cursor-pointer 
          bg-white border text-sm font-medium text-start transition-all rounded-none
          ${isOpen ? 'border-neutral-300 ring-0' : 'border-neutral-200 hover:border-neutral-300'}
          ${!value ? 'text-neutral-400' : 'text-neutral-900'}
        `}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <ChevronDown 
          size={16} 
          className={`text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-40 w-full mt-1 bg-white border border-border max-h-60 overflow-y-auto rounded-none shadow"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    cursor-pointer w-full flex items-center justify-between px-4 py-2 text-sm text-start transition-colors
                    ${value === option.value ? 'bg-primary text-white font-medium' : 'text-secondary hover:bg-secondary/10 hover:text-neutral-900'}
                  `}
                >
                  {option.label}
                  {value === option.value && <Check size={14} className="text-secondary-foreground" />}
                </button>
              </li>
            ))}
            {options.length === 0 && (
              <li className="px-4 py-3 text-sm text-neutral-400 text-center italic">No options available</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}