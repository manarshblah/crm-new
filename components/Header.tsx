

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_USERS } from '../constants';
import { Button } from './Button';
import { Input } from './Input';
import { MoonIcon, SunIcon, SearchIcon, MenuIcon } from './icons';
import { Dropdown, DropdownItem } from './Dropdown';

export const Header = () => {
    const { t, theme, setTheme, language, setLanguage, setIsSidebarOpen, setIsChangePasswordModalOpen } = useAppContext();
    const user = MOCK_USERS[0];

    return (
        <header className="sticky top-0 z-20 bg-white dark:bg-dark-card border-b dark:border-gray-800 p-4 flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
                <Button variant="ghost" className="lg:hidden p-1 -ml-2 rtl:-ml-0 rtl:-mr-2" onClick={() => setIsSidebarOpen(true)}>
                    <MenuIcon className="h-6 w-6" />
                </Button>
                <div className="relative hidden sm:block">
                    <Input id="search" placeholder={t('search')} className="ps-10" icon={<SearchIcon className="w-4 h-4" />} />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="p-2 h-auto" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </Button>
                <Button variant="ghost" className="p-2 h-auto" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
                    {language === 'en' ? 'AR' : 'EN'}
                </Button>
                <Dropdown
                    trigger={
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                            <div className="hidden sm:block">
                                <p className="font-semibold text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                        </div>
                    }
                >
                    <DropdownItem onClick={() => setIsChangePasswordModalOpen(true)}>
                        {t('changePassword')}
                    </DropdownItem>
                </Dropdown>
            </div>
        </header>
    );
};