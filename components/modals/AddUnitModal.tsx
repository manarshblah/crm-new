
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';

// FIX: Made children optional to fix missing children prop error.
const Label = ({ children, htmlFor }: { children?: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{children}</label>
);

// FIX: Made children optional to fix missing children prop error.
const Select = ({ id, children, value, onChange }: { id: string; children?: React.ReactNode; value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; }) => (
    <select id={id} value={value} onChange={onChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
        {children}
    </select>
);

export const AddUnitModal = () => {
    const { isAddUnitModalOpen, setIsAddUnitModalOpen, t, addUnit, projects } = useAppContext();
    const [formState, setFormState] = useState({
        project: projects[0]?.name || '',
        bedrooms: '1',
        price: '',
        bathrooms: '1',
        type: 'Apartment',
        finishing: 'Finished',
        city: '',
        district: '',
        zone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addUnit({
            ...formState,
            bedrooms: Number(formState.bedrooms),
            price: Number(formState.price),
            bathrooms: Number(formState.bathrooms),
        });
        setIsAddUnitModalOpen(false);
        // Reset form
        setFormState({
            project: projects[0]?.name || '',
            bedrooms: '1', price: '', bathrooms: '1', type: 'Apartment',
            finishing: 'Finished', city: '', district: '', zone: '',
        });
    };

    return (
        <Modal isOpen={isAddUnitModalOpen} onClose={() => setIsAddUnitModalOpen(false)} title={t('addNewUnit')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="project">{t('project')}</Label>
                        <Select id="project" value={formState.project} onChange={handleChange}>
                            <option disabled value="">{t('selectProject')}</option>
                            {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="price">{t('price')}</Label>
                        <Input id="price" type="number" placeholder="e.g. 1,000,000" value={formState.price} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="bedrooms">{t('bedrooms')}</Label>
                        <Input id="bedrooms" type="number" min="0" value={formState.bedrooms} onChange={handleChange} />
                    </div>
                     <div>
                        <Label htmlFor="bathrooms">{t('bathrooms')}</Label>
                        <Input id="bathrooms" type="number" min="0" value={formState.bathrooms} onChange={handleChange} />
                    </div>
                     <div>
                        <Label htmlFor="type">{t('type')}</Label>
                        <Select id="type" value={formState.type} onChange={handleChange}>
                            <option value="Apartment">{t('apartment')}</option>
                            <option value="Villa">{t('villa')}</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="finishing">{t('finishing')}</Label>
                        <Select id="finishing" value={formState.finishing} onChange={handleChange}>
                            <option value="Finished">{t('finished')}</option>
                            <option value="Semi-Finished">{t('semiFinished')}</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="city">{t('city')}</Label>
                        <Input id="city" placeholder="e.g. Dubai" value={formState.city} onChange={handleChange} />
                    </div>
                     <div>
                        <Label htmlFor="district">{t('district')}</Label>
                        <Input id="district" placeholder="e.g. Downtown" value={formState.district} onChange={handleChange} />
                    </div>
                     <div>
                        <Label htmlFor="zone">{t('zone')}</Label>
                        <Input id="zone" placeholder="e.g. Zone 1" value={formState.zone} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit">{t('submit')}</Button>
                </div>
            </form>
        </Modal>
    );
};
