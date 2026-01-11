'use client';

import React, { useState, useEffect, useEffectEvent } from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { NavGroup } from '../../types/navigation';
import { User, Settings, LogOut, ChevronsUpDown } from 'lucide-react';
import { Dropdown } from '../ui/dropdown';
import { useLogout, useValidateSession } from '../../features/auth/hooks/use-auth';
import { useLayoutStore } from '../../core/hooks/use-layout';
import { getAuthToken } from '../../core/lib/auth';

interface SidebarProps {
  groups: NavGroup[];
}

export const Sidebar: React.FC<SidebarProps> = ({ groups }) => {
  const { isSidebarOpen } = useLayoutStore();
  const location = useLocation();
  
  // State to control overflow behavior
  const [allowOverflow, setAllowOverflow] = useState(false);
  const logout = useLogout()
  const { data: manager, isFetching: is_manager_loading } = useValidateSession(getAuthToken())

  const setAllowOverflowEvent = useEffectEvent(setAllowOverflow);

  useEffect(() => {
    if (!isSidebarOpen) {
      setAllowOverflowEvent(false);
    }
  }, [isSidebarOpen]);

  const _handleLogout = () => {
    logout()
  }

  // Get manager initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isSidebarOpen ? 280 : 0, 
        opacity: isSidebarOpen ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      // Only allow overflow when the OPEN animation is fully complete
      onAnimationComplete={() => {
        if (isSidebarOpen) setAllowOverflow(true);
      }}
      className={`
        relative z-20 h-full flex flex-col border-l border-border bg-white shrink-0
        ${allowOverflow ? 'overflow-visible' : 'overflow-hidden'}
      `}
    >
      {/* 
         CRITICAL: This inner wrapper enforces a fixed width.
         Even if the parent 'aside' shrinks to width 0, this stays 280px.
         Combined with overflow-hidden on the parent during animation, 
         this creates the slide effect without text wrapping.
      */}
      <div className="w-70 h-full flex flex-col border-l border-border">
        
        {/* Brand */}
        <div className="h-16 flex items-center px-6 gap-3 shrink-0 border-b  border-border">
          <div className="w-6 h-6 bg-linear-to-br from-primary to-primary/80 flex items-center justify-center font-bold">
            <div className="w-2.5 h-2.5 bg-white" />
          </div>
          <span className="font-bold tracking-tight text-primary uppercase text-lg">
            لوحة تحكم نوبل
          </span>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto border-border">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-1">
              {group.title && (
                <div className={`px-3 mb-2 ${groupIndex !== 0 ? 'mt-6' : 'mt-1'}`}>
                  <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none">
                    {group.title}
                  </h3>
                </div>
              )}
              {group.items.map((item, itemIndex) => {
                const isActive = location.pathname.toLowerCase() === item.path.toLowerCase();
                return (
                  <NavLink
                    key={itemIndex}
                    to={item.path}
                    className={({ isActive }) => `
                      w-full flex items-center gap-3 px-3 py-2 transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-neutral-500 hover:text-neutral-600 hover:bg-black/5'
                      }
                    `}
                  >
                    <span className={
                      `flex justify-between text-sm font-medium uppercase flex-1 text-start ${isActive ? 'font-bold!' : ''}`
                    }>
                      {item.label}
                    {item.count && (
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-1 group-hover:bg-primary/20 transition-colors">
                        {item.count}
                      </span>
                    )}
                    </span>
                    <div className={`relative z-10 transition-transform group-hover:scale-105 ${isActive ? 'text-primary' : ''}`}>
                      {item.icon}
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav-border" 
                        className="absolute right-0 top-0 bottom-0 w-0.5 bg-primary" 
                      />
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>
          
        {/* User Profile */}
        <div className="p-3 border-t border-border shrink-0 w-full">
          {is_manager_loading ? (
            // Skeleton Loader
            <div className="w-64 flex items-center gap-3 p-2 animate-pulse">
              <div className="w-9 h-9 bg-neutral-200 rounded shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 bg-neutral-200 rounded w-3/4" />
                <div className="h-3 bg-neutral-200 rounded w-1/2" />
              </div>
              <div className="w-4 h-4 bg-neutral-200 rounded shrink-0" />
            </div>
          ) : (
            <Dropdown
              align='end'
              position='left'
              width="w-60"
              trigger={
                <div className="w-64 flex items-center justify-between gap-3 p-2 hover:bg-secondary/10 transition-all select-none group cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <div className="w-9 h-9 bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      {manager?.name ? getInitials(manager.name) : 'HN'}
                    </div>
                    <div className="flex flex-col items-start truncate">
                      <span className="text-sm font-bold text-neutral-900 truncate w-full text-start">
                        {manager?.name || 'ادمن نوبل'}
                      </span>
                      <span className="text-xs text-neutral-500 truncate w-full text-start">
                        {manager?.email || 'admin@novel.com'}
                      </span>
                    </div>
                  </div>
                  <ChevronsUpDown size={14} className="text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0"/>
                </div>
              }
            >
              <div className="p-1">
                <div className="px-2 py-3 border-b border-border mb-1">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">تم تسجيل الدخول باسم</p>
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {manager?.email || 'admin@nobel.com'}
                  </p>
                </div>

                <Link to={'/settings'}>
                  <button className="cursor-pointer w-full text-start px-2 py-2 text-sm text-secondary hover:bg-secondary/10 hover:text-neutral-900 flex items-center gap-2">
                    <Settings size={16} /> تعديل البيانات
                  </button>
                </Link>
                <Link to={'/settings'}>
                  <button className="cursor-pointer w-full text-start px-2 py-2 text-sm text-secondary hover:bg-secondary/10 hover:text-neutral-900 flex items-center gap-2">
                    <Settings size={16} /> تغيير كلمة المرور
                  </button>
                </Link>
                
                <div className="h-px bg-border my-1" />
                
                <button onClick={_handleLogout} className="cursor-pointer w-full text-start px-2 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2">
                  <LogOut size={16} /> تسجيل الخروج
                </button> 
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </motion.aside>
  );
};