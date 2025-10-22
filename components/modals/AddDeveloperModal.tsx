import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const AddDeveloperModal = () => {
    const { isAddDeveloperModalOpen, setIsAddDeveloperModalOpen, t } = useAppContext();

    return (
        <Modal isOpen={isAddDeveloperModalOpen} onClose={() => setIsAddDeveloperModalOpen(false)} title={t('addNewDeveloper')}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="dev-name">{t('developerName')}</Label>
                    <Input id="dev-name" placeholder={t('enterDeveloperName')} />
                </div>
                <div>
                    <Label htmlFor="dev-code">{t('code')}</Label>
                    <Input id="dev-code" placeholder={t('enterCode')} />
                </div>
                 <div>
                    <Label htmlFor="dev-logo">{t('logo')}</Label>
                    <Input id="dev-logo" type="file" />
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsAddDeveloperModalOpen(false)}>{t('submit')}</Button>
                </div>
            </div>
        </Modal>
    );
};