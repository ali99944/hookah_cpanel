import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Printer, PenLine, Trash2, MapPin, User, Mail, Phone, Truck } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { OrderStatusBadge } from '../components/order_status_badge';
import { OrderItemsTable } from '../components/order_items_table';
import { UpdateOrderDialog } from '../components/update_order_dialog';
import { DeleteOrderDialog } from '../components/delete_order_dialog';
import { useOrder } from '../hooks/use-orders';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading } = useOrder(id);
  const order = data?.data;

  if (isLoading) return <div>جاري التحميل...</div>;
  if (!order) return <div>الطلب غير موجود</div>;

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
             <ArrowRight size={20} />
          </Button>
          <div>
             <div className="flex items-center gap-3">
               <h1 className="text-2xl font-bold text-text-primary font-cairo">طلب #{order.id}</h1>
               <OrderStatusBadge status={order.status} />
             </div>
             <p className="text-sm text-text-muted mt-1">تم الطلب في {new Date(order.created_at).toLocaleString('ar-EG')}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" leftIcon={<Printer size={16}/>}>طباعة الفاتورة</Button>
          <Button leftIcon={<PenLine size={16}/>} onClick={() => setIsEditOpen(true)}>تحديث الحالة</Button>
          <Button variant="danger" size="icon" onClick={() => setIsDeleteOpen(true)}>
             <Trash2 size={16}/>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Items & Tracking */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tracking Info (If Shipped) */}
          {order.tracking_number && (
            <div className="bg-indigo-50 border border-indigo-100 p-4 flex items-center gap-4">
               <div className="p-2 bg-white rounded-full text-indigo-600 border border-indigo-200">
                  <Truck size={20} />
               </div>
               <div>
                  <p className="text-xs font-bold text-indigo-800 uppercase tracking-wide">رقم التتبع</p>
                  <p className="font-mono text-lg font-bold text-indigo-900">{order.tracking_number}</p>
               </div>
            </div>
          )}

          {/* Order Items */}
          <div className="bg-white border border-border p-6 space-y-4">
            <h3 className="text-lg font-bold text-text-primary">محتويات الطلب</h3>
            <OrderItemsTable items={order.items || []} />
          </div>

          {/* Financials (Mobile View mainly, Desktop is on right) */}
          <div className="lg:hidden bg-white border border-border p-6">
             {/* Financial summary logic same as sidebar */}
          </div>
        </div>

        {/* RIGHT COLUMN: Customer & Summary */}
        <div className="space-y-6">
          
          {/* Financial Summary */}
          <div className="bg-white border border-border p-6 sticky top-6">
            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-4 mb-4">ملخص الدفع</h3>
            <div className="space-y-3 text-sm">
               <div className="flex justify-between">
                 <span className="text-text-muted">المجموع الفرعي</span>
                 <span className="font-mono font-medium">{order.subtotal} ج.م</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-text-muted">الشحن</span>
                 <span className="font-mono font-medium">{Number(order.shipping_cost) > 0 ? `${order.shipping_cost} ج.م` : 'مجاني'}</span>
               </div>
               <div className="border-t border-border my-2 pt-2 flex justify-between items-end">
                 <span className="font-bold text-text-primary text-lg">الإجمالي</span>
                 <span className="font-mono font-bold text-xl text-primary">{order.total} ج.م</span>
               </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white border border-border p-6">
             <h3 className="text-sm font-bold uppercase text-text-muted tracking-wide mb-4 flex items-center gap-2">
               <User size={16}/> بيانات العميل
             </h3>
             <div className="space-y-3 text-sm">
                <p className="font-bold text-text-primary text-base">{order.customer_name}</p>
                {order.customer_email && (
                  <div className="flex items-center gap-2 text-text-muted">
                    <Mail size={14} /> {order.customer_email}
                  </div>
                )}
                <div className="flex items-center gap-2 text-text-muted">
                   <Phone size={14} /> <span dir="ltr">{order.customer_phone}</span>
                </div>
             </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-border p-6">
             <h3 className="text-sm font-bold uppercase text-text-muted tracking-wide mb-4 flex items-center gap-2">
               <MapPin size={16}/> عنوان الشحن
             </h3>
             <p className="text-sm text-text-primary leading-relaxed">
               {order.customer_address}<br/>
               <span className="font-bold">{order.customer_city}</span>
             </p>
          </div>

        </div>
      </div>

      {/* DIALOGS */}
      {isEditOpen && (
        <UpdateOrderDialog 
          order={order} 
          onClose={() => setIsEditOpen(false)} 
        />
      )}

      {isDeleteOpen && (
        <DeleteOrderDialog 
          orderId={order.id} 
          onClose={() => setIsDeleteOpen(false)} 
        />
      )}

    </div>
  );
};