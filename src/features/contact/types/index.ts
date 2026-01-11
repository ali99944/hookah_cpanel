export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface ContactResponse {
  data: ContactMessage[];
  meta?: {
    total: number;
    page: number;
    last_page: number;
  };
}

export interface ContactFilters {
  search?: string; // Will filter by name, email, or subject
}