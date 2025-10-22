import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const Select = ({ id, children, defaultValue }: { id: string; children: React.ReactNode; defaultValue?: string }) => (
    <select id={id} defaultValue={defaultValue} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

export const EditUserModal = () => {
    const { isEditUserModalOpen, setIsEditUserModalOpen, selectedUser, t } = useAppContext();

    if (!selectedUser) return null;

    return (
        <Modal isOpen={isEditUserModalOpen} onClose={() => setIsEditUserModalOpen(false)} title={`${t('editUser')}: ${selectedUser.name}`}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="edit-user-name">{t('name')}</Label>
                    <Input id="edit-user-name" defaultValue={selectedUser.name} />
                </div>
                 <div>
                    <Label htmlFor="edit-user-phone">{t('phone')}</Label>
                    <Input id="edit-user-phone" defaultValue={selectedUser.phone} />
                </div>
                 <div>
                    <Label htmlFor="edit-user-email">{t('email')}</Label>
                    <Input id="edit-user-email" type="email" defaultValue={selectedUser.email} />
                </div>
                 <div>
                    <Label htmlFor="edit-user-password">{t('newUserPassword')}</Label>
                    <Input id="edit-user-password" type="password" placeholder={t('leaveBlankPassword')} />
                </div>
                <div>
                    <Label htmlFor="edit-user-role">{t('role')}</Label>
                    <Select id="edit-user-role" defaultValue={selectedUser.role}>
                        <option>{t('owners')}</option>
                        <option>{t('salesManager')}</option>
                        <option>{t('salesAgent')}</option>
                    </Select>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setIsEditUserModalOpen(false)}>{t('cancel')}</Button>
                    <Button onClick={() => setIsEditUserModalOpen(false)}>{t('saveChanges')}</Button>
                </div>
            </div>
        </Modal>
    );
};