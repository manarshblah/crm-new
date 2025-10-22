
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
        logo: '', // This will now store a data URL
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name) return;
        addDeveloper(formState);
        setIsAddDeveloperModalOpen(false);
        setFormState({ name: '', logo: '' });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    return (
        <Modal isOpen={isAddDeveloperModalOpen} onClose={() => setIsAddDeveloperModalOpen(false)} title={t('addNewDeveloper')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">{t('developerName')}</Label>
                    <Input id="name" placeholder={t('enterDeveloperName')} value={formState.name} onChange={handleChange} />
                </div>
                 <div>
                    <Label htmlFor="logo-upload">{t('logo')}</Label>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center border dark:border-gray-600">
                            {formState.logo ? (
                                <img src={formState.logo} alt="Logo Preview" className="w-full h-full object-contain rounded-md" />
                            ) : (
                                <span className="text-xs text-gray-500">{t('logo')}</span>
                            )}
                        </div>
                        <input
                            type="file"
                            id="logo-upload"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <Button type="button" variant="secondary" onClick={triggerFileSelect}>{t('upload')}</Button>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit">{t('submit')}</Button>
                </div>
            </form>
        </Modal>
    );
};
