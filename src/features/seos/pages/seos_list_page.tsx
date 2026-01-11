import React from 'react';
import { useSeoPages } from '../hooks/use_seo';
import { SeoListCard } from '../components/seo_list_card';

export const SeoListPage: React.FC = () => {
  const { data: pages = [], isLoading } = useSeoPages();

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">تحسين محركات البحث (SEO)</h1>
          <p className="text-sm text-text-muted">إدارة عناوين وأوصاف صفحات المتجر للظهور في جوجل.</p>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1,2,3].map(i => <div key={i} className="h-48 bg-card animate-pulse border border-border" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <SeoListCard key={page.key} page={page} />
          ))}
        </div>
      )}
    </div>
  );
};