

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_CONNECTED_ACCOUNTS } from '../constants';
import { PageWrapper, Card, Button, PlusIcon, FacebookIcon, TikTokIcon, WhatsappIcon, TrashIcon, SettingsIcon, Loader } from '../components/index';
import { Page } from '../types';

type PlatformDetails = {
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    accounts: { id: number; name: string; status: string }[];
};

const platformConfig: Record<string, { name: string, icon: React.FC<React.SVGProps<SVGSVGElement>>, data: any[] }> = {
    'Facebook': { name: 'Facebook', icon: FacebookIcon, data: MOCK_CONNECTED_ACCOUNTS.facebook },
    'TikTok': { name: 'TikTok', icon: TikTokIcon, data: MOCK_CONNECTED_ACCOUNTS.tiktok },
    'WhatsApp': { name: 'WhatsApp', icon: WhatsappIcon, data: MOCK_CONNECTED_ACCOUNTS.whatsapp },
};

const getPlatformDetails = (currentPage: Page): PlatformDetails | null => {
    let platformKey: string;

    switch (currentPage) {
        case 'Integrations':
        case 'Facebook':
            platformKey = 'Facebook';
            break;
        case 'TikTok':
            platformKey = 'TikTok';
            break;
        case 'WhatsApp':
            platformKey = 'WhatsApp';
            break;
        default:
            return null;
    }

    const config = platformConfig[platformKey];
    return {
        name: config.name,
        icon: config.icon,
        accounts: config.data,
    };
};

export const IntegrationsPage = () => {
    const { t, currentPage, setIsAddIntegrationAccountModalOpen } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const platform = getPlatformDetails(currentPage);
    
    if (!platform) {
        return <PageWrapper title={t('integrations')}><div>Unknown integration platform.</div></PageWrapper>;
    }
    
    const { name, icon: Icon, accounts } = platform;
    const pageTitle = `${name} ${t('integration')}`;

    if (loading) {
        return (
            <PageWrapper title={pageTitle}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title={pageTitle}
            actions={
                <Button onClick={() => setIsAddIntegrationAccountModalOpen(true)}>
                    <PlusIcon className="w-4 h-4" /> {t('addNewAccount')}
                </Button>
            }
        >
            <Card>
                {accounts.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {accounts.map(account => (
                            <li key={account.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                    <Icon className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{account.name}</p>
                                        <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                                            <span className="h-2 w-2 me-1.5 bg-green-500 rounded-full"></span>
                                            {account.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="secondary"><SettingsIcon className="w-4 h-4 me-2" /> {t('settings')}</Button>
                                    <Button variant="danger"><TrashIcon className="w-4 h-4 me-2" /> {t('disconnect')}</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-16">
                        <Icon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        {/* FIX: Removed second argument from t() function as it's not supported */}
                        <h3 className="text-lg font-semibold">{t('noAccountsConnected')}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('connectAccountPrompt')}</p>
                    </div>
                )}
            </Card>
        </PageWrapper>
    );
};
