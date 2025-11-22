

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Button, Card, FilterIcon, PlusIcon, SearchIcon, Input, Loader, TrashIcon } from '../components/index';
import { Deal } from '../types';

const DealsTable = ({ deals, onDelete, isRealEstate }: { deals: Deal[], onDelete: (id: number) => void, isRealEstate: boolean }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[700px]">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('dealId')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('clientName')}</th>
                                {isRealEstate && <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">{t('unit')}</th>}
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">{t('paymentMethod')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('status')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('value')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deals.map(deal => (
                                <tr key={deal.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{deal.id}</td>
                                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm">{deal.clientName}</td>
                                    {isRealEstate && <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-xs sm:text-sm">{deal.unit || '-'}</td>}
                                    <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-xs sm:text-sm">{deal.paymentMethod}</td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            deal.status === 'Reservation' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                            deal.status === 'Contracted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        }`}>
                                            {deal.status}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm">{deal.value.toLocaleString()}</td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <Button variant="ghost" className="p-1 h-auto !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20" onClick={() => onDelete(deal.id)}>
                                            <TrashIcon className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export const DealsPage = () => {
    // TODO: أضف useEffect لتحميل Deals من API عند فتح الصفحة
    // مثال:
    // useEffect(() => {
    //   const loadDeals = async () => {
    //     try {
    //       const dealsData = await getDealsAPI();
    //       // TODO: استخدم setDeals من AppContext
    //     } catch (error) {
    //       console.error('Error loading deals:', error);
    //     }
    //   };
    //   loadDeals();
    // }, []);
    const { t, setCurrentPage, setIsDealsFilterDrawerOpen, deals, deleteDeal, currentUser, setConfirmDeleteConfig, setIsConfirmDeleteModalOpen } = useAppContext();
    const [loading, setLoading] = useState(true);
    const isRealEstate = currentUser?.company?.specialization === 'real_estate';

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = (id: number) => {
        const deal = deals.find(d => d.id === id);
        if (deal) {
            setConfirmDeleteConfig({
                title: t('deleteDeal') || 'Delete Deal',
                message: t('confirmDeleteDeal') || 'Are you sure you want to delete the deal for',
                itemName: deal.clientName,
                onConfirm: async () => {
                    await deleteDeal(id);
                },
            });
            setIsConfirmDeleteModalOpen(true);
        }
    };

    if (loading) {
        return (
            <PageWrapper title={t('deals')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title={t('deals')}
            actions={
                <>
                    <Input id="search-deals" placeholder={t('searchDeals')} className="w-full sm:w-auto max-w-xs" icon={<SearchIcon className="w-4 h-4" />} />
                    <Button variant="secondary" onClick={() => setIsDealsFilterDrawerOpen(true)} className="w-full sm:w-auto">
                        <FilterIcon className="w-4 h-4"/> <span className="hidden sm:inline">{t('filter')}</span>
                    </Button>
                    <Button onClick={() => setCurrentPage('CreateDeal')} className="w-full sm:w-auto">
                        <PlusIcon className="w-4 h-4"/> <span className="hidden sm:inline">{t('createDeal')}</span>
                    </Button>
                </>
            }
        >
            <Card>
                <DealsTable deals={deals} onDelete={handleDelete} isRealEstate={isRealEstate} />
            </Card>
        </PageWrapper>
    );
};
