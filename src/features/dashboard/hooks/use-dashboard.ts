import { useGetQuery } from "../../../core/hooks/queries-actions";
import type { DashboardMetrics } from "../types";

export const useDashboardMetrics = () => {
  return useGetQuery<DashboardMetrics>({
    key: ["dashboard", "metrics"],
    url: "/admin/dashboard/metrics",
    options: {
      staleTime: 1000 * 60 * 5
    },
  });
};
