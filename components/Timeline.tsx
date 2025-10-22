import React from 'react';
import { TimelineEntry as TimelineEntryType } from '../types';
import { ClockIcon } from './icons';

type TimelineProps = {
    history: TimelineEntryType[];
};

export const Timeline = ({ history }: TimelineProps) => {
    return (
        <div className="space-y-8">
            {history.map(entry => (
                <div key={entry.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <img src={entry.avatar} alt={entry.user} className="h-10 w-10 rounded-full" />
                        <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600 my-2"></div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">{entry.user} <span className="font-normal text-gray-500 dark:text-gray-400"> - {entry.action}</span></p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{entry.details}</p>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                <ClockIcon className="w-3 h-3 me-1" />
                                {entry.date}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
