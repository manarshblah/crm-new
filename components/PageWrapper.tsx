

import React, { ReactNode } from 'react';

// FIX: Made children optional to fix missing children prop error.
type PageWrapperProps = { title: string, children?: ReactNode, actions?: ReactNode };
export const PageWrapper = ({ title, children, actions }: PageWrapperProps) => (
    <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
            {actions && <div className="flex items-center flex-wrap gap-2">{actions}</div>}
        </div>
        <div>
            {children}
        </div>
    </div>
);