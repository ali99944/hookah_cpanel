import React from 'react';
import { Banknote, Clock, Package, ShoppingBag } from 'lucide-react';

import { StatCard } from '../../../components/ui/stat_card';
import type { DashboardMetrics } from '../types';

interface DashboardStatsProps {
  metrics: DashboardMetrics;
  isLoading: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ metrics, isLoading }) => {
  const pendingWork = metrics.order_by_status.pending + metrics.order_by_status.processing;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isLoading ? 'opacity-70' : ''}`}>
      <StatCard
        title="إجمالي المبيعات"
        value={`${Number(metrics.sales_revenue).toFixed(2)} ج.م`}
        icon={<Banknote size={20} />}
        trend={{
          value: `${metrics.order_by_status.delivered} طلب مكتمل`,
          isPositive: true,
          label: 'طلبات تم توصيلها',
        }}
      />

      <StatCard
        title="المنتجات النشطة"
        value={metrics.products_count}
        icon={<Package size={20} />}
        trend={{
          value: `${metrics.categories_count} قسم`,
          isPositive: undefined,
          label: 'عدد الأقسام المتاحة',
        }}
      />

      <StatCard
        title="إجمالي الطلبات"
        value={metrics.orders_count}
        icon={<ShoppingBag size={20} />}
        trend={{
          value: `${metrics.order_by_status.paid} مدفوع`,
          isPositive: true,
          label: 'طلبات تم دفعها',
        }}
      />

      <StatCard
        title="طلبات تحتاج متابعة"
        value={pendingWork}
        icon={<Clock size={20} />}
        trend={{
          value: `${metrics.order_by_status.cancelled} ملغي`,
          isPositive: false,
          label: 'تحتاج مراجعة فريق المبيعات',
        }}
      />
    </div>
  );
};
