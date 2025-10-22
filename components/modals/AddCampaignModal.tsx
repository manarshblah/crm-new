
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const AddCampaignModal = () => {
    const { isAddCampaignModalOpen, setIsAddCampaignModalOpen, t, addCampaign } = useAppContext();
    const [formState, setFormState] = useState({
        name: '',
        code: '',
        budget: '',
        createdAt: new Date().toISOString().split('T')[0],
        isActive: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormState(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCampaign({
            ...formState,
            budget: Number(formState.budget)
        });
        setIsAddCampaignModalOpen(false);
        // Reset form
        setFormState({
            name: '', code: '', budget: '',
            createdAt: new Date().toISOString().split('T')[0],
            isActive: true,
        });
    };

    return (
        <Modal isOpen={isAddCampaignModalOpen} onClose={() => setIsAddCampaignModalOpen(false)} title={t('addNewCampaign')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">{t('name')}</Label>
                    <Input id="name" placeholder={t('enterCampaignName')} value={formState.name} onChange={handleChange} />
                </div>
                 <div>
                    <Label htmlFor="code">{t('code')}</Label>
                    <Input id="code" placeholder={t('enterCampaignCode')} value={formState.code} onChange={handleChange} />
                </div>
                 <div>
                    <Label htmlFor="budget">{t('budget')}</Label>
                    <Input id="budget" type="number" placeholder={t('enterCampaignBudget')} value={formState.budget} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="createdAt">{t('createdAt')}</Label>
                    <Input id="createdAt" type="date" value={formState.createdAt} onChange={handleChange} />
                </div>
                <div className="flex items-center gap-2">
                    <input id="isActive" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" checked={formState.isActive} onChange={handleChange} />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('active')}</label>
                </div>
                <div className="flex justify-end">
                    <Button type="submit">{t('submit')}</Button>
                </div>
            </form>
        </Modal>
    );
};
