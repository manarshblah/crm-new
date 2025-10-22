
import React, { useState, useEffect } from 'react';
import { PageWrapper, Card, Input, Loader } from '../components/index';
import { MOCK_EMPLOYEE_REPORT_DATA } from '../constants';
import { useAppContext } from '../context/AppContext';

const FilterSelect = ({ id, children, value, onChange, className }: { id: string; children: React.ReactNode; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; className?: string }) => (
    <select id={id} value={value} onChange={onChange} className={`px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}>
        {children}
    </select>
);

const reportColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Total Leads', accessor: 'totalLeads', group: 'Leads Metrics' },
    { header: 'Called Leads', accessor: 'calledLeads', group: 'Leads Metrics' },
    { header: 'Not Called Leads', accessor: 'notCalledLeads', group: 'Leads Metrics' },
    { header: 'Untouched Leads', accessor: 'untouchedLeads', group: 'Leads Metrics' },
    { header: 'Touched Leads', accessor: 'touchedLeads', group: 'Leads Metrics' },
    { header: 'Following', accessor: 'following', group: 'Follow-up Status' },
    { header: 'Meeting', accessor: 'meeting', group: 'Follow-up Status' },
    { header: 'Done Meeting', accessor: 'doneMeeting', group: 'Follow-up Status' },
    { header: 'Follow After Meeting', accessor: 'followAfterMeeting', group: 'Follow-up Status' },
    { header: 'Reschedule Meeting', accessor: 'rescheduleMeeting', group: 'Follow-up Status' },
    { header: 'Cancellation', accessor: 'cancellation', group: 'Follow-up Status' },
    { header: 'No Answer', accessor: 'noAnswer', group: 'Follow-up Status' },
    { header: 'Out of Service', accessor: 'outOfService', group: 'Follow-up Status' },
    { header: 'Not Interested', accessor: 'notInterested', group: 'Follow-up Status' },
    { header: 'WhatsApp Pending', accessor: 'whatsappPending', group: 'Follow-up Status' },
    { header: 'Hold', accessor: 'hold', group: 'Follow-up Status' },
    { header: 'Broker', accessor: 'broker', group: 'Follow-up Status' },
    { header: 'Resale', accessor: 'resale', group: 'Follow-up Status' },
    { header: 'Closed Deal', accessor: 'closedDeal', group: 'Follow-up Status' },
    { header: 'Total Calls', accessor: 'totalCalls', group: 'Calls Metrics' },
    { header: 'Answered Calls', accessor: 'answeredCalls', group: 'Calls Metrics' },
    { header: 'Not Answered Calls', accessor: 'notAnsweredCalls', group: 'Calls Metrics' },
    { header: 'Delayed Reminder Leads', accessor: 'delayedReminderLeads', group: 'Deals Metrics' },
    { header: 'Total Deals', accessor: 'totalDeals', group: 'Deals Metrics' },
    { header: 'Reservation Deals', accessor: 'reservationDeals', group: 'Deals Metrics' },
    { header: 'In Progress Deals', accessor: 'inProgressDeals', group: 'Deals Metrics' },
    { header: 'Closed Deals', accessor: 'closedDeals', group: 'Deals Metrics' },
    { header: 'Cancel Deals', accessor: 'cancelDeals', group: 'Deals Metrics' },
];

export const EmployeesReportPage = () => {
    const { t } = useAppContext();
    const [leadType, setLeadType] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <PageWrapper title={t('employeesReport')}>
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                    <Loader variant="primary" className="h-12"/>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title={t('employeesReport')}
            actions={
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                    <Input type="date" id="start-date" className="w-full sm:w-auto" />
                    <Input type="date" id="end-date" className="w-full sm:w-auto" />
                    <FilterSelect id="lead-type-filter" value={leadType} onChange={(e) => setLeadType(e.target.value)} className="w-full sm:w-auto">
                        <option value="all">{t('allLeadsType')}</option>
                        <option value="fresh">{t('freshLeads')}</option>
                        <option value="cold">{t('coldLeads')}</option>
                    </FilterSelect>
                </div>
            }
        >
            <Card className="mb-6">
                <div className="flex items-center gap-6 text-sm">
                    <div><strong>{t('totalCalls')}:</strong> 0</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> {t('answered')}</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> {t('notAnswered')}</div>
                </div>
            </Card>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {reportColumns.map(col => (
                                    <th key={col.accessor} scope="col" className="px-4 py-3 border border-gray-200 dark:border-gray-600 whitespace-nowrap">{col.header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_EMPLOYEE_REPORT_DATA.map(data => (
                                <tr key={data.id} className="bg-white dark:bg-dark-card border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    {reportColumns.map(col => (
                                        <td key={col.accessor} className="px-4 py-3 border border-gray-200 dark:border-gray-600 whitespace-nowrap">
                                            {data[col.accessor as keyof typeof data]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </PageWrapper>
    );
};
