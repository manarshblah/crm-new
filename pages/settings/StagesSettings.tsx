
import React, { useState } from 'react';
// FIX: Corrected component import path to avoid conflict with `components.tsx`.
import { Card, Button, Input, ToggleSwitch, TrashIcon, MoveVerticalIcon, PlusIcon } from '../../components/index';
import { Stage } from '../../types';
import { useAppContext } from '../../context/AppContext';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const StagesSettings = () => {
    const { t, stages, addStage, updateStage, deleteStage, setConfirmDeleteConfig, setIsConfirmDeleteModalOpen } = useAppContext();
    const [autoAdvance, setAutoAdvance] = useState(false);
    const [requireCompletion, setRequireCompletion] = useState(true);
    const [editingStages, setEditingStages] = useState<{ [key: number]: Partial<Stage> }>({});
    const [updateTimeouts, setUpdateTimeouts] = useState<{ [key: number]: NodeJS.Timeout }>({});

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
                    <Button onClick={async () => {
                        try {
                            await addStage({
                                name: '',
                                description: '',
                                color: '#808080',
                                required: false,
                                autoAdvance: false,
                            });
                        } catch (error) {
                            console.error('Error adding stage:', error);
                        }
                    }}><PlusIcon className="w-4 h-4" /> {t('addStage')}</Button>
                </div>
                <div className="space-y-4">
                    {stages.map(stage => (
                        <div key={stage.id} className="p-4 border rounded-lg dark:border-gray-700 flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0 flex md:flex-col items-center justify-center gap-2 md:gap-0">
                                <Button variant="ghost" className="cursor-grab p-1 h-auto">
                                    <MoveVerticalIcon className="w-5 h-5" />
                                </Button>
                                <input 
                                    type="color" 
                                    value={editingStages[stage.id]?.color || stage.color} 
                                    onChange={(e) => {
                                        const newColor = e.target.value;
                                        setEditingStages(prev => ({ ...prev, [stage.id]: { ...prev[stage.id], color: newColor } }));
                                        
                                        // Update immediately for color (no debounce needed)
                                        updateStage({ ...stage, color: newColor }).catch(error => {
                                            console.error('Error updating stage color:', error);
                                        });
                                    }}
                                    className="w-8 h-8 p-0 border-none bg-transparent rounded-full" 
                                />
                            </div>
                            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`stage-name-${stage.id}`}>{t('stageName')}</Label>
                                    <Input 
                                        id={`stage-name-${stage.id}`} 
                                        value={editingStages[stage.id]?.name !== undefined ? editingStages[stage.id].name : stage.name}
                                        onChange={(e) => {
                                            const newName = e.target.value;
                                            setEditingStages(prev => ({ ...prev, [stage.id]: { ...prev[stage.id], name: newName } }));
                                            
                                            // Clear existing timeout
                                            if (updateTimeouts[stage.id]) {
                                                clearTimeout(updateTimeouts[stage.id]);
                                            }
                                            
                                            // Set new timeout for debounce
                                            const timeout = setTimeout(async () => {
                                                try {
                                                    await updateStage({ ...stage, name: newName });
                                                } catch (error) {
                                                    console.error('Error updating stage:', error);
                                                }
                                            }, 500);
                                            
                                            setUpdateTimeouts(prev => ({ ...prev, [stage.id]: timeout }));
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`stage-desc-${stage.id}`}>{t('description')}</Label>
                                    <Input 
                                        id={`stage-desc-${stage.id}`} 
                                        value={editingStages[stage.id]?.description !== undefined ? editingStages[stage.id].description : stage.description}
                                        onChange={(e) => {
                                            const newDescription = e.target.value;
                                            setEditingStages(prev => ({ ...prev, [stage.id]: { ...prev[stage.id], description: newDescription } }));
                                            
                                            // Clear existing timeout
                                            if (updateTimeouts[stage.id]) {
                                                clearTimeout(updateTimeouts[stage.id]);
                                            }
                                            
                                            // Set new timeout for debounce
                                            const timeout = setTimeout(async () => {
                                                try {
                                                    await updateStage({ ...stage, description: newDescription });
                                                } catch (error) {
                                                    console.error('Error updating stage:', error);
                                                }
                                            }, 500);
                                            
                                            setUpdateTimeouts(prev => ({ ...prev, [stage.id]: timeout }));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex-shrink-0 flex items-center justify-around md:flex-col md:items-end md:justify-center gap-4">
                               <div className="flex items-center gap-2">
                                     <Label>{t('required')}</Label>
                                     <ToggleSwitch enabled={stage.required} setEnabled={(enabled) => updateStage({ ...stage, required: enabled })} />
                               </div>
                               <div className="flex items-center gap-2">
                                     <Label>{t('autoAdvance')}</Label>
                                     <ToggleSwitch enabled={stage.autoAdvance} setEnabled={(enabled) => updateStage({ ...stage, autoAdvance: enabled })} />
                               </div>
                            </div>
                             <div className="flex-shrink-0 flex items-center justify-center">
                                <Button 
                                    variant="ghost" 
                                    className="p-1 h-auto !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20"
                                    onClick={() => {
                                        setConfirmDeleteConfig({
                                            title: t('deleteStage') || 'Delete Stage',
                                            message: t('confirmDeleteStage') || 'Are you sure you want to delete',
                                            itemName: stage.name,
                                            onConfirm: async () => {
                                                try {
                                                    await deleteStage(stage.id);
                                                } catch (error) {
                                                    console.error('Error deleting stage:', error);
                                                    throw error;
                                                }
                                            },
                                        });
                                        setIsConfirmDeleteModalOpen(true);
                                    }}
                                >
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
