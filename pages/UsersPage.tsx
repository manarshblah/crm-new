
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_USERS } from '../constants';
import { PageWrapper, Button, Card, Dropdown, DropdownItem, WhatsappIcon } from '../components/index';
import { User } from '../types';

const UserCard = ({ user }: { user: User }) => {
    const { t, setSelectedUser, setIsEditUserModalOpen, setIsDeleteUserModalOpen } = useAppContext();
    
    const handleEdit = () => {
        setSelectedUser(user);
        setIsEditUserModalOpen(true);
    };

    const handleDelete = () => {
        setSelectedUser(user);
        setIsDeleteUserModalOpen(true);
    };

    return (
        <Card className="relative text-center">
            <div className="absolute top-2 end-2">
                <Dropdown trigger={
                    <Button variant="ghost" className="p-1 h-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </Button>
                }>
                    <DropdownItem onClick={() => { /* Implement View User navigation */ }}>{t('viewUser')}</DropdownItem>
                    <DropdownItem onClick={handleEdit}>{t('editUser')}</DropdownItem>
                    <DropdownItem onClick={handleDelete}>{t('deleteUser')}</DropdownItem>
                </Dropdown>
            </div>
            <div className="flex flex-col items-center pt-4">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-3" />
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                <p className="text-sm mt-1">{user.phone}</p>
                <div className="flex gap-2 mt-4">
                    <Button variant="secondary" className="text-xs px-3 py-1 h-auto">{t('call')}</Button>
                    <a href={`https://wa.me/${user.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                        <Button variant="secondary" className="text-xs px-3 py-1 h-auto !bg-green-500 text-white hover:!bg-green-600">
                           <WhatsappIcon className="w-4 h-4" />
                        </Button>
                    </a>
                </div>
            </div>
        </Card>
    );
};


export const UsersPage = () => {
    const { t } = useAppContext();
    const [autoAssign, setAutoAssign] = useState(true);
    const userCount = MOCK_USERS.length;

    return (
        <PageWrapper
            title={`${t('users')}: ${userCount}`}
            actions={
                <Button 
                    variant={autoAssign ? 'secondary' : 'danger'}
                    onClick={() => setAutoAssign(!autoAssign)}
                    className={`min-w-[180px] ${autoAssign ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}
                >
                    {t('autoAssignment')}: {autoAssign ? t('on') : t('off')}
                </Button>
            }
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MOCK_USERS.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </PageWrapper>
    );
};
