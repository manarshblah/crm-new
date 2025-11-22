
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type Page = 
  | 'Dashboard' | 'Leads' | 'Activities' | 'Inventory' | 'Deals' 
  | 'Users' | 'Marketing' | 'Todos' | 'Reports' | 'Integrations' 
  | 'Settings' | 'ViewLead' | 'CreateDeal' | 'Profile'
  // Sub-pages
  | 'All Leads' | 'Fresh Leads' | 'Cold Leads' | 'My Leads' | 'Rotated Leads'
  | 'Properties' | 'Owners'
  | 'Services' | 'Service Packages' | 'Service Providers'
  | 'Products' | 'Product Categories' | 'Suppliers'
  | 'Campaigns'
  | 'Teams Report' | 'Employees Report' | 'Marketing Report'
  | 'Meta' | 'TikTok' | 'WhatsApp';

export interface Company {
  id: number;
  name: string;
  specialization: 'real_estate' | 'services' | 'products';
}

export interface User {
  id: number;
  name: string;
  role: string;
  phone: string;
  avatar: string;
  email?: string;
  username?: string;
  password?: string;
  company?: Company;
}

export interface TimelineEntry {
  id: number;
  user: string;
  avatar: string;
  action: string;
  details: string;
  date: string;
  stage?: string; // Optional: formatted stage name for better display
}

export interface ClientTask {
  id: number;
  clientId: number;
  stage: string;
  notes: string;
  reminderDate: string | null;
  createdBy: number;
  createdAt: string;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  status: 'Untouched' | 'Touched' | 'Following' | 'Meeting' | 'No Answer' | 'Out Of Service' | 'All';
  type: 'Fresh' | 'Cold' | 'My' | 'Rotated' | 'All';
  assignedTo: number; // User ID
  budget: number;
  communicationWay: string;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  // Computed fields (not in API, calculated from ClientTasks)
  lastFeedback?: string; // From last ClientTask notes
  notes?: string; // From last ClientTask notes
  lastStage?: string; // From last ClientTask stage or status
}

export interface Deal {
  id: number;
  clientName: string;
  paymentMethod: string;
  status: string;
  value: number;
  leadId?: number;
  startedBy?: number; // user ID
  closedBy?: number; // user ID
  startDate?: string;
  closedDate?: string;
  discountPercentage?: number;
  discountAmount?: number;
  salesCommissionPercentage?: number;
  salesCommissionAmount?: number;
  description?: string;
  // Real estate specific fields (only for real_estate specialization)
  unit?: string;
  project?: string;
}

// TaskStage enum values matching API TaskStage enum
export type TaskStage = 
  | 'following'
  | 'meeting'
  | 'done_meeting'
  | 'follow_after_meeting'
  | 'reschedule_meeting'
  | 'cancellation'
  | 'no_answer'
  | 'out_of_service'
  | 'not_interested'
  | 'whatsapp_pending'
  | 'hold'
  | 'broker'
  | 'resale';

export interface Activity {
  id: number;
  user: string;
  lead: string;
  stage: TaskStage; // Changed from 'type' to 'stage' to match API
  date: string;
  notes: string;
}

export interface Todo {
  id: number;
  stage: TaskStage; // Changed from 'type' to 'stage' to match API
  leadName: string;
  leadPhone: string;
  dueDate: string;
}

export interface Campaign {
  id: number;
  name: string;
  code: string;
  budget: number;
  createdAt: string;
  isActive: boolean;
}

export interface Developer {
  id: number;
  code: string;
  name: string;
}

export interface Project {
  id: number;
  code: string;
  name: string;
  developer: string;
  type: string;
  city: string;
  paymentMethod: string;
}

export interface Unit {
  id: number;
  code: string;
  project: string;
  bedrooms: number;
  price: number;
  bathrooms: number;
  type: string;
  finishing: string;
  city: string;
  district: string;
  zone: string;
  isSold: boolean;
}

export interface Owner {
  id: number;
  code: string;
  city: string;
  district: string;
  name: string;
  phone: string;
}

// Services Types
export interface Service {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "1 hour", "30 minutes"
  category: string;
  provider?: string;
  isActive: boolean;
}

export interface ServicePackage {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  services: number[]; // Service IDs
  duration: string;
  isActive: boolean;
}

export interface ServiceProvider {
  id: number;
  code: string;
  name: string;
  phone: string;
  email: string;
  specialization: string;
  rating?: number;
}

// Products Types
export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  supplier?: string;
  sku?: string;
  image?: string;
  isActive: boolean;
}

export interface ProductCategory {
  id: number;
  code: string;
  name: string;
  description: string;
  parentCategory?: number; // For nested categories
}

export interface Supplier {
  id: number;
  code: string;
  name: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  contactPerson: string;
  specialization: string;
}

// Settings Page Types
export interface Channel {
    id: number;
    name: string;
    type: string;
    priority: 'High' | 'Medium' | 'Low';
}

export interface Stage {
    id: number;
    name: string;
    description: string;
    color: string;
    required: boolean;
    autoAdvance: boolean;
}

export interface Status {
    id: number;
    name: string;
    description: string;
    category: 'Active' | 'Inactive' | 'Follow Up' | 'Closed';
    color: string;
    isDefault?: boolean;
    isHidden?: boolean;
}