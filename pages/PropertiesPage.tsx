
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_DEVELOPERS, MOCK_PROJECTS, MOCK_UNITS } from '../constants';
import { PageWrapper, Button, Card, FilterIcon, PlusIcon, SearchIcon, Input, Dropdown, DropdownItem, Loader } from '../components/index';
import { Developer, Project, Unit } from '../types';

type Tab = 'units' | 'projects' | 'developers';

const DevelopersTable = ({ developers, onUpdate }: { developers: Developer[], onUpdate: (dev: Developer) => void }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{t('code')}</th>
                        <th scope="col" className="px-6 py-3">{t('logo')}</th>
                        <th scope="col" className="px-6 py-3">{t('name')}</th>
                        <th scope="col" className="px-6 py-3">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {developers.map(dev => (
                        <tr key={dev.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">{dev.code}</td>
                            <td className="px-6 py-4"><img src={dev.logo} alt={dev.name} className="w-8 h-8 rounded-full" /></td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{dev.name}</td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <Button variant="secondary" onClick={() => onUpdate(dev)}>{t('update')}</Button>
                                    <Button variant="danger">{t('delete')}</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ProjectsTable = ({ projects }: { projects: Project[] }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{t('code')}</th>
                        <th scope="col" className="px-6 py-3">{t('name')}</th>
                        <th scope="col" className="px-6 py-3">{t('developer')}</th>
                        <th scope="col" className="px-6 py-3">{t('type')}</th>
                        <th scope="col" className="px-6 py-3">{t('city')}</th>
                        <th scope="col" className="px-6 py-3">{t('paymentMethod')}</th>
                        <th scope="col" className="px-6 py-3">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(proj => (
                        <tr key={proj.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">{proj.code}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{proj.name}</td>
                            <td className="px-6 py-4">{proj.developer}</td>
                            <td className="px-6 py-4">{proj.type}</td>
                            <td className="px-6 py-4">{proj.city}</td>
                            <td className="px-6 py-4">{proj.paymentMethod}</td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <Button variant="secondary">{t('update')}</Button>
                                    <Button variant="danger">{t('delete')}</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const UnitsTable = ({ units }: { units: Unit[] }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{t('code')}</th>
                        <th scope="col" className="px-6 py-3">{t('project')}</th>
                        <th scope="col" className="px-6 py-3">{t('bedrooms')}</th>
                        <th scope="col" className="px-6 py-3">{t('price')}</th>
                    </tr>
                </thead>
                <tbody>
                    {units.length > 0 ? units.map(unit => (
                        <tr key={unit.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">{unit.code}</td>
                            <td className="px-6 py-4">{unit.project}</td>
                            <td className="px-6 py-4">{unit.bedrooms}</td>
                            <td className="px-6 py-4">{unit.price.toLocaleString()}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4} className="text-center py-10">{t('noUnitsFound')}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export const PropertiesPage = () => {
    const { 
        t,
        setIsUnitsFilterDrawerOpen, 
        setIsAddDeveloperModalOpen,
        setIsAddProjectModalOpen,
        setIsAddUnitModalOpen,
    } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('units');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    
    const pageActions = (
        <Dropdown trigger={
            <Button>
                <PlusIcon className="w-4 h-4"/> {t('createNew')}
            </Button>
        }>
            <DropdownItem onClick={() => setIsAddDeveloperModalOpen(true)}>{t('addDeveloper')}</DropdownItem>
            <DropdownItem onClick={() => setIsAddProjectModalOpen(true)}>{t('addProject')}</DropdownItem>
            <DropdownItem onClick={() => setIsAddUnitModalOpen(true)}>{t('addUnit')}</DropdownItem>
        </Dropdown>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'units':
                return (
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                             <Input id="search-units" placeholder={t('searchUnits')} className="max-w-xs ps-10" icon={<SearchIcon className="w-4 h-4" />} />
                             <Button variant="secondary" onClick={() => setIsUnitsFilterDrawerOpen(true)}>
                                <FilterIcon className="w-4 h-4"/> {t('filter')}
                             </Button>
                        </div>
                        <UnitsTable units={MOCK_UNITS} />
                    </Card>
                );
            case 'projects':
                return <Card><ProjectsTable projects={MOCK_PROJECTS} /></Card>;
            case 'developers':
                return <Card><DevelopersTable developers={MOCK_DEVELOPERS} onUpdate={() => setIsAddDeveloperModalOpen(true)} /></Card>;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <PageWrapper title={t('properties')} actions={pageActions}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title={t('properties')} actions={pageActions}>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="-mb-px flex space-x-4 rtl:space-x-reverse" aria-label="Tabs">
                    <button onClick={() => setActiveTab('units')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'units' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('units')}</button>
                    <button onClick={() => setActiveTab('projects')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'projects' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('projects')}</button>
                    <button onClick={() => setActiveTab('developers')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'developers' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('developers')}</button>
                </nav>
            </div>
            {renderContent()}
        </PageWrapper>
    );
};
