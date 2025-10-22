import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { MOCK_USERS } from '../../constants';
import { Modal } from '../Modal';
import { Button } from '../Button';

export const AssignLeadModal = () => {
    const { isAssignLeadModalOpen, setIsAssignLeadModalOpen, checkedLeadIds, t } = useAppContext();

    return (
        <Modal isOpen={isAssignLeadModalOpen} onClose={() => setIsAssignLeadModalOpen(false)} title={t('assignLead')}>
            <div className="space-y-4">
                <p>{t('leadsCount')}: <span className="font-bold">{checkedLeadIds.size}</span></p>
                <div>
                    <label htmlFor="assignUser" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('selectEmployee')}</label>
                    <select id="assignUser" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        {MOCK_USERS.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsAssignLeadModalOpen(false)}>{t('assignLead')}</Button>
                </div>
            </div>
        </Modal>
    );
};