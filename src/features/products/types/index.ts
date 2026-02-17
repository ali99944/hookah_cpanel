import { type Category } from "../../categories/types";

export type ProductStatus = 'active' | 'inactive';

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
  source?: string;
}

export interface Product {
  id: number;
  category_id: number;
  collection_id?: number;
  name: string;
  description: string | null;
  price: number;
  status: ProductStatus;
  cover_image: string | null;
  gallery: ProductGalleryImage[];
  gallery_images?: ProductGalleryImage[];
  attributes: ProductAttribute[];
  features: ProductFeature[];
  created_at: string;
  updated_at: string;

  collection?: Category;
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
