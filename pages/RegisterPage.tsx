
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button, Input, EyeIcon, EyeOffIcon, MoonIcon, SunIcon } from '../components/index';
import { registerCompanyAPI } from '../services/api';

export const RegisterPage = () => {
    const { setIsLoggedIn, setCurrentUser, t, language, setCurrentPage, theme, setTheme } = useAppContext();
    
    // Company information
    const [companyName, setCompanyName] = useState('');
    const [companyDomain, setCompanyDomain] = useState('');
    const [specialization, setSpecialization] = useState<'real_estate' | 'services' | 'products'>('real_estate');
    
    // Owner information
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Plan selection (optional - can be trial)
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    
    // UI state
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [currentStep, setCurrentStep] = useState(1); // 1: Company, 2: Owner, 3: Plan

    const validateStep1 = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        
        if (!companyName.trim()) {
            newErrors.companyName = t('companyNameRequired') || 'Company name is required';
        }
        
        if (!companyDomain.trim()) {
            newErrors.companyDomain = t('companyDomainRequired') || 'Company domain is required';
        } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.?[a-zA-Z0-9-]*[a-zA-Z0-9]*$/.test(companyDomain)) {
            newErrors.companyDomain = t('invalidDomain') || 'Invalid domain format';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        
        if (!firstName.trim()) {
            newErrors.firstName = t('firstNameRequired') || 'First name is required';
        }
        
        if (!lastName.trim()) {
            newErrors.lastName = t('lastNameRequired') || 'Last name is required';
        }
        
        if (!email.trim()) {
            newErrors.email = t('emailRequired') || 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t('invalidEmail') || 'Invalid email format';
        }
        
        if (!username.trim()) {
            newErrors.username = t('usernameRequired') || 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = t('usernameMinLength') || 'Username must be at least 3 characters';
        }
        
        if (!password.trim()) {
            newErrors.password = t('passwordRequired') || 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = t('passwordMinLength') || 'Password must be at least 8 characters';
        }
        
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = t('confirmPasswordRequired') || 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = t('passwordsDoNotMatch') || 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleRegister = async () => {
        if (!validateStep2()) {
            setCurrentStep(2);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await registerCompanyAPI({
                company: {
                    name: companyName,
                    domain: companyDomain,
                    specialization: specialization,
                },
                owner: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    username: username,
                    password: password,
                },
                plan_id: selectedPlan,
                billing_cycle: billingCycle,
            });

            // Auto login after registration
            const frontendUser = {
                id: response.user.id,
                name: `${response.user.first_name || ''} ${response.user.last_name || ''}`.trim() || response.user.username,
                username: response.user.username,
                email: response.user.email,
                role: 'Owner',
                phone: '',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(response.user.username)}&background=random`,
                company: {
                    id: response.company.id,
                    name: response.company.name,
                    specialization: response.company.specialization as 'real_estate' | 'services' | 'products',
                },
            };

            setCurrentUser(frontendUser);
            setIsLoggedIn(true);
            // Navigate to dashboard after successful registration
            window.history.replaceState({}, '', '/');
            setCurrentPage('Dashboard');
        } catch (error: any) {
            const errorMessage = error.message || t('registrationFailed') || 'Registration failed. Please try again.';
            
            // Parse error to show field-specific errors
            if (errorMessage.includes('username') || errorMessage.includes('Username')) {
                setErrors({ username: errorMessage });
            } else if (errorMessage.includes('email') || errorMessage.includes('Email')) {
                setErrors({ email: errorMessage });
            } else if (errorMessage.includes('domain') || errorMessage.includes('Domain')) {
                setErrors({ companyDomain: errorMessage });
            } else {
                setErrors({ general: errorMessage });
            }
            
            // Go back to relevant step
            if (errorMessage.includes('company') || errorMessage.includes('domain')) {
                setCurrentStep(1);
            } else {
                setCurrentStep(2);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex ${language === 'ar' ? 'font-arabic' : 'font-sans'} relative`}>
            {/* Theme Toggle Button */}
            <div className="absolute top-4 end-4 z-10">
                <Button variant="ghost" className="p-2 h-auto" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </Button>
            </div>
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-700 to-primary-500 text-white p-12 flex-col justify-between">
                <div>
                    <img 
                        src="/logo.png" 
                        alt="LOOP CRM Logo" 
                        className="h-20 w-auto object-contain mb-6" 
                    />
                    <p className="mt-4 text-primary-200">{t('crmWelcome')}</p>
                </div>
                <div>
                    <h2 className="text-4xl font-bold">{t('createAccount') || 'Create Your Account'}</h2>
                    <p className="mt-2 text-primary-200 max-w-md">
                        {t('registerDescription') || 'Start managing your business with our powerful CRM system. Get started in minutes.'}
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8 overflow-y-auto">
                <div className="max-w-md w-full space-y-8">
                    <div className="flex flex-col items-center">
                        <img 
                            src="/logo.png" 
                            alt="LOOP CRM Logo" 
                            className="h-12 w-auto object-contain mb-4 lg:hidden" 
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
                            {t('register') || 'Register'}
                        </h2>
                        <p className="mt-2 text-center text-sm text-secondary">
                            {t('createCompanyAccount') || 'Create your company account'}
                        </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-center space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary-600 text-inverse' : 'bg-gray-300 dark:bg-gray-700 text-tertiary'}`}>
                            1
                        </div>
                        <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary-600 text-inverse' : 'bg-gray-300 dark:bg-gray-700 text-tertiary'}`}>
                            2
                        </div>
                        <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary-600 text-inverse' : 'bg-gray-300 dark:bg-gray-700 text-tertiary'}`}>
                            3
                        </div>
                    </div>

                    {errors.general && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-md text-sm">
                            {errors.general}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Step 1: Company Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-primary">
                                    {t('companyInformation') || 'Company Information'}
                                </h3>
                                
                                <div>
                                    <label htmlFor="company-name" className="block text-sm font-medium text-secondary mb-1">
                                        {t('companyName') || 'Company Name'} <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="company-name"
                                        placeholder={t('enterCompanyName') || 'Enter company name'}
                                        value={companyName}
                                        onChange={(e) => {
                                            setCompanyName(e.target.value);
                                            if (errors.companyName) {
                                                setErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.companyName;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        className={errors.companyName ? 'border-red-500' : ''}
                                    />
                                    {errors.companyName && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-300">{errors.companyName}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="company-domain" className="block text-sm font-medium text-secondary mb-1">
                                        {t('companyDomain') || 'Company Domain'} <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="company-domain"
                                        placeholder={t('enterCompanyDomain') || 'e.g., example.com'}
                                        value={companyDomain}
                                        onChange={(e) => {
                                            setCompanyDomain(e.target.value);
                                            if (errors.companyDomain) {
                                                setErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.companyDomain;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        className={errors.companyDomain ? 'border-red-500' : ''}
                                    />
                                    {errors.companyDomain && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.companyDomain}</p>
                                    )}
                                    <p className="mt-1 text-xs text-tertiary">
                                        {t('domainHint') || 'This will be used as your company identifier'}
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="specialization" className="block text-sm font-medium text-secondary mb-1">
                                        {t('specialization') || 'Specialization'} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="specialization"
                                        value={specialization}
                                        onChange={(e) => setSpecialization(e.target.value as 'real_estate' | 'services' | 'products')}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="real_estate">{t('realEstate') || 'Real Estate'}</option>
                                        <option value="services">{t('services') || 'Services'}</option>
                                        <option value="products">{t('products') || 'Products'}</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Owner Information */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-primary">
                                    {t('ownerInformation') || 'Owner Information'}
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-medium text-secondary mb-1">
                                            {t('firstName') || 'First Name'} <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="first-name"
                                            placeholder={t('enterFirstName') || 'Enter first name'}
                                            value={firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value);
                                                if (errors.firstName) {
                                                    setErrors(prev => {
                                                        const newErrors = { ...prev };
                                                        delete newErrors.firstName;
                                                        return newErrors;
                                                    });
                                                }
                                            }}
                                            className={errors.firstName ? 'border-red-500' : ''}
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-medium text-secondary mb-1">
                                            {t('lastName') || 'Last Name'} <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="last-name"
                                            placeholder={t('enterLastName') || 'Enter last name'}
                                            value={lastName}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                                if (errors.lastName) {
                                                    setErrors(prev => {
                                                        const newErrors = { ...prev };
                                                        delete newErrors.lastName;
                                                        return newErrors;
                                                    });
                                                }
                                            }}
                                            className={errors.lastName ? 'border-red-500' : ''}
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                                        {t('email') || 'Email'} <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={t('enterEmail') || 'Enter email address'}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) {
                                                setErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.email;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-secondary mb-1">
                                        {t('username') || 'Username'} <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="username"
                                        placeholder={t('enterUsername') || 'Enter username'}
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            if (errors.username) {
                                                setErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.username;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        className={errors.username ? 'border-red-500' : ''}
                                    />
                                    {errors.username && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-secondary mb-1">
                                        {t('password') || 'Password'} <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder={t('enterPassword') || 'Enter password'}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) {
                                                setErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.password;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        className={errors.password ? 'border-red-500' : ''}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 end-0 pe-3 flex items-center text-gray-400 mt-6"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                    >
                                        {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-secondary mb-1">
                                        {t('confirmPassword') || 'Confirm Password'} <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="confirm-password"
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        placeholder={t('confirmPassword') || 'Confirm password'}
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (errors.confirmPassword) {
                                                setErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.confirmPassword;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        className={errors.confirmPassword ? 'border-red-500' : ''}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 end-0 pe-3 flex items-center text-gray-400 mt-6"
                                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    >
                                        {confirmPasswordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Plan Selection (Optional - can skip for trial) */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-primary">
                                    {t('selectPlan') || 'Select a Plan'}
                                </h3>
                                <p className="text-sm text-secondary">
                                    {t('planSelectionHint') || 'You can start with a free trial and choose a plan later'}
                                </p>
                                
                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPlan(null)}
                                        className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                                            selectedPlan === null
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-primary">
                                                    {t('freeTrial') || 'Free Trial'}
                                                </h4>
                                                <p className="text-sm text-secondary">
                                                    {t('trialDescription') || '14 days free trial, no credit card required'}
                                                </p>
                                            </div>
                                            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                                {t('free') || 'Free'}
                                            </div>
                                        </div>
                                    </button>
                                    
                                    {/* Plans will be loaded from API */}
                                    <p className="text-xs text-tertiary text-center">
                                        {t('plansWillBeAdded') || 'Plans will be available after registration'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Navigation buttons */}
                        <div className="flex justify-between gap-2">
                            {currentStep > 1 && (
                                <Button variant="secondary" onClick={handleBack} disabled={isLoading}>
                                    {t('back') || 'Back'}
                                </Button>
                            )}
                            <div className="flex-1"></div>
                            {currentStep < 3 ? (
                                <Button onClick={handleNext} disabled={isLoading}>
                                    {t('next') || 'Next'}
                                </Button>
                            ) : (
                                <Button onClick={handleRegister} loading={isLoading} disabled={isLoading} className="w-full">
                                    {t('register') || 'Register'}
                                </Button>
                            )}
                        </div>

                        {/* Login link */}
                        <div className="text-center">
                            <p className="text-sm text-secondary">
                                {t('alreadyHaveAccount') || 'Already have an account?'}{' '}
                                <button
                                    onClick={() => {
                                        window.location.href = '/login';
                                    }}
                                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                                >
                                    {t('signIn') || 'Sign In'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

