// src/features/dashboard/components/order_status_chart.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface OrderStatusChartProps {
  delivered: number;
  processing: number;
  cancelled: number;
}

export const OrderStatusChart: React.FC<OrderStatusChartProps> = ({ delivered, processing, cancelled }) => {
  // Calculate percentages
  const total = delivered + processing + cancelled;
  
  // Guard against division by zero
  const getPercentage = (val: number) => total > 0 ? Math.round((val / total) * 100) : 0;

  const statusData = [
    {
      label: 'تم التوصيل',
      value: delivered,
      percentage: getPercentage(delivered),
      color: 'bg-success',
    },
    {
      label: 'قيد التجهيز',
      value: processing,
      percentage: getPercentage(processing),
      color: 'bg-warning',
    },
    {
      label: 'ملغي',
      value: cancelled,
      percentage: getPercentage(cancelled),
      color: 'bg-destructive'
    }
  ];

  return (
    <div className="bg-white border border-border p-6 h-full flex flex-col justify-between text-right">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary">أداء الطلبات</h3>
        <p className="text-xs text-text-muted">توزيع الطلبات حسب الحالة</p>
      </div>
      
      {/* Total Orders Display */}
      <div className="text-center mb-6 pb-4 border-b border-border border-dashed">
        <div className="text-4xl font-bold text-text-primary">{total}</div>
        <div className="text-xs text-text-muted mt-1">إجمالي الطلبات</div>
      </div>

      {/* Progress Lines */}
      <div className="flex-1 space-y-6 ">
        {statusData.map((status, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-text-primary">{status.label}</span>
              <span className="font-bold text-text-primary">{status.value}</span>
            </div>
            <div className="relative h-2.5 bg-neutral-100 rounded-none overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${status.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                className={`h-full ${status.color} rounded-none relative`}
              >
              </motion.div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
