import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Button } from '../Button';

export const AssignLeadModal = () => {
    const { isAssignLeadModalOpen, setIsAssignLeadModalOpen, checkedLeadIds, t, users, assignLeads } = useAppContext();
    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const handleAssign = async () => {
        if (!selectedUserId || checkedLeadIds.size === 0) {
            alert(t('selectEmployee') || 'Please select an employee');
            return;
        }

        try {
            await assignLeads(Array.from(checkedLeadIds), Number(selectedUserId));
            setIsAssignLeadModalOpen(false);
            setSelectedUserId('');
        } catch (error) {
            console.error('Error assigning leads:', error);
            alert('Failed to assign leads. Please try again.');
        }
    };

    const handleClose = () => {
        setIsAssignLeadModalOpen(false);
        setSelectedUserId('');
    };

    return (
        <Modal isOpen={isAssignLeadModalOpen} onClose={handleClose} title={t('assignLead')}>
            <div className="space-y-4">
                <p>{t('leadsCount')}: <span className="font-bold">{checkedLeadIds.size}</span></p>
                <div>
                    <label htmlFor="assignUser" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('selectEmployee')}</label>
                    <select 
                        id="assignUser" 
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">{t('selectEmployee') || 'Select Employee'}</option>
                        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={handleClose}>{t('cancel')}</Button>
                    <Button onClick={handleAssign} disabled={!selectedUserId || checkedLeadIds.size === 0}>{t('assignLead')}</Button>
                </div>
            </div>
        </Modal>
    );
};