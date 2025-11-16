


import React, { useState } from 'react';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Card, Button, Input, ToggleSwitch, TrashIcon, PlusIcon, Modal } from '../../components/index';
import { MOCK_CHANNELS } from '../../constants';
import { Channel } from '../../types';
import { useAppContext } from '../../context/AppContext';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

// FIX: Made children optional to fix missing children prop error.
const Select = ({ id, children, value, onChange }: { id: string; children?: React.ReactNode, value?: string, onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
    <select id={id} value={value} onChange={onChange} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);


export const ChannelsSettings = () => {
    const { t } = useAppContext();
    const [multiChannel, setMultiChannel] = useState(true);
    const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS);
    const [defaultChannel, setDefaultChannel] = useState('Website');
    const [channelTypes, setChannelTypes] = useState<string[]>(['advertising', 'email', 'Web', 'Social']);
    const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false);
    const [newTypeName, setNewTypeName] = useState('');

    const handleAddType = () => {
        if (newTypeName && !channelTypes.includes(newTypeName)) {
            setChannelTypes(prev => [...prev, newTypeName]);
            setNewTypeName('');
            setIsAddTypeModalOpen(false);
        }
    };
    
    const handleChannelChange = (id: number, field: keyof Channel, value: any) => {
        setChannels(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleAddChannel = () => {
        const newChannel: Channel = {
            id: Date.now(),
            name: '',
            type: channelTypes[0] || '',
            priority: 'Medium',
        };
        setChannels(prev => [...prev, newChannel]);
    };

    const handleDeleteChannel = (id: number) => {
        setChannels(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="space-y-6">
             <Modal isOpen={isAddTypeModalOpen} onClose={() => setIsAddTypeModalOpen(false)} title={t('addType')}>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="new-type-name">{t('typeName')}</Label>
                        <Input 
                            id="new-type-name" 
                            placeholder={t('enterTypeName')} 
                            value={newTypeName}
                            onChange={(e) => setNewTypeName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={() => setIsAddTypeModalOpen(false)}>{t('cancel')}</Button>
                        <Button onClick={handleAddType}>{t('submit')}</Button>
                    </div>
                </div>
            </Modal>
            <Card>
                <h2 className="text-xl font-semibold mb-4">{t('channelAutomation')}</h2>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{t('multiChannelTracking')}</h3>
                        <ToggleSwitch enabled={multiChannel} setEnabled={setMultiChannel} />
                    </div>
                     <div className="max-w-sm">
                        <Label htmlFor="default-channel">{t('defaultChannel')}</Label>
                        <Select id="default-channel" value={defaultChannel} onChange={(e) => setDefaultChannel(e.target.value)}>
                            {channels.map(c => <option key={c.id}>{c.name}</option>)}
                        </Select>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('defaultChannelDesc')}</p>
                     </div>
                 </div>
            </Card>

             <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{t('activeChannels')}</h2>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setIsAddTypeModalOpen(true)}>{t('addType')}</Button>
                        <Button onClick={handleAddChannel}><PlusIcon className="w-4 h-4" /> {t('addChannel')}</Button>
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="p-2 min-w-[200px]">{t('name')}</th>
                                <th className="p-2 min-w-[150px]">{t('type')}</th>
                                <th className="p-2 min-w-[150px]">{t('priority')}</th>
                                <th className="p-2">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {channels.map(channel => (
                                <tr key={channel.id} className="border-t dark:border-gray-700">
                                    <td className="p-2 font-medium">
                                        <Input
                                            value={channel.name}
                                            onChange={(e) => handleChannelChange(channel.id, 'name', e.target.value)}
                                            className="text-sm"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <Select
                                            id={`type-${channel.id}`}
                                            value={channel.type}
                                            onChange={(e) => handleChannelChange(channel.id, 'type', e.target.value)}
                                        >
                                            {channelTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                        </Select>
                                    </td>
                                    <td className="p-2">
                                        <Select
                                            id={`priority-${channel.id}`}
                                            value={channel.priority}
                                            onChange={(e) => handleChannelChange(channel.id, 'priority', e.target.value as Channel['priority'])}
                                        >
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </Select>
                                    </td>
                                    <td className="p-2">
                                        <Button variant="ghost" className="p-1 h-auto !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20" onClick={() => handleDeleteChannel(channel.id)}>
                                            <TrashIcon className="w-4 h-4" />
                                        </Button>
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
