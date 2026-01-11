import { type Category } from "../../categories/types";

export type ProductStatus = 'active' | 'inactive' | 'draft';

export interface ProductAttribute {
  key: string;
  value: string;
}

export interface ProductFeature {
  key: string;
  value: string;
}

export interface ProductGalleryImage {
  id: number;
  url: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  status: ProductStatus;
  cover_image: string; // URL
  gallery_images: ProductGalleryImage[]; // Relation from backend
  attributes: ProductAttribute[];
  features: ProductFeature[];
  created_at: string;
  updated_at: string;

  category?: Category;
}

export interface ProductResponse {
  data: Product[];
  meta?: {
    total: number;
    page: number;
    last_page: number;
  };
}

export interface SingleProductResponse {
  data: Product;
}