import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { Tooltip } from './tooltip';

// --- CONTAINER ---
interface TableActionsProps {
  children: React.ReactNode;
  className?: string;
}

export const TableActions: React.FC<TableActionsProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex items-center justify-end gap-1 ${className}`}>
      {children}
    </div>
  );
};

// --- INDIVIDUAL ACTION BUTTON ---
interface TableActionProps {
  onClick: (e: React.MouseEvent) => void;
  icon: LucideIcon;
  label: string;
  variant?: 'default' | 'success' | 'destructive';
  disabled?: boolean;
}

export const TableAction: React.FC<TableActionProps> = ({ 
  onClick, 
  icon: Icon, 
  label, 
  variant = 'default',
  disabled 
}) => {
  
  // Mapping variants to your CSS Variables via Tailwind classes
  const variantStyles = {
    default: `
      text-secondary 
      bg-secondary/15 
      hover:bg-secondary/20 
      border-secondary/50
    `,
    success: `
      text-success
      bg-[#d0fae5] 
      hover:bg-[#d0fae5]/80 
      border-success/50
    `,
    destructive: `
      text-destructive 
      bg-destructive/15 
      hover:bg-destructive/20 
      border-destructive/50
    `
  };

  return (
    <Tooltip content={label} side='top'>
        <button 
            onClick={(e) => {
                e.stopPropagation();
                if (!disabled) onClick(e);
            }}
            disabled={disabled}
            // title={label}
            className={`
                group w-7 h-7 flex items-center justify-center cursor-pointer
                border 
                transition-all duration-200 rounded-none
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variantStyles[variant]}
            `}
            >
            <Icon size={16} strokeWidth={2} />
        </button>
    </Tooltip>
  );
};