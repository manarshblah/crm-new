



import React, { useState } from 'react';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Card, Button, Input, ToggleSwitch, TrashIcon, EyeIcon, EyeOffIcon, PlusIcon } from '../../components/index';
import { MOCK_STATUSES } from '../../constants';
import { Status } from '../../types';
import { useAppContext } from '../../context/AppContext';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

// FIX: Made children optional to fix missing children prop error.
const Select = ({ id, children, value, onChange, className }: { id: string; children?: React.ReactNode, value?: string, onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void, className?:string }) => (
    <select id={id} value={value} onChange={onChange} className={`w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}>
        {children}
    </select>
);

export const StatusesSettings = () => {
    const { t } = useAppContext();
    const [customStatuses, setCustomStatuses] = useState(true);
    const [requireUpdates, setRequireUpdates] = useState(true);
    const [statuses, setStatuses] = useState<Status[]>(MOCK_STATUSES);
    const [defaultStatus, setDefaultStatus] = useState(MOCK_STATUSES.find(s => s.isDefault)?.name || '');

    const handleStatusChange = (id: number, field: keyof Status, value: any) => {
        setStatuses(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleAddStatus = () => {
        const newStatus: Status = {
            id: Date.now(),
            name: '',
            description: '',
            category: 'Active',
            color: '#808080', // default gray
            isDefault: false,
            isHidden: false,
        };
        setStatuses(prev => [...prev, newStatus]);
    };

    const handleDeleteStatus = (id: number) => {
        setStatuses(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-xl font-semibold mb-4">{t('statusConfiguration')}</h2>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{t('enableCustomStatuses')}</h3>
                        <ToggleSwitch enabled={customStatuses} setEnabled={setCustomStatuses} />
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{t('requireStatusUpdates')}</h3>
                        <ToggleSwitch enabled={requireUpdates} setEnabled={setRequireUpdates} />
                    </div>
                     <div className="max-w-sm">
                        <Label htmlFor="default-status">{t('defaultActiveStatus')}</Label>
                        <Select id="default-status" value={defaultStatus} onChange={(e) => setDefaultStatus(e.target.value)}>
                            {statuses.map(s => <option key={s.id}>{s.name}</option>)}
                        </Select>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('defaultActiveStatusDesc')}</p>
                     </div>
                 </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{t('availableStatuses')}</h2>
                    <Button onClick={handleAddStatus}><PlusIcon className="w-4 h-4" /> {t('addStatus')}</Button>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="p-2 min-w-[200px]">{t('name')}</th>
                                <th className="p-2 min-w-[250px]">{t('description')}</th>
                                <th className="p-2 min-w-[150px]">{t('category')}</th>
                                <th className="p-2">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statuses.map(status => (
                                <tr key={status.id} className="border-t dark:border-gray-700">
                                    <td className="p-2 font-medium">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={status.color}
                                                onChange={(e) => handleStatusChange(status.id, 'color', e.target.value)}
                                                className="w-8 h-8 p-0 border-none bg-transparent rounded-md cursor-pointer"
                                            />
                                            <Input
                                                value={status.name}
                                                onChange={(e) => handleStatusChange(status.id, 'name', e.target.value)}
                                                className="text-sm"
                                            />
                                            {status.isDefault && <span className="text-xs whitespace-nowrap font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">Default</span>}
                                        </div>
                                    </td>
                                    <td className="p-2">
                                         <Input
                                            value={status.description}
                                            onChange={(e) => handleStatusChange(status.id, 'description', e.target.value)}
                                            className="text-sm"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <Select
                                            id={`category-${status.id}`}
                                            value={status.category}
                                            onChange={(e) => handleStatusChange(status.id, 'category', e.target.value as Status['category'])}
                                            className="text-sm"
                                        >
                                            <option value="Active">{t('active')}</option>
                                            <option value="Inactive">{t('inactive')}</option>
                                            <option value="Follow Up">{t('followUp')}</option>
                                            <option value="Closed">{t('closed')}</option>
                                        </Select>
                                    </td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" className="p-1 h-auto text-gray-500" onClick={() => handleStatusChange(status.id, 'isHidden', !status.isHidden)}>
                                                {status.isHidden ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                                            </Button>
                                            <Button variant="ghost" className="p-1 h-auto text-red-500" disabled={status.isDefault} onClick={() => handleDeleteStatus(status.id)}>
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
