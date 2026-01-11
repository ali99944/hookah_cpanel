export interface Policy {
  key: string;          // e.g., 'privacy-policy', 'terms'
  name: string;         // e.g., 'سياسة الخصوصية'
  content: string;      // HTML Content
  
  // SEO Fields (Stored directly on policy)
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  
  updated_at: string;
}