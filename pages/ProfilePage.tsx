


import React, { useRef, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Card, Input, Button, Loader } from '../components/index';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const FileInput = ({ id, label, onChange }: { id: string; label?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useAppContext();

    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}
            <div className="flex items-center gap-2">
                <input
                    ref={inputRef}
                    id={id}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="hidden"
                />
                <Button variant="secondary" onClick={() => inputRef.current?.click()}>
                    {t('upload')}
                </Button>
            </div>
        </div>
    );
};

export const ProfilePage = () => {
    const {
        t,
        currentUser,
        setCurrentUser,
        primaryColor,
        setPrimaryColor,
        activeSubPageColor,
        setActiveSubPageColor,
        siteLogo,
        setSiteLogo,
        setIsChangePasswordModalOpen
    } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const logoInputRef = useRef<HTMLInputElement>(null);

    if (!currentUser) return null;

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setCurrentUser({ ...currentUser, avatar: event.target.result as string });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const logoDataUrl = event.target?.result as string;
                setSiteLogo(logoDataUrl);
                localStorage.setItem('siteLogo', logoDataUrl);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleDeleteLogo = () => {
        setSiteLogo(null);
        localStorage.removeItem('siteLogo');
        if (logoInputRef.current) {
            logoInputRef.current.value = "";
        }
    };
    
    if (loading) {
        return (
            <PageWrapper title={t('profile')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title={t('profile')}>
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-700">{t('profileSettings')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <img src={currentUser.avatar} alt="Profile" className="w-24 h-24 rounded-full" />
                            <FileInput id="avatar-upload" label={t('profilePicture')} onChange={handleAvatarChange} />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="profile-name">{t('name')}</Label>
                                <Input id="profile-name" defaultValue={currentUser.name} />
                            </div>
                            <div>
                                <Label htmlFor="profile-email">{t('email')}</Label>
                                <Input id="profile-email" type="email" defaultValue={currentUser.email} />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-700">{t('siteCustomization')}</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <Label htmlFor="primary-color">{t('primaryColor')}</Label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        id="primary-color"
                                        value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                        className="w-10 h-10 p-0 border-none rounded-md cursor-pointer"
                                    />
                                    <span className="font-mono text-sm">{primaryColor}</span>
                                </div>
                            </div>
                             <div>
                                <Label htmlFor="active-sub-page-color">{t('activeSubPageColor')}</Label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        id="active-sub-page-color"
                                        value={activeSubPageColor}
                                        onChange={(e) => setActiveSubPageColor(e.target.value)}
                                        className="w-10 h-10 p-0 border-none rounded-md cursor-pointer"
                                    />
                                    <span className="font-mono text-sm">{activeSubPageColor}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 pt-4 border-t dark:border-gray-700">
                            <Label htmlFor="logo-upload">{t('siteLogo')}</Label>
                            <div className="flex items-center gap-2 p-2 rounded-md border dark:border-gray-700 min-h-[56px]">
                                {siteLogo ? (
                                    <img src={siteLogo} alt="Current Logo" className="h-10 object-contain" />
                                ) : (
                                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    </div>
                                )}
                                <span className="text-xl font-bold text-primary">Deal CRM</span>
                            {/* FIX: Corrected typo in closing div tag. */}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                                <input
                                    ref={logoInputRef}
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                                <Button variant="secondary" onClick={() => logoInputRef.current?.click()}>
                                    {t('upload')}
                                </Button>
                                {siteLogo && (
                                    <Button variant="danger" onClick={handleDeleteLogo}>
                                        {t('delete')}
                                    </Button>
                                )}
                            </div>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-700">{t('security')}</h2>
                    <Button onClick={() => setIsChangePasswordModalOpen(true)}>
                        {t('changePassword')}
                    </Button>
                </Card>
                
                 <div className="flex justify-end">
                    <Button>{t('saveProfile')}</Button>
                </div>
            </div>
        </PageWrapper>
    );
};
