

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Theme, Language, Page, Lead, User, Deal, Campaign, Developer, Project, Unit, Owner, Service, ServicePackage, ServiceProvider, Product, ProductCategory, Supplier } from '../types';
import { translations, MOCK_USERS, MOCK_CONNECTED_ACCOUNTS, MOCK_LEADS, MOCK_DEALS, MOCK_CAMPAIGNS, MOCK_DEVELOPERS, MOCK_PROJECTS, MOCK_UNITS, MOCK_OWNERS, MOCK_SERVICES, MOCK_SERVICE_PACKAGES, MOCK_SERVICE_PROVIDERS, MOCK_PRODUCTS, MOCK_PRODUCT_CATEGORIES, MOCK_SUPPLIERS } from '../constants';

// --- Helper Functions ---
const hexToHsl = (hex: string): [number, number, number] | null => {
    if (!hex) return null;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

type ConnectedAccount = { id: number; name: string; status: string; link?: string; phone?: string; };

// --- CONTEXT ---
export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  t: (key: keyof typeof translations.en) => string;
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isAddLeadModalOpen: boolean;
  setIsAddLeadModalOpen: (isOpen: boolean) => void;
  isAddActionModalOpen: boolean;
  setIsAddActionModalOpen: (isOpen: boolean) => void;
  isAssignLeadModalOpen: boolean;
  setIsAssignLeadModalOpen: (isOpen: boolean) => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (isOpen: boolean) => void;
  checkedLeadIds: Set<number>;
  setCheckedLeadIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  activeSubPageColor: string;
  setActiveSubPageColor: (color: string) => void;
  siteLogo: string | null;
  setSiteLogo: (logo: string | null) => void;

  // Inventory states
  isUnitsFilterDrawerOpen: boolean;
  setIsUnitsFilterDrawerOpen: (isOpen: boolean) => void;
  isAddDeveloperModalOpen: boolean;
  setIsAddDeveloperModalOpen: (isOpen: boolean) => void;
  isAddProjectModalOpen: boolean;
  setIsAddProjectModalOpen: (isOpen: boolean) => void;
  isAddUnitModalOpen: boolean;
  setIsAddUnitModalOpen: (isOpen: boolean) => void;
  isAddOwnerModalOpen: boolean;
  setIsAddOwnerModalOpen: (isOpen: boolean) => void;
  isEditOwnerModalOpen: boolean;
  setIsEditOwnerModalOpen: (isOpen: boolean) => void;
  editingOwner: Owner | null;
  setEditingOwner: React.Dispatch<React.SetStateAction<Owner | null>>;
  isEditDeveloperModalOpen: boolean;
  setIsEditDeveloperModalOpen: (isOpen: boolean) => void;
  editingDeveloper: Developer | null;
  setEditingDeveloper: React.Dispatch<React.SetStateAction<Developer | null>>;
  isEditProjectModalOpen: boolean;
  setIsEditProjectModalOpen: (isOpen: boolean) => void;
  editingProject: Project | null;
  setEditingProject: React.Dispatch<React.SetStateAction<Project | null>>;


  // Deals states
  isDealsFilterDrawerOpen: boolean;
  setIsDealsFilterDrawerOpen: (isOpen: boolean) => void;

  // Users states
  isAddUserModalOpen: boolean;
  setIsAddUserModalOpen: (isOpen: boolean) => void;
  isEditUserModalOpen: boolean;
  setIsEditUserModalOpen: (isOpen: boolean) => void;
  isDeleteUserModalOpen: boolean;
  setIsDeleteUserModalOpen: (isOpen: boolean) => void;

  // Marketing states
  isAddCampaignModalOpen: boolean;
  setIsAddCampaignModalOpen: (isOpen: boolean) => void;

  // Integrations states
  isManageIntegrationAccountModalOpen: boolean;
  setIsManageIntegrationAccountModalOpen: (isOpen: boolean) => void;
  connectedAccounts: typeof MOCK_CONNECTED_ACCOUNTS;
  setConnectedAccounts: React.Dispatch<React.SetStateAction<typeof MOCK_CONNECTED_ACCOUNTS>>;
  editingAccount: ConnectedAccount | null;
  setEditingAccount: React.Dispatch<React.SetStateAction<ConnectedAccount | null>>;
  
  // Change Password Modal state
  isChangePasswordModalOpen: boolean;
  setIsChangePasswordModalOpen: (isOpen: boolean) => void;

  // Data states
  users: User[];
  addUser: (user: Omit<User, 'id' | 'avatar'>) => void;
  deleteUser: (userId: number) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'history' | 'lastFeedback' | 'notes' | 'lastStage' | 'reminder'>) => void;
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  deleteDeal: (dealId: number) => void;
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  deleteCampaign: (campaignId: number) => void;
  developers: Developer[];
  addDeveloper: (developer: Omit<Developer, 'id' | 'code'>) => void;
  updateDeveloper: (developer: Developer) => void;
  deleteDeveloper: (developerId: number) => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'code'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: number) => void;
  units: Unit[];
  addUnit: (unit: Omit<Unit, 'id' | 'code' | 'isSold'>) => void;
  owners: Owner[];
  addOwner: (owner: Omit<Owner, 'id' | 'code'>) => void;
  updateOwner: (owner: Owner) => void;
  deleteOwner: (ownerId: number) => void;
  // Services data
  services: Service[];
  addService: (service: Omit<Service, 'id' | 'code'>) => void;
  updateService: (service: Service) => void;
  deleteService: (serviceId: number) => void;
  servicePackages: ServicePackage[];
  addServicePackage: (servicePackage: Omit<ServicePackage, 'id' | 'code'>) => void;
  updateServicePackage: (servicePackage: ServicePackage) => void;
  deleteServicePackage: (packageId: number) => void;
  serviceProviders: ServiceProvider[];
  addServiceProvider: (provider: Omit<ServiceProvider, 'id' | 'code'>) => void;
  updateServiceProvider: (provider: ServiceProvider) => void;
  deleteServiceProvider: (providerId: number) => void;
  // Products data
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'code'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  productCategories: ProductCategory[];
  addProductCategory: (category: Omit<ProductCategory, 'id' | 'code'>) => void;
  updateProductCategory: (category: ProductCategory) => void;
  deleteProductCategory: (categoryId: number) => void;
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id' | 'code'>) => void;
  updateSupplier: (supplier: Supplier) => void;
  deleteSupplier: (supplierId: number) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};

