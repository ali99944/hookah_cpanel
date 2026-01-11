'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import Card from './card'; // Adjust import path as needed

// --- TYPES ---

interface StatTrend {
  value: string | number;
  label?: string;
  isPositive?: boolean; // true = green, false = red, undefined = neutral
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: StatTrend;
  className?: string;
}

// --- COMPONENT ---

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  className 
}: StatCardProps) {
  
  // Helper to determine trend colors and icon
  const getTrendStyles = (isPositive?: boolean) => {
    if (isPositive === true) {
      return {
        bg: 'bg-success/10',
        text: 'text-success',
        icon: <ArrowUpRight size={14} strokeWidth={2.5} />
      };
    }
    if (isPositive === false) {
      return {
        bg: 'bg-destructive/10',
        text: 'text-destructive',
        icon: <ArrowDownRight size={14} strokeWidth={2.5} />
      };
    }
    return {
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      icon: <Minus size={14} strokeWidth={2.5} />
    };
  };

  const trendStyles = trend ? getTrendStyles(trend.isPositive) : null;

  return (
    <Card className={`rounded-none shadow-none bg-white border-border flex flex-col justify-between gap-4  ${className || ''}`}>
      
      {/* Header: Icon & Title */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
            {title}
          </span>
          <h4 className="text-2xl font-bold text-neutral-900 tracking-tight">
            {value}
          </h4>
        </div>
        
        <div className="p-2 bg-primary border border-neutral-100 text-primary-foreground flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Footer: Trend Indicator */}
      {trend && trendStyles && (
        <div className="flex items-center gap-2 mt-auto">
          <div className={`
            flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider
            ${trendStyles.bg} ${trendStyles.text}
          `}>
            {trendStyles.icon}
            <span>{trend.value}</span>
          </div>
          
          {trend.label && (
            <span className="text-xs text-neutral-400 font-medium">
              {trend.label}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}

export default StatCard;