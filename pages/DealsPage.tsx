
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_DEALS } from '../constants';
import { PageWrapper, Button, Card, FilterIcon, PlusIcon, SearchIcon, Input } from '../components/index';
import { Deal } from '../types';

const DealsTable = ({ deals }: { deals: Deal[] }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{t('dealId')}</th>
                        <th scope="col" className="px-6 py-3">{t('clientName')}</th>
                        <th scope="col" className="px-6 py-3">{t('unit')}</th>
                        <th scope="col" className="px-6 py-3">{t('paymentMethod')}</th>
                        <th scope="col" className="px-6 py-3">{t('status')}</th>
                        <th scope="col" className="px-6 py-3">{t('value')}</th>
                        <th scope="col" className="px-6 py-3">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {deals.map(deal => (
                        <tr key={deal.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{deal.id}</td>
                            <td className="px-6 py-4">{deal.clientName}</td>
                            <td className="px-6 py-4">{deal.unit}</td>
                            <td className="px-6 py-4">{deal.paymentMethod}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    deal.status === 'Reservation' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                    deal.status === 'Contracted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                }`}>
                                    {deal.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">{deal.value.toLocaleString()}</td>
                            <td className="px-6 py-4">
                                <Button variant="danger" className="p-1 h-auto text-xs">{t('delete')}</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export const DealsPage = () => {
    const { t, setCurrentPage, setIsDealsFilterDrawerOpen } = useAppContext();

    return (
        <PageWrapper
            title={t('deals')}
            actions={
                <>
                    <Input id="search-deals" placeholder={t('searchDeals')} className="max-w-xs ps-10" icon={<SearchIcon className="w-4 h-4" />} />
                    <Button variant="secondary" onClick={() => setIsDealsFilterDrawerOpen(true)}>
                        <FilterIcon className="w-4 h-4"/> {t('filter')}
                    </Button>
                    <Button onClick={() => setCurrentPage('CreateDeal')}>
                        <PlusIcon className="w-4 h-4"/> {t('createDeal')}
                    </Button>
                </>
            }
        >
            <Card>
                <DealsTable deals={MOCK_DEALS} />
            </Card>
        </PageWrapper>
    );
};