// FIX: Made children optional to fix missing children prop error.
type AppProviderProps = { children?: ReactNode };
export const AppProvider = ({ children }: AppProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedInState] = useState(() => {
    const stored = localStorage.getItem('isLoggedIn');
    return stored === 'true';
  });
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        // Find the user in the users array to get the latest data
        return MOCK_USERS.find(u => u.id === user.id) || user;
      } catch {
        return MOCK_USERS[0];
      }
    }
    return MOCK_USERS[0];
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6'); // Default blue
  const [activeSubPageColor, setActiveSubPageColorState] = useState('#91beee'); // User requested color
  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  
  // Data states
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [developers, setDevelopers] = useState<Developer[]>(MOCK_DEVELOPERS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [units, setUnits] = useState<Unit[]>(MOCK_UNITS);
  const [owners, setOwners] = useState<Owner[]>(MOCK_OWNERS);
  // Services data
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>(MOCK_SERVICE_PACKAGES);
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>(MOCK_SERVICE_PROVIDERS);
  // Products data
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(MOCK_PRODUCT_CATEGORIES);
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  
  // Modals and drawers state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isAddActionModalOpen, setIsAddActionModalOpen] = useState(false);
  const [isAssignLeadModalOpen, setIsAssignLeadModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [checkedLeadIds, setCheckedLeadIds] = useState<Set<number>>(new Set());

  // Inventory state
  const [isUnitsFilterDrawerOpen, setIsUnitsFilterDrawerOpen] = useState(false);
  const [isAddDeveloperModalOpen, setIsAddDeveloperModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [isAddOwnerModalOpen, setIsAddOwnerModalOpen] = useState(false);
  const [isEditOwnerModalOpen, setIsEditOwnerModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);
  const [isEditDeveloperModalOpen, setIsEditDeveloperModalOpen] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Deals state
  const [isDealsFilterDrawerOpen, setIsDealsFilterDrawerOpen] = useState(false);
  
  // Users state
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  
  // Marketing state
  const [isAddCampaignModalOpen, setIsAddCampaignModalOpen] = useState(false);

  // Integrations state
  const [isManageIntegrationAccountModalOpen, setIsManageIntegrationAccountModalOpen] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState(MOCK_CONNECTED_ACCOUNTS);
  const [editingAccount, setEditingAccount] = useState<ConnectedAccount | null>(null);
  
  // Change Password Modal state
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) setThemeState(storedTheme);
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang) setLanguage(storedLang);
    const storedColor = localStorage.getItem('primaryColor');
    if (storedColor) setPrimaryColor(storedColor);
    const storedSubPageColor = localStorage.getItem('activeSubPageColor');
    if (storedSubPageColor) setActiveSubPageColorState(storedSubPageColor);
    const storedLogo = localStorage.getItem('siteLogo');
    if (storedLogo) setSiteLogo(storedLogo);

    // Load current user from localStorage if logged in
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const user = users.find(u => u.id === userData.id) || MOCK_USERS.find(u => u.id === userData.id);
          if (user) {
            setCurrentUserState(user);
          }
        } catch {
          // If error, keep default user
        }
      }
    }

    const handleResize = () => {
        if (window.innerWidth >= 1024) { // Tailwind's lg breakpoint
            setIsSidebarOpen(false);
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoggedIn, users]);

  const setIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedInState(loggedIn);
    localStorage.setItem('isLoggedIn', loggedIn.toString());
    if (!loggedIn) {
      localStorage.removeItem('currentUser');
      setCurrentUserState(null);
    }
  };

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ id: user.id, name: user.name, role: user.role }));
    } else {
      localStorage.removeItem('currentUser');
    }
  };

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };
  
  const setLang = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }

  const setAppColor = (color: string) => {
    setPrimaryColor(color);
    localStorage.setItem('primaryColor', color);
  };

  const setAppSubPageColor = (color: string) => {
    setActiveSubPageColorState(color);
    localStorage.setItem('activeSubPageColor', color);
  };

  useEffect(() => {
    const hsl = hexToHsl(primaryColor);
    if(hsl) {
        const [h, s, l] = hsl;
        const root = document.documentElement;
        root.style.setProperty('--primary', `${h} ${s}% ${l}%`);
        root.style.setProperty('--primary-50', `${h} ${s}% ${l + (100 - l) * 0.95}%`);
        root.style.setProperty('--primary-100', `${h} ${s}% ${l + (100 - l) * 0.9}%`);
        root.style.setProperty('--primary-200', `${h} ${s}% ${l + (100 - l) * 0.8}%`);
        root.style.setProperty('--primary-300', `${h} ${s}% ${l + (100 - l) * 0.7}%`);
        root.style.setProperty('--primary-400', `${h} ${s}% ${l + (100 - l) * 0.6}%`);
        root.style.setProperty('--primary-500', `${h} ${s}% ${l}%`);
        root.style.setProperty('--primary-600', `${h} ${s}% ${l * 0.9}%`);
        root.style.setProperty('--primary-700', `${h} ${s}% ${l * 0.8}%`);
        root.style.setProperty('--primary-800', `${h} ${s}% ${l * 0.7}%`);
        root.style.setProperty('--primary-900', `${h} ${s}% ${l * 0.6}%`);
        // Foreground color logic
        const foregroundColor = l > 50 ? '222.2 47.4% 11.2%' : '210 40% 98%';
        root.style.setProperty('--primary-foreground', foregroundColor);
    }
  }, [primaryColor]);
  
  useEffect(() => {
    const hsl = hexToHsl(activeSubPageColor);
    if(hsl) {
        const [h, s, l] = hsl;
        const root = document.documentElement;
        root.style.setProperty('--primary-active-sub', `${h} ${s}% ${l}%`);
    }
  }, [activeSubPageColor]);

  useEffect(() => {
    setTheme(theme);
    setLang(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, language]);

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  // --- CRUD Functions ---
  const addUser = (userData: Omit<User, 'id' | 'avatar'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now(),
      avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/200`,
    };
    setUsers(prev => [...prev, newUser]);
  };
  const deleteUser = (userId: number) => setUsers(prev => prev.filter(u => u.id !== userId));

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'history' | 'lastFeedback' | 'notes' | 'lastStage' | 'reminder'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      history: [],
      lastFeedback: 'Lead Created',
      notes: '',
      lastStage: 'Untouched',
      reminder: '',
      status: 'Untouched',
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const addDeal = (dealData: Omit<Deal, 'id'>) => {
    const newDeal: Deal = { ...dealData, id: Date.now() };
    setDeals(prev => [newDeal, ...prev]);
  };
  const deleteDeal = (dealId: number) => setDeals(prev => prev.filter(d => d.id !== dealId));

  const addCampaign = (campaignData: Omit<Campaign, 'id'>) => {
    const newCampaign: Campaign = { ...campaignData, id: Date.now() };
    setCampaigns(prev => [newCampaign, ...prev]);
  };
  const deleteCampaign = (campaignId: number) => setCampaigns(prev => prev.filter(c => c.id !== campaignId));
  
  const addDeveloper = (developerData: Omit<Developer, 'id' | 'code'>) => {
    const lastCodeNum = developers.reduce((max, d) => {
        const numStr = d.code.replace('DEV', '');
        const num = parseInt(numStr, 10);
        return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newDeveloper: Developer = {
      ...developerData,
      id: Date.now(),
      code: `DEV${(lastCodeNum + 1).toString().padStart(3, '0')}`
    };
    setDevelopers(prev => [newDeveloper, ...prev]);
  };
  const updateDeveloper = (updatedDeveloper: Developer) => {
    setDevelopers(prev => prev.map(d => d.id === updatedDeveloper.id ? updatedDeveloper : d));
  };
  const deleteDeveloper = (developerId: number) => setDevelopers(prev => prev.filter(d => d.id !== developerId));


  const addProject = (projectData: Omit<Project, 'id' | 'code'>) => {
      const lastCodeNum = projects.reduce((max, p) => {
          const num = parseInt(p.code.replace('PROJ', ''));
          return num > max ? num : max;
      }, 0);
      const newProject: Project = { 
          ...projectData, 
          id: Date.now(),
          code: `PROJ${(lastCodeNum + 1).toString().padStart(3, '0')}`
      };
      setProjects(prev => [newProject, ...prev]);
  };
  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };
  const deleteProject = (projectId: number) => setProjects(prev => prev.filter(p => p.id !== projectId));
  
  const addUnit = (unitData: Omit<Unit, 'id' | 'code' | 'isSold'>) => {
       const lastCodeNum = units.reduce((max, u) => {
          const num = parseInt(u.code.replace('UNIT', ''));
          return num > max ? num : max;
      }, 0);
      const newUnit: Unit = { 
          ...unitData, 
          id: Date.now(),
          code: `UNIT${(lastCodeNum + 1).toString().padStart(3, '0')}`,
          isSold: false
      };
      setUnits(prev => [newUnit, ...prev]);
  };

  const addOwner = (ownerData: Omit<Owner, 'id' | 'code'>) => {
    const lastCodeNum = owners.reduce((max, o) => {
        const num = parseInt(o.code.replace('OWN', ''));
        return num > max ? num : max;
    }, 0);
    const newOwner: Owner = {
      ...ownerData,
      id: Date.now(),
      code: `OWN${(lastCodeNum + 1).toString().padStart(3, '0')}`
    };
    setOwners(prev => [newOwner, ...prev]);
  };
  const updateOwner = (updatedOwner: Owner) => {
    setOwners(prev => prev.map(o => o.id === updatedOwner.id ? updatedOwner : o));
  };
  const deleteOwner = (ownerId: number) => setOwners(prev => prev.filter(o => o.id !== ownerId));

  // Services CRUD
  const addService = (serviceData: Omit<Service, 'id' | 'code'>) => {
    const lastCodeNum = services.reduce((max, s) => {
      const num = parseInt(s.code.replace('SVC', ''));
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newService: Service = {
      ...serviceData,
      id: Date.now(),
      code: `SVC${(lastCodeNum + 1).toString().padStart(3, '0')}`
    };
    setServices(prev => [newService, ...prev]);
  };
  const updateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };
  const deleteService = (serviceId: number) => setServices(prev => prev.filter(s => s.id !== serviceId));

  const addServicePackage = (packageData: Omit<ServicePackage, 'id' | 'code'>) => {
    const lastCodeNum = servicePackages.reduce((max, p) => {
      const num = parseInt(p.code.replace('PKG', ''));
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newPackage: ServicePackage = {
      ...packageData,
      id: Date.now(),
      code: `PKG${(lastCodeNum + 1).toString().padStart(3, '0')}`
    };
    setServicePackages(prev => [newPackage, ...prev]);
  };
  const updateServicePackage = (updatedPackage: ServicePackage) => {
    setServicePackages(prev => prev.map(p => p.id === updatedPackage.id ? updatedPackage : p));
  };
  const deleteServicePackage = (packageId: number) => setServicePackages(prev => prev.filter(p => p.id !== packageId));

  const addServiceProvider = (providerData: Omit<ServiceProvider, 'id' | 'code'>) => {
    const lastCodeNum = serviceProviders.reduce((max, p) => {
      const num = parseInt(p.code.replace('PRV', ''));
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newProvider: ServiceProvider = {
      ...providerData,
      id: Date.now(),
      code: `PRV${(lastCodeNum + 1).toString().padStart(3, '0')}`
    };
    setServiceProviders(prev => [newProvider, ...prev]);
  };
  const updateServiceProvider = (updatedProvider: ServiceProvider) => {
    setServiceProviders(prev => prev.map(p => p.id === updatedProvider.id ? updatedProvider : p));
  };
  const deleteServiceProvider = (providerId: number) => setServiceProviders(prev => prev.filter(p => p.id !== providerId));

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'code'>) => {
    const lastCodeNum = products.reduce((max, p) => {
      const num = parseInt(p.code.replace('PRD', ''));
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      code: `PRD${(lastCodeNum + 1).toString().padStart(3, '0')}`
    };
    setProducts(prev => [newProduct, ...prev]);
  };
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  const deleteProduct = (productId: number) => setProducts(prev => prev.filter(p => p.id !== productId));

  const addProductCategory = (categoryData: Omit<ProductCategory, 'id' | 'code'>) => {
    const lastCodeNum = productCategories.reduce((max, c) => {
      const num = parseInt(c.code.replace('CAT', ''));
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newCategory: ProductCategory = {
      ...categoryData,
      id: Date.now(),
      code: `CAT${(lastCodeNum + 1).toString().padStart(3, '0')}`
    };
    setProductCategories(prev => [newCategory, ...prev]);
  };
  const updateProductCategory = (updatedCategory: ProductCategory) => {
    setProductCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };
  const deleteProductCategory = (categoryId: number) => setProductCategories(prev => prev.filter(c => c.id !== categoryId));

  const addSupplier = (supplierData: Omit<Supplier, 'id' | 'code'>) => {
    const lastCodeNum = suppliers.reduce((max, s) => {
      const num = parseInt(s.code.replace('SUP', ''));
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const newSupplier: Supplier = {
      ...supplierData,
      id: Date.now(),
      code: `SUP${(lastCodeNum + 1).toString().padStart(3, '0')}`
    };
    setSuppliers(prev => [newSupplier, ...prev]);
  };
  const updateSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
  };
  const deleteSupplier = (supplierId: number) => setSuppliers(prev => prev.filter(s => s.id !== supplierId));


  const value: AppContextType = { 
    theme, setTheme, 
    language, setLanguage: setLang, 
    isLoggedIn, setIsLoggedIn, 
    currentPage, setCurrentPage, 
    t, 
    selectedLead, setSelectedLead,
    selectedUser, setSelectedUser,
    currentUser, setCurrentUser,
    isSidebarOpen, setIsSidebarOpen,
    isAddLeadModalOpen, setIsAddLeadModalOpen,
    isAddActionModalOpen, setIsAddActionModalOpen,
    isAssignLeadModalOpen, setIsAssignLeadModalOpen,
    isFilterDrawerOpen, setIsFilterDrawerOpen,
    checkedLeadIds, setCheckedLeadIds,
    primaryColor, setPrimaryColor: setAppColor,
    activeSubPageColor, setActiveSubPageColor: setAppSubPageColor,
    siteLogo, setSiteLogo,
    isUnitsFilterDrawerOpen, setIsUnitsFilterDrawerOpen,
    isAddDeveloperModalOpen, setIsAddDeveloperModalOpen,
    isAddProjectModalOpen, setIsAddProjectModalOpen,
    isAddUnitModalOpen, setIsAddUnitModalOpen,
    isAddOwnerModalOpen, setIsAddOwnerModalOpen,
    isEditOwnerModalOpen, setIsEditOwnerModalOpen,
    editingOwner, setEditingOwner,
    isEditDeveloperModalOpen, setIsEditDeveloperModalOpen,
    editingDeveloper, setEditingDeveloper,
    isEditProjectModalOpen, setIsEditProjectModalOpen,
    editingProject, setEditingProject,
    isDealsFilterDrawerOpen, setIsDealsFilterDrawerOpen,
    isAddUserModalOpen, setIsAddUserModalOpen,
    isEditUserModalOpen, setIsEditUserModalOpen,
    isDeleteUserModalOpen, setIsDeleteUserModalOpen,
    isAddCampaignModalOpen, setIsAddCampaignModalOpen,
    isManageIntegrationAccountModalOpen, setIsManageIntegrationAccountModalOpen,
    connectedAccounts, setConnectedAccounts,
    editingAccount, setEditingAccount,
    isChangePasswordModalOpen, setIsChangePasswordModalOpen,
    // Data and functions
    users, addUser, deleteUser,
    leads, addLead,
    deals, addDeal, deleteDeal,
    campaigns, addCampaign, deleteCampaign,
    developers, addDeveloper, updateDeveloper, deleteDeveloper,
    projects, addProject, updateProject, deleteProject,
    units, addUnit,
    owners, addOwner, updateOwner, deleteOwner,
    // Services
    services, addService, updateService, deleteService,
    servicePackages, addServicePackage, updateServicePackage, deleteServicePackage,
    serviceProviders, addServiceProvider, updateServiceProvider, deleteServiceProvider,
    // Products
    products, addProduct, updateProduct, deleteProduct,
    productCategories, addProductCategory, updateProductCategory, deleteProductCategory,
    suppliers, addSupplier, updateSupplier, deleteSupplier,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};