import React from 'react';
import { DangerDialog } from '../../../components/ui/dialog';
import { useDeleteOrder } from '../hooks/use-orders';

export const DeleteOrderDialog: React.FC<{ orderId: number, onClose: () => void }> = ({ orderId, onClose }) => {
  const { mutate, isPending } = useDeleteOrder(orderId, onClose);
  return (
    <DangerDialog
      isOpen={true}
      onClose={onClose}
      onConfirm={() => mutate()}
      title="حذف الطلب نهائياً؟"
      description="هل أنت متأكد من حذف هذا الطلب؟ سيتم فقدان جميع البيانات المالية وسجل العملاء المرتبط به."
      isLoading={isPending}
    />
  );
};