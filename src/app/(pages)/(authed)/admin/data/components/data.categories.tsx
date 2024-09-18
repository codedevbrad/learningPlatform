'use client';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { getCategories } from "@/db_queries/tags/student.queries";
import { addCategory, updateCategory, deleteCategory } from '@/db_queries/tags/admin.queries';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const fetchCategories = async () => {
    return await getCategories();
};

export default function CategoriesSection() {
    const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useSWR('fetchCategories', fetchCategories);
    const [newCategory, setNewCategory] = useState({ name: '', color: '' });
    const [dialogState, updateDialogState] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleAddOrUpdateCategory = async () => {
        try {
            if (isEditing) {
                await updateCategory(newCategory.id, { name: newCategory.name, color: newCategory.color });
            } else {
                await addCategory(newCategory);
            }
            mutate('fetchCategories'); // Revalidate and update categories
            setNewCategory({ name: '', color: '' }); // Reset the form
            setIsEditing(false);
            updateDialogState(false);
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const handleEditCategory = (category) => {
        setNewCategory(category);
        setIsEditing(true);
        updateDialogState(true);
    };

    const handleDeleteCategory = async () => {
        try {
            await deleteCategory(newCategory.id);
            mutate('fetchCategories'); // Revalidate and update categories
            setNewCategory({ name: '', color: '' }); // Reset the form
            setIsEditing(false);
            updateDialogState(false);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    if (categoriesLoading) return <div>Loading...</div>;
    if (categoriesError) return <div>Error loading data</div>;

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">Categories</h2>
            <ul className="flex flex-row bg-gray-100 p-4 mt-4">
                <div className="flex grow">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="text-sm rounded-md mr-3 px-4 py-2 border-md bg-black text-white my-4 cursor-pointer"
                            onClick={() => handleEditCategory(category)}
                        >
                            {category.name}
                        </li>
                    ))}
                </div>
                <div>
                    <Dialog open={dialogState} onOpenChange={updateDialogState}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="mt-4">Add Category</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Name"
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                />
                                <Input
                                    placeholder="Color"
                                    value={newCategory.color}
                                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                                />
                            </div>
                            <DialogFooter className="flex justify-between">
                                {isEditing && (
                                    <Button variant="outline" className="bg-red-500 text-white" onClick={handleDeleteCategory}>
                                        Delete Category
                                    </Button>
                                )}
                                <Button onClick={handleAddOrUpdateCategory}>
                                    {isEditing ? 'Update Category' : 'Add Category'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </ul>
        </div>
    );
}
