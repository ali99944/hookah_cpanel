'use client';

import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked, onCheckedChange, label, disabled, className = '' }: SwitchProps) {
  return (
    <div className={`flex items-center gap-3 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={`
          relative w-11 h-6 shrink-0 cursor-pointer
          transition-colors duration-200 ease-in-out
          border border-transparent rounded-none
          ${checked ? 'bg-primary' : 'bg-secondary/10 hover:bg-secondary/15'}
          ${disabled ? 'cursor-not-allowed' : ''}
        `}
      >
        <span className="sr-only">Use setting</span>
        <motion.span
          animate={{ x: checked ? 4 : 22 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 25,
            mass: 0.8
          }}
          className={`
            pointer-events-none absolute top-1 left-0 block h-4 w-4 
            bg-white shadow-lg ring-0 rounded-none
          `}
        />
      </button>
      
      {label && (
        <span 
          onClick={() => !disabled && onCheckedChange(!checked)}
          className={`text-sm font-medium text-neutral-900 select-none ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
