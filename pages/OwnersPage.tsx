
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_OWNERS } from '../constants';
import { PageWrapper, Button, Card, PlusIcon, SearchIcon, Input, Loader } from '../components/index';
import { Owner } from '../types';

const OwnersTable = ({ owners }: { owners: Owner[] }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{t('code')}</th>
                        <th scope="col" className="px-6 py-3">{t('city')}</th>
                        <th scope="col" className="px-6 py-3">{t('district')}</th>
                        <th scope="col" className="px-6 py-3">{t('name')}</th>
                        <th scope="col" className="px-6 py-3">{t('phone')}</th>
                        <th scope="col" className="px-6 py-3">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.length > 0 ? owners.map(owner => (
                        <tr key={owner.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">{owner.code}</td>
                            <td className="px-6 py-4">{owner.city}</td>
                            <td className="px-6 py-4">{owner.district}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{owner.name}</td>
                            <td className="px-6 py-4">{owner.phone}</td>
                            <td className="px-6 py-4">{/* Actions column as requested */}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={6} className="text-center py-10">{t('noOwnersFound')}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


export const OwnersPage = () => {
    const { t, setIsAddOwnerModalOpen } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <PageWrapper title={t('owners')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title={t('owners')}
            actions={
                <>
                    <Input id="search-owners" placeholder={t('search')} className="max-w-xs ps-10" icon={<SearchIcon className="w-4 h-4" />} />
                    <Button onClick={() => setIsAddOwnerModalOpen(true)}>
                        <PlusIcon className="w-4 h-4"/> {t('addOwner')}
                    </Button>
                </>
            }
        >
            <Card>
                <OwnersTable owners={MOCK_OWNERS} />
            </Card>
        </PageWrapper>
    );
};
