import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { XIcon } from '../icons';
import { Button } from '../Button';

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        {children}
    </div>
);

const FilterLabel = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{children}</label>
);

const FilterSelect = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <select id={id} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

const FilterInput = ({ id, type = 'text', placeholder }: { id: string; type?: string; placeholder?: string }) => (
    <input type={type} id={id} placeholder={placeholder} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
);


export const UnitsFilterDrawer = () => {
    const { isUnitsFilterDrawerOpen, setIsUnitsFilterDrawerOpen, t } = useAppContext();

    return (
        <>
            <aside className={`fixed inset-y-0 end-0 z-50 flex h-full w-full max-w-xs flex-col bg-card dark:bg-dark-card border-s dark:border-gray-800 transform transition-transform duration-300 ease-in-out 
                                ${isUnitsFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 h-16">
                    <h2 className="text-lg font-semibold">{t('filterUnits')}</h2>
                    <Button variant="ghost" className="p-1" onClick={() => setIsUnitsFilterDrawerOpen(false)}>
                        <XIcon className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div className="space-y-4">
                        <FilterSection title={t('filters')}>
                             <div><FilterLabel htmlFor="project">{t('project')}</FilterLabel><FilterSelect id="project"><option>{t('selectProject')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="bedrooms">{t('bedrooms')}</FilterLabel><FilterSelect id="bedrooms"><option>{t('selectBedrooms')}</option><option>1</option><option>2</option><option>3+</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="bathrooms">{t('bathrooms')}</FilterLabel><FilterSelect id="bathrooms"><option>{t('selectBathrooms')}</option><option>1</option><option>2</option><option>3+</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="type">{t('type')}</FilterLabel><FilterSelect id="type"><option>{t('selectType')}</option><option>{t('apartment')}</option><option>{t('villa')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="finishing">{t('finishingType')}</FilterLabel><FilterSelect id="finishing"><option>{t('selectFinishing')}</option><option>{t('finished')}</option><option>{t('semiFinished')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="city">{t('city')}</FilterLabel><FilterSelect id="city"><option>{t('selectCity')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="district">{t('district')}</FilterLabel><FilterSelect id="district"><option>{t('selectDistrict')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="zone">{t('zone')}</FilterLabel><FilterSelect id="zone"><option>{t('selectZone')}</option></FilterSelect></div>
                             <div><FilterLabel htmlFor="budget-end">{t('budgetRangeEnd')}</FilterLabel><FilterInput id="budget-end" type="number" placeholder={t('eg2000000')} /></div>
                             <div>
                                <FilterLabel htmlFor="is-sold">{t('sold')}</FilterLabel>
                                <FilterSelect id="is-sold">
                                    <option>{t('all')}</option>
                                    <option value="yes">{t('yes')}</option>
                                    <option value="no">{t('no')}</option>
                                </FilterSelect>
                            </div>
                        </FilterSection>
                    </div>
                </div>
                <div className="p-4 border-t dark:border-gray-800 flex gap-2">
                    <Button variant="secondary" className="w-full">{t('reset')}</Button>
                    <Button className="w-full" onClick={() => setIsUnitsFilterDrawerOpen(false)}>{t('applyFilters')}</Button>
                </div>
            </aside>
            {isUnitsFilterDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    aria-hidden="true"
                    onClick={() => setIsUnitsFilterDrawerOpen(false)}
                ></div>
            )}
        </>
    );
};