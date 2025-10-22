
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Button, Input, EyeIcon, EyeOffIcon } from '../components/index';

export const LoginPage = () => {
    const { setIsLoggedIn, t, language } = useAppContext();
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className={`min-h-screen flex ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-700 to-primary-500 text-white p-12 flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Deal CRM</h1>
                    <p className="mt-4 text-primary-200">{t('crmWelcome')}</p>
                </div>
                <div>
                    <h2 className="text-4xl font-bold">{t('hello')}</h2>
                    <p className="mt-2 text-primary-200 max-w-md">{t('crmDescription')}</p>
                </div>
                 <Button className="self-start" variant="secondary">{t('search')}</Button>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">{t('welcomeBack')}</h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">{t('signInToContinue')}</p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="username" className="sr-only">{t('username')}</label>
                            <Input id="username" placeholder={t('username')} />
                        </div>
                        <div className="relative">
                           <label htmlFor="password" className="sr-only">{t('password')}</label>
                           <Input 
                                id="password" 
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder={t('password')} 
                           />
                           <button 
                                type="button"
                                className="absolute inset-y-0 end-0 pe-3 flex items-center text-gray-400"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                           >
                            {passwordVisible ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                           </button>
                        </div>
                        <div>
                            <Button onClick={() => setIsLoggedIn(true)} className="w-full">
                                {t('signIn')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
