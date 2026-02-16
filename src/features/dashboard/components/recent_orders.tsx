import React from 'react';
import { FileText, Layers, Truck, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import DataTable, { type ColumnDef } from '../../../components/ui/datatable';
import { TableAction, TableActions } from '../../../components/ui/table-actions';
import { useNotification } from '../../../core/hooks/use-notification';
import { OrderStatusBadge } from '../../orders/components/order_status_badge';
import { useOrders, useUpdateOrder } from '../../orders/hooks/use-orders';
import type { Order } from '../../orders/types';

export const RecentOrders: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [page, setPage] = React.useState(1);

  const { data: ordersResponse, isLoading } = useOrders({ limit: 5, page });

  const updateOrderMutation = useUpdateOrder(
    () => notify.success('تم تحديث حالة الطلب'),
    (error: any) => notify.error(error?.response?.data?.message || 'تعذر تحديث حالة الطلب')
  );

  const orders = ordersResponse?.data || [];
  const meta = ordersResponse?.meta;

  const columns: ColumnDef<Order>[] = [
    {
      header: 'رقم الطلب',
      className: 'font-mono text-xs text-text-muted',
      cell: (item) => <span className="font-bold">#{item.id}</span>,
    },
    {
      header: 'العميل',
      className: 'font-medium text-text-primary',
      cell: (item) => (
        <div className="flex flex-col">
          <span>{item.customer_name}</span>
          <span className="text-xs text-text-muted">{item.customer_phone}</span>
        </div>
      ),
    },
    {
      header: 'تفاصيل الطلب',
      className: 'text-sm text-text-muted max-w-[240px]',
      cell: (item) => {
        const items = item.items || [];
        const firstItem = items[0]?.product_name;
        if (items.length === 0) return <span>-</span>;
        if (items.length === 1) return <span>{firstItem}</span>;
        return <span>{firstItem} + {items.length - 1} منتجات</span>;
      },
    },
    {
      header: 'التاريخ',
      className: 'text-xs text-text-muted',
      cell: (item) => <span>{new Date(item.created_at).toLocaleDateString('ar-EG')}</span>,
    },
    {
      header: 'الحالة',
      cell: (item) => <OrderStatusBadge status={item.status} />,
    },
    {
      header: 'المبلغ',
      align: 'left',
      cell: (item) => <span className="font-mono text-text-primary font-bold">{Number(item.total).toFixed(2)} ج.م</span>,
    },
    {
      header: 'إجراءات',
      align: 'left',
      cell: (item) => (
        <TableActions>
          <TableAction
            icon={FileText}
            label="تفاصيل الطلب"
            onClick={() => navigate(`/orders/${item.id}`)}
          />
          {item.status === 'processing' && (
            <TableAction
              icon={Truck}
              label="تحويل إلى تم الشحن"
              variant="success"
              disabled={updateOrderMutation.isPending}
              onClick={() => updateOrderMutation.mutate({
                id: item.id,
                payload: { status: 'shipped' },
              })}
            />
          )}
          {item.status !== 'cancelled' && item.status !== 'delivered' && (
            <TableAction
              icon={Ban}
              label="إلغاء الطلب"
              variant="destructive"
              disabled={updateOrderMutation.isPending}
              onClick={() => updateOrderMutation.mutate({
                id: item.id,
                payload: { status: 'cancelled' },
              })}
            />
          )}
        </TableActions>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-border bg-secondary/5 rounded-none">
        <div className="w-16 h-16 bg-white border border-border flex items-center justify-center mb-4 text-text-muted">
          <Layers size={32} />
        </div>
        <h3 className="text-lg font-bold text-text-primary">جاري التحميل...</h3>
        <p className="text-sm text-text-muted mt-1">يتم تحميل أحدث الطلبات...</p>
      </div>
    );
  }

  return (
    <DataTable
      title="أحدث الطلبات"
      description="قائمة بآخر العمليات التي تمت على المتجر."
      data={orders}
      columns={columns}
      pagination={{
        currentPage: meta?.current_page || page,
        totalPages: meta?.last_page || 1,
        onPageChange: setPage,
      }}
    />
  );
};
