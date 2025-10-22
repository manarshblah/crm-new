

import React, { useState, useRef, useEffect, ReactNode } from 'react';

// FIX: Made children optional to fix missing children prop error.
type DropdownProps = {
    trigger: ReactNode;
    children?: ReactNode;
};

export const Dropdown = ({ trigger, children }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={toggleDropdown}>
                {trigger}
            </div>
            {isOpen && (
                <div 
                    className="origin-top-right rtl:origin-top-left absolute end-0 mt-2 w-56 rounded-md shadow-lg bg-card dark:bg-dark-card ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

// FIX: Made children optional to fix missing children prop error.
type DropdownItemProps = {
    children?: ReactNode;
    onClick: () => void;
};

export const DropdownItem = ({ children, onClick }: DropdownItemProps) => (
    <a
        href="#"
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        role="menuitem"
    >
        {children}
    </a>
);