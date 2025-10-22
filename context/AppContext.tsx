import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Theme, Language, Page, Lead, User } from '../types';
import { translations } from '../constants';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) setThemeState(storedTheme);
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang) setLanguage(storedLang);

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
    isSidebarOpen, setIsSidebarOpen,
    isAddLeadModalOpen, setIsAddLeadModalOpen,
    isAddActionModalOpen, setIsAddActionModalOpen,
    isAssignLeadModalOpen, setIsAssignLeadModalOpen,
    isFilterDrawerOpen, setIsFilterDrawerOpen,
    checkedLeadIds, setCheckedLeadIds,
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};