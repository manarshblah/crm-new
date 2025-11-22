

import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Button, Card, FilterIcon, PlusIcon, SearchIcon, Input, Dropdown, DropdownItem, Loader, EditIcon, TrashIcon } from '../components/index';
import { Developer, Project, Unit } from '../types';

type Tab = 'units' | 'projects' | 'developers';

const DevelopersTable = ({ developers, onUpdate, onDelete }: { developers: Developer[], onUpdate: (dev: Developer) => void, onDelete: (id: number) => void }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[500px]">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('code')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('name')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {developers.map(dev => (
                                <tr key={dev.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm">{dev.code}</td>
                                    <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{dev.name}</td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" className="p-1 h-auto" onClick={() => onUpdate(dev)}>
                                                <EditIcon className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" className="p-1 h-auto !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20" onClick={() => onDelete(dev.id)}>
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

const ProjectsTable = ({ projects, onUpdate, onDelete }: { projects: Project[], onUpdate: (proj: Project) => void, onDelete: (id: number) => void }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[800px]">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('code')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('name')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">{t('developer')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">{t('type')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">{t('city')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">{t('paymentMethod')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(proj => (
                                <tr key={proj.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm">{proj.code}</td>
                                    <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{proj.name}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-xs sm:text-sm">{proj.developer}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-xs sm:text-sm">{proj.type}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-xs sm:text-sm">{proj.city}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-xs sm:text-sm">{proj.paymentMethod}</td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" className="p-1 h-auto" onClick={() => onUpdate(proj)}>
                                                <EditIcon className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" className="p-1 h-auto !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20" onClick={() => onDelete(proj.id)}>
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
}

const UnitsTable = ({ units, onUpdate, onDelete }: { units: Unit[], onUpdate: (unit: Unit) => void, onDelete: (id: number) => void }) => {
    const { t } = useAppContext();
    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[1200px]">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('code')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('project')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">{t('bedrooms')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">{t('bathrooms')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('price')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">{t('type')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">{t('finishing')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">{t('city')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden xl:table-cell">{t('district')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden xl:table-cell">{t('zone')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">{t('status')}</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {units.length > 0 ? units.map(unit => (
                                <tr key={`${unit.id}-${unit.project}`} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm">{unit.code}</td>
                                    <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{unit.project}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-xs sm:text-sm">{unit.bedrooms}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-xs sm:text-sm">{unit.bathrooms}</td>
                                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm">{unit.price.toLocaleString()}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-xs sm:text-sm">{unit.type || '-'}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-xs sm:text-sm">{unit.finishing || '-'}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-xs sm:text-sm">{unit.city || '-'}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden xl:table-cell text-xs sm:text-sm">{unit.district || '-'}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden xl:table-cell text-xs sm:text-sm">{unit.zone || '-'}</td>
                                    <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-xs sm:text-sm">
                                        <span className={`px-2 py-1 text-xs rounded-full ${unit.isSold ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                                            {unit.isSold ? t('sold') || 'Sold' : t('available') || 'Available'}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" className="p-1 h-auto" onClick={() => onUpdate(unit)}>
                                                <EditIcon className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" className="p-1 h-auto !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20" onClick={() => onDelete(unit.id)}>
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={12} className="text-center py-10 text-xs sm:text-sm">{t('noUnitsFound')}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export const PropertiesPage = () => {
    const { 
        t,
        currentUser,
        setIsUnitsFilterDrawerOpen, 
        setIsAddDeveloperModalOpen,
        setIsAddProjectModalOpen,
        setIsAddUnitModalOpen,
        units,
        projects,
        developers,
        deleteDeveloper,
        setEditingDeveloper,
        setIsEditDeveloperModalOpen,
        setDeletingDeveloper,
        setIsDeleteDeveloperModalOpen,
        deleteProject,
        setEditingProject,
        setIsEditProjectModalOpen,
        updateUnit,
        deleteUnit,
        setEditingUnit,
        setIsEditUnitModalOpen,
        setConfirmDeleteConfig,
        setIsConfirmDeleteModalOpen
    } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('units');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: استدعي APIs لتحميل البيانات عند فتح الصفحة (لشركات العقارات فقط)
        // مثال:
        // const loadData = async () => {
        //   try {
        //     const [developersData, projectsData, unitsData] = await Promise.all([
        //       getDevelopersAPI(),
        //       getProjectsAPI(),
        //       getUnitsAPI()
        //     ]);
        //     // TODO: استخدم setDevelopers, setProjects, setUnits من AppContext
        //   } catch (error) {
        //     console.error('Error loading data:', error);
        //   } finally {
        //     setLoading(false);
        //   }
        // };
        // if (isRealEstate) loadData();
        
        // الكود الحالي (للاختبار فقط):
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Check if user's company specialization is real_estate
    const isRealEstate = currentUser?.company?.specialization === 'real_estate';

    // If not real estate, show message or redirect
    if (!isRealEstate) {
        return (
            <PageWrapper title={t('properties')}>
                <Card>
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400">{t('realEstateOnly') || 'This page is only available for Real Estate companies.'}</p>
                    </div>
                </Card>
            </PageWrapper>
        );
    }
    
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

    const handleDeleteDeveloper = (id: number) => {
        const developer = developers.find(d => d.id === id);
        if (developer) {
            setDeletingDeveloper(developer);
            setIsDeleteDeveloperModalOpen(true);
        }
    };

    const handleUpdateDeveloper = (dev: Developer) => {
        setEditingDeveloper(dev);
        setIsEditDeveloperModalOpen(true);
    };
    
    const handleDeleteProject = (id: number) => {
        const project = projects.find(p => p.id === id);
        if (project) {
            setConfirmDeleteConfig({
                title: t('deleteProject') || 'Delete Project',
                message: t('confirmDeleteProject') || 'Are you sure you want to delete',
                itemName: project.name,
                onConfirm: async () => {
                    await deleteProject(id);
                },
            });
            setIsConfirmDeleteModalOpen(true);
        }
    };

    const handleUpdateProject = (proj: Project) => {
        setEditingProject(proj);
        setIsEditProjectModalOpen(true);
    };

    const handleUpdateUnit = (unit: Unit) => {
        setEditingUnit(unit);
        setIsEditUnitModalOpen(true);
    };

    const handleDeleteUnit = (id: number) => {
        const unit = units.find(u => u.id === id);
        if (unit) {
            setConfirmDeleteConfig({
                title: t('deleteUnit') || 'Delete Unit',
                message: t('confirmDeleteUnit') || 'Are you sure you want to delete',
                itemName: unit.code,
                onConfirm: async () => {
                    await deleteUnit(id);
                },
            });
            setIsConfirmDeleteModalOpen(true);
        }
    };

    // استخدام useMemo لضمان إعادة التصيير عند تغيير units
    const memoizedUnits = useMemo(() => units, [units]);

    const renderContent = () => {
        switch (activeTab) {
            case 'units':
                return (
                    <Card>
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
                             <Input id="search-units" placeholder={t('searchUnits')} className="w-full sm:w-auto max-w-xs ps-10" icon={<SearchIcon className="w-4 h-4" />} />
                             <Button variant="secondary" onClick={() => setIsUnitsFilterDrawerOpen(true)} className="w-full sm:w-auto">
                                <FilterIcon className="w-4 h-4"/> <span className="hidden sm:inline">{t('filter')}</span>
                             </Button>
                        </div>
                        <UnitsTable units={memoizedUnits} onUpdate={handleUpdateUnit} onDelete={handleDeleteUnit} />
                    </Card>
                );
            case 'projects':
                return <Card><ProjectsTable projects={projects} onUpdate={handleUpdateProject} onDelete={handleDeleteProject} /></Card>;
            case 'developers':
                return <Card><DevelopersTable developers={developers} onUpdate={handleUpdateDeveloper} onDelete={handleDeleteDeveloper} /></Card>;
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
            <div className="border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto">
                <nav className="-mb-px flex space-x-4 rtl:space-x-reverse min-w-max" aria-label="Tabs">
                    <button onClick={() => setActiveTab('units')} className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm flex-shrink-0 ${activeTab === 'units' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('units')}</button>
                    <button onClick={() => setActiveTab('projects')} className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm flex-shrink-0 ${activeTab === 'projects' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('projects')}</button>
                    <button onClick={() => setActiveTab('developers')} className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm flex-shrink-0 ${activeTab === 'developers' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('developers')}</button>
                </nav>
            </div>
            {renderContent()}
        </PageWrapper>
    );
};
