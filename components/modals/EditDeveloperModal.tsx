
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';
import { Developer } from '../../types';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const EditDeveloperModal = () => {
    const { isEditDeveloperModalOpen, setIsEditDeveloperModalOpen, t, updateDeveloper, editingDeveloper, setEditingDeveloper } = useAppContext();
    const [formState, setFormState] = useState<Omit<Developer, 'id' | 'code'>>({
        name: '',
    });

    useEffect(() => {
        if (editingDeveloper) {
            setFormState({
                name: editingDeveloper.name,
            });
        }
    }, [editingDeveloper]);

    const handleClose = () => {
        setIsEditDeveloperModalOpen(false);
        setEditingDeveloper(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingDeveloper) {
            try {
                await updateDeveloper({
                    ...editingDeveloper,
                    ...formState,
                });
                handleClose();
            } catch (error) {
                console.error('Error updating developer:', error);
            }
        }
    };

    if (!editingDeveloper) return null;

    return (
        <Modal isOpen={isEditDeveloperModalOpen} onClose={handleClose} title={`${t('edit')} ${t('developer')}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">{t('developerName')}</Label>
                    <Input id="name" placeholder={t('enterDeveloperName')} value={formState.name} onChange={handleChange} />
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={handleClose}>{t('cancel')}</Button>
                    <Button type="submit">{t('saveChanges')}</Button>
                </div>
            </form>
        </Modal>
    );
};
