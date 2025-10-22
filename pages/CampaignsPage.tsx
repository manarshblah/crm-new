

import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Button, Card, PlusIcon, SearchIcon, Input, Loader, TrashIcon } from '../components/index';
import { Campaign } from '../types';

const CampaignsTable = ({ campaigns, onDelete }: { campaigns: Campaign[], onDelete: (id: number) => void }) => {
    const { t } = useAppContext();
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{t('name')}</th>
                        <th scope="col" className="px-6 py-3">{t('code')}</th>
                        <th scope="col" className="px-6 py-3">{t('budget')}</th>
                        <th scope="col" className="px-6 py-3">{t('createdAt')}</th>
                        <th scope="col" className="px-6 py-3">{t('isActive')}</th>
                        <th scope="col" className="px-6 py-3">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.length > 0 ? campaigns.map(campaign => (
                        <tr key={campaign.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{campaign.name}</td>
                            <td className="px-6 py-4">{campaign.code}</td>
                            <td className="px-6 py-4">{campaign.budget.toLocaleString()}</td>
                            <td className="px-6 py-4">{campaign.createdAt}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    campaign.isActive 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                }`}>
                                    {campaign.isActive ? t('yes') : t('no')}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <Button variant="ghost" className="p-1 h-auto text-red-500 hover:bg-red-100 dark:hover:bg-red-900" onClick={() => onDelete(campaign.id)}>
                                    <TrashIcon className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={6} className="text-center py-10">
                                {t('noResultsFound')}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


export const CampaignsPage = () => {
    const { t, setIsAddCampaignModalOpen, campaigns, deleteCampaign } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredCampaigns = useMemo(() => {
        return campaigns.filter(campaign => 
            campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, campaigns]);
    
    const handleDelete = (id: number) => {
        if(window.confirm(t('confirmDelete'))) {
            deleteCampaign(id);
        }
    }


    if (loading) {
        return (
            <PageWrapper title={t('campaigns')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title={t('campaigns')}
            actions={
                <>
                    <Input 
                        id="search-campaigns" 
                        placeholder={t('searchEllipsis')} 
                        className="max-w-xs ps-10" 
                        icon={<SearchIcon className="w-4 h-4" />} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={() => setIsAddCampaignModalOpen(true)}>
                        <PlusIcon className="w-4 h-4"/> {t('addCampaign')}
                    </Button>
                </>
            }
        >
            <Card>
                <CampaignsTable 
                    campaigns={filteredCampaigns}
                    onDelete={handleDelete}
                />
            </Card>
        </PageWrapper>
    );
};