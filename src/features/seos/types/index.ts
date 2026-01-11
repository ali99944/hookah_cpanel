export interface SeoPage {
  key: string;          // e.g., 'home', 'products', 'contact'
  page_name: string;    // e.g., 'الرئيسية'
  title: string;
  description: string;
  keywords: string | null;
  og_image: string | null; // Open Graph Image URL
  updated_at: string;
}
