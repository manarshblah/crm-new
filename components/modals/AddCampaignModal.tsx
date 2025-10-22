import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const AddCampaignModal = () => {
    const { isAddCampaignModalOpen, setIsAddCampaignModalOpen, t } = useAppContext();

    return (
        <Modal isOpen={isAddCampaignModalOpen} onClose={() => setIsAddCampaignModalOpen(false)} title={t('addNewCampaign')}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="campaign-name">{t('name')}</Label>
                    <Input id="campaign-name" placeholder={t('enterCampaignName')} />
                </div>
                 <div>
                    <Label htmlFor="campaign-code">{t('code')}</Label>
                    <Input id="campaign-code" placeholder={t('enterCampaignCode')} />
                </div>
                 <div>
                    <Label htmlFor="campaign-budget">{t('budget')}</Label>
                    <Input id="campaign-budget" type="number" placeholder={t('enterCampaignBudget')} />
                </div>
                <div>
                    <Label htmlFor="campaign-created-at">{t('createdAt')}</Label>
                    <Input id="campaign-created-at" type="date" />
                </div>
                <div className="flex items-center gap-2">
                    <input id="campaign-active" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <Label htmlFor="campaign-active">{t('active')}</Label>
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsAddCampaignModalOpen(false)}>{t('submit')}</Button>
                </div>
            </div>
        </Modal>
    );
};