
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const Select = ({ id, children, value, onChange }: { id: string; children?: React.ReactNode; value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; }) => (
    <select id={id} value={value} onChange={onChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-gray-100">
        {children}
    </select>
);

export const AddServiceModal = () => {
    const { isAddServiceModalOpen, setIsAddServiceModalOpen, t, addService, serviceProviders } = useAppContext();
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: '',
        provider: '',
        isActive: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAddServiceModalOpen) {
            // Reset form when modal opens
            setFormState({
                name: '',
                description: '',
                price: '',
                duration: '',
                category: '',
                provider: '',
                isActive: true,
            });
        }
    }, [isAddServiceModalOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        if (type === 'checkbox') {
            setFormState(prev => ({ ...prev, [id]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormState(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleClose = () => {
        setIsAddServiceModalOpen(false);
        setFormState({
            name: '',
            description: '',
            price: '',
            duration: '',
            category: '',
            provider: '',
            isActive: true,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.price) {
            alert('Please fill in required fields');
            return;
        }

        setLoading(true);
        try {
            await addService({
                name: formState.name,
                description: formState.description,
                price: Number(formState.price) || 0,
                duration: formState.duration,
                category: formState.category,
                provider: formState.provider || undefined,
                isActive: formState.isActive,
            });
            handleClose();
        } catch (error: any) {
            console.error('Error creating service:', error);
            const errorMessage = error?.message || 'Failed to create service. Please try again.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isAddServiceModalOpen} onClose={handleClose} title={t('addService') || 'Add Service'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">{t('name')} *</Label>
                    <Input id="name" placeholder={t('enterServiceName') || 'Enter service name'} value={formState.name} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="description">{t('description')}</Label>
                    <textarea 
                        id="description" 
                        rows={3} 
                        value={formState.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                        placeholder={t('enterServiceDescription') || 'Enter service description'}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="price">{t('price')} *</Label>
                        <Input id="price" type="number" placeholder={t('enterPrice') || 'Enter price'} value={formState.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="duration">{t('duration')}</Label>
                        <Input id="duration" placeholder={t('enterDuration') || 'e.g., 1 hour'} value={formState.duration} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="category">{t('category')}</Label>
                        <Input id="category" placeholder={t('enterCategory') || 'Enter category'} value={formState.category} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="provider">{t('provider')}</Label>
                        <Select id="provider" value={formState.provider} onChange={handleChange}>
                            <option value="">{t('selectProvider') || 'Select Provider (Optional)'}</option>
                            {serviceProviders.map(provider => (
                                <option key={provider.id} value={provider.name}>{provider.name}</option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="isActive" 
                        checked={formState.isActive}
                        onChange={handleChange}
                        className="w-4 h-4 text-gray-900 dark:text-gray-100 bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <Label htmlFor="isActive">{t('active')}</Label>
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={handleClose} disabled={loading}>{t('cancel')}</Button>
                    <Button type="submit" disabled={loading}>{loading ? t('loading') || 'Loading...' : t('submit')}</Button>
                </div>
            </form>
        </Modal>
    );
};

