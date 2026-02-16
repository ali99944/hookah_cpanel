import React, { useState } from 'react';

import { OrdersList } from '../components/orders_list';
import { useOrders } from '../hooks/use-orders';
import { type OrderFilters } from '../types';

export const OrdersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters] = useState<OrderFilters>({ limit: 10 });
  const { data, isLoading } = useOrders({ ...filters, page });

  const currentPage = data?.meta?.current_page ?? page;
  const totalPages = data?.meta?.last_page ?? 1;

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">الطلبات</h1>
        <p className="text-sm text-text-muted">متابعة المبيعات وعمليات الشحن.</p>
      </div>

      <OrdersList
        data={data?.data || []}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
