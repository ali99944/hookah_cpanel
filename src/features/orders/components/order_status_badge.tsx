import React from 'react';
import { type OrderStatus } from '../types';

type PureOrderStatus = Exclude<OrderStatus, 'paid'>;

const styles: Record<PureOrderStatus, string> = {
  pending: 'bg-[#fef3c7] text-[#92400e]',
  processing: 'bg-[#e0e7ff] text-[#3730a3]',
  shipped: 'bg-[#f3e8ff] text-[#6b21a8]',
  delivered: 'bg-[#d1fae5] text-[#065f46]',
  cancelled: 'bg-[#fee2e2] text-[#991b1b]',
};

const labels: Record<PureOrderStatus, string> = {
  pending: 'قيد الانتظار',
  processing: 'قيد التجهيز',
  shipped: 'تم الشحن',
  delivered: 'تم التوصيل',
  cancelled: 'ملغي',
};

export const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const normalizedStatus: PureOrderStatus = status === 'paid' ? 'pending' : status;

  return (
    <span
      className={`
        px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-none border
        ${styles[normalizedStatus]}
      `}
    >
      {labels[normalizedStatus]}
    </span>
  );
};
