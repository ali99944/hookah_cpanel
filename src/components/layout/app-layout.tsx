'use client';

import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { LayoutDashboard, BoxIcon, Settings, MessageCircleHeart, SearchIcon, FilesIcon } from 'lucide-react';
import type { NavGroup } from '../../types/navigation';
import { ProtectedLayout } from './protected-layout';
import { useMobileSidebar } from '../../core/hooks/use-layout';

const navs: NavGroup[] = [
  {
    title: "الرئيسية",
    items: [
      { label: "اللوحة", icon: <LayoutDashboard size={18}/>, path: "/" },
    ]
  },
  {
    title: "إدارة المحتوى",
    items: [
      { label: "الاقسام", icon: <BoxIcon size={18}/>, path: "/categories" },
      { label: "المنتجات", icon: <BoxIcon size={18}/>, path: "/products" },
      { label: "السياسات", icon: <FilesIcon size={18}/>, path: "/policies" },
    ]
  },
  {
    title: "المعاملات",
    items: [
      { label: "الطلبات", icon: <BoxIcon size={18}/>, path: "/orders" },
      { label: "رسائل التواصل", icon: <MessageCircleHeart size={18}/>, path: "/contact-requests" },
    ]
  },
  {
    title: "الإعدادات",
    items: [
      { label: "الاعدادات العامة", icon: <Settings size={18}/>, path: "/settings" },
      { label: "تحسين SEO", icon: <SearchIcon size={18}/>, path: "/seos" },
    ]
  }
];


export const AppLayout = () => {
  useMobileSidebar();
  return (
    <ProtectedLayout>
      <div className="flex w-full h-screen bg-background overflow-hidden font-sans selection:bg-primary/50 selection:text-black/80">
      


        {/* 2. SIDEBAR */}
        <Sidebar groups={navs} />

        {/* 3. MAIN CONTENT */}
        <main className="flex-1 flex flex-col relative z-10 min-w-0 bg-transparent">
          <Header />
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 scroll-smooth">
            {/* Outlet renders the child route content */}
            <Outlet />
          </div>
        </main>
        
      </div>
    </ProtectedLayout>
  );
};