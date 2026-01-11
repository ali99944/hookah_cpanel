import { type ReactNode } from 'react';

export interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
  count?: number;
}

export interface NavGroup {
  title: string; // e.g. "Platform"
  items: NavItem[];
}