export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type Page = 
  | 'Dashboard' | 'Leads' | 'Activities' | 'Inventory' | 'Deals' 
  | 'Users' | 'Marketing' | 'Todos' | 'Reports' | 'Integrations' 
  | 'Settings' | 'ViewLead' | 'CreateDeal'
  // Sub-pages
  | 'All Leads' | 'Fresh Leads' | 'Cold Leads' | 'My Leads' | 'Rotated Leads'
  | 'Properties' | 'Owners'
  | 'Campaigns'
  | 'Teams Report' | 'Employees Report' | 'Marketing Report'
  | 'Facebook' | 'TikTok' | 'WhatsApp';

export interface User {
  id: number;
  name: string;
  role: string;
  phone: string;
  avatar: string;
  email?: string;
}

export interface TimelineEntry {
  id: number;
  user: string;
  avatar: string;
  action: string;
  details: string;
  date: string;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  phone2?: string;
  lastFeedback: string;
  notes: string;
  lastStage: string;
  reminder: string;
  status: 'Untouched' | 'Touched' | 'Following' | 'Meeting' | 'No Answer' | 'Out Of Service' | 'All';
  type: 'Fresh' | 'Cold' | 'My' | 'Rotated' | 'All';
  assignedTo: number; // User ID
  budget: number;
  authority: string;
  communicationWay: string;
  priority: 'High' | 'Medium' | 'Low';
  channel: string;
  createdAt: string;
  history: TimelineEntry[];
}

export interface Deal {
  id: number;
  clientName: string;
  unit: string;
  paymentMethod: string;
  status: string;
  value: number;
  project?: string;
  leadId?: number;
  startedBy?: number; // user ID
  closedBy?: number; // user ID
  startDate?: string;
  closedDate?: string;
}

export interface Activity {
  id: number;
  user: string;
  lead: string;
  type: 'Call' | 'Meeting' | 'Whatsapp' | 'Note';
  date: string;
  notes: string;
}

export interface Todo {
  id: number;
  type: 'Hold Reminder' | 'Meeting' | 'Call';
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
  logo: string;
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

// Settings Page Types
export interface Channel {
    id: number;
    name: string;
    type: 'Web' | 'Social' | 'Direct';
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
    category: 'In Progress' | 'Completed' | 'On Hold';
    color: string;
    isDefault?: boolean;
    isHidden?: boolean;
}