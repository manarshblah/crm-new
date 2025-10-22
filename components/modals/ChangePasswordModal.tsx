
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const ChangePasswordModal = () => {
    const { isChangePasswordModalOpen, setIsChangePasswordModalOpen, t } = useAppContext();

    const handleSubmit = () => {
        // Handle password change logic here
        setIsChangePasswordModalOpen(false);
    };

    return (
        <Modal isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)} title={t('changePassword')}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="current-password">{t('currentPassword')}</Label>
                    <Input id="current-password" type="password" placeholder={t('enterCurrentPassword')} />
                </div>
                <div>
                    <Label htmlFor="new-password">{t('newPassword')}</Label>
                    <Input id="new-password" type="password" placeholder={t('enterNewPassword')} />
                </div>
                <div>
                    <Label htmlFor="confirm-new-password">{t('confirmNewPassword')}</Label>
                    <Input id="confirm-new-password" type="password" placeholder={t('enterConfirmNewPassword')} />
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setIsChangePasswordModalOpen(false)}>{t('cancel')}</Button>
                    <Button onClick={handleSubmit}>{t('saveChanges')}</Button>
                </div>
            </div>
        </Modal>
    );
};
