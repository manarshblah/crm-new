
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Theme, Language, Page, Lead, User } from '../types';
import { translations, MOCK_USERS } from '../constants';

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

  // Deals states
  isDealsFilterDrawerOpen: boolean;
  setIsDealsFilterDrawerOpen: (isOpen: boolean) => void;

  // Users states
  isEditUserModalOpen: boolean;
  setIsEditUserModalOpen: (isOpen: boolean) => void;
  isDeleteUserModalOpen: boolean;
  setIsDeleteUserModalOpen: (isOpen: boolean) => void;

  // Marketing states
  isAddCampaignModalOpen: boolean;
  setIsAddCampaignModalOpen: (isOpen: boolean) => void;

  // Integrations states
  isAddIntegrationAccountModalOpen: boolean;
  setIsAddIntegrationAccountModalOpen: (isOpen: boolean) => void;
  
  // Change Password Modal state
  isChangePasswordModalOpen: boolean;
  setIsChangePasswordModalOpen: (isOpen: boolean) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};

type AppProviderProps = { children: ReactNode };
export const AppProvider = ({ children }: AppProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6'); // Default blue
  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  
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
  
  // Deals state
  const [isDealsFilterDrawerOpen, setIsDealsFilterDrawerOpen] = useState(false);
  
  // Users state
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  
  // Marketing state
  const [isAddCampaignModalOpen, setIsAddCampaignModalOpen] = useState(false);

  // Integrations state
  const [isAddIntegrationAccountModalOpen, setIsAddIntegrationAccountModalOpen] = useState(false);
  
  // Change Password Modal state
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) setThemeState(storedTheme);
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang) setLanguage(storedLang);
    const storedColor = localStorage.getItem('primaryColor');
    if (storedColor) setPrimaryColor(storedColor);
    const storedLogo = localStorage.getItem('siteLogo');
    if (storedLogo) setSiteLogo(storedLogo);

    const handleResize = () => {
        if (window.innerWidth >= 1024) { // Tailwind's lg breakpoint
            setIsSidebarOpen(false);
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };
  
  const setLang = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  const setAppColor = (color: string) => {
    setPrimaryColor(color);
    localStorage.setItem('primaryColor', color);
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
    setTheme(theme);
    setLang(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, language]);

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  const value = { 
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
    siteLogo, setSiteLogo,
    isUnitsFilterDrawerOpen, setIsUnitsFilterDrawerOpen,
    isAddDeveloperModalOpen, setIsAddDeveloperModalOpen,
    isAddProjectModalOpen, setIsAddProjectModalOpen,
    isAddUnitModalOpen, setIsAddUnitModalOpen,
    isAddOwnerModalOpen, setIsAddOwnerModalOpen,
    isDealsFilterDrawerOpen, setIsDealsFilterDrawerOpen,
    isEditUserModalOpen, setIsEditUserModalOpen,
    isDeleteUserModalOpen, setIsDeleteUserModalOpen,
    isAddCampaignModalOpen, setIsAddCampaignModalOpen,
    isAddIntegrationAccountModalOpen, setIsAddIntegrationAccountModalOpen,
    isChangePasswordModalOpen, setIsChangePasswordModalOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};