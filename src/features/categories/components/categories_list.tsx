import React, { useState } from 'react';
import { Edit, Trash2, ImageOff } from 'lucide-react';
import { DangerDialog, Dialog } from '../../../components/ui/dialog';
import { CategoryForm } from './category_form';
import { type Category } from '../types';
import type { ColumnDef } from '../../../components/ui/datatable';
import { useDeleteCategory, useUpdateCategory } from '../hooks/use-categories';
import { TableAction, TableActions } from '../../../components/ui/table-actions';
import DataTable from '../../../components/ui/datatable';

interface CategoriesListProps {
  data: Category[];
  isLoading: boolean;
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ data, isLoading }) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const deleteMutation = useDeleteCategory(() => setDeletingId(null));

  const columns: ColumnDef<Category>[] = [
    { 
      header: 'صورة', 
      cell: (item) => (
        <div className="w-12 h-12 bg-white border border-border flex items-center justify-center overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <ImageOff size={20} className="text-text-muted/50" />
          )}
        </div>
      )
    },
    { 
      header: 'اسم القسم', 
      accessorKey: 'name', 
      className: 'font-medium text-text-primary'
    },
    { 
      header: 'الوصف', 
      accessorKey: 'description',
      cell: (item) => (
        <span className="text-xs text-text-muted line-clamp-1 max-w-[200px]" title={item.description}>
          {item.description}
        </span>
      )
    },
    { 
      header: 'الحالة', 
      cell: (item) => (
        <span className={`
          px-2 py-0.5 text-[10px] font-bold border rounded-none
          ${item.is_active 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
            : 'bg-neutral-50 text-text-muted border-border'}
        `}>
          {item.is_active ? 'نشط' : 'غير نشط'}
        </span>
      )
    },
    { 
      header: 'عدد المنتجات',
      cell: (item) => <span className="text-xs font-mono">
        0
      </span> // Placeholder if no count from API
    },
    {
      header: 'إجراءات',
      align: 'left',
      cell: (item) => (
        <TableActions>
          <TableAction 
            icon={Edit} 
            label="تعديل" 
            onClick={() => setEditingCategory(item)} 
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
        title="قائمة الأقسام"
        description="إدارة تصنيفات المنتجات والنكهات."
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="لا يوجد أقسام مضافة حالياً."
        pagination={{ currentPage: 1, totalPages: 1, onPageChange: () => {} }}
      />

      {/* Delete Dialog */}
      <DangerDialog 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMutation.mutate(deletingId)}
        title="حذف القسم؟"
        description="هل أنت متأكد من حذف هذا القسم؟ قد يؤثر ذلك على المنتجات المرتبطة به."
        isLoading={deleteMutation.isPending}
      />

      {/* Edit Dialog */}
      {editingCategory && (
        <UpdateCategoryDialog 
          category={editingCategory} 
          onClose={() => setEditingCategory(null)} 
        />
      )}
    </>
  );
};

// Update Wrapper
const UpdateCategoryDialog = ({ category, onClose }: { category: Category; onClose: () => void }) => {
  const { mutate, isPending } = useUpdateCategory(category.id, onClose);
  return (
    <Dialog isOpen={true} onClose={onClose} title="تعديل القسم">
      <CategoryForm 
        defaultValues={category}
        onSubmit={mutate}
        isLoading={isPending}
        onCancel={onClose}
      />
    </Dialog>
  );
};