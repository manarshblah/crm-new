
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_LEADS } from '../constants';
import { PageWrapper, Button, Card, FilterIcon, PlusIcon, EyeIcon, WhatsappIcon, SearchIcon, Input } from '../components/index';
import { Lead } from '../types';

const leadStatusFilters: Lead['status'][] = ['All', 'Untouched', 'Touched', 'Following', 'Meeting', 'No Answer', 'Out Of Service'];

export const LeadsPage = () => {
    const { 
        t, 
        currentPage,
        setCurrentPage, 
        setSelectedLead, 
        setIsAddLeadModalOpen, 
        setIsAddActionModalOpen, 
        setIsAssignLeadModalOpen, 
        setIsFilterDrawerOpen,
        checkedLeadIds,
        setCheckedLeadIds
    } = useAppContext();
    const [activeStatusFilter, setActiveStatusFilter] = useState<Lead['status']>('All');

    const handleViewLead = (lead: Lead) => {
        setSelectedLead(lead);
        setCurrentPage('ViewLead');
    };

    const handleAddAction = (lead: Lead) => {
        setSelectedLead(lead);
        setIsAddActionModalOpen(true);
    };

    // FIX: Convert page title to camelCase to match translation keys and cast to the correct type.
    const pageTitleKey = (currentPage.charAt(0).toLowerCase() + currentPage.slice(1).replace(/\s/g, '')) as Parameters<typeof t>[0];
    const pageTitle = t(pageTitleKey);
    
    const filteredLeads = useMemo(() => {
        let leads = MOCK_LEADS;
        
        // 1. Filter by sidebar page type
        switch (currentPage) {
            case 'Fresh Leads': leads = leads.filter(l => l.type === 'Fresh'); break;
            case 'Cold Leads': leads = leads.filter(l => l.type === 'Cold'); break;
            case 'My Leads': leads = leads.filter(l => l.assignedTo === 1); break; // Assuming current user is ID 1
            case 'Rotated Leads': leads = leads.filter(l => l.type === 'Rotated'); break;
            default: break; // All Leads
        }

        // 2. Filter by quick status tabs
        if(activeStatusFilter !== 'All') {
            leads = leads.filter(l => l.status === activeStatusFilter);
        }

        return leads;
    }, [currentPage, activeStatusFilter]);

    const handleCheckChange = (leadId: number, isChecked: boolean) => {
        setCheckedLeadIds(prev => {
            const newSet = new Set(prev);
            if(isChecked) {
                newSet.add(leadId);
            } else {
                newSet.delete(leadId);
            }
            return newSet;
        });
    };

    const handleSelectAll = (isChecked: boolean) => {
        if(isChecked) {
            setCheckedLeadIds(new Set(filteredLeads.map(l => l.id)));
        } else {
            setCheckedLeadIds(new Set());
        }
    };
    
    const isAllSelected = filteredLeads.length > 0 && checkedLeadIds.size === filteredLeads.length;

    return (
        <PageWrapper 
            title={pageTitle}
            actions={
                <>
                    <Input id="search-leads" placeholder={t('search')} className="ps-10" icon={<SearchIcon className="w-4 h-4" />} />
                    <Button variant="secondary" onClick={() => setIsFilterDrawerOpen(true)}><FilterIcon className="w-4 h-4"/> {t('filter')}</Button>
                    <Button onClick={() => setIsAddLeadModalOpen(true)}><PlusIcon className="w-4 h-4"/> {t('addLead')}</Button>
                    <Button variant="secondary" onClick={() => setIsAssignLeadModalOpen(true)} disabled={checkedLeadIds.size === 0}>{t('assignLead')}</Button>
                </>
            }
        >
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto">
                {leadStatusFilters.map(status => {
                    const count = status === 'All' ? MOCK_LEADS.length : MOCK_LEADS.filter(l => l.status === status).length;
                    return (
                        <button 
                            key={status}
                            onClick={() => setActiveStatusFilter(status)}
                            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeStatusFilter === status ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        >
                           {status} ({count})
                        </button>
                    )
                })}
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4"><input type="checkbox" onChange={(e) => handleSelectAll(e.target.checked)} checked={isAllSelected} className="rounded" /></th>
                                <th scope="col" className="px-6 py-3">{t('name')}</th>
                                <th scope="col" className="px-6 py-3">{t('phone')}</th>
                                <th scope="col" className="px-6 py-3">{t('actions')}</th>
                                <th scope="col" className="px-6 py-3">{t('lastFeedback')}</th>
                                <th scope="col" className="px-6 py-3">{t('notes')}</th>
                                <th scope="col" className="px-6 py-3">{t('lastStage')}</th>
                                <th scope="col" className="px-6 py-3">{t('reminder')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map(lead => (
                                <tr key={lead.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4"><input type="checkbox" checked={checkedLeadIds.has(lead.id)} onChange={(e) => handleCheckChange(lead.id, e.target.checked)} className="rounded" /></td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{lead.name}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {lead.phone}
                                        <a href={`https://wa.me/${lead.phone}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
                                            <WhatsappIcon className="w-4 h-4"/>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" className="p-1 h-auto" onClick={() => handleViewLead(lead)}>{t('view')}</Button>
                                            <Button variant="secondary" className="p-1 h-auto" onClick={() => handleAddAction(lead)}>{t('add_action')}</Button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{lead.lastFeedback}</td>
                                    <td className="px-6 py-4">{lead.notes}</td>
                                    <td className="px-6 py-4">{lead.lastStage}</td>
                                    <td className="px-6 py-4">{lead.reminder}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </PageWrapper>
    );
};
