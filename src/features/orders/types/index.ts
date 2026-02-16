export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: number;
  product_id: number | null;
  product_name: string;
  quantity: number;
  price: string | number;
  cover_image: string | null;
  line_total?: number;
}

export interface Order {
  id: number;
  user_id: number | null;
  
  // Financials
  subtotal: string | number;
  shipping_cost: string | number;
  fees_cost?: string | number;
  total: string | number;
  
  // Status
  status: OrderStatus;
  is_paid?: boolean;
  tracking_code?: string | null;
  tracking_number: string | null;
  
  // Customer Info
  customer_name: string;
  customer_phone: string;
  address?: string;
  city?: string;
  notes?: string | null;
  customer_address: string;
  customer_city: string;
  customer_email: string | null;
  
  created_at: string;
  updated_at: string;

  // Relations
  items?: OrderItem[];
}

export interface OrderResponse {
  data: Order[];
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
}

export interface OrderFilters {
  limit?: number;
  page?: number;
  status?: string;
  search?: string; // Search by name or order ID
  date_from?: string;
  date_to?: string;
}

export interface OrderUpdateItemPayload {
  id: number;
  quantity: number;
  price: number;
}

export interface OrderUpdatePayload {
  status?: OrderStatus;
  tracking_number?: string;
  is_paid?: boolean;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  address?: string;
  city?: string;
  notes?: string;
  items?: OrderUpdateItemPayload[];
}
