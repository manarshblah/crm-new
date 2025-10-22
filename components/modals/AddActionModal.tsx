
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Button } from '../Button';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const AddActionModal = () => {
    const { isAddActionModalOpen, setIsAddActionModalOpen, selectedLead, t } = useAppContext();

    if (!selectedLead) return null;

    return (
        <Modal isOpen={isAddActionModalOpen} onClose={() => setIsAddActionModalOpen(false)} title={`${t('add_action')} ${t('for')} ${selectedLead.name}`}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="stage">{t('stage')}</Label>
                    <select id="stage" defaultValue={selectedLead.lastStage} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>{t('untouched')}</option>
                        <option>{t('touched')}</option>
                        <option>{t('following')}</option>
                        <option>{t('meeting')}</option>
                        <option>{t('noAnswer')}</option>
                        <option>{t('outOfService')}</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor="notes">{t('notes')}</Label>
                    <textarea id="notes" rows={4} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t('writeActionDetails')}></textarea>
                </div>
                <div>
                    <Label htmlFor="reminder">{t('reminderDate')}</Label>
                    <input type="datetime-local" id="reminder" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsAddActionModalOpen(false)}>{t('submit')}</Button>
                </div>
            </div>
        </Modal>
    );
};
