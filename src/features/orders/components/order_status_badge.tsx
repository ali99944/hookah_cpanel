import React from 'react';
import { type OrderStatus } from '../types';

export const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const styles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-100', // قيد الانتظار
    paid: 'bg-blue-50 text-blue-700 border-blue-100',       // مدفوع
    processing: 'bg-indigo-50 text-indigo-700 border-indigo-100', // قيد التجهيز
    shipped: 'bg-purple-50 text-purple-700 border-purple-100',    // تم الشحن
    delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100', // تم التوصيل
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20', // ملغي
  };

  const labels: Record<string, string> = {
    pending: 'قيد الانتظار',
    paid: 'مدفوع',
    processing: 'قيد التجهيز',
    shipped: 'تم الشحن',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
  };

  return (
    <span className={`
      px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-none border
      ${styles[status] || styles.pending}
    `}>
      {labels[status] || status}
    </span>
  );
};