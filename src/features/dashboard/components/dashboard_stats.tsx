// src/features/dashboard/components/dashboard_stats.tsx
import React from 'react';
import { StatCard } from '../../../components/ui/stat_card';
import { Banknote, Package, ShoppingBag, Clock } from 'lucide-react';

interface DashboardStatsProps {
  metrics?: {
    totalRevenue: number;
    activeProducts: number;
    totalOrders: number;
    pendingOrders: number;
  };
  isLoading: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ metrics, isLoading }) => {
  if (isLoading) return <div className="p-4 text-sm text-text-muted">جاري تحميل البيانات...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="إجمالي المبيعات" 
        value={`${metrics?.totalRevenue.toLocaleString()} ج.م`} 
        icon={<Banknote size={20} />}
        trend={{ value: "12%+", isPositive: true, label: "مقارنة بالأسبوع الماضي" }}
      />
      
      <StatCard 
        title="المنتجات النشطة" 
        value={metrics?.activeProducts || 0} 
        icon={<Package size={20} />}
        trend={{ value: "5 منتجات جديدة", isPositive: true, label: "تمت إضافتها مؤخراً" }}
      />
      
      <StatCard 
        title="إجمالي الطلبات" 
        value={metrics?.totalOrders || 0} 
        icon={<ShoppingBag size={20} />}
        trend={{ value: "8%", isPositive: true, label: "معدل الطلب" }}
      />

       <StatCard 
        title="طلبات قيد الانتظار" 
        value={metrics?.pendingOrders || 0} 
        icon={<Clock size={20} />}
        trend={{ value: "تحتاج مراجعة", isPositive: false, label: "إجراء فوري" }}
      />
    </div>
  );
};