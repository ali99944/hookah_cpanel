export interface DashboardMetrics {
  orders_count: number;
  sales_revenue: number;
  categories_count: number;
  products_count: number;
  revenue_per_day: number[];
  order_by_status: {
    delivered: number;
    processing: number;
    cancelled: number;
  };
  products_by_category: Record<string, number>;
}