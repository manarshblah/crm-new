
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MOCK_USERS } from '../../constants';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';
import { Lead } from '../../types';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

// FIX: Made children optional to fix missing children prop error.
const Select = ({ id, children, value, onChange }: { id: string; children?: React.ReactNode; value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; }) => (
    <select id={id} value={value} onChange={onChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

export const AddLeadModal = () => {
    const { isAddLeadModalOpen, setIsAddLeadModalOpen, t, addLead } = useAppContext();
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        budget: '',
        assignedTo: MOCK_USERS[0]?.id.toString() || '1',
        authority: 'Decision Maker',
        type: 'Fresh' as Lead['type'],
        communicationWay: 'Call',
        priority: 'Medium' as Lead['priority'],
        channel: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.phone) {
            // Add proper validation feedback
            return;
        }
        addLead({
            name: formState.name,
            phone: formState.phone,
            budget: Number(formState.budget) || 0,
            assignedTo: Number(formState.assignedTo),
            authority: formState.authority,
            type: formState.type,
            communicationWay: formState.communicationWay,
            priority: formState.priority,
            channel: formState.channel,
        });
        setIsAddLeadModalOpen(false);
        // Reset form
        setFormState({
            name: '', phone: '', budget: '', assignedTo: '1', authority: 'Decision Maker',
            type: 'Fresh', communicationWay: 'Call', priority: 'Medium', channel: '',
        });
    };

    return (
        <Modal isOpen={isAddLeadModalOpen} onClose={() => setIsAddLeadModalOpen(false)} title={t('addNewLead')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">{t('clientName')}</Label>
                        <Input id="name" placeholder={t('enterClientName')} value={formState.name} onChange={handleChange} />
                    </div>
                     <div>
                        <Label htmlFor="budget">{t('budget')}</Label>
                        <Input id="budget" type="number" placeholder={t('enterBudget')} value={formState.budget} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="phone">{t('phoneNumber1')}</Label>
                        <Input id="phone" placeholder={t('enterPhoneNumber')} value={formState.phone} onChange={handleChange} />
                    </div>
                     <div>
                        <Label htmlFor="assignedTo">{t('assignedTo')}</Label>
                        <Select id="assignedTo" value={formState.assignedTo} onChange={handleChange}>
                            {MOCK_USERS.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="authority">{t('authority')}</Label>
                        <Select id="authority" value={formState.authority} onChange={handleChange}>
                            <option>{t('decisionMaker')}</option>
                            <option>{t('influencer')}</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="type">{t('type')}</Label>
                        <Select id="type" value={formState.type} onChange={handleChange}>
                            <option value="Fresh">{t('fresh')}</option>
                            <option value="Cold">{t('cold')}</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="communicationWay">{t('communicationWay')}</Label>
                        <Select id="communicationWay" value={formState.communicationWay} onChange={handleChange}>
                            <option>{t('call')}</option>
                            <option>{t('whatsapp')}</option>
                            <option>{t('email')}</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="priority">{t('priority')}</Label>
                        <Select id="priority" value={formState.priority} onChange={handleChange}>
                            <option value="High">{t('high')}</option>
                            <option value="Medium">{t('medium')}</option>
                            <option value="Low">{t('low')}</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="channel">{t('channel')}</Label>
                        <Input id="channel" placeholder={t('egFacebookAd')} value={formState.channel} onChange={handleChange} />
                    </div>
                </div>
                {/* <div>
                    <Label htmlFor="notes">{t('notes')}</Label>
                    <textarea id="notes" rows={3} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div> */}
                <div className="flex justify-end">
                    <Button type="submit">{t('submit')}</Button>
                </div>
            </form>
        </Modal>
    );
};
