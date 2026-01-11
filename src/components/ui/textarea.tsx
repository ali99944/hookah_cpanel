'use client';

import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', label, error, helperText, disabled, ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {/* Label */}
        {label && (
          <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1.5 tracking-wide">
            {label}
          </label>
        )}

        {/* Text Area */}
        <textarea
          ref={ref}
          disabled={disabled}
          className={`
            w-full bg-white text-sm text-neutral-900 placeholder-neutral-400
            border transition-all duration-200 outline-none rounded-none px-4 py-3 min-h-[100px]
            disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed resize-y
            ${error 
              ? 'border-destructive focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20' 
              : 'border-neutral-200 hover:border-neutral-300 focus:border-neutral-900 focus:ring-0'}
          `}
          {...props}
        />

        {/* Helper Text or Error */}
        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 font-medium animate-in slide-in-from-top-1 fade-in">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-neutral-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";