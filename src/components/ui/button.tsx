'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline-danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'sm', isLoading, leftIcon, children, disabled, ...props }, ref) => {
    
    // Base Styles
    const baseStyles = "cursor-pointer inline-flex items-center justify-center font-medium transition-colors  disabled:opacity-50 disabled:cursor-not-allowed rounded-none";
    
    // Variants
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/85 ",
      secondary: "bg-secondary text-secondary-foreground  hover:bg-secondary/85",
      ghost: "bg-transparent text-secondary hover:text-secondary/85 hover:bg-secondary/15",
      danger: "bg-destructive text-white hover:bg-destructive/85 border border-transparent",
      'outline-danger': "bg-transparent text-destructive border border-destructive hover:bg-destructive/10 hover:border-destructive/50",
    };

    // Sizes
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-8 w-8 p-0", // Square for icon-only buttons
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles} 
          ${variants[variant]} 
          ${sizes[size]} 
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        ) : (
          leftIcon && <span className="ml-2">{leftIcon}</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";