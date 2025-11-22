
import React from 'react';
import { useAppContext } from '../../context/AppContext';
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
const FilterSelect = ({ id, children }: { id: string; children?: React.ReactNode }) => {
    const { language } = useAppContext();
    return (
        <select id={id} dir={language === 'ar' ? 'rtl' : 'ltr'} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            {children}
        </select>
    );
};

const FilterInput = ({ id, type = 'text', placeholder }: { id: string; type?: string; placeholder?: string }) => {
    const { language } = useAppContext();
    return (
        <input type={type} id={id} placeholder={placeholder} dir={language === 'ar' ? 'rtl' : 'ltr'} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
    );
};


export const DealsFilterDrawer = () => {
    const { isDealsFilterDrawerOpen, setIsDealsFilterDrawerOpen, t, currentUser, projects, users, campaigns } = useAppContext();
    const isRealEstate = currentUser?.company?.specialization === 'real_estate';

    return (
        <>
            <aside className={`fixed inset-y-0 end-0 z-50 flex h-full w-full max-w-xs flex-col bg-card dark:bg-dark-card border-s dark:border-gray-800 transform transition-transform duration-300 ease-in-out 
                                ${isDealsFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 h-16">
                    <h2 className="text-lg font-semibold">{t('filterDeals')}</h2>
                    <Button variant="ghost" className="p-1" onClick={() => setIsDealsFilterDrawerOpen(false)}>
                        <XIcon className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
                    <FilterSection title={t('users')}>
                        <div className="space-y-4">
                             <div>
                                <FilterLabel htmlFor="started-by">{t('startedBy')}</FilterLabel>
                                <FilterSelect id="started-by">
                                    <option>{t('selectUser')}</option>
                                    {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                                </FilterSelect>
                            </div>
                            <div>
                                <FilterLabel htmlFor="closed-by">{t('closedBy')}</FilterLabel>
                                <FilterSelect id="closed-by">
                                    <option>{t('selectUser')}</option>
                                    {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                                </FilterSelect>
                            </div>
                            <div>
                                <FilterLabel htmlFor="added-by">{t('addedBy')}</FilterLabel>
                                <FilterSelect id="added-by">
                                    <option>{t('selectUser')}</option>
                                    {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                                </FilterSelect>
                            </div>
                        </div>
                    </FilterSection>
                    
                    <FilterSection title={t('dealInfo')}>
                        <div className="space-y-4 pt-2">
                             <div><FilterLabel htmlFor="deal-status">{t('status')}</FilterLabel><FilterSelect id="deal-status"><option>{t('selectStatus')}</option><option>{t('reservation')}</option><option>{t('contracted')}</option><option>{t('closed')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="payment-method">{t('paymentMethod')}</FilterLabel><FilterSelect id="payment-method"><option>{t('selectMethod')}</option><option>{t('cash')}</option><option>{t('installment')}</option></FilterSelect></div>
                             {isRealEstate && (
                                <>
                                    <div>
                                        <FilterLabel htmlFor="deal-project">{t('project')}</FilterLabel>
                                        <FilterSelect id="deal-project">
                                            <option>{t('selectProject')}</option>
                                            {projects.map(p => <option key={p.id}>{p.name}</option>)}
                                        </FilterSelect>
                                    </div>
                                    <div><FilterLabel htmlFor="deal-unit">{t('unit')}</FilterLabel><FilterSelect id="deal-unit"><option>{t('selectUnit')}</option></FilterSelect></div>
                                </>
                             )}
                        </div>
                    </FilterSection>

                     <FilterSection title={t('leadInfo')}>
                        <div className="space-y-4 pt-2">
                             <div><FilterLabel htmlFor="lead-channel">{t('leadChannel')}</FilterLabel><FilterSelect id="lead-channel"><option>{t('selectChannel')}</option><option>{t('facebook')}</option><option>{t('google')}</option><option>{t('website')}</option></FilterSelect></div>
                             <div>
                                <FilterLabel htmlFor="lead-campaign">{t('leadCampaign')}</FilterLabel>
                                <FilterSelect id="lead-campaign">
                                    <option>{t('selectCampaign')}</option>
                                     {campaigns.map(c => <option key={c.id}>{c.name}</option>)}
                                </FilterSelect>
                            </div>
                        </div>
                    </FilterSection>

                    <FilterSection title={t('datesAndDuration')}>
                        <div className="space-y-4 pt-2">
                            <div><FilterLabel htmlFor="lead-created-at">{t('leadCreatedAtRange')}</FilterLabel><FilterInput id="lead-created-at" type="date" /></div>
                            <div><FilterLabel htmlFor="deal-created-at">{t('dealCreatedAtRange')}</FilterLabel><FilterInput id="deal-created-at" type="date" /></div>
                            <div><FilterLabel htmlFor="duration">{t('durationDays')}</FilterLabel><FilterInput id="duration" type="number" placeholder={t('eg30')}/></div>
                        </div>
                    </FilterSection>
                </div>
                <div className="p-4 border-t dark:border-gray-800 flex gap-2">
                    <Button variant="secondary" className="w-full">{t('reset')}</Button>
                    <Button className="w-full" onClick={() => setIsDealsFilterDrawerOpen(false)}>{t('applyFilters')}</Button>
                </div>
            </aside>
            {isDealsFilterDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    aria-hidden="true"
                    onClick={() => setIsDealsFilterDrawerOpen(false)}
                ></div>
            )}
        </>
    );
};
