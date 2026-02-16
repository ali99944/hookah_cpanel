export interface DashboardOrderStatusMetrics {
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  paid: number;
}

export interface DashboardMetrics {
  orders_count: number;
  sales_revenue: number;
  categories_count: number;
  products_count: number;
  revenue_labels: string[];
  revenue_per_day: number[];
  order_by_status: DashboardOrderStatusMetrics;
  products_by_category: Record<string, number>;
}
