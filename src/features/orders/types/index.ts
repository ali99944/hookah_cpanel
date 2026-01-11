export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: number;
  product_id: number | null;
  product_name: string;
  quantity: number;
  price: string | number;
  cover_image: string | null;
}

export interface Order {
  id: number;
  user_id: number | null;
  
  // Financials
  subtotal: string | number;
  shipping_cost: string | number;
  total: string | number;
  
  // Status
  status: OrderStatus;
  tracking_number: string | null;
  
  // Customer Info
  customer_name: string;
  customer_phone: string;
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
    total: number;
    page: number;
    last_page: number;
  };
}

export interface OrderFilters {
  status?: string;
  search?: string; // Search by name or order ID
  date_from?: string;
  date_to?: string;
}