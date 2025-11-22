

import React, { ReactNode } from 'react';
import { useAppContext } from '../context/AppContext';

// FIX: Made children optional to fix missing children prop error.
type ModalProps = { isOpen: boolean, onClose: () => void, title: string, children?: ReactNode };
export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { language } = useAppContext();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-card dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-auto my-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-3 sm:p-4 border-b dark:border-gray-700 flex justify-between items-center sticky top-0 bg-card dark:bg-gray-800 z-10">
          <h3 className={`text-lg sm:text-xl font-semibold text-primary ${language === 'ar' ? 'pr-2' : 'pl-2'}`}>{title}</h3>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary text-2xl sm:text-3xl leading-none flex-shrink-0">&times;</button>
        </div>
        <div className="p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
};