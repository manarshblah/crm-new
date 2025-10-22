import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';
import { Page } from '../../types';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const Select = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <select id={id} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

const getPlatformName = (currentPage: Page): string => {
    switch (currentPage) {
        case 'Integrations':
        case 'Facebook':
            return 'Facebook';
        case 'TikTok':
            return 'TikTok';
        case 'WhatsApp':
            return 'WhatsApp';
        default:
            return '';
    }
}

export const AddIntegrationAccountModal = () => {
    const { isAddIntegrationAccountModalOpen, setIsAddIntegrationAccountModalOpen, currentPage, t } = useAppContext();
    const platformName = getPlatformName(currentPage);

    const handleSubmit = () => {
        // Here you would typically call an API to save the new account
        console.log(`Adding new ${platformName} account...`);
        setIsAddIntegrationAccountModalOpen(false);
    };

    const renderPlatformFields = () => {
        switch (platformName) {
            case 'Facebook':
            case 'TikTok':
                return (
                    <>
                        <div>
                            <Label htmlFor="account-name">{t('accountName')}</Label>
                            <Input id="account-name" placeholder={t('enterAccountName')} />
                        </div>
                        <div>
                            <Label htmlFor="account-link">{t('accountLink')}</Label>
                            <Input id="account-link" placeholder="https://..." />
                        </div>
                    </>
                );
            case 'WhatsApp':
                 return (
                    <>
                        <div>
                            <Label htmlFor="account-name">{t('accountName')}</Label>
                            <Input id="account-name" placeholder={t('egSalesWhatsapp')} />
                        </div>
                        <div>
                            <Label htmlFor="phone-number">{t('phoneNumber')}</Label>
                            <Input id="phone-number" placeholder={t('enterWhatsappNumber')} />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal 
            isOpen={isAddIntegrationAccountModalOpen} 
            onClose={() => setIsAddIntegrationAccountModalOpen(false)} 
            title={`${t('addNew')} ${platformName} ${t('account')}`}
        >
            <div className="space-y-4">
                {renderPlatformFields()}
                <div>
                    <Label htmlFor="status">{t('status')}</Label>
                    <Select id="status">
                        <option>{t('connected')}</option>
                        <option>{t('disconnected')}</option>
                    </Select>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setIsAddIntegrationAccountModalOpen(false)}>{t('cancel')}</Button>
                    <Button onClick={handleSubmit}>{t('submit')}</Button>
                </div>
            </div>
        </Modal>
    );
};