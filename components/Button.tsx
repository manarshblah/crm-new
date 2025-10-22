
import React, { ReactNode } from 'react';

// FIX: Add disabled prop to support disabling the button.
type ButtonProps = { children: ReactNode, onClick?: () => void, className?: string, variant?: 'primary' | 'secondary' | 'ghost' | 'danger', disabled?: boolean };
export const Button = ({ children, onClick, className = '', variant = 'primary', disabled }: ButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  return <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`} disabled={disabled}>{children}</button>;
};
