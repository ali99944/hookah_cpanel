// src/features/dashboard/components/recent_orders.tsx
import React from 'react';
import { FileText, Truck, Ban } from 'lucide-react';
import type { ColumnDef } from '../../../components/ui/datatable';
import { TableAction, TableActions } from '../../../components/ui/table-actions';
import DataTable from '../../../components/ui/datatable';

interface OrderRow {
  id: string;
  customerName: string;
  items: string; // e.g., "3x Mint Flavor"
  date: string;
  amount: number;
  status: 'delivered' | 'processing' | 'cancelled';
}

const mockData: OrderRow[] = [
  { id: 'ORD-5501', customerName: 'محمد أحمد', items: '2x نكهة تفاحتين, 1x فحم', date: '2026-01-02 10:00 ص', amount: 450, status: 'delivered' },
  { id: 'ORD-5502', customerName: 'خالد عمر', items: '1x شيشة خليل مأمون', date: '2026-01-02 11:30 ص', amount: 1200, status: 'processing' },
  { id: 'ORD-5503', customerName: 'سارة علي', items: '5x نكهة نعناع', date: '2026-01-02 02:00 م', amount: 350, status: 'cancelled' },
  { id: 'ORD-5504', customerName: 'مطعم السرايا', items: 'طلب جملة #402', date: '2026-01-02 04:00 م', amount: 5000, status: 'delivered' },
];

export const RecentOrders: React.FC = () => {
  
  const columns: ColumnDef<OrderRow>[] = [
    { 
      header: 'رقم الطلب', 
      accessorKey: 'id', 
      className: 'font-mono text-xs text-text-muted text-right' // Right align for Arabic
    },
    { 
      header: 'العميل', 
      accessorKey: 'customerName', 
      className: 'font-medium text-text-primary text-right' 
    },
    { 
      header: 'تفاصيل الطلب', 
      accessorKey: 'items',
      className: 'text-sm text-text-muted text-right truncate max-w-[200px]'
    },
    { 
      header: 'التاريخ', 
      accessorKey: 'date', 
      className: 'text-xs text-text-muted text-right' 
    },
    { 
      header: 'الحالة', 
      cell: (item) => {
        const styles = {
          delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
          processing: 'bg-amber-50 text-amber-700 border border-amber-100',
          cancelled: 'bg-destructive/10 text-destructive border border-destructive/20',
        };
        const labels = {
          delivered: 'تم التوصيل',
          processing: 'قيد التجهيز',
          cancelled: 'ملغي'
        };
        return (
          <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-none ${styles[item.status]}`}>
            {labels[item.status]}
          </span>
        );
      }
    },
    { 
      header: 'المبلغ', 
      cell: (item) => <span className="font-mono text-text-primary font-bold">{item.amount} ج.م</span>, 
      align: 'left' // In RTL, numbers often look better aligned left (end of cell)
    },
    {
      header: 'إجراءات',
      align: 'left', // Actions at the end
      cell: (item) => (
        <TableActions>
          <TableAction 
            icon={FileText} 
            label="تفاصيل الطلب" 
            onClick={() => console.log('View', item.id)} 
          />
          
          {item.status === 'processing' && (
            <TableAction 
              icon={Truck} 
              label="تأكيد الشحن" 
              variant="success"
              onClick={() => console.log('Ship', item.id)} 
            />
          )}

          {item.status !== 'cancelled' && item.status !== 'delivered' && (
            <TableAction 
              icon={Ban} 
              label="إلغاء الطلب" 
              variant="destructive"
              onClick={() => console.log('Cancel', item.id)} 
            />
          )}
        </TableActions>
      )
    }
  ];

  return (
    <DataTable
      title="أحدث الطلبات"
      description="قائمة بآخر العمليات التي تمت على المتجر."
      data={mockData}
      columns={columns}
    />
  );
};