


import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Button, Card, PlusIcon, SearchIcon, Input, Loader, EditIcon, TrashIcon } from '../components/index';
import { Owner } from '../types';

const OwnersTable = ({ owners, onEdit, onDelete }: { owners: Owner[], onEdit: (owner: Owner) => void, onDelete: (id: number) => void }) => {
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
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" className="p-1 h-auto" onClick={() => onEdit(owner)}>
                                        <EditIcon className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" className="p-1 h-auto !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20" onClick={() => onDelete(owner.id)}>
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
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
    const { t, currentUser, setIsAddOwnerModalOpen, owners, deleteOwner, setEditingOwner, setIsEditOwnerModalOpen } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Check if user's company specialization is real_estate
    const isRealEstate = currentUser?.company?.specialization === 'real_estate';

    // If not real estate, show message
    if (!isRealEstate) {
        return (
            <PageWrapper title={t('owners')}>
                <Card>
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400">{t('realEstateOnly') || 'This page is only available for Real Estate companies.'}</p>
                    </div>
                </Card>
            </PageWrapper>
        );
    }

    const handleEdit = (owner: Owner) => {
        setEditingOwner(owner);
        setIsEditOwnerModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if(window.confirm(t('confirmDelete'))) {
            deleteOwner(id);
        }
    };

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
                <OwnersTable owners={owners} onEdit={handleEdit} onDelete={handleDelete} />
            </Card>
        </PageWrapper>
    );
};
