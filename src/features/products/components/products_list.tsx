import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { DangerDialog } from '../../../components/ui/dialog';
import { type Product } from '../types';
import { useDeleteProduct } from '../hooks/use-products';
import type { ColumnDef } from '../../../components/ui/datatable';
import { TableAction, TableActions } from '../../../components/ui/table-actions';
import DataTable from '../../../components/ui/datatable';

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
        <div className="w-10 h-10 bg-white border border-border p-0.5">
          <img 
            src={item.cover_image} 
            alt={item.name} 
            className="w-full h-full object-cover" 
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/40')}
          />
        </div>
      )
    },
    { 
      header: 'اسم المنتج', 
      accessorKey: 'name', 
      className: 'font-medium text-text-primary'
    },
    { 
      header: 'القسم', 
      accessorKey: 'category', // Assuming nested object via React Table accessor logic or render
      cell: (item) => <span className="text-sm text-primary underline">{item.category?.name || '-'}</span>
    },
    { 
      header: 'السعر', 
      cell: (item) => <span className="font-mono font-bold">{item.price} ج.م</span>
    },
    { 
      header: 'المخزون', 
      cell: (item) => (
        <span className={`text-xs font-bold ${item.stock < 5 ? 'text-destructive' : 'text-text-muted'}`}>
          {item.stock} قطعة
        </span>
      )
    },
    { 
      header: 'الحالة', 
      cell: (item) => {
         const statusMap = {
            active: 'نشط',
            inactive: 'غير نشط',
            draft: 'مسودة',
         };

         const styles = {
            active: 'bg-success/10 text-success',
            inactive: 'bg-destructive/10 text-destructive border-destructive/20',
            draft: 'bg-neutral-50 text-text-muted border-border',
         };
         
         return (
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-none ${styles[item.status]}`}>
              {statusMap[item.status]}
            </span>
         );
      }
    },
    {
      header: 'إجراءات',
      align: 'left',
      cell: (item) => (
        <TableActions>
          <TableAction 
            icon={Edit} 
            label="تعديل" 
            onClick={() => navigate(`/products/edit/${item.id}`)} 
          />
          <TableAction 
            icon={Trash2} 
            label="حذف" 
            variant="destructive"
            onClick={() => setDeletingId(item.id)} 
          />
        </TableActions>
      )
    }
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