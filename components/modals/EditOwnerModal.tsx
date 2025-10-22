
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

export const EditOwnerModal = () => {
    const { isEditOwnerModalOpen, setIsEditOwnerModalOpen, t, updateOwner, editingOwner, setEditingOwner } = useAppContext();
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        city: 'Riyadh',
        district: '',
    });

    useEffect(() => {
        if (editingOwner) {
            setFormState({
                name: editingOwner.name,
                phone: editingOwner.phone,
                city: editingOwner.city,
                district: editingOwner.district,
            });
        }
    }, [editingOwner]);

    const handleClose = () => {
        setIsEditOwnerModalOpen(false);
        setEditingOwner(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingOwner) {
            updateOwner({
                ...editingOwner,
                ...formState,
            });
        }
        handleClose();
    };

    if (!editingOwner) return null;

    return (
        <Modal isOpen={isEditOwnerModalOpen} onClose={handleClose} title={`${t('edit')} ${t('ownerName')}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">{t('ownerName')}</Label>
                    <Input id="name" placeholder={t('enterOwnerFullName')} value={formState.name} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="phone">{t('ownerPhone')}</Label>
                    <Input id="phone" placeholder={t('enterContactPhoneNumber')} value={formState.phone} onChange={handleChange} />
                </div>
                 <div>
                    <Label htmlFor="city">{t('city')}</Label>
                    <Select id="city" value={formState.city} onChange={handleChange}>
                        <option>{t('riyadh')}</option>
                        <option>{t('jeddah')}</option>
                        <option>{t('dammam')}</option>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="district">{t('ownerDistrict')}</Label>
                    <Input id="district" placeholder={t('enterSpecificDistrict')} value={formState.district} onChange={handleChange} />
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={handleClose}>{t('cancel')}</Button>
                    <Button type="submit">{t('saveChanges')}</Button>
                </div>
            </form>
        </Modal>
    );
};
