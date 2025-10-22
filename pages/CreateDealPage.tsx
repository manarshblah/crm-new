
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PageWrapper, Card, Input, Button, PlusIcon } from '../components/index';
import { MOCK_PROJECTS, MOCK_UNITS, MOCK_LEADS, MOCK_USERS } from '../constants';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const Select = ({ id, children, className }: { id: string; children: React.ReactNode, className?: string }) => (
    <select id={id} className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}>
        {children}
    </select>
);


export const CreateDealPage = () => {
    const { t, setCurrentPage, setIsAddLeadModalOpen } = useAppContext();
    return (
        <PageWrapper title={t('createNewDeal')}>
            <Card>
                <h3 className="text-lg font-semibold mb-6 border-b pb-3 dark:border-gray-700">{t('dealInformation')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <Label htmlFor="project">{t('project')}</Label>
                        <Select id="project">
                            <option>Select Project</option>
                            {MOCK_PROJECTS.map(p => <option key={p.id}>{p.name}</option>)}
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="unit">{t('unit')}</Label>
                        <Select id="unit">
                             <option>Select Unit</option>
                             {MOCK_UNITS.map(u => <option key={u.id}>{u.code}</option>)}
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="lead">{t('lead')}</Label>
                        <div className="flex gap-2">
                        <Select id="lead" className="flex-grow">
                             <option>Select Lead</option>
                             {MOCK_LEADS.map(l => <option key={l.id}>{l.name}</option>)}
                        </Select>
                        <Button variant="secondary" className="px-3" onClick={() => setIsAddLeadModalOpen(true)}>
                            <PlusIcon className="w-4 h-4"/>
                        </Button>
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="started-by">{t('startedBy')}</Label>
                        <Select id="started-by">
                             <option>Select Employee</option>
                             {MOCK_USERS.map(u => <option key={u.id}>{u.name}</option>)}
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="closed-by">{t('closedBy')}</Label>
                        <Select id="closed-by">
                             <option>Select Employee</option>
                             {MOCK_USERS.map(u => <option key={u.id}>{u.name}</option>)}
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="payment-method">{t('paymentMethod')}</Label>
                        <Select id="payment-method">
                            <option>Cash</option>
                            <option>Installment</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="deal-status">{t('status')}</Label>
                        <Select id="deal-status">
                            <option>Reservation</option>
                            <option>Contracted</option>
                             <option>Closed</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="start-date">{t('startDate')}</Label>
                        <Input id="start-date" type="date" />
                    </div>
                     <div>
                        <Label htmlFor="closed-date">{t('closedDate')}</Label>
                        <Input id="closed-date" type="date" />
                    </div>
                     <div>
                        <Label htmlFor="discount-percent">{t('discountPercentage')}</Label>
                        <Input id="discount-percent" type="number" placeholder="%" />
                    </div>
                     <div>
                        <Label htmlFor="discount-amount">{t('discountAmount')}</Label>
                        <Input id="discount-amount" type="number" placeholder="Amount" />
                    </div>
                     <div>
                        <Label htmlFor="total-value">{t('totalValue')}</Label>
                        <Input id="total-value" type="number" placeholder="Total deal value" />
                    </div>
                     <div>
                        <Label htmlFor="commission-percent">{t('salesCommissionPercentage')}</Label>
                        <Input id="commission-percent" type="number" placeholder="%" />
                    </div>
                     <div>
                        <Label htmlFor="commission-amount">{t('salesCommissionAmount')}</Label>
                        <Input id="commission-amount" type="number" placeholder="Amount" />
                    </div>
                </div>
                <div className="mt-6">
                    <Label htmlFor="description">{t('description')}</Label>
                    <textarea id="description" rows={4} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter any notes about the deal..."></textarea>
                </div>
                 <div className="mt-6 flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setCurrentPage('Deals')}>
                        {t('cancel')}
                    </Button>
                    <Button onClick={() => setCurrentPage('Deals')}>
                        {t('createDeal')}
                    </Button>
                </div>
            </Card>
        </PageWrapper>
    )
}
