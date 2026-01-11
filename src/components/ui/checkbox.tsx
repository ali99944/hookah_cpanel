'use client';

import React from 'react';
import { Check, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

// --- SINGLE CHECKBOX ---

interface CheckboxProps {
  checked: boolean | 'indeterminate';
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onCheckedChange, label, description, disabled }: CheckboxProps) {
  return (
    <div 
      className={`
        flex items-center gap-3 
        ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer group'}
      `}
      onClick={() => onCheckedChange(checked === 'indeterminate' ? true : !checked)}
    >
      {/* Box */}
      <button
        type="button"
        role="checkbox"
        aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
        className={`
          cursor-pointer shrink-0 w-5 h-5 border transition-colors flex items-center justify-center rounded-none
          ${checked 
            ? 'bg-primary text-primary-foreground border-primary' 
            : 'bg-white border-neutral-300 group-hover:border-neutral-400'}
        `}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: checked ? 1 : 0.5, opacity: checked ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        >
          {checked === 'indeterminate' && <Minus size={14} strokeWidth={3} />}
          {checked === true && <Check size={14} strokeWidth={3} />}
        </motion.div>
      </button>

      {/* Label & Description - Vertically Centered */}
      {(label || description) && (
        <div className="flex flex-col justify-center">
          {label && (
            <span className="text-sm font-medium text-neutral-900 leading-none select-none">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-neutral-500 mt-1 leading-snug select-none">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// --- CHECKBOX GROUP ---

interface CheckboxGroupProps {
  options: { label: string; value: string; description?: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

export function CheckboxGroup({ options, value, onChange, label }: CheckboxGroupProps) {
  
  const handleCheck = (optionValue: string, isChecked: boolean) => {
    if (isChecked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2 tracking-wide">
          {label}
        </label>
      )}
      <div className="space-y-4"> 
        {/* Added slightly more space between items for clarity */}
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            description={opt.description}
            checked={value.includes(opt.value)}
            onCheckedChange={(checked) => handleCheck(opt.value, checked)}
          />
        ))}
      </div>
    </div>
  );
}