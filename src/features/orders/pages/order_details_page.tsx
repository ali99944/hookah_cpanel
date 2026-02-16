import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, CreditCard, Save, Trash2 } from 'lucide-react';

import { Button } from '../../../components/ui/button';
import { DangerDialog } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { TextArea } from '../../../components/ui/textarea';
import { useNotification } from '../../../core/hooks/use-notification';
import { getStorageLink } from '../../../core/lib/storage';
import { DeleteOrderDialog } from '../components/delete_order_dialog';
import { OrderStatusBadge } from '../components/order_status_badge';
import { useOrder, useUpdateOrderStatus } from '../hooks/use-orders';
import { type Order, type OrderStatus } from '../types';

type EditableItem = {
  id: number;
  product_name: string;
  product_id: number | null;
  cover_image: string | null;
  quantity: number;
  price: number;
};

type CustomerFormState = {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  address: string;
  city: string;
};

const statusButtons: Array<{ label: string; value: OrderStatus; danger?: boolean }> = [
  { label: 'قيد الانتظار', value: 'pending' },
  { label: 'قيد التجهيز', value: 'processing' },
  { label: 'تم الشحن', value: 'shipped' },
  { label: 'تم التوصيل', value: 'delivered' },
  { label: 'ملغي', value: 'cancelled', danger: true },
];

const resolveImage = (image: string | null) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return getStorageLink(image);
};

const normalizeStatus = (status: OrderStatus): OrderStatus => (status === 'paid' ? 'pending' : status);

