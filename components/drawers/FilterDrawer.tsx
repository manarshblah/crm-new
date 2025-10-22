
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { MOCK_USERS, MOCK_CAMPAIGNS } from '../../constants';
import { XIcon } from '../icons';
import { Button } from '../Button';

// FIX: Made children optional to fix missing children prop error.
const FilterSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <details className="group" open>
        <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-medium text-gray-900 dark:text-white">
            {title}
            <span className="transition group-open:rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </span>
        </summary>
        <div className="py-2 text-gray-500 dark:text-gray-400">
            {children}
        </div>
    </details>
);

// FIX: Made children optional to fix missing children prop error.
const FilterLabel = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{children}</label>
);

// FIX: Made children optional to fix missing children prop error.
const FilterSelect = ({ id, children }: { id: string; children?: React.ReactNode }) => (
    <select id={id} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

const FilterInput = ({ id, type = 'text', placeholder }: { id: string; type?: string; placeholder?: string }) => (
    <input type={type} id={id} placeholder={placeholder} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
);


export const FilterDrawer = () => {
    const { isFilterDrawerOpen, setIsFilterDrawerOpen, t } = useAppContext();

    return (
        <>
            <aside className={`fixed inset-y-0 end-0 z-50 flex h-full w-full max-w-xs flex-col bg-card dark:bg-dark-card border-s dark:border-gray-800 transform transition-transform duration-300 ease-in-out 
                                ${isFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 h-16">
                    <h2 className="text-lg font-semibold">{t('filterLeads')}</h2>
                    <Button variant="ghost" className="p-1" onClick={() => setIsFilterDrawerOpen(false)}>
                        <XIcon className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
                    <FilterSection title={t('users')}>
                        <div className="space-y-4">
                             <div>
                                <FilterLabel htmlFor="team-leader">{t('teamLeader')}</FilterLabel>
                                <FilterSelect id="team-leader">
                                    <option>{t('selectLeader')}</option>
                                    {MOCK_USERS.filter(u => u.role.includes('Manager')).map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                                </FilterSelect>
                            </div>
                            <div>
                                <FilterLabel htmlFor="is-assigned">{t('assigned')}</FilterLabel>
                                <FilterSelect id="is-assigned">
                                    <option>{t('selectAssignedOrNot')}</option>
                                    <option value="yes">{t('assigned')}</option>
                                    <option value="no">{t('unassigned')}</option>
                                </FilterSelect>
                            </div>
                            <div>
                                <FilterLabel htmlFor="assigned-to">{t('assignedTo')}</FilterLabel>
                                <FilterSelect id="assigned-to">
                                    <option>{t('selectUser')}</option>
                                    {MOCK_USERS.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                                </FilterSelect>
                            </div>
                            <div>
                                <FilterLabel htmlFor="authority">{t('authority')}</FilterLabel>
                                <FilterSelect id="authority">
                                    <option>{t('selectAuthority')}</option>
                                    <option>{t('decisionMaker')}</option>
                                    <option>{t('influencer')}</option>
                                </FilterSelect>
                            </div>
                        </div>
                    </FilterSection>
                    
                    <FilterSection title={t('leadInfo')}>
                        <div className="space-y-4 pt-2">
                             <div><FilterLabel htmlFor="project">{t('project')}</FilterLabel><FilterSelect id="project"><option>{t('selectProject')}</option></FilterSelect></div>
                             <div>
                                <FilterLabel htmlFor="campaign">{t('campaign')}</FilterLabel>
                                <FilterSelect id="campaign">
                                    <option>{t('selectCampaign')}</option>
                                    {MOCK_CAMPAIGNS.map(c => <option key={c.id}>{c.name}</option>)}
                                </FilterSelect>
                            </div>
                             <div><FilterLabel htmlFor="channel">{t('channel')}</FilterLabel><FilterSelect id="channel"><option>{t('selectChannel')}</option><option>{t('facebook')}</option><option>{t('website')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="status">{t('status')}</FilterLabel><FilterSelect id="status"><option>{t('selectStatus')}</option><option>{t('qualified')}</option><option>{t('unqualified')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="cancel-reasons">{t('cancelReasons')}</FilterLabel><FilterSelect id="cancel-reasons"><option>{t('selectCancelReason')}</option><option>{t('budgetTooHigh')}</option><option>{t('notInterested')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="current-stage">{t('currentStage')}</FilterLabel><FilterSelect id="current-stage"><option>{t('selectStage')}</option><option>{t('untouched')}</option><option>{t('touched')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="has-stages">{t('hasStages')}</FilterLabel><FilterSelect id="has-stages"><option>{t('selectStages')}</option></FilterSelect></div>
                             <div>
                                <FilterLabel htmlFor="priority">{t('priority')}</FilterLabel>
                                <FilterSelect id="priority">
                                    <option>{t('selectPriority')}</option>
                                    <option>{t('high')}</option><option>{t('medium')}</option><option>{t('low')}</option>
                                </FilterSelect>
                            </div>
                             <div><FilterLabel htmlFor="excel-filenames">{t('excelFilenames')}</FilterLabel><FilterSelect id="excel-filenames"><option>{t('selectExcel')}</option></FilterSelect></div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <FilterLabel htmlFor="budget-start">{t('budgetRangeStart')}</FilterLabel>
                                    <FilterInput id="budget-start" type="number" placeholder={t('eg500000')} />
                                </div>
                                <div>
                                    <FilterLabel htmlFor="budget-end">{t('budgetRangeEnd')}</FilterLabel>
                                    <FilterInput id="budget-end" type="number" placeholder={t('eg1000000')} />
                                </div>
                            </div>
                        </div>
                    </FilterSection>

                     <FilterSection title={t('delay')}>
                        <div className="pt-2">
                            <FilterLabel htmlFor="delayed-reminder">{t('delayedReminderLeads')}</FilterLabel>
                            <FilterSelect id="delayed-reminder">
                                <option>{t('selectDelayedOrNot')}</option>
                                <option value="yes">{t('delayed')}</option>
                                <option value="no">{t('notDelayed')}</option>
                            </FilterSelect>
                        </div>
                    </FilterSection>

                    <FilterSection title={t('dates')}>
                        <div className="space-y-4 pt-2">
                            <div><FilterLabel htmlFor="date-added">{t('dateAddedRange')}</FilterLabel><FilterInput id="date-added" type="date" /></div>
                            <div><FilterLabel htmlFor="date-assigned">{t('dateAssignedRange')}</FilterLabel><FilterInput id="date-assigned" type="date" /></div>
                            <div><FilterLabel htmlFor="last-action">{t('lastActionRange')}</FilterLabel><FilterInput id="last-action" type="date" /></div>
                            <div><FilterLabel htmlFor="reminder-date">{t('reminderDateRange')}</FilterLabel><FilterInput id="reminder-date" type="date" /></div>
                        </div>
                    </FilterSection>
                </div>
                <div className="p-4 border-t dark:border-gray-800 flex gap-2">
                    <Button variant="secondary" className="w-full">{t('reset')}</Button>
                    <Button className="w-full" onClick={() => setIsFilterDrawerOpen(false)}>{t('applyFilters')}</Button>
                </div>
            </aside>
            {isFilterDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    aria-hidden="true"
                    onClick={() => setIsFilterDrawerOpen(false)}
                ></div>
            )}
        </>
    );
};
