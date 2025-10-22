
import React, { useState } from 'react';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Card, Button, Input, ToggleSwitch, TrashIcon, PlusIcon } from '../../components/index';
import { MOCK_CHANNELS } from '../../constants';
import { Channel } from '../../types';
import { useAppContext } from '../../context/AppContext';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

const Select = ({ id, children, value, onChange }: { id: string; children: React.ReactNode, value?: string, onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
    <select id={id} value={value} onChange={onChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);


export const ChannelsSettings = () => {
    const { t } = useAppContext();
    const [multiChannel, setMultiChannel] = useState(true);
    const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS);
    const [defaultChannel, setDefaultChannel] = useState('Website');

    return (
        <div className="space-y-6">
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
                <h2 className="text-xl font-semibold mb-4">{t('activeChannels')}</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="p-2">{t('name')}</th>
                                <th className="p-2">{t('type')}</th>
                                <th className="p-2">{t('priority')}</th>
                                <th className="p-2">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {channels.map(channel => (
                                <tr key={channel.id} className="border-t dark:border-gray-700">
                                    <td className="p-2 font-medium">{channel.name}</td>
                                    <td className="p-2">{channel.type}</td>
                                    <td className="p-2">{channel.priority}</td>
                                    <td className="p-2">
                                        <Button variant="ghost" className="p-1 h-auto text-red-500">
                                            <TrashIcon className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card>
                <h2 className="text-xl font-semibold mb-4">{t('addChannel')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <Label htmlFor="new-channel-name">{t('channel')}</Label>
                        <Input id="new-channel-name" placeholder="e.g., Direct Call" />
                    </div>
                     <div>
                        <Label htmlFor="new-channel-type">{t('type')}</Label>
                        <Select id="new-channel-type">
                            <option>Web</option>
                            <option>Social</option>
                            <option>Direct</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="new-channel-priority">{t('priority')}</Label>
                        <Select id="new-channel-priority">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </Select>
                    </div>
                    <div>
                        <Button className="w-full"><PlusIcon className="w-4 h-4" /> {t('addChannel')}</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
