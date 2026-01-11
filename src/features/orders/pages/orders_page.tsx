import React, { useState } from 'react';
import { OrdersList } from '../components/orders_list';
import { type OrderFilters } from '../types';
import { useOrders } from '../hooks/use-orders';
// Add filters component here if needed, keeping it simple for now

export const OrdersPage: React.FC = () => {
  const [filters] = useState<OrderFilters>({});
  const { data, isLoading } = useOrders(filters);

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">الطلبات</h1>
        <p className="text-sm text-text-muted">متابعة المبيعات وعمليات الشحن.</p>
      </div>
      
      {/* Future: <OrderFiltersBar ... /> */}
      
      <OrdersList 
        data={data?.data || []} 
        isLoading={isLoading} 
      />
    </div>
  );
};