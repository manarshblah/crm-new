
import React, { useState } from 'react';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { PageWrapper } from '../components/index';
import { LeadsSettings } from './settings/LeadsSettings';
import { ChannelsSettings } from './settings/ChannelsSettings';
import { StagesSettings } from './settings/StagesSettings';
import { StatusesSettings } from './settings/StatusesSettings';
import { useAppContext } from '../context/AppContext';

type SettingsTab = 'Leads' | 'Channels' | 'Stages' | 'Statuses';

export const SettingsPage = () => {
    const { t } = useAppContext();
    const [activeTab, setActiveTab] = useState<SettingsTab>('Leads');

    const renderContent = () => {
        switch (activeTab) {
            case 'Leads': return <LeadsSettings />;
            case 'Channels': return <ChannelsSettings />;
            case 'Stages': return <StagesSettings />;
            case 'Statuses': return <StatusesSettings />;
            default: return null;
        }
    };

    return (
        <PageWrapper title={t('settings')}>
             <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-4 rtl:space-x-reverse" aria-label="Tabs">
                    <button onClick={() => setActiveTab('Leads')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'Leads' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('leads')}</button>
                    <button onClick={() => setActiveTab('Channels')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'Channels' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('channels')}</button>
                    <button onClick={() => setActiveTab('Stages')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'Stages' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('stages')}</button>
                    <button onClick={() => setActiveTab('Statuses')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'Statuses' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('statuses')}</button>
                </nav>
            </div>
            {renderContent()}
        </PageWrapper>
    );
};
