

import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Card, Loader } from '../components/index';
import { Activity, TaskStage } from '../types';
import { getStageDisplayLabel, getStageCategory } from '../utils/taskStageMapper';

// FIX: Made children optional to fix missing children prop error.
const FilterSelect = ({ id, children, value, onChange, className }: { id: string; children?: React.ReactNode; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; className?: string }) => (
    <select id={id} value={value} onChange={onChange} className={`px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}>
        {children}
    </select>
);


export const ActivitiesPage = () => {
    const { t, activities, users, leads } = useAppContext();
    const [selectedUser, setSelectedUser] = useState('all');
    const [timePeriod, setTimePeriod] = useState('all');
    const [leadType, setLeadType] = useState('all');
    const [activityStage, setActivityStage] = useState<TaskStage | 'all'>('all');
    const [loading, setLoading] = useState(false);

    // Filter activities based on selected filters
    const filteredActivities = useMemo(() => {
        return activities.filter(activity => {
            // User filter
            if (selectedUser !== 'all') {
                const user = users.find(u => u.name === activity.user);
                if (!user || user.id.toString() !== selectedUser) {
                    return false;
                }
            }

            // Activity stage filter
            if (activityStage !== 'all' && activity.stage !== activityStage) {
                return false;
            }

            // Lead type filter
            if (leadType !== 'all') {
                const lead = leads.find(l => l.name === activity.lead);
                if (!lead) return false;
                const leadTypeValue = lead.type.toLowerCase();
                if (leadType === 'fresh' && leadTypeValue !== 'fresh') return false;
                if (leadType === 'cold' && leadTypeValue !== 'cold') return false;
            }

            // Time period filter
            if (timePeriod !== 'all') {
                const activityDate = new Date(activity.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (timePeriod === 'today') {
                    const activityDateOnly = new Date(activityDate);
                    activityDateOnly.setHours(0, 0, 0, 0);
                    if (activityDateOnly.getTime() !== today.getTime()) return false;
                } else if (timePeriod === 'yesterday') {
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    const activityDateOnly = new Date(activityDate);
                    activityDateOnly.setHours(0, 0, 0, 0);
                    if (activityDateOnly.getTime() !== yesterday.getTime()) return false;
                } else if (timePeriod === 'last7') {
                    const last7Days = new Date(today);
                    last7Days.setDate(last7Days.getDate() - 7);
                    if (activityDate < last7Days) return false;
                } else if (timePeriod === 'thisMonth') {
                    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                    if (activityDate < thisMonthStart) return false;
                }
            }

            return true;
        });
    }, [activities, selectedUser, timePeriod, leadType, activityStage, users, leads]);

    if (loading) {
        return (
            <PageWrapper title={t('activities')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title={t('activities')}
            actions={
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                    <FilterSelect id="user-filter" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full sm:w-auto">
                        <option value="all">{t('allUsers') || 'All Users'}</option>
                        {users.map(user => <option key={user.id} value={user.id.toString()}>{user.name}</option>)}
                    </FilterSelect>
                    <FilterSelect id="time-filter" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="w-full sm:w-auto">
                        <option value="all">{t('all') || 'All Time'}</option>
                        <option value="today">{t('today')}</option>
                        <option value="yesterday">{t('yesterday')}</option>
                        <option value="last7">{t('last7Days') || 'Last 7 Days'}</option>
                        <option value="thisMonth">{t('thisMonth') || 'This Month'}</option>
                    </FilterSelect>
                    <FilterSelect id="lead-type-filter" value={leadType} onChange={(e) => setLeadType(e.target.value)} className="w-full sm:w-auto">
                        <option value="all">{t('all')}</option>
                        <option value="fresh">{t('freshLead')}</option>
                        <option value="cold">{t('coldLead')}</option>
                    </FilterSelect>
                    <FilterSelect id="activity-stage-filter" value={activityStage} onChange={(e) => setActivityStage(e.target.value as TaskStage | 'all')} className="w-full sm:w-auto">
                        <option value="all">{t('all')}</option>
                        <option value="following">{getStageDisplayLabel('following')}</option>
                        <option value="meeting">{getStageDisplayLabel('meeting')}</option>
                        <option value="done_meeting">{getStageDisplayLabel('done_meeting')}</option>
                        <option value="whatsapp_pending">{getStageDisplayLabel('whatsapp_pending')}</option>
                        <option value="no_answer">{getStageDisplayLabel('no_answer')}</option>
                        <option value="out_of_service">{getStageDisplayLabel('out_of_service')}</option>
                        <option value="cancellation">{getStageDisplayLabel('cancellation')}</option>
                        <option value="not_interested">{getStageDisplayLabel('not_interested')}</option>
                        <option value="hold">{getStageDisplayLabel('hold')}</option>
                    </FilterSelect>
                </div>
            }
        >
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('user')}</th>
                                <th scope="col" className="px-6 py-3">{t('lead')}</th>
                                <th scope="col" className="px-6 py-3">{t('stage')}</th>
                                <th scope="col" className="px-6 py-3">{t('date')}</th>
                                <th scope="col" className="px-6 py-3">{t('notes')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredActivities.length > 0 ? (
                                filteredActivities.map(activity => (
                                <tr key={activity.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{activity.user}</td>
                                    <td className="px-6 py-4">{activity.lead}</td>
                                    <td className="px-6 py-4">{getStageDisplayLabel(activity.stage)}</td>
                                    <td className="px-6 py-4">{activity.date}</td>
                                    <td className="px-6 py-4">{activity.notes}</td>
                                </tr>
                                ))
                             ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10">
                                        {t('noActivitiesFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </PageWrapper>
    );
};
