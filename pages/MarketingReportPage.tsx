
import React, { useState } from 'react';
import { PageWrapper, Card, Input } from '../components/index';
import { MOCK_CAMPAIGNS } from '../constants';
import { useAppContext } from '../context/AppContext';

const FilterSelect = ({ id, children, value, onChange, className }: { id: string; children: React.ReactNode; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; className?: string }) => (
    <select id={id} value={value} onChange={onChange} className={`px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}>
        {children}
    </select>
);

export const MarketingReportPage = () => {
    const { t } = useAppContext();
    const [selectedCampaign, setSelectedCampaign] = useState('all');

    return (
        <PageWrapper
            title={t('marketingReport')}
            actions={
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                    <FilterSelect id="campaign-filter" value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)} className="w-full sm:w-auto">
                        <option value="all">{t('campaigns')}</option>
                        {MOCK_CAMPAIGNS.map(campaign => <option key={campaign.id} value={campaign.id}>{campaign.name}</option>)}
                    </FilterSelect>
                    <Input type="date" id="start-date" className="w-full sm:w-auto" />
                    <Input type="date" id="end-date" className="w-full sm:w-auto" />
                </div>
            }
        >
            <Card>
                <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">{t('noDataAvailable')}</p>
                </div>
            </Card>
        </PageWrapper>
    );
};
