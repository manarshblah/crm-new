

import React, { ReactNode } from 'react';

// FIX: Made children optional to fix missing children prop error.
type ModalProps = { isOpen: boolean, onClose: () => void, title: string, children?: ReactNode };
export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card dark:bg-dark-card rounded-lg shadow-xl w-full max-w-md m-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};