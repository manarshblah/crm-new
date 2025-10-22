

import React, { ReactNode } from 'react';

// FIX: Made children optional to fix missing children prop error.
type CardProps = { children?: ReactNode; className?: string };
export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);