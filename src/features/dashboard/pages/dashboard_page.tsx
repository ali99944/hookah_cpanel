// src/features/dashboard/pages/dashboard_page.tsx
import React from 'react';
import { DashboardStats } from '../components/dashboard_stats';
import { RecentOrders } from '../components/recent_orders';
import { useDashboardMetrics } from '../hooks/use-dashboard';
import { RevenueChart } from '../components/revenu_chart';
import { OrderStatusChart } from '../components/orders_status_chart';

export const DashboardPage: React.FC = () => {
  const { data: metrics, isLoading } = useDashboardMetrics();

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">لوحة التحكم</h1>
          <p className="text-sm text-text-muted">مرحباً بك في لوحة إدارة نوبل.</p>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats metrics={metrics} isLoading={isLoading} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full">
           {metrics?.revenueTrend && <RevenueChart data={metrics.revenueTrend} />}
        </div>

        <div className="lg:col-span-1 h-full">
          {metrics && (
            <OrderStatusChart 
              delivered={metrics.ordersByStatus.delivered}
              processing={metrics.ordersByStatus.processing}
              cancelled={metrics.ordersByStatus.cancelled}
            />
          )}
        </div>
      </div>

      {/* Table */}
      <div className="pb-10">
        <RecentOrders />
      </div>
    </div>
  );
};