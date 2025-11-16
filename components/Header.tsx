

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from './Button';
import { Input } from './Input';
import { MoonIcon, SunIcon, SearchIcon, MenuIcon } from './icons';
import { Dropdown, DropdownItem } from './Dropdown';

export const Header = () => {
    const { t, theme, setTheme, language, setLanguage, setIsSidebarOpen, currentUser, setCurrentPage, setIsChangePasswordModalOpen } = useAppContext();

    if (!currentUser) return null;

    return (
        <header className="sticky top-0 z-20 bg-white dark:bg-dark-card border-b dark:border-gray-800 p-2 sm:p-4 flex justify-between items-center min-h-16">
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <Button variant="ghost" className="lg:hidden p-1 -ml-2 rtl:-ml-0 rtl:-mr-2 flex-shrink-0" onClick={() => setIsSidebarOpen(true)}>
                    <MenuIcon className="h-6 w-6" />
                </Button>
                <div className="relative flex-1 max-w-xs sm:max-w-md">
                    <Input id="search" placeholder={t('search')} className="ps-10 w-full" icon={<SearchIcon className="w-4 h-4" />} />
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <Button variant="ghost" className="p-2 h-auto" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </Button>
                <Button variant="ghost" className="p-2 h-auto hidden xs:inline-flex" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
                    {language === 'en' ? 'AR' : 'EN'}
                </Button>
                <Dropdown
                    trigger={
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                            <div className="hidden md:block">
                                <p className="font-semibold text-sm truncate max-w-[120px]">{currentUser.name}</p>
                                <p className="text-xs text-gray-500 truncate max-w-[120px]">{currentUser.role}</p>
                            </div>
                        </div>
                    }
                >
                    <DropdownItem onClick={() => setCurrentPage('Profile')}>
                        {t('profile')}
                    </DropdownItem>
                    <DropdownItem onClick={() => setIsChangePasswordModalOpen(true)}>
                        {t('changePassword')}
                    </DropdownItem>
                </Dropdown>
            </div>
        </header>
    );
};