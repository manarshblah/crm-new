
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

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

export const AddProjectModal = () => {
    const { isAddProjectModalOpen, setIsAddProjectModalOpen, t, addProject, developers } = useAppContext();
    const [formState, setFormState] = useState({
        name: '',
        developer: '',
        type: 'Residential',
        city: '',
        paymentMethod: 'Cash',
    });

    // تحديث developer عند فتح الـ modal أو عند تحميل developers
    useEffect(() => {
        if (isAddProjectModalOpen && developers.length > 0) {
            setFormState(prev => {
                // إذا كان developer فارغ، اختر الأول
                if (!prev.developer) {
                    return { ...prev, developer: developers[0].name };
                }
                return prev;
            });
        }
    }, [isAddProjectModalOpen, developers]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // التحقق من أن الحقول المطلوبة مملوءة
        if (!formState.name.trim()) {
            alert(t('projectName') + ' is required');
            return;
        }
        
        if (!formState.developer) {
            alert(t('developer') + ' is required');
            return;
        }
        
        if (developers.length === 0) {
            alert('No developers available. Please add a developer first.');
            return;
        }
        
        try {
            await addProject(formState);
            handleClose();
        } catch (error: any) {
            console.error('Error adding project:', error);
            alert(error?.message || 'Failed to add project. Please try again.');
        }
    };

    const handleClose = () => {
        setIsAddProjectModalOpen(false);
        // Reset form عند الإغلاق
        setFormState({
            name: '',
            developer: '',
            type: 'Residential',
            city: '',
            paymentMethod: 'Cash',
        });
    };

    return (
        <Modal isOpen={isAddProjectModalOpen} onClose={handleClose} title={t('addNewProject')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <Label htmlFor="name">{t('projectName')}</Label>
                    <Input id="name" placeholder={t('enterProjectName')} value={formState.name} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="developer">{t('developer')}</Label>
                    <Select id="developer" value={formState.developer} onChange={handleChange}>
                        <option value="">{t('selectDeveloper') || 'Select Developer'}</option>
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
                <div className="flex justify-end">
                    <Button type="submit">{t('submit')}</Button>
                </div>
            </form>
        </Modal>
    );
};
