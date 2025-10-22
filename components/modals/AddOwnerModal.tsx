import React from 'react';
import { useAppContext } from '../../context/AppContext';
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

export const AddOwnerModal = () => {
    const { isAddOwnerModalOpen, setIsAddOwnerModalOpen, t } = useAppContext();

    return (
        <Modal isOpen={isAddOwnerModalOpen} onClose={() => setIsAddOwnerModalOpen(false)} title={t('addNewOwner')}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="owner-name">{t('ownerName')}</Label>
                    <Input id="owner-name" placeholder={t('enterOwnerFullName')} />
                </div>
                <div>
                    <Label htmlFor="owner-code">{t('ownerCode')}</Label>
                    <Input id="owner-code" placeholder={t('enterUniqueCode')} />
                </div>
                <div>
                    <Label htmlFor="owner-phone">{t('ownerPhone')}</Label>
                    <Input id="owner-phone" placeholder={t('enterContactPhoneNumber')} />
                </div>
                 <div>
                    <Label htmlFor="owner-city">{t('city')}</Label>
                    <Select id="owner-city">
                        <option>{t('selectCityPlaceholder')}</option>
                        <option>{t('riyadh')}</option>
                        <option>{t('jeddah')}</option>
                        <option>{t('dammam')}</option>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="owner-district">{t('ownerDistrict')}</Label>
                    <Input id="owner-district" placeholder={t('enterSpecificDistrict')} />
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsAddOwnerModalOpen(false)}>{t('submit')}</Button>
                </div>
            </div>
        </Modal>
    );
};