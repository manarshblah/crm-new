
import React, { useState } from 'react';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Card, Button, Input, ToggleSwitch, TrashIcon, MoveVerticalIcon, PlusIcon } from '../../components/index';
import { MOCK_STAGES } from '../../constants';
import { Stage } from '../../types';
import { useAppContext } from '../../context/AppContext';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const StagesSettings = () => {
    const { t } = useAppContext();
    const [autoAdvance, setAutoAdvance] = useState(false);
    const [requireCompletion, setRequireCompletion] = useState(true);
    const [stages, setStages] = useState<Stage[]>(MOCK_STAGES);

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-xl font-semibold mb-4">{t('stageAutomation')}</h2>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{t('autoStageAdvancement')}</h3>
                        <ToggleSwitch enabled={autoAdvance} setEnabled={setAutoAdvance} />
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{t('requireStageCompletion')}</h3>
                         <ToggleSwitch enabled={requireCompletion} setEnabled={setRequireCompletion} />
                    </div>
                 </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{t('leadStages')}</h2>
                    <Button><PlusIcon className="w-4 h-4" /> {t('addStage')}</Button>
                </div>
                <div className="space-y-4">
                    {stages.map(stage => (
                        <div key={stage.id} className="p-4 border rounded-lg dark:border-gray-700 flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0 flex md:flex-col items-center justify-center gap-2 md:gap-0">
                                <Button variant="ghost" className="cursor-grab p-1 h-auto">
                                    <MoveVerticalIcon className="w-5 h-5" />
                                </Button>
                                <input type="color" defaultValue={stage.color} className="w-8 h-8 p-0 border-none bg-transparent rounded-full" />
                            </div>
                            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`stage-name-${stage.id}`}>{t('stageName')}</Label>
                                    <Input id={`stage-name-${stage.id}`} defaultValue={stage.name} />
                                </div>
                                <div>
                                    <Label htmlFor={`stage-desc-${stage.id}`}>{t('description')}</Label>
                                    <Input id={`stage-desc-${stage.id}`} defaultValue={stage.description} />
                                </div>
                            </div>
                            <div className="flex-shrink-0 flex items-center justify-around md:flex-col md:items-end md:justify-center gap-4">
                               <div className="flex items-center gap-2">
                                     <Label>{t('required')}</Label>
                                     <ToggleSwitch enabled={stage.required} setEnabled={() => {}} />
                               </div>
                               <div className="flex items-center gap-2">
                                     <Label>{t('autoAdvance')}</Label>
                                     <ToggleSwitch enabled={stage.autoAdvance} setEnabled={() => {}} />
                               </div>
                            </div>
                             <div className="flex-shrink-0 flex items-center justify-center">
                                <Button variant="ghost" className="p-1 h-auto text-red-500">
                                    <TrashIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
