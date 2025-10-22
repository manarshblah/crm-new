
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_CAMPAIGNS } from '../constants';
import { PageWrapper, Button, Card, PlusIcon, SearchIcon, Input } from '../components/index';
import { Campaign } from '../types';

const CampaignsTable = ({ campaigns, onSelectAll, onSelectOne, selectedIds }: { campaigns: Campaign[], onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void, onSelectOne: (id: number) => void, selectedIds: Set<number> }) => {
    const { t } = useAppContext();
    const allSelected = campaigns.length > 0 && selectedIds.size === campaigns.length;
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <input type="checkbox" onChange={onSelectAll} checked={allSelected} className="rounded" />
                        </th>
                        <th scope="col" className="px-6 py-3">{t('name')}</th>
                        <th scope="col" className="px-6 py-3">{t('code')}</th>
                        <th scope="col" className="px-6 py-3">{t('budget')}</th>
                        <th scope="col" className="px-6 py-3">{t('createdAt')}</th>
                        <th scope="col" className="px-6 py-3">{t('isActive')}</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.length > 0 ? campaigns.map(campaign => (
                        <tr key={campaign.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <input type="checkbox" onChange={() => onSelectOne(campaign.id)} checked={selectedIds.has(campaign.id)} className="rounded" />
                            </td>
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
    const { t, setIsAddCampaignModalOpen } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCampaignIds, setSelectedCampaignIds] = useState<Set<number>>(new Set());

    const filteredCampaigns = useMemo(() => {
        return MOCK_CAMPAIGNS.filter(campaign => 
            campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleSelectOne = (id: number) => {
        setSelectedCampaignIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedCampaignIds(new Set(filteredCampaigns.map(c => c.id)));
        } else {
            setSelectedCampaignIds(new Set());
        }
    };

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
                    selectedIds={selectedCampaignIds}
                    onSelectOne={handleSelectOne}
                    onSelectAll={handleSelectAll}
                />
            </Card>
        </PageWrapper>
    );
};
