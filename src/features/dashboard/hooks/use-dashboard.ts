import { useGetQuery } from "../../../core/hooks/queries-actions";

interface DashboardMetrics {
  totalRevenue: number;     // إجمالي المبيعات
  activeProducts: number;   // المنتجات النشطة
  totalOrders: number;      // إجمالي الطلبات
  pendingOrders: number;    // طلبات قيد الانتظار
  revenueTrend: number[];
  ordersByStatus: {
    delivered: number;      // تم التوصيل
    processing: number;     // قيد التجهيز
    cancelled: number;      // ملغي
  };
}

export const useDashboardMetrics = () => {
  return useGetQuery<DashboardMetrics>({
    key: ["dashboard", "metrics"],
    url: "/admin/dashboard/metrics",
    options: {
      staleTime: 1000 * 60 * 5,
      initialData: {
        totalRevenue: 45200, // EGP or SAR
        activeProducts: 120, // Hookahs, Flavors, Accessories
        totalOrders: 850,
        pendingOrders: 12,
        revenueTrend: [1200, 1500, 1100, 1800, 2000, 2400, 2100],
        ordersByStatus: { delivered: 750, processing: 80, cancelled: 20 }
      } as DashboardMetrics
    },
  });
};