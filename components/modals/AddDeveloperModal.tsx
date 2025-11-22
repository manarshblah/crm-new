
import React, { useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const AddDeveloperModal = () => {
    const { isAddDeveloperModalOpen, setIsAddDeveloperModalOpen, t, addDeveloper } = useAppContext();
    const [formState, setFormState] = useState({
        name: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name) return;
        try {
            await addDeveloper(formState);
            setIsAddDeveloperModalOpen(false);
            setFormState({ name: '' });
        } catch (error) {
            console.error('Error adding developer:', error);
        }
    };

    return (
        <Modal isOpen={isAddDeveloperModalOpen} onClose={() => setIsAddDeveloperModalOpen(false)} title={t('addNewDeveloper')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">{t('developerName')}</Label>
                    <Input id="name" placeholder={t('enterDeveloperName')} value={formState.name} onChange={handleChange} />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">{t('submit')}</Button>
                </div>
            </form>
        </Modal>
    );
};
