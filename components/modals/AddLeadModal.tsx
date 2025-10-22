import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { MOCK_USERS } from '../../constants';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const Select = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <select id={id} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

export const AddLeadModal = () => {
    const { isAddLeadModalOpen, setIsAddLeadModalOpen, t } = useAppContext();

    return (
        <Modal isOpen={isAddLeadModalOpen} onClose={() => setIsAddLeadModalOpen(false)} title={t('addNewLead')}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="clientName">{t('clientName')}</Label>
                        <Input id="clientName" placeholder={t('enterClientName')} />
                    </div>
                     <div>
                        <Label htmlFor="budget">{t('budget')}</Label>
                        <Input id="budget" type="number" placeholder={t('enterBudget')} />
                    </div>
                    <div>
                        <Label htmlFor="phone1">{t('phoneNumber1')}</Label>
                        <Input id="phone1" placeholder={t('enterPhoneNumber')} />
                    </div>
                     <div>
                        <Label htmlFor="assignedTo">{t('assignedTo')}</Label>
                        <Select id="assignedTo">
                            {MOCK_USERS.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="authority">{t('authority')}</Label>
                        <Select id="authority">
                            <option>{t('decisionMaker')}</option>
                            <option>{t('influencer')}</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="type">{t('type')}</Label>
                        <Select id="type">
                            <option>{t('fresh')}</option>
                            <option>{t('cold')}</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="communication">{t('communicationWay')}</Label>
                        <Select id="communication">
                            <option>{t('call')}</option>
                            <option>{t('whatsapp')}</option>
                            <option>{t('email')}</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="priority">{t('priority')}</Label>
                        <Select id="priority">
                            <option>{t('high')}</option>
                            <option>{t('medium')}</option>
                            <option>{t('low')}</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="channel">{t('channel')}</Label>
                        <Input id="channel" placeholder={t('egFacebookAd')} />
                    </div>
                </div>
                <div>
                    <Label htmlFor="notes">{t('notes')}</Label>
                    <textarea id="notes" rows={3} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsAddLeadModalOpen(false)}>{t('submit')}</Button>
                </div>
            </div>
        </Modal>
    );
};