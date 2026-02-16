import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Trash2 } from 'lucide-react';

import DataTable, { type ColumnDef } from '../../../components/ui/datatable';
import { TableAction, TableActions } from '../../../components/ui/table-actions';
import { DeleteOrderDialog } from './delete_order_dialog';
import { OrderStatusBadge } from './order_status_badge';
import { type Order } from '../types';

interface OrdersListProps {
  data: Order[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({
  data,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const columns: ColumnDef<Order>[] = [
    {
      header: 'رقم الطلب',
      accessorKey: 'id',
      className: 'font-mono text-xs text-text-muted',
      cell: (item) => <span className="font-bold">#{item.id}</span>,
    },
    {
      header: 'العميل',
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-text-primary">{item.customer_name}</span>
          <span className="text-xs text-text-muted">{item.customer_phone}</span>
        </div>
      ),
    },
    {
      header: 'المدينة',
      className: 'text-sm text-text-muted',
      cell: (item) => <span>{item.city || item.customer_city || '-'}</span>,
    },
    {
      header: 'الحالة',
      cell: (item) => <OrderStatusBadge status={item.status} />,
    },
    {
      header: 'الإجمالي',
      cell: (item) => <span className="font-mono font-bold text-text-primary">{Number(item.total).toFixed(2)} ج.م</span>,
    },
    {
      header: 'التاريخ',
      cell: (item) => (
        <span className="text-xs text-text-muted">
          {new Date(item.created_at).toLocaleDateString('ar-EG')}
        </span>
      ),
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
          <TableAction
            icon={Trash2}
            label="حذف"
            variant="destructive"
            onClick={() => setDeletingId(item.id)}
          />
        </TableActions>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="قائمة الطلبات"
        description="تتبع وإدارة جميع طلبات المتجر."
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination={{ currentPage, totalPages, onPageChange }}
      />

      {deletingId && (
        <DeleteOrderDialog
          orderId={deletingId}
          onClose={() => setDeletingId(null)}
        />
      )}
    </>
  );
};
