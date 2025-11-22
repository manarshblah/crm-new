
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';
import { Project } from '../../types';

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


export const EditProjectModal = () => {
    const { isEditProjectModalOpen, setIsEditProjectModalOpen, t, updateProject, editingProject, setEditingProject, developers } = useAppContext();
    const [formState, setFormState] = useState<Omit<Project, 'id' | 'code'>>({
        name: '',
        developer: '',
        type: '',
        city: '',
        paymentMethod: '',
    });

    useEffect(() => {
        if (editingProject) {
            setFormState({
                name: editingProject.name,
                developer: editingProject.developer,
                type: editingProject.type,
                city: editingProject.city,
                paymentMethod: editingProject.paymentMethod,
            });
        }
    }, [editingProject]);

    const handleClose = () => {
        setIsEditProjectModalOpen(false);
        setEditingProject(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProject) {
            try {
                await updateProject({
                    ...editingProject,
                    ...formState,
                });
                handleClose();
            } catch (error) {
                console.error('Error updating project:', error);
                // يمكن إضافة toast notification هنا
            }
        }
    };

    if (!editingProject) return null;

    return (
        <Modal isOpen={isEditProjectModalOpen} onClose={handleClose} title={`${t('edit')} ${t('project')}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <Label htmlFor="name">{t('projectName')}</Label>
                    <Input id="name" placeholder={t('enterProjectName')} value={formState.name} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="developer">{t('developer')}</Label>
                    <Select id="developer" value={formState.developer} onChange={handleChange}>
                        {developers.map(dev => <option key={dev.id} value={dev.name}>{dev.name}</option>)}
                    </Select>
                </div>
                <div>
                    <Label htmlFor="type">{t('type')}</Label>
                    <Input id="type" placeholder="e.g. Residential" value={formState.type} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="city">{t('city')}</Label>
                    <Input id="city" placeholder="e.g. Dubai" value={formState.city} onChange={handleChange} />
                </div>
                 <div>
                    <Label htmlFor="paymentMethod">{t('paymentMethod')}</Label>
                    <Select id="paymentMethod" value={formState.paymentMethod} onChange={handleChange}>
                        <option value="Cash">{t('cash')}</option>
                        <option value="Installments">{t('installment')}</option>
                    </Select>
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={handleClose}>{t('cancel')}</Button>
                    <Button type="submit">{t('saveChanges')}</Button>
                </div>
            </form>
        </Modal>
    );
};
