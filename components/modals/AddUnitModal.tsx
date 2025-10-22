import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const AddUnitModal = () => {
    const { isAddUnitModalOpen, setIsAddUnitModalOpen, t } = useAppContext();

    return (
        <Modal isOpen={isAddUnitModalOpen} onClose={() => setIsAddUnitModalOpen(false)} title={t('addNewUnit')}>
            <div className="space-y-4">
                 <div>
                    <Label htmlFor="unit-code">{t('unitCode')}</Label>
                    <Input id="unit-code" placeholder={t('enterUnitCode')} />
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsAddUnitModalOpen(false)}>{t('submit')}</Button>
                </div>
            </div>
        </Modal>
    );
};