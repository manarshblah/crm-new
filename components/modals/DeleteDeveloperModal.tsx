
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Button } from '../Button';

export const DeleteDeveloperModal = () => {
    const { isDeleteDeveloperModalOpen, setIsDeleteDeveloperModalOpen, deletingDeveloper, setDeletingDeveloper, t, deleteDeveloper } = useAppContext();

    const handleDelete = async () => {
        if (deletingDeveloper) {
            try {
                await deleteDeveloper(deletingDeveloper.id);
                setIsDeleteDeveloperModalOpen(false);
                setDeletingDeveloper(null);
            } catch (error) {
                console.error('Error deleting developer:', error);
            }
        }
    };

    if (!deletingDeveloper) return null;

    return (
        <Modal isOpen={isDeleteDeveloperModalOpen} onClose={() => {
            setIsDeleteDeveloperModalOpen(false);
            setDeletingDeveloper(null);
        }} title={t('deleteDeveloper') || 'Delete Developer'}>
            <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                    {t('confirmDeleteDeveloper1') || 'Are you sure you want to delete'} <span className="font-bold">{deletingDeveloper.name}</span>? {t('confirmDeleteDeveloper2') || 'This action cannot be undone.'}
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => {
                        setIsDeleteDeveloperModalOpen(false);
                        setDeletingDeveloper(null);
                    }}>{t('cancel')}</Button>
                    <Button variant="danger" onClick={handleDelete}>{t('delete')}</Button>
                </div>
            </div>
        </Modal>
    );
};

