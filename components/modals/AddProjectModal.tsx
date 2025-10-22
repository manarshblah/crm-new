import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const AddProjectModal = () => {
    const { isAddProjectModalOpen, setIsAddProjectModalOpen, t } = useAppContext();

    return (
        <Modal isOpen={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)} title={t('addNewProject')}>
            <div className="space-y-4">
                 <div>
                    <Label htmlFor="proj-name">{t('projectName')}</Label>
                    <Input id="proj-name" placeholder={t('enterProjectName')} />
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setIsAddProjectModalOpen(false)}>{t('submit')}</Button>
                </div>
            </div>
        </Modal>
    );
};