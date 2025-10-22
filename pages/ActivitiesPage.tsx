
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_ACTIVITIES, MOCK_USERS } from '../constants';
import { PageWrapper, Card, Loader } from '../components/index';
import { Activity } from '../types';

const FilterSelect = ({ id, children, value, onChange, className }: { id: string; children: React.ReactNode; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; className?: string }) => (
    <select id={id} value={value} onChange={onChange} className={`px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}>
        {children}
    </select>
);


export const ActivitiesPage = () => {
    const { t } = useAppContext();
    const [selectedUser, setSelectedUser] = useState('all');
    const [timePeriod, setTimePeriod] = useState('today');
    const [leadType, setLeadType] = useState('all');
    const [activityType, setActivityType] = useState<Activity['type'] | 'all'>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // NOTE: Advanced filtering logic based on state can be implemented here.
    // For this implementation, we display all mock activities.
    const filteredActivities = MOCK_ACTIVITIES;

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
                        <option value="all">{t('allUsers')}</option>
                        {MOCK_USERS.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </FilterSelect>
                    <FilterSelect id="time-filter" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="w-full sm:w-auto">
                        <option value="today">{t('today')}</option>
                        <option value="yesterday">{t('yesterday')}</option>
                        <option value="last7">{t('last7Days')}</option>
                        <option value="thisMonth">{t('thisMonth')}</option>
                    </FilterSelect>
                    <FilterSelect id="lead-type-filter" value={leadType} onChange={(e) => setLeadType(e.target.value)} className="w-full sm:w-auto">
                        <option value="all">{t('all')}</option>
                        <option value="fresh">{t('freshLead')}</option>
                        <option value="cold">{t('coldLead')}</option>
                    </FilterSelect>
                    <FilterSelect id="activity-type-filter" value={activityType} onChange={(e) => setActivityType(e.target.value as any)} className="w-full sm:w-auto">
                        <option value="all">{t('all')}</option>
                        <option value="Call">{t('call')}</option>
                        <option value="Meeting">{t('meeting')}</option>
                        <option value="Whatsapp">{t('whatsapp')}</option>
                        <option value="Note">{t('note')}</option>
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
                                <th scope="col" className="px-6 py-3">{t('type')}</th>
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
                                    <td className="px-6 py-4">{activity.type}</td>
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
