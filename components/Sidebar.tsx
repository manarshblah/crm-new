


import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
// FIX: Import translations to be used for type casting.
import { SIDEBAR_ITEMS, SETTINGS_ITEM, translations } from '../constants';
import { Page as PageType } from '../types';
import { Button } from './Button';
import { ChevronDownIcon, XIcon, LogOutIcon } from './icons';

type SidebarItemProps = { 
    name: string; 
    icon?: React.FC<React.SVGProps<SVGSVGElement>>; 
    isActive: boolean; 
    hasSubItems?: boolean; 
    isSubItem?: boolean; 
    isOpen?: boolean; 
    onClick: () => void;
};

// Helper function to convert "Page Name" to "pageName"
const toCamelCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
};

const SidebarItem = ({ name, icon: Icon, isActive, hasSubItems, isSubItem, isOpen, onClick }: SidebarItemProps) => {
    const { language } = useAppContext();
    const activeClass = isActive
        ? isSubItem
            ? 'bg-active-sub text-white dark:bg-primary-600 dark:text-white'
            : 'bg-primary text-white dark:bg-primary-600 dark:text-white'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800';
    
    const iconMargin = language === 'ar' ? 'ml-3' : 'mr-3';
    
    return (
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center px-4 py-2 font-medium rounded-md transition-colors duration-150 ${activeClass}`}
        >
            {Icon && <Icon className={`w-5 h-5 ${iconMargin} ${isActive ? 'text-white' : ''}`} />}
            <span className="flex-1 whitespace-nowrap">{name}</span>
            {hasSubItems && <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
        </a>
    );
};


export const Sidebar = () => {
    const { currentPage, setCurrentPage, setIsLoggedIn, isSidebarOpen, setIsSidebarOpen, t, siteLogo, currentUser, language } = useAppContext();
    const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

    const handleToggleSubMenu = (name: string) => {
        setOpenSubMenus(prev => ({ ...prev, [name]: !prev[name] }));
    };
    
    const handleNavigation = (page: PageType) => {
        setCurrentPage(page);
        if (window.innerWidth < 1024) { // lg breakpoint
            setIsSidebarOpen(false);
        }
    };

    // Get inventory sub-items based on company specialization
    const getInventorySubItems = (): PageType[] => {
        const specialization = currentUser?.company?.specialization;
        switch (specialization) {
            case 'real_estate':
                return ['Properties', 'Owners'];
            case 'services':
                return ['Services', 'Service Packages', 'Service Providers'];
            case 'products':
                return ['Products', 'Product Categories', 'Suppliers'];
            default:
                return ['Properties', 'Owners']; // Default to real estate
        }
    };

    const sidebarBaseClasses = "flex-shrink-0 w-64 bg-white dark:bg-gray-900 flex flex-col fixed md:relative inset-y-0 z-40 transform transition-transform duration-300 ease-in-out";
    const languageSpecificClasses = language === 'ar' 
        ? 'border-l border-gray-200 dark:border-gray-800 right-0' 
        : 'border-r border-gray-200 dark:border-gray-800 left-0';
    
    const mobileTransformClass = language === 'ar'
        ? (isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0')
        : (isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0');
    
    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
            <aside className={`${sidebarBaseClasses} ${languageSpecificClasses} ${mobileTransformClass}`}>
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <img 
                        src={siteLogo || '/logo.png'} 
                        alt="LOOP CRM Logo" 
                        className="h-10 w-auto object-contain" 
                        onError={(e) => {
                            // Fallback if logo fails to load
                            const target = e.target as HTMLImageElement;
                            if (target.src !== '/logo.png') {
                                target.src = '/logo.png';
                            }
                        }}
                    />
                </div>
                <button
                    className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close sidebar"
                >
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                {SIDEBAR_ITEMS.map((item) => {
                    const isOpen = openSubMenus[item.name] ?? false;
                    const itemNameKey = toCamelCase(item.name) as keyof typeof translations.en;
                    // Override subItems for Inventory based on company specialization
                    const subItems = item.name === 'Inventory' ? getInventorySubItems() : item.subItems;
                    return (
                        <div key={item.name}>
                            <SidebarItem
                                name={t(itemNameKey)}
                                icon={item.icon}
                                isActive={currentPage === item.name || (!!subItems && subItems.some(sub => sub === currentPage))}
                                hasSubItems={!!subItems}
                                isOpen={isOpen}
                                onClick={() => subItems ? handleToggleSubMenu(item.name) : handleNavigation(item.name)}
                            />
                            {subItems && isOpen && (
                                <div className="pt-2 pb-1 space-y-1" style={{ [language === 'ar' ? 'paddingRight' : 'paddingLeft']: '1.5rem' }}>
                                    {subItems.map(sub => {
                                        const subItemNameKey = toCamelCase(sub) as keyof typeof translations.en;
                                        return (
                                            <a
                                                key={sub}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNavigation(sub);
                                                }}
                                                className={`block px-4 py-2 font-medium rounded-md transition-colors duration-150 ${
                                                    currentPage === sub
                                                        ? 'bg-gray-100 text-gray-900 dark:bg-primary-600 dark:text-white'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                            >
                                                {t(subItemNameKey)}
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
            <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
                <SidebarItem
                    name={t('settings')}
                    icon={SETTINGS_ITEM.icon}
                    isActive={currentPage === 'Settings'}
                    onClick={() => handleNavigation('Settings')}
                />
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsLoggedIn(false);
                        window.location.href = '/login';
                    }}
                    className="flex items-center px-4 py-2 mt-2 font-medium rounded-md transition-colors duration-150 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <LogOutIcon className={`w-5 h-5 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                    {t('logout')}
                </a>
            </div>
        </aside>
        </>
    );
};