
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Button, Card, PlusIcon, SearchIcon, Input, Loader, EditIcon, TrashIcon } from '../components/index';
import { ServiceProvider } from '../types';

const ProvidersTable = ({ providers, onUpdate, onDelete }: { providers: ServiceProvider[], onUpdate: (provider: ServiceProvider) => void, onDelete: (id: number) => void }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="w-full text-sm text-left rtl:text-right min-w-[800px]">
                        <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('code')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('name')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">{t('specialization')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">{t('phone')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">{t('email')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">{t('rating')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map(provider => (
                                <tr key={provider.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-3 sm:px-6 py-4 text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{provider.code}</td>
                                    <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{provider.name}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{provider.specialization}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{provider.phone}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{provider.email}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{provider.rating ? `⭐ ${provider.rating}` : '-'}</td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" className="p-1 h-auto" onClick={() => onUpdate(provider)}>
                                                <EditIcon className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" className="p-1 h-auto !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20" onClick={() => onDelete(provider.id)}>
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export const ServiceProvidersPage = () => {
    const { 
        t,
        currentUser,
        serviceProviders,
        deleteServiceProvider,
        setConfirmDeleteConfig,
        setIsConfirmDeleteModalOpen,
        setIsAddServiceProviderModalOpen,
        setEditingServiceProvider,
        setIsEditServiceProviderModalOpen,
    } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: استدعي getServiceProvidersAPI() هنا عند فتح الصفحة
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Check if user's company specialization is services
    const isServices = currentUser?.company?.specialization === 'services';

    // If not services, show message
    if (!isServices) {
        return (
            <PageWrapper title={t('serviceProviders')}>
                <Card>
                    <div className="text-center py-12">
                        <p className="text-secondary">{t('servicesOnly') || 'This page is only available for Services companies.'}</p>
                    </div>
                </Card>
            </PageWrapper>
        );
    }

    const handleDeleteProvider = (id: number) => {
        const provider = serviceProviders.find(p => p.id === id);
        if (provider) {
            setConfirmDeleteConfig({
                title: t('deleteServiceProvider') || 'Delete Service Provider',
                message: t('confirmDeleteServiceProvider') || 'Are you sure you want to delete',
                itemName: provider.name,
                onConfirm: async () => {
                    await deleteServiceProvider(id);
                },
            });
            setIsConfirmDeleteModalOpen(true);
        }
    };

    const handleUpdateProvider = (provider: ServiceProvider) => {
        setEditingServiceProvider(provider);
        setIsEditServiceProviderModalOpen(true);
    };

    if (loading) {
        return (
            <PageWrapper title={t('serviceProviders')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title={t('serviceProviders')}
            actions={
                <>
                    <Input id="search-providers" placeholder={t('search')} className="max-w-xs ps-10" icon={<SearchIcon className="w-4 h-4" />} />
                    <Button onClick={() => setIsAddServiceProviderModalOpen(true)}>
                        <PlusIcon className="w-4 h-4"/> {t('addServiceProvider') || 'Add Service Provider'}
                    </Button>
                </>
            }
        >
            <Card>
                <ProvidersTable providers={serviceProviders} onUpdate={handleUpdateProvider} onDelete={handleDeleteProvider} />
            </Card>
        </PageWrapper>
    );
};

