'use client';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { getLanguages } from "@/db_queries/tags/student.queries";
import { addLanguage, updateLanguage, deleteLanguage } from '@/db_queries/tags/admin.queries';

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const fetchLanguages = async () => {
    return await getLanguages();
};

export default function LanguagesSection() {
    const { data: languages, error: languagesError, isLoading: languagesLoading } = useSWR('fetchLanguages', fetchLanguages);
    const [newLanguage, setNewLanguage] = useState({ name: '', color: '' });
    const [dialogState, updateDialogState] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleAddOrUpdateLanguage = async () => {
        try {
            if (isEditing) {
                await updateLanguage(newLanguage.id, newLanguage);
            } else {
                await addLanguage(newLanguage);
            }
            mutate('fetchLanguages'); // Revalidate and update languages
            setNewLanguage({ name: '', color: '' }); // Reset the form
            setIsEditing(false);
            updateDialogState(false);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    const handleEditLanguage = (language) => {
        setNewLanguage(language);
        setIsEditing(true);
        updateDialogState(true);
    };

    const handleDeleteLanguage = async () => {
        try {
            await deleteLanguage(newLanguage.id);
            mutate('fetchLanguages'); // Revalidate and update languages
            setNewLanguage({  name: '', color: '' }); // Reset the form
            setIsEditing(false);
            updateDialogState(false);
        } catch (error) {
            console.error('Error deleting language:', error);
        }
    };

    if (languagesLoading) return <div>Loading...</div>;
    if (languagesError) return <div>Error loading data</div>;

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold">Languages</h2>
            <ul className='flex flex-row mt-4'>
                <div className='grow flex-row'>
                    {languages.map((language) => (
                        <li 
                            key={language.id} 
                            className="cursor-pointer text-sm rounded-md mr-3 px-4 py-2 border-md bg-black text-white my-4"
                            onClick={() => handleEditLanguage(language)}
                        >
                            {language.name}
                        </li>
                    ))}
                </div>
                <div>
                    <Dialog open={dialogState} onOpenChange={updateDialogState}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="mt-4">Add Language</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{isEditing ? 'Edit Language' : 'Add New Language'}</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Name"
                                    value={newLanguage.name}
                                    onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                                />
                                <Input
                                    placeholder="Color"
                                    value={newLanguage.color}
                                    onChange={(e) => setNewLanguage({ ...newLanguage, color: e.target.value })}
                                />
                            </div>
                            <DialogFooter className="flex justify-between">
                                {isEditing && (
                                    <Button variant="outline" className="bg-red-500 text-white" onClick={handleDeleteLanguage}>
                                        Delete Language
                                    </Button>
                                )}
                                <Button onClick={handleAddOrUpdateLanguage}>
                                    {isEditing ? 'Update Language' : 'Add Language'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </ul>
        </div>
    );
}
