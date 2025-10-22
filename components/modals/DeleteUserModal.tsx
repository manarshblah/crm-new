import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Button } from '../Button';

export const DeleteUserModal = () => {
    const { isDeleteUserModalOpen, setIsDeleteUserModalOpen, selectedUser, t } = useAppContext();

    const handleDelete = () => {
        // Here you would typically call an API to delete the user
        console.log(`Deleting user: ${selectedUser?.name}`);
        setIsDeleteUserModalOpen(false);
    };

    if (!selectedUser) return null;

    return (
        <Modal isOpen={isDeleteUserModalOpen} onClose={() => setIsDeleteUserModalOpen(false)} title={t('deleteUser')}>
            <div className="space-y-4">
                <p>{t('confirmDeleteUser1')} <span className="font-bold">{selectedUser.name}</span>{t('confirmDeleteUser2')}</p>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setIsDeleteUserModalOpen(false)}>{t('cancel')}</Button>
                    <Button variant="danger" onClick={handleDelete}>{t('deleteUser')}</Button>
                </div>
            </div>
        </Modal>
    );
};