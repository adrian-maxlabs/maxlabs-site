export type InquiryServiceInterest =
  | "landing_pages"
  | "custom_web_app"
  | "mobile_apps"
  | "cloud_integration"
  | "dashboards"
  | "automation"
  | "crm_erp"
  | "security_audits"
  | "digitalization"
  | "support"
  | "other";

export interface ContactInquiryInsert {
  full_name: string;
  company_name: string | null;
  email: string;
  phone: string;
  service_interest: InquiryServiceInterest;
  message: string | null;
  preferred_contact_time: string | null;
}

export type Database = {
  public: {
    Tables: {
      contact_inquiries: {
        Row: ContactInquiryInsert & {
          id: string;
          created_at: string;
        };
        Insert: ContactInquiryInsert;
        Update: Partial<ContactInquiryInsert>;
      };
    };
  };
};
