export interface PhysicalNeed {
  id: string;
  category: 'Education' | 'Food' | 'Clothing' | 'Hygiene' | 'Other' | 'Books' | 'Shoes';
  item: string;
  targetQuantity: number;
  currentQuantity: number;
  unit: string;
  urgency: 'High' | 'Medium' | 'Low';
  details?: string;
}

export interface VolunteerPosting {
  id: string;
  title: string;
  details: string;
  startDate: string;
  endDate: string;
  initialInterestCount: number;
  duration_days?: number;
  start_time?: string;
  end_time?: string;
  location?: string;
  volunteers_needed?: number;
  volunteers_joined?: number;
  category?: string;
  status?: string;
  ngo_id?: string;
}

export interface CashWishlistItem {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  currency: string; // e.g., FCFA
}

export interface NGO {
  username: string; // unique slug for URL: e.g., 'hope-for-all'
  name: string;
  logo: string; // Emoji or visual character
  city: 'Douala' | 'Yaoundé' | 'Buea' | 'Bamenda' | 'Kumba' | 'Limbe';
  address: string;
  phone: string; // For WhatsApp and direct call
  whatsappMessage: string;
  description: string;
  establishedYear: number;
  physicalNeeds: PhysicalNeed[];
  volunteerPostings: VolunteerPosting[];
  cashWishlist: CashWishlistItem[];
  volunteerRequestsCount?: number;
  needsCount?: number;
  website?: string;
}
