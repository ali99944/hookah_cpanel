import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { DangerDialog } from '../../../components/ui/dialog';
import { type Product } from '../types';
import { useDeleteProduct } from '../hooks/use-products';
import type { ColumnDef } from '../../../components/ui/datatable';
import { TableAction, TableActions } from '../../../components/ui/table-actions';
import DataTable from '../../../components/ui/datatable';
import { getStorageLink } from '../../../core/lib/storage';

interface ProductsListProps {
  data: Product[];
  isLoading: boolean;
}

export const ProductsList: React.FC<ProductsListProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const deleteMutation = useDeleteProduct(Number(deletingId), () => setDeletingId(null));

  const columns: ColumnDef<Product>[] = [
    {
      header: 'صورة',
      cell: (item) => (
        <div className="w-12 h-12 bg-white border border-border p-0.5">
          <img
            src={getStorageLink(item.cover_image || '') as string}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/40')}
          />
        </div>
      ),
    },
    {
      header: 'اسم المنتج',
      accessorKey: 'name',
      className: 'font-medium text-text-primary',
    },
    {
      header: 'القسم',
      cell: (item) => (
        <span className="text-sm text-primary underline">
          {item.collection?.name || item.category?.name || '-'}
        </span>
      ),
    },
    {
      header: 'السعر',
      cell: (item) => <span className="font-mono font-bold">{item.price} ج.م</span>,
    },
    {
      header: 'الحالة',
      cell: (item) => {
        const statusKey = item.status === 'active' ? 'active' : 'inactive';

        const statusMap = {
          active: 'نشط',
          inactive: 'غير نشط',
        } as const;

        const styles = {
          active: 'bg-success/10 text-success',
          inactive: 'bg-destructive/10 text-destructive',
        } as const;

        return (
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-none ${styles[statusKey]}`}>
            {statusMap[statusKey]}
          </span>
        );
      },
    },
    {
      header: 'إجراءات',
      align: 'left',
      cell: (item) => (
        <TableActions>
          <TableAction icon={Edit} label="تعديل" onClick={() => navigate(`/products/edit/${item.id}`)} />
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
        title="قائمة المنتجات"
        description="إدارة جميع النكهات، الشيش، والمستلزمات."
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination={{ currentPage: 1, totalPages: 1, onPageChange: () => {} }}
      />

      <DangerDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMutation.mutate(deletingId)}
        title="حذف المنتج؟"
        description="هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};
