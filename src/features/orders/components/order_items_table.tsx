import React from 'react';

import { getStorageLink } from '../../../core/lib/storage';
import { type OrderItem } from '../types';

const resolveImage = (image: string | null) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return getStorageLink(image);
};

export const OrderItemsTable: React.FC<{ items: OrderItem[] }> = ({ items }) => {
  return (
    <div className="w-full overflow-x-auto bg-white border border-border">
      <table className="w-full text-sm text-right">
        <thead className="bg-secondary/5 text-text-muted font-bold text-xs uppercase border-b border-border">
          <tr>
            <th className="px-4 py-3">المنتج</th>
            <th className="px-4 py-3 text-center">الكمية</th>
            <th className="px-4 py-3">سعر الوحدة</th>
            <th className="px-4 py-3 text-left">الإجمالي</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => {
            const image = resolveImage(item.cover_image);
            const lineTotal =
              item.line_total !== undefined ? Number(item.line_total) : Number(item.price) * item.quantity;

            return (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-border bg-neutral-50 p-0.5">
                      {image && <img src={image} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{item.product_name}</p>
                      <p className="text-xs text-text-muted">ID: {item.product_id || 'Deleted'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-mono">{item.quantity}</td>
                <td className="px-4 py-3 font-mono">{Number(item.price).toFixed(2)} ج.م</td>
                <td className="px-4 py-3 font-mono text-left font-bold">
                  {lineTotal.toFixed(2)} ج.م
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
