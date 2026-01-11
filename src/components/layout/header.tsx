'use client';

import React from 'react';
import { PanelLeft, ChevronRight, PanelLeftOpen, PanelRightOpen, LogOutIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLayoutStore } from '../../core/hooks/use-layout';
import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Dropdown } from '../ui/dropdown';

export const Header: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();
  const location = useLocation();

  // Simple logic to display current path segment as title
  const currentPath = location.pathname.split('/').filter(Boolean).pop() || 'Dashboard';

  return (
    <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-border  bg-white/60 backdrop-blur-md shrink-0 z-10">
      
      {/* Left: Sidebar Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className={`
            p-2 transition-all duration-300 cursor-pointer
            ${!isSidebarOpen 
              ? 'text-primary bg-primary/10' 
              : 'text-text-muted hover:text-neutral-600 hover:bg-primary/10'
            }
          `}
        >
          { isSidebarOpen ? <PanelLeftOpen size={20} /> : <PanelRightOpen size={20} /> }
        </button>

        <div className="h-4 w-px bg-black/20 hidden md:block" />

        <div className="hidden md:flex items-center gap-2 text-sm text-neutral-500">
          <span className="hover:text-black/40 cursor-pointer transition-colors">لوحة التحكم</span>
          <ChevronRight size={14} />
          <span className=" font-medium capitalize">{currentPath}</span>
        </div>
      </div>

      <div className="flex gap-2">
          <Button variant="danger" size="sm" leftIcon={<LogOutIcon size={14}/>}>
            تسجيل الخروج
          </Button>
        </div>

      {/* Right: Global Actions */}
      {/* <div className="flex items-center gap-3">
        <Input 
          type="text" 
          placeholder="Search..."
          icon={<Search size={16} />} 
          className=" bg-secondary/10"
        />
        <Dropdown
          position='bottom'
          align='end'
          width="w-80"
          trigger={
            <button className="relative p-2 text-secondary hover:text-neutral-900 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border border-white"></span>
              </span>
            </button>
          }
        >
          <div className="flex flex-col max-h-100">
            <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-secondary/10">
              <h4 className="font-semibold text-sm text-secondary">Notifications</h4>
              <span className="text-[10px] bg-secondary px-2 py-1 text-secondary-foreground font-medium">3 New</span>
            </div>
            
            <div className="overflow-y-auto">
              <div className="p-4 border-b border-border hover:bg-secondary/5 transition-colors cursor-pointer flex gap-3">
                <div className="mt-1 text-emerald-500"><CheckCircle2 size={16} /></div>
                <div>
                  <p className="text-sm text-neutral-800 font-medium">Export Completed</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Your data export is ready for download.</p>
                  <p className="text-[10px] text-neutral-400 mt-2">2 min ago</p>
                </div>
              </div>

              <div className="p-4 border-b border-border hover:bg-secondary/5 transition-colors cursor-pointer flex gap-3">
                 <div className="mt-1 text-amber-500"><Clock size={16} /></div>
                 <div>
                  <p className="text-sm text-neutral-800 font-medium">Scheduled Maintenance</p>
                  <p className="text-xs text-neutral-500 mt-0.5">System update scheduled for tonight.</p>
                  <p className="text-[10px] text-neutral-400 mt-2">1 hour ago</p>
                </div>
              </div>
            </div>

            <button className="p-3 cursor-pointer text-xs font-medium text-center text-secondary hover:text-neutral-900 hover:bg-secondary/5 border-t border-border transition-colors">
              Mark all as read
            </button>
          </div>
        </Dropdown>
      </div> */}
    </header>
  );
};