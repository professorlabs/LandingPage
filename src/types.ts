
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface VisitorStats {
  count: string;
  label: string;
}

export enum PageType {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  SUPPORT = 'SUPPORT',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS'
}

export interface InquiryFormData {
  email: string;
  productInquiry: string;
}
