
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Card, PageWrapper, WeekLeadsChart, TargetIcon, UsersIcon, Loader } from '../components/index';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { MOCK_USERS, MOCK_ACTIVITIES } from '../constants';

export const DashboardPage = () => {
    const { t } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Simulate 1.5s load time
        return () => clearTimeout(timer);
    }, []);

    const stats = [
        { title: t('todayNewLeads'), value: 0, icon: <TargetIcon className="w-8 h-8 text-primary"/> },
        { title: t('todayTouchedLeads'), value: 0, icon: <UsersIcon className="w-8 h-8 text-green-500"/> },
        { title: t('todayUntouchedLeads'), value: 0, icon: <UsersIcon className="w-8 h-8 text-yellow-500"/> },
        { title: t('delayedLeads'), value: 1, icon: <UsersIcon className="w-8 h-8 text-red-500"/> },
    ];
    
    // As per requirement, stages report shows no data.
    const stagesData: any[] = [];

    const topUsers = MOCK_USERS.slice(0, 3); // Get top 3 users for the list
    const latestFeedbacks = MOCK_ACTIVITIES.slice(0, 4); // Get latest 4 feedbacks

    if (loading) {
        return (
            <PageWrapper title={t('dashboard')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title={t('dashboard')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <Card key={stat.title}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <Card className="lg:col-span-2">
                     <h2 className="text-lg font-semibold mb-4">{t('weekLeadsReport')}</h2>
                     <WeekLeadsChart />
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold mb-4">{t('stagesReport')}</h2>
                    {stagesData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie data={stagesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                              {stagesData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
                            {t('noDataAvailable')}
                        </div>
                    )}
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card>
                    <h2 className="text-lg font-semibold mb-4">{t('topUsers')}</h2>
                    <div className="space-y-4">
                        {topUsers.map(user => (
                            <div key={user.id} className="flex items-center gap-3">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold mb-4">{t('latestFeedbacks')}</h2>
                    <div className="space-y-4">
                        {latestFeedbacks.map(feedback => (
                            <div key={feedback.id} className="text-sm">
                                <p className="font-semibold">{feedback.lead}</p>
                                <p className="text-gray-600 dark:text-gray-400">{feedback.notes}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{feedback.user} - {feedback.date}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </PageWrapper>
    );
};
