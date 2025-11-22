
import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';
import { changePasswordAPI } from '../../services/api';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

export const ChangePasswordModal = () => {
    const { isChangePasswordModalOpen, setIsChangePasswordModalOpen, t } = useAppContext();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    // Refs to prevent auto-fill
    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isChangePasswordModalOpen) {
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setErrors({});
            setSuccessMessage('');
            // Prevent auto-fill by making fields readonly initially
            setTimeout(() => {
                if (currentPasswordRef.current) {
                    currentPasswordRef.current.removeAttribute('readonly');
                }
                if (newPasswordRef.current) {
                    newPasswordRef.current.removeAttribute('readonly');
                }
                if (confirmPasswordRef.current) {
                    confirmPasswordRef.current.removeAttribute('readonly');
                }
            }, 100);
        }
    }, [isChangePasswordModalOpen]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = t('currentPasswordRequired') || 'Current password is required';
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = t('newPasswordRequired') || 'New password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = t('passwordMinLength') || 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = t('confirmPasswordRequired') || 'Confirm password is required';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = t('passwordsDoNotMatch') || 'Passwords do not match';
        }

        if (formData.currentPassword === formData.newPassword) {
            newErrors.newPassword = t('newPasswordMustBeDifferent') || 'New password must be different from current password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');

        try {
            await changePasswordAPI(
                formData.currentPassword,
                formData.newPassword,
                formData.confirmPassword
            );
            
            setSuccessMessage(t('passwordChangedSuccessfully') || 'Password changed successfully!');
            
            // Reset form after success
            setTimeout(() => {
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setIsChangePasswordModalOpen(false);
            }, 1500);
        } catch (error: any) {
            const errorMessage = error.message || t('errorChangingPassword') || 'Error changing password';
            
            // Check if error is about current password
            if (errorMessage.toLowerCase().includes('current') || errorMessage.toLowerCase().includes('incorrect')) {
                setErrors({ currentPassword: errorMessage });
            } else if (errorMessage.toLowerCase().includes('match')) {
                setErrors({ confirmPassword: errorMessage });
            } else {
                setErrors({ general: errorMessage });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)} title={t('changePassword')}>
            <div className="space-y-4">
                {/* Hidden field to prevent auto-fill */}
                <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                    tabIndex={-1}
                    readOnly
                />
                
                {errors.general && (
                    <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md">
                        {errors.general}
                    </div>
                )}

                {successMessage && (
                    <div className="p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-md">
                        {successMessage}
                    </div>
                )}

                <div>
                    <Label htmlFor="current-password">{t('currentPassword')}</Label>
                    <Input
                        ref={currentPasswordRef}
                        id="current-password"
                        type="password"
                        placeholder={t('enterCurrentPassword')}
                        value={formData.currentPassword}
                        onChange={(e) => handleChange('currentPassword', e.target.value)}
                        autoComplete="current-password"
                        data-lpignore="true"
                        data-form-type="other"
                        readOnly
                        onFocus={(e) => e.target.removeAttribute('readonly')}
                        className={errors.currentPassword ? 'border-red-500' : ''}
                    />
                    {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.currentPassword}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="new-password">{t('newPassword')}</Label>
                    <Input
                        ref={newPasswordRef}
                        id="new-password"
                        type="password"
                        placeholder={t('enterNewPassword')}
                        value={formData.newPassword}
                        onChange={(e) => handleChange('newPassword', e.target.value)}
                        autoComplete="new-password"
                        data-lpignore="true"
                        data-form-type="other"
                        readOnly
                        onFocus={(e) => e.target.removeAttribute('readonly')}
                        className={errors.newPassword ? 'border-red-500' : ''}
                    />
                    {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.newPassword}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="confirm-new-password">{t('confirmNewPassword')}</Label>
                    <Input
                        ref={confirmPasswordRef}
                        id="confirm-new-password"
                        type="password"
                        placeholder={t('enterConfirmNewPassword')}
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        autoComplete="new-password"
                        data-lpignore="true"
                        data-form-type="other"
                        readOnly
                        onFocus={(e) => e.target.removeAttribute('readonly')}
                        className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <Button 
                        variant="secondary" 
                        onClick={() => setIsChangePasswordModalOpen(false)}
                        disabled={isLoading}
                    >
                        {t('cancel')}
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (t('changing') || 'Changing...') : t('saveChanges')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