const PaidBadge = ({ isPaid }: { isPaid?: boolean }) => {
  if (!isPaid) {
    return (
      <span className="border px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-none bg-neutral-200 text-neutral-600">
        غير مدفوع
      </span>
    );
  }

  return (
    <span className="border px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-none bg-success/10 text-success">
      مدفوع
    </span>
  );
};

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [isDeleteOrderOpen, setIsDeleteOrderOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);

  const { data, isLoading, refetch } = useOrder(id);
  const order = data as unknown as Order;

  const [trackingNumber, setTrackingNumber] = useState('');
  const [customerForm, setCustomerForm] = useState<CustomerFormState>({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    address: '',
    city: '',
  });
  const [editableItems, setEditableItems] = useState<EditableItem[]>([]);

  useEffect(() => {
    if (!order) return;

    setTrackingNumber(order.tracking_number || order.tracking_code || '');
    setCustomerForm({
      customer_name: order.customer_name || '',
      customer_phone: order.customer_phone || '',
      customer_email: order.customer_email || '',
      address: order.address || order.customer_address || '',
      city: order.city || order.customer_city || '',
    });

    setEditableItems(
      (order.items || []).map((item) => ({
        id: item.id,
        product_name: item.product_name,
        product_id: item.product_id,
        cover_image: item.cover_image,
        quantity: Number(item.quantity),
        price: Number(item.price),
      }))
    );
  }, [order]);

  const updateMutation = useUpdateOrderStatus(
    Number(id || 0),
    () => {
      notify.success('تم تحديث بيانات الطلب بنجاح');
      refetch();
    },
    (error: any) => {
      notify.error(error?.response?.data?.message || 'حدث خطأ أثناء تحديث الطلب');
    }
  );

  const updateStatus = (status: OrderStatus) => {
    if (status === 'shipped' && !trackingNumber.trim()) {
      notify.warning('أدخل رقم التتبع قبل تحويل الحالة إلى تم الشحن');
      return;
    }

    updateMutation.mutate({
      status,
      tracking_number: trackingNumber.trim() || undefined,
    });
  };

  const togglePaid = () => {
    if (!order) return;
    updateMutation.mutate({
      is_paid: !order.is_paid,
    });
  };

  const saveCustomerDetails = () => {
    updateMutation.mutate({
      customer_name: customerForm.customer_name.trim(),
      customer_phone: customerForm.customer_phone.trim(),
      customer_email: customerForm.customer_email.trim(),
      address: customerForm.address.trim(),
      city: customerForm.city.trim(),
    });
  };

  const saveItems = () => {
    if (editableItems.length === 0) {
      notify.error('لا يمكن أن يكون الطلب بدون منتجات');
      return;
    }

    const hasInvalidRows = editableItems.some((item) => item.quantity < 1 || item.price < 0);
    if (hasInvalidRows) {
      notify.warning('تأكد أن الكمية أكبر من صفر والسعر غير سالب');
      return;
    }

    updateMutation.mutate({
      items: editableItems.map((item) => ({
        id: item.id,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
    });
  };

  const confirmDeleteItem = () => {
    if (!itemToDeleteId) return;
    if (editableItems.length <= 1) {
      notify.warning('لا يمكن حذف كل المنتجات من الطلب');
      setItemToDeleteId(null);
      return;
    }

    const nextItems = editableItems.filter((item) => item.id !== itemToDeleteId);
    setEditableItems(nextItems);

    updateMutation.mutate({
      items: nextItems.map((item) => ({
        id: item.id,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
    });

    setItemToDeleteId(null);
  };

  const totals = useMemo(() => {
    const subtotal = editableItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const shipping = Number(order?.shipping_cost || 0);
    const fees = Number(order?.fees_cost || 0);
    const total = subtotal + shipping + fees;
    return { subtotal, shipping, fees, total };
  }, [editableItems, order?.shipping_cost, order?.fees_cost]);

  if (isLoading) return <div dir="rtl">جاري تحميل بيانات الطلب...</div>;
  if (!order) return <div dir="rtl">الطلب غير موجود</div>;

  const currentStatus = normalizeStatus(order.status);

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
            <ArrowRight size={18} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary font-cairo">طلب #{order.id}</h1>
              <OrderStatusBadge status={currentStatus} />
              <PaidBadge isPaid={order.is_paid || order.status === 'paid'} />
            </div>
            <p className="text-sm text-text-muted mt-1">
              تاريخ الطلب: {new Date(order.created_at).toLocaleString('ar-EG')}
            </p>
          </div>
        </div>

        <Button variant="danger" leftIcon={<Trash2 size={16} />} onClick={() => setIsDeleteOrderOpen(true)}>
          حذف الطلب
        </Button>
      </div>

      <div className="border border-border bg-white p-2 flex justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {statusButtons.map((button) => {
            const isActive = currentStatus === button.value;
            const variant = button.danger ? 'outline-danger' : isActive ? 'primary' : 'secondary';

            return (
              <Button
                key={button.value}
                variant={variant}
                isLoading={updateMutation.isPending}
                onClick={() => updateStatus(button.value)}
              >
                {button.label}
              </Button>
            );
          })}

          <Button
            variant={(order.is_paid || order.status === 'paid') ? 'outline-danger' : 'primary'}
            leftIcon={<CreditCard size={16} />}
            isLoading={updateMutation.isPending}
            onClick={togglePaid}
          >
            {(order.is_paid || order.status === 'paid') ? 'تعيين كغير مدفوع' : 'تعيين كمدفوع'}
          </Button>
        </div>

        <div className="bg-secondary/10 p-2">
          <p className="flex-1 text-sm font-medium text-neutral-600 ">
            {trackingNumber}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-bold text-text-primary">تعديل منتجات الطلب</h3>
              <Button leftIcon={<Save size={16} />} isLoading={updateMutation.isPending} onClick={saveItems}>
                حفظ تعديلات المنتجات
              </Button>
            </div>

            <div className="overflow-x-auto border border-border">
              <table className="w-full text-sm text-right">
                <thead className="bg-secondary/5 border-b border-border">
                  <tr className="text-text-muted">
                    <th className="px-4 py-3">المنتج</th>
                    <th className="px-4 py-3">الكمية</th>
                    <th className="px-4 py-3">السعر</th>
                    <th className="px-4 py-3">الإجمالي</th>
                    <th className="px-4 py-3">تحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {editableItems.map((item) => {
                    const image = resolveImage(item.cover_image);
                    return (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-neutral-100 border border-border overflow-hidden">
                              {image ? <img src={image} alt="" className="w-full h-full object-cover" /> : null}
                            </div>
                            <div>
                              <p className="font-medium text-text-primary">{item.product_name}</p>
                              <p className="text-xs text-text-muted">ID: {item.product_id ?? '-'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 w-32">
                          <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => {
                              const quantity = Number(e.target.value || 1);
                              setEditableItems((prev) =>
                                prev.map((row) => (row.id === item.id ? { ...row, quantity } : row))
                              );
                            }}
                          />
                        </td>
                        <td className="px-4 py-3 w-40">
                          <Input
                            type="number"
                            min={0}
                            step="0.01"
                            value={item.price}
                            onChange={(e) => {
                              const price = Number(e.target.value || 0);
                              setEditableItems((prev) =>
                                prev.map((row) => (row.id === item.id ? { ...row, price } : row))
                              );
                            }}
                          />
                        </td>
                        <td className="px-4 py-3 font-mono">
                          {(item.quantity * item.price).toFixed(2)} ج.م
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="danger" size="icon" onClick={() => setItemToDeleteId(item.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-bold text-text-primary">بيانات العميل وعنوان التوصيل</h3>
              <Button leftIcon={<Save size={16} />} isLoading={updateMutation.isPending} onClick={saveCustomerDetails}>
                حفظ بيانات العميل
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="اسم العميل"
                value={customerForm.customer_name}
                onChange={(e) => setCustomerForm((prev) => ({ ...prev, customer_name: e.target.value }))}
              />
              <Input
                label="رقم الهاتف"
                value={customerForm.customer_phone}
                onChange={(e) => setCustomerForm((prev) => ({ ...prev, customer_phone: e.target.value }))}
              />
              <Input
                label="البريد الإلكتروني"
                value={customerForm.customer_email}
                onChange={(e) => setCustomerForm((prev) => ({ ...prev, customer_email: e.target.value }))}
              />
              <Input
                label="المدينة"
                value={customerForm.city}
                onChange={(e) => setCustomerForm((prev) => ({ ...prev, city: e.target.value }))}
              />
              <Input
                className="md:col-span-2"
                label="العنوان"
                value={customerForm.address}
                onChange={(e) => setCustomerForm((prev) => ({ ...prev, address: e.target.value }))}
              />
              <TextArea
                className="md:col-span-2"
                label="ملاحظات العميل"
                value={order.notes || ''}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-border p-4">
            <h3 className="text-sm font-bold uppercase text-text-muted tracking-wide mb-4">ملخص الدفع</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">المجموع الفرعي</span>
                <span className="font-mono">{totals.subtotal.toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">الشحن</span>
                <span className="font-mono">{totals.shipping.toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">رسوم إضافية</span>
                <span className="font-mono">{totals.fees.toFixed(2)} ج.م</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-base font-bold">
                <span>الإجمالي</span>
                <span className="text-primary">{totals.total.toFixed(2)} ج.م</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border p-4">
            <h3 className="text-sm font-bold uppercase text-text-muted tracking-wide mb-4">بيانات الحالة الحالية</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">حالة الطلب</span>
                <OrderStatusBadge status={currentStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">حالة الدفع</span>
                <PaidBadge isPaid={order.is_paid || order.status === 'paid'} />
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">رقم التتبع</span>
                <span className="font-mono text-text-primary">{order.tracking_number || order.tracking_code || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">عدد المنتجات</span>
                <span className="font-medium text-text-primary">{editableItems.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DangerDialog
        isOpen={!!itemToDeleteId}
        onClose={() => setItemToDeleteId(null)}
        onConfirm={confirmDeleteItem}
        title="حذف المنتج من الطلب؟"
        description="سيتم حذف المنتج من الطلب وتحديث البيانات مباشرة بعد التأكيد."
        isLoading={false}
      />

      {isDeleteOrderOpen && (
        <DeleteOrderDialog
          orderId={order.id}
          onClose={() => setIsDeleteOrderOpen(false)}
        />
      )}
    </div>
  );
};
