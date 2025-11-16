import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Button, Input, EyeIcon, EyeOffIcon } from '../components/index';

export const LoginPage = () => {
    const { setIsLoggedIn, setCurrentUser, users, t, language } = useAppContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = () => {
        setError('');
        
        if (!username.trim() || !password.trim()) {
            setError(t('pleaseEnterCredentials') || 'Please enter username and password');
            return;
        }

        setIsLoading(true);
        
        // Simulate network delay
        setTimeout(() => {
            // Find user by username or email
            const user = users.find(u => 
                (u.username?.toLowerCase() === username.toLowerCase()) || 
                (u.email?.toLowerCase() === username.toLowerCase())
            );

            if (!user) {
                setError(t('invalidCredentials') || 'Invalid username or password');
                setIsLoading(false);
                return;
            }

            // Check password
            if (user.password !== password) {
                setError(t('invalidCredentials') || 'Invalid username or password');
                setIsLoading(false);
                return;
            }

            // Login successful
            setCurrentUser(user);
            setIsLoggedIn(true);
        }, 1500);
    };

    return (
        <div className={`min-h-screen flex ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-700 to-primary-500 text-white p-12 flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold">LOOP CRM</h1>
                    <p className="mt-4 text-primary-200">{t('crmWelcome')}</p>
                </div>
                <div>
                    <h2 className="text-4xl font-bold">{t('hello')}</h2>
                    <p className="mt-2 text-primary-200 max-w-md">{t('crmDescription')}</p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">{t('welcomeBack')}</h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">{t('signInToContinue')}</p>
                    </div>
                    <div className="space-y-6">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="username" className="sr-only">{t('username')}</label>
                            <Input 
                                id="username" 
                                placeholder={t('username') || 'Username or Email'}
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError('');
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleLogin();
                                    }
                                }}
                            />
                        </div>
                        <div className="relative">
                           <label htmlFor="password" className="sr-only">{t('password')}</label>
                           <Input 
                                id="password" 
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder={t('password')} 
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleLogin();
                                    }
                                }}
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
                            <Button onClick={handleLogin} className="w-full" loading={isLoading} disabled={isLoading}>
                                {t('signIn')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};