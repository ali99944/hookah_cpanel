export interface SiteIdentity {
  site_name: string;
  site_description: string;
  logo_url: string | null;
  favicon_url: string | null;
  copyright: string;
  maintenance_mode: boolean;
  maintenance_mode_message: string;
}

export interface ContactInfo {
  primary_phone: string;
  secondary_phone: string | null;
  primary_email: string;
  secondary_email: string | null;
  whatsapp_number: string;
  address: string;
  google_maps_link: string;
  working_hours: string;
}

export interface SocialMedia {
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
}

// The main response shape
export interface GlobalSettings {
  site_identity: SiteIdentity;
  contact_info: ContactInfo;
  social_media: SocialMedia;
}