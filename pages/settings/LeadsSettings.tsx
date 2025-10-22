
import React, { useState } from 'react';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Card, Button, Input, ToggleSwitch } from '../../components/index';
import { useAppContext } from '../../context/AppContext';

export const LeadsSettings = () => {
    const { t } = useAppContext();
    const [autoRotate, setAutoRotate] = useState(false);

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-xl font-semibold mb-4">{t('leadAssignmentSettings')}</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">{t('autoRotation')}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('autoRotationDesc')}</p>
                        </div>
                        <ToggleSwitch enabled={autoRotate} setEnabled={setAutoRotate} />
                    </div>

                    <div className="max-w-sm">
                         <label htmlFor="delay-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('reminderDelayTime')}</label>
                         <Input id="delay-time" type="number" defaultValue="30" />
                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('reminderDelayTimeDesc')}</p>
                    </div>
                </div>
                 <div className="mt-6 flex justify-end">
                    <Button>{t('saveSettings')}</Button>
                </div>
            </Card>
        </div>
    );
};
