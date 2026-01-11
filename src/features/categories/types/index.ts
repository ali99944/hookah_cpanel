export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null; // URL from backend
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  data: Category[];
  meta?: {
    total: number;
    page: number;
    last_page: number;
  };
}