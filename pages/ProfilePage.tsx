
import React, { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Card, Input, Button } from '../components/index';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const FileInput = ({ id, label, onChange }: { id: string; label: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useAppContext();

    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
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
        siteLogo,
        setSiteLogo,
        setIsChangePasswordModalOpen
    } = useAppContext();

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
                         <div className="flex flex-col gap-4">
                            {siteLogo && <img src={siteLogo} alt="Current Logo" className="h-10 max-w-[200px] object-contain self-start" />}
                            <FileInput id="logo-upload" label={t('siteLogo')} onChange={handleLogoChange} />
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
