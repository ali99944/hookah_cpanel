import React, { useMemo } from 'react';

import { DashboardStats } from '../components/dashboard_stats';
import { OrderStatusChart } from '../components/orders_status_chart';
import { RecentOrders } from '../components/recent_orders';
import { RevenueChart } from '../components/revenu_chart';
import { useDashboardMetrics } from '../hooks/use-dashboard';
import type { DashboardMetrics } from '../types';

const fallbackMetrics: DashboardMetrics = {
  orders_count: 0,
  sales_revenue: 0,
  categories_count: 0,
  products_count: 0,
  revenue_labels: ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'],
  revenue_per_day: [0, 0, 0, 0, 0, 0, 0],
  order_by_status: {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    paid: 0,
  },
  products_by_category: {},
};

export const DashboardPage: React.FC = () => {
  const { data: metrics, isLoading } = useDashboardMetrics();

  const viewMetrics = useMemo(() => {
    if (!metrics) return fallbackMetrics;

    const labels = metrics.revenue_labels?.length ? metrics.revenue_labels : fallbackMetrics.revenue_labels;
    const values = metrics.revenue_per_day?.length ? metrics.revenue_per_day : fallbackMetrics.revenue_per_day;

    return {
      ...fallbackMetrics,
      ...metrics,
      revenue_labels: labels,
      revenue_per_day: values,
      order_by_status: {
        ...fallbackMetrics.order_by_status,
        ...metrics.order_by_status,
      },
    };
  }, [metrics]);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">لوحة التحكم</h1>
          <p className="text-sm text-text-muted">متابعة أداء المتجر والمبيعات والطلبات في مكان واحد.</p>
        </div>
      </div>

      <DashboardStats metrics={viewMetrics} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full">
          <RevenueChart
            data={viewMetrics.revenue_per_day}
            labels={viewMetrics.revenue_labels}
          />
        </div>

        <div className="lg:col-span-1 h-full">
          <OrderStatusChart
            pending={viewMetrics.order_by_status.pending}
            processing={viewMetrics.order_by_status.processing}
            shipped={viewMetrics.order_by_status.shipped}
            delivered={viewMetrics.order_by_status.delivered}
            cancelled={viewMetrics.order_by_status.cancelled}
            paid={viewMetrics.order_by_status.paid}
          />
        </div>
      </div>

      <div className="pb-10">
        <RecentOrders />
      </div>
    </div>
  );
};
