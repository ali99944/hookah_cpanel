import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { type Order } from '../types';
import { useUpdateOrderStatus } from '../hooks/use-orders';

interface UpdateOrderDialogProps {
  order: Order;
  onClose: () => void;
}

export const UpdateOrderDialog: React.FC<UpdateOrderDialogProps> = ({ order, onClose }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      status: order.status,
      tracking_number: order.tracking_number || ''
    }
  });

  const { mutate, isPending } = useUpdateOrderStatus(order.id, onClose);
  const currentStatus = watch('status');

  return (
    <Dialog isOpen={true} onClose={onClose} title={`تحديث حالة الطلب #${order.id}`}>
      <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
        
        <Select
          label="حالة الطلب"
          value={currentStatus}
          onChange={(val) => setValue('status', val as any)}
          options={[
            { label: 'قيد الانتظار (Pending)', value: 'pending' },
            { label: 'مدفوع (Paid)', value: 'paid' },
            { label: 'قيد التجهيز (Processing)', value: 'processing' },
            { label: 'تم الشحن (Shipped)', value: 'shipped' },
            { label: 'تم التوصيل (Delivered)', value: 'delivered' },
            { label: 'ملغي (Cancelled)', value: 'cancelled' },
          ]}
        />

        {currentStatus === 'shipped' && (
          <Input 
            label="رقم التتبع (Tracking Number)"
            placeholder="مثال: #TRK-882190"
            {...register('tracking_number')}
          />
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button type="submit" isLoading={isPending}>حفظ التغييرات</Button>
        </div>
      </form>
    </Dialog>
  );
};