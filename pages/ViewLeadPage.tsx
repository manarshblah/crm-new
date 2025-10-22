

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Button, Card, Timeline, UserMinusIcon, UserPlusIcon, DealIcon, EditIcon, PlusIcon, Loader } from '../components/index';

export const ViewLeadPage = () => {
    const { t, selectedLead, setIsAddActionModalOpen } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [selectedLead?.id]);

    if (!selectedLead) {
        return <PageWrapper title={t('leads')}><div>Lead not found</div></PageWrapper>;
    }

    if (loading) {
        return (
            <PageWrapper title={selectedLead.name}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper 
            title={selectedLead.name} 
            actions={
                <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" className="text-red-500"><UserMinusIcon className="w-4 h-4"/> {t('unassign')}</Button>
                    {/* FIX: Corrected translation key from 'assignTo' to 'assignedTo' to match the key in constants.ts. */}
                    <Button variant="secondary"><UserPlusIcon className="w-4 h-4"/> {t('assignedTo')}</Button>
                    <Button variant="secondary"><DealIcon className="w-4 h-4"/> {t('addDeal')}</Button>
                    <Button variant="secondary"><EditIcon className="w-4 h-4"/> {t('editClient')}</Button>
                    <Button onClick={() => setIsAddActionModalOpen(true)}><PlusIcon className="w-4 h-4"/> {t('add_action')}</Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <h3 className="font-semibold mb-4 border-b pb-2">{t('details')}</h3>
                    <div className="space-y-3 text-sm">
                        <p><strong>{t('phone')}:</strong> {selectedLead.phone}</p>
                        <p><strong>{t('budget')}:</strong> {selectedLead.budget.toLocaleString()}</p>
                        <p><strong>{t('communicationWay')}:</strong> {selectedLead.communicationWay}</p>
                        <p><strong>{t('channel')}:</strong> {selectedLead.channel}</p>
                    </div>
                </Card>
                 <Card className="lg:col-span-1">
                    <h3 className="font-semibold mb-4 border-b pb-2">{t('status')}</h3>
                    <div className="space-y-3 text-sm">
                        <p><strong>{t('lastStage')}:</strong> <span className="font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs dark:bg-blue-900 dark:text-blue-200">{selectedLead.lastStage}</span></p>
                        <p><strong>{t('authority')}:</strong> {selectedLead.authority}</p>
                        <p><strong>{t('priority')}:</strong> <span className={`font-semibold px-2 py-1 rounded-full text-xs ${selectedLead.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : selectedLead.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>{selectedLead.priority}</span></p>
                        <p><strong>{t('status')}:</strong> {selectedLead.status}</p>
                    </div>
                </Card>
                 <Card className="lg:col-span-1">
                    <h3 className="font-semibold mb-4 border-b pb-2">{t('dates')}</h3>
                    <div className="space-y-3 text-sm">
                        <p><strong>{t('createdAt')}:</strong> {selectedLead.createdAt}</p>
                        <p><strong>{t('reminder')}:</strong> {selectedLead.reminder}</p>
                    </div>
                </Card>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">{t('timeline')}</h2>
                <Timeline history={selectedLead.history} />
            </div>

        </PageWrapper>
    )
}
