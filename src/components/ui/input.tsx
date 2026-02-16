'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;      // Left Icon
  rightIcon?: React.ReactNode; // Right Icon (e.g., eye for password)
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon, rightIcon, fullWidth = true, disabled, ...props }, ref) => {
    
    return (
      <div className={`${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
        
        {/* Label */}
        {label && (
          <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1.5 tracking-wide">
            {label}
          </label>
        )}

        <div className="relative group">
          {/* Left Icon Wrapper */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors pointer-events-none">
              {icon}
            </div>
          )}

          {/* Actual Input */}
          <input
            ref={ref}
            {...props}
            disabled={disabled}
            className={`
              w-full bg-white text-sm text-text-primary placeholder-neutral-400
              border transition-all duration-200 outline-none rounded-none
              disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
              ${icon ? 'pl-10' : 'pl-4'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              
              py-1.5
              ${error 
                ? 'border-2 border-destructive focus:border-destructive focus:outline-none' 
                : 'border-secondary/20 hover:border-secondary/30 focus:border-secondary focus:ring-0'}
            `}
          />

          {/* Right Icon Wrapper */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-1.5 text-xs text-destructive font-medium animate-in slide-in-from-top-1 fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";