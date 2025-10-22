

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

const SidebarItem = ({ name, icon: Icon, isActive, hasSubItems, isSubItem, isOpen, onClick }: SidebarItemProps) => (
    <a
        href="#"
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
            isSubItem ? 'ps-8' : ''
        } ${
            isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
    >
        {Icon && <Icon className="w-5 h-5 me-3" />}
        <span className="flex-1 whitespace-nowrap">{name}</span>
        {hasSubItems && <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
    </a>
);


export const Sidebar = () => {
    const { currentPage, setCurrentPage, setIsLoggedIn, isSidebarOpen, setIsSidebarOpen, t, siteLogo } = useAppContext();
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

    return (
        <aside className={`fixed inset-y-0 z-40 flex h-full w-64 flex-col bg-gray-100 dark:bg-gray-900 border-e dark:border-gray-800 rtl:border-e-0 rtl:border-s transform transition-transform duration-300 ease-in-out 
                            lg:translate-x-0 
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'}`}>
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 h-16">
                <div className="flex items-center gap-2">
                    {siteLogo && <img src={siteLogo} alt="Site Logo" className="h-10 object-contain" />}
                    <h1 className="text-xl font-bold text-primary">Deal CRM</h1>
                </div>
                <Button variant="ghost" className="lg:hidden p-1 -mr-2 rtl:-mr-0 rtl:-ml-2" onClick={() => setIsSidebarOpen(false)}>
                    <XIcon className="h-6 w-6" />
                </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {SIDEBAR_ITEMS.map((item) => {
                    const isOpen = openSubMenus[item.name] ?? false;
                    const itemNameKey = toCamelCase(item.name) as keyof typeof translations.en;
                    return (
                        <div key={item.name}>
                            <SidebarItem
                                name={t(itemNameKey)}
                                icon={item.icon}
                                isActive={currentPage === item.name || (!!item.subItems && item.subItems.some(sub => sub === currentPage))}
                                hasSubItems={!!item.subItems}
                                isOpen={isOpen}
                                onClick={() => item.subItems ? handleToggleSubMenu(item.name) : handleNavigation(item.name)}
                            />
                            {item.subItems && isOpen && (
                                <div className="ps-4 mt-1 space-y-1">
                                    {item.subItems.map(sub => {
                                        const subItemNameKey = toCamelCase(sub) as keyof typeof translations.en;
                                        return (
                                            <SidebarItem
                                                key={sub}
                                                name={t(subItemNameKey)}
                                                isSubItem
                                                isActive={currentPage === sub}
                                                onClick={() => handleNavigation(sub)}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
            <div className="p-4 border-t dark:border-gray-800">
                <SidebarItem
                    name={t('settings')}
                    icon={SETTINGS_ITEM.icon}
                    isActive={currentPage === 'Settings'}
                    onClick={() => handleNavigation('Settings')}
                />
                 <Button variant="ghost" className="w-full justify-start mt-2" onClick={() => setIsLoggedIn(false)}>
                    <LogOutIcon className="w-5 h-5 me-3" />
                    <span className="flex-1 whitespace-nowrap">{t('logout')}</span>
                </Button>
            </div>
        </aside>
    );
};