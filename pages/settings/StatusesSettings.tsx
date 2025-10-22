
import React, { useState } from 'react';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Card, Button, Input, ToggleSwitch, TrashIcon, EyeIcon, EyeOffIcon, PlusIcon } from '../../components/index';
import { MOCK_STATUSES } from '../../constants';
import { Status } from '../../types';
import { useAppContext } from '../../context/AppContext';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const Select = ({ id, children, value, onChange }: { id: string; children: React.ReactNode, value?: string, onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
    <select id={id} value={value} onChange={onChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

export const StatusesSettings = () => {
    const { t } = useAppContext();
    const [customStatuses, setCustomStatuses] = useState(true);
    const [requireUpdates, setRequireUpdates] = useState(true);
    const [statuses, setStatuses] = useState<Status[]>(MOCK_STATUSES);
    const [defaultStatus, setDefaultStatus] = useState(MOCK_STATUSES.find(s => s.isDefault)?.name || '');

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
                    <Button><PlusIcon className="w-4 h-4" /> {t('addStatus')}</Button>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="p-2">{t('name')}</th>
                                <th className="p-2">{t('description')}</th>
                                <th className="p-2">{t('category')}</th>
                                <th className="p-2">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statuses.map(status => (
                                <tr key={status.id} className="border-t dark:border-gray-700">
                                    <td className="p-2 font-medium">
                                        <div className="flex items-center gap-2">
                                            <span style={{ backgroundColor: status.color }} className="w-3 h-3 rounded-full"></span>
                                            {status.name}
                                            {status.isDefault && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">Default</span>}
                                        </div>
                                    </td>
                                    <td className="p-2 text-gray-600 dark:text-gray-400">{status.description}</td>
                                    <td className="p-2">{status.category}</td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" className="p-1 h-auto text-gray-500">
                                                {status.isHidden ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                                            </Button>
                                            <Button variant="ghost" className="p-1 h-auto text-red-500" disabled={status.isDefault}>
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
