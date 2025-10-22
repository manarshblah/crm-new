
import React, { ReactNode } from 'react';

// FIX: Added `defaultValue` prop to support uncontrolled inputs.
export const Input = ({ id, type = 'text', placeholder, value, onChange, className = '', icon, defaultValue }: { id?: string; type?: string; placeholder?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string; icon?: ReactNode; defaultValue?: string; }) => (
    <div className="relative">
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${icon ? 'ps-10' : ''} ${className}`}
        />
        {icon && <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-400">{icon}</div>}
    </div>
);