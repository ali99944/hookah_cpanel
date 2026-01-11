import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2, Mail } from 'lucide-react';
import { DangerDialog } from '../../../components/ui/dialog';
import { type ContactMessage } from '../types';
import { useContactStore } from '../state/contact.store';
import { useDeleteMessage } from '../hooks/use-contacts';
import type { ColumnDef } from '../../../components/ui/datatable';
import { TableAction, TableActions } from '../../../components/ui/table-actions';
import DataTable from '../../../components/ui/datatable';

interface ContactListProps {
  data: ContactMessage[];
  isLoading: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const setSelectedMessage = useContactStore((state) => state.setSelectedMessage); // Zustand Setter
  
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const deleteMutation = useDeleteMessage(deletingId, () => setDeletingId(null));

  const handleView = (message: ContactMessage) => {
    // 1. Save object to store
    setSelectedMessage(message);
    // 2. Navigate to details page (we use ID in URL just for clean routing, but we won't fetch with it)
    navigate(`/contact-requests/${message.id}`);
  };

  const columns: ColumnDef<ContactMessage>[] = [
    { 
      header: 'المرسل', 
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-text-primary">{item.name}</span>
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Mail size={10} /> {item.email}
          </span>
        </div>
      )
    },
    { 
      header: 'الموضوع', 
      accessorKey: 'subject',
      className: 'font-medium text-text-primary truncate max-w-[200px]'
    },
    { 
      header: 'مقتطف الرسالة', 
      cell: (item) => (
        <span className="text-sm text-text-muted line-clamp-1 max-w-[300px]">
          {item.message}
        </span>
      )
    },
    { 
      header: 'التاريخ', 
      cell: (item) => (
        <span className="text-xs text-text-muted">
          {new Date(item.created_at).toLocaleDateString('ar-EG')}
        </span>
      )
    },
    {
      header: 'إجراءات',
      align: 'left',
      cell: (item) => (
        <TableActions>
          <TableAction 
            icon={Eye} 
            label="قراءة الرسالة" 
            onClick={() => handleView(item)} 
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
        title="صندوق الوارد"
        description="رسائل التواصل والاستفسارات من العملاء."
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination={{ currentPage: 1, totalPages: 1, onPageChange: () => {} }}
      />
      
      <DangerDialog 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMutation.mutate(deletingId)}
        title="حذف الرسالة؟"
        description="هل أنت متأكد من حذف هذه الرسالة؟ لا يمكن استرجاعها."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};