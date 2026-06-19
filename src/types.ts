export interface ServiceItem {
  id: number;
  category: string;
  description: string;
  scope: string[];
  rate: string;
  notes: string;
  isHot?: boolean;
}

export interface FounderMember {
  id: number;
  name: string;
  role: string;
  avatarSeed: string; // Used for unique avatar rendering
  avatarBg: string;   // Background color for illustrative avatar
  bio: string;
  visionQuote: string;
  certifications: string[];
  whatsappMessage: string;
  imageUrl?: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  tags: string[];
  avatarSeed: string;
}

export interface CertBadge {
  id: number;
  title: string;
  issuer: string;
  code: string;
  color: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
