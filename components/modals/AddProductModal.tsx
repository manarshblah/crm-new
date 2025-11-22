
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-secondary mb-1">{children}</label>
);

const Select = ({ id, children, value, onChange }: { id: string; children?: React.ReactNode; value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; }) => (
    <select id={id} value={value} onChange={onChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

export const AddProductModal = () => {
    const { isAddProductModalOpen, setIsAddProductModalOpen, t, addProduct, productCategories, suppliers } = useAppContext();
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        cost: '',
        stock: '',
        category: '',
        supplier: '',
        sku: '',
        isActive: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAddProductModalOpen) {
            // Reset form when modal opens
            setFormState({
                name: '',
                description: '',
                price: '',
                cost: '',
                stock: '',
                category: '',
                supplier: '',
                sku: '',
                isActive: true,
            });
        }
    }, [isAddProductModalOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        if (type === 'checkbox') {
            setFormState(prev => ({ ...prev, [id]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormState(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleClose = () => {
        setIsAddProductModalOpen(false);
        setFormState({
            name: '',
            description: '',
            price: '',
            cost: '',
            stock: '',
            category: '',
            supplier: '',
            sku: '',
            isActive: true,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.price || !formState.category) {
            alert('Please fill in required fields');
            return;
        }

        setLoading(true);
        try {
            await addProduct({
                name: formState.name,
                description: formState.description,
                price: Number(formState.price) || 0,
                cost: Number(formState.cost) || 0,
                stock: Number(formState.stock) || 0,
                category: formState.category,
                supplier: formState.supplier || undefined,
                sku: formState.sku || undefined,
                isActive: formState.isActive,
            });
            handleClose();
        } catch (error: any) {
            console.error('Error creating product:', error);
            const errorMessage = error?.message || 'Failed to create product. Please try again.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isAddProductModalOpen} onClose={handleClose} title={t('addProduct') || 'Add Product'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">{t('name')} *</Label>
                    <Input id="name" placeholder={t('enterProductName') || 'Enter product name'} value={formState.name} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="description">{t('description')}</Label>
                    <textarea 
                        id="description" 
                        rows={3} 
                        value={formState.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                        placeholder={t('enterProductDescription') || 'Enter product description'}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="price">{t('price')} *</Label>
                        <Input id="price" type="number" placeholder={t('enterPrice') || 'Enter price'} value={formState.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="cost">{t('cost')}</Label>
                        <Input id="cost" type="number" placeholder={t('enterCost') || 'Enter cost'} value={formState.cost} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="stock">{t('stock')}</Label>
                        <Input id="stock" type="number" placeholder={t('enterStock') || 'Enter stock'} value={formState.stock} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="category">{t('category')} *</Label>
                        <Select id="category" value={formState.category} onChange={handleChange} required>
                            <option value="">{t('selectCategory') || 'Select Category'}</option>
                            {productCategories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="supplier">{t('supplier')}</Label>
                        <Select id="supplier" value={formState.supplier} onChange={handleChange}>
                            <option value="">{t('selectSupplier') || 'Select Supplier (Optional)'}</option>
                            {suppliers.map(supplier => (
                                <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="sku">{t('sku')}</Label>
                        <Input id="sku" placeholder={t('enterSKU') || 'Enter SKU'} value={formState.sku} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="isActive" 
                        checked={formState.isActive}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <Label htmlFor="isActive">{t('active')}</Label>
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={handleClose} disabled={loading}>{t('cancel')}</Button>
                    <Button type="submit" disabled={loading}>{loading ? t('loading') || 'Loading...' : t('submit')}</Button>
                </div>
            </form>
        </Modal>
    );
};

